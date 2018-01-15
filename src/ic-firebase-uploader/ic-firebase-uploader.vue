<template>
  <div class="ic-fb_uploader">
    <ul class="ic-fb_uploader-files">
      <li v-for="file in sentFiles" :key="file.ref.fullPath">
        <a
          v-if="!file.isLoading"
          target="_blank"
          :href="file.downloadUrl"
          @click="onFileLinkClick(file.ref, $event)">
          {{file.ref.name}}
        </a>
        <span v-else>{{file.ref.name}}</span>
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
    },
    /**
     * You can set the current uploaded files in this object,
     * eg: fotos: {image1: 'path/to/the/image1, image2: 'path/to/the/image2'}
     */
    initialFiles: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data: () => ({
    sentFiles: [],
  }),
  watch: {
    initialFiles: {
      immediate: true,
      handler(files) {
        const filesEntries = Object.entries(files)
        filesEntries.forEach(
          (entry) => {
            const fullPath = entry[1]
            const index = entry[0]

            // Do nothing if it already exists (placed by internal logic)
            if (this.sentFiles.some(f => f.ref.fullPath === fullPath))
              return

            const ref = this.storage.ref(fullPath)
            ref.getDownloadURL().then(downloadUrl => {
              const newFile = {
                id: index,
                ref,
                downloadUrl,
                isLoading: false,
              }
              this.sentFiles.push(newFile)
            })
          }
        )
      }
    },
  },
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
      if (sentFile.isLoading) return;
      /**
       * This event is called before a file delete begins
       * call doDelete to continue. Properties in the
       * payload: fullPath, doDelete.
       * @event delete
       * @type {Object}
       */
      this.$emit('delete', {
        id: sentFile.id,
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
       * call doUpload to begin upload (call with id it it will be added to a database).
       * Properties in the payload: fullPath, file and doUpload.
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
      return id => {
        const sentFile = {
          id,
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
             * Properties in the payload: id (undefined if it was not stored on a database), fullPath and the getDownloadURL
             * function that when is called returns a promise of the url.
             * @event uploaded
             * @type {Object}
             */
            this.$emit('uploaded', {
              id,
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
      file.isLoading = true
      const fileRef = file.ref
      return () => {
        fileRef.delete()
          .then(() => {
            file.isLoading = false
            const sentIndex = this.sentFiles.indexOf(file)
            this.sentFiles.splice(sentIndex, 1)
            /**
             * This event is called after a file deletion ends.
             * Properties in the payload: fullPath and id (null if it was in a database).
             * @event deleted
             * @type {Object}
             */
            this.$emit('deleted', {
              id: file.id || null,
              fullPath: fileRef.fullPath,
            })
          })
          .catch(err => {
            file.isLoading = false
            this.$emit('error', err)
          })
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
}

.ic-fb_uploader .ic-fb_uploader-delete.fa-times {
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
  color: #387cbd;
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

