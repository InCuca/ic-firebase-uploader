<template>
  <div class="ic-fb_uploader">
    <ul class="ic-fb_uploader-files">
      <li v-for="file in sentFiles" :key="file.ref.fullPath">
        <a
          target="_blank"
          :href="file.downloadUrl"
          @click="onFileLinkClick(file.ref, $event)">
          {{file.ref.name}}
        </a>
        <i :class="getIconClasses(file)" @click="onFileDeleteClick(file)"></i>
      </li>
    </ul>
    <input
      type="file"
      class="ic-fb_uploader-loader"
      ref="loader"
      multiple
      @change="onChangeLoader">
    <!-- @slot Override default upload button, you must call promptFiles method -->
    <slot><button class="ic-fb_uploader-btn" @click="promptFiles">
        UPLOAD
    </button></slot>
  </div>
</template>

<script>
export default {
  name: 'ic-firebase-uploader',
  props: {
    /**
     * Maximum files
     */
    maxFiles: {
      type: [Number, String],
      required: true,
    },
    /**
     * Path to save files on firebase
     */
    path: {
      type: String,
      required: true,
    },
    /**
     * This function is called for each user submitted file
     * with the associated File object, the return must be a string
     * containing the file name to be saved remotely
     */
    getFileName: {
      type: Function,
      required: true,
    },
    /**
     * Firebase storage object
     * {@link https://firebase.google.com/docs/reference/js/firebase.storage | firebase.storage}
     */
    storage: {
      type: Object,
      required: true,
    }
  },
  data: () => ({
    sentFiles: [],
  }),
  methods: {
    onFileLinkClick(fileRef, event) {
      /**
       * When user clicks in a file link, event contains
       * fullPath and the getDownloadURL function that when is
       * called returns a promise of the url.
       * @event click
       * @type {Object}
       */
      this.$emit('click', {
        ...event,
        fullPath: fileRef.fullPath,
        getDownloadURL: fileRef.getDownloadURL,
      })
    },
    onFileDeleteClick(sentFile) {
      /**
       * This event is called before a file delete begins
       * call doDelete to continue. Properties in the
       * payload: fullPath, doDelete.
       * @event delete
       * @type {Object}
       */
      this.$emit('delete', {
        fullPath: sentFile.ref.fullPath,
        doDelete: this.getDeleteFn(sentFile)
      })
    },
    onChangeLoader(event) {
      const files = event.target.files
      const curFilesLength = this.sentFiles.length
      const afterFilesLength = curFilesLength + files.length
      if (afterFilesLength > Number(this.maxFiles)) {
        /**
         * Called when something wrong occurs, also,
         * it contains "maximum files reached" error when user tries to
         * upload more then the max-files setting. Note: the upload
         * process is not interrupted in the last situation.
         * @event error
         * @type {Error}
         */
        this.$emit('error', new Error('maximum files reached'))
      }
      const cFiles = Array.prototype.slice.call(
        files, 0, this.maxFiles - curFilesLength
      )
      cFiles.forEach(this.uploadFile)
    },
    uploadFile(file, index, files) {
      const fileName = this.getFileName(file)
      const rootRef = this.storage.ref()
      const fileRef = rootRef.child(this.path + '/' + fileName)
      /**
       * This event is called before each file upload begins
       * call doUpload to begin upload. Properties in the
       * payload: fullPath, file and doUpload.
       * @event upload
       * @type {Object}
       */
      this.$emit('upload', {
        fullPath: fileRef.fullPath,
        file,
        doUpload: this.getUploadFn(fileRef, file)
      })
    },
    getUploadFn(fileRef, file) {
      return () => {
        const sentFile = {
          ref: fileRef,
          isLoading: true,
        }
        this.sentFiles.push(sentFile)

        fileRef.put(file)
          .then(() => fileRef.getDownloadURL())
          .then(downloadUrl => {
            sentFile.downloadUrl = downloadUrl
            sentFile.isLoading = false

            /**
             * This event is called after each file upload ends.
             * Properties in the payload: fullPath and the getDownloadURL
             * function that when is called returns a promise of the url.
             * @event uploaded
             * @type {Object}
             */
            this.$emit('uploaded', {
              fullPath: fileRef.fullPath,
              getDownloadURL: fileRef.getDownloadURL
            })
          })
          .catch(err => {
            this.$emit('error', err)
            sentFile.isLoading = false
          })
      }
    },
    getDeleteFn(file) {
      const fileRef = file.ref
      return () => {
        fileRef.delete()
          .then(() => {
            const sentIndex = this.sentFiles.indexOf(file)
            this.sentFiles.splice(sentIndex, 1)
            /**
             * This event is called after a file deletion ends.
             * Properties in the payload: fullPath.
             * @event deleted
             * @type {Object}
             */
            this.$emit('deleted', {
              fullPath: fileRef.fullPath,
            })
          })
          .catch(err => this.$emit('error', err))
      }
    },
    getIconClasses(file) {
      const classes = {
        'fa': true,
        'fa-times': !file.isLoading,
        'fa-spinner': file.isLoading,
        'ic-fb_uploader-delete': true,
      }

      return classes;
    },
    /**
     * Open the file browser and ask user for the files
     */
    promptFiles() {
      this.$refs.loader.click()
    },
  },
}
</script>

<style lang="css" scoped>
.ic-fb_uploader .ic-fb_uploader-loader {
  display: none;
}

.ic-fb_uploader .ic-fb_uploader-delete {
  cursor: pointer;
  color: #ad3636;
}

.ic-fb_uploader .ic-fb_uploader-delete.fa-spinner {
  -webkit-animation-name: rotate;
  animation-name: rotate;
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}

@-webkit-keyframes rotate {
    from {-webkit-transform: rotate(0deg);transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);transform: rotate(360deg);}
}

@keyframes rotate {
    from {-webkit-transform: rotate(0deg);transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);transform: rotate(360deg);}
}

.ic-fb_uploader .ic-fb_uploader-delete:hover {
  opacity: .8;
}
</style>

