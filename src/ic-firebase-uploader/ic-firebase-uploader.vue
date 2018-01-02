<template>
  <div class="ic-fb_uploader">
    <ul class="ic-fb_uploader-files">
      <li v-for="fileRef in sentFiles" :key="fileRef.fullPath">
        {{fileRef.name}}
      </li>
    </ul>
    <input
      type="file"
      class="ic-fb_uploader-loader"
      ref="loader"
      multiple
      @change="onChangeLoader">
    <button class="ic-fb_uploader-btn" @click="onBtnClick">
      UPLOAD
    </button>
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
    onBtnClick() {
      this.$refs.loader.click()
    },
    onChangeLoader(event) {
      const files = event.target.files
      const curFilesLength = this.sentFiles.length + files.length
      if (curFilesLength > Number(this.maxFiles)) {
        this.$emit('error', new Error('maximum files reached'))
      }
      const cFiles = Array.prototype.slice.call(files, 0, 3)
      cFiles.forEach(this.uploadFile)
    },
    uploadFile(file, index, files) {
      const fileName = this.getFileName(file)
      const rootRef = this.storage.ref()
      const fileRef = rootRef.child(this.path + '/' + fileName)
      this.$emit('upload', {
        fullPath: fileRef.fullPath,
        remainingFiles: files.length - index,
        file,
        doUpload: this.getUploadFn(fileRef, file)
      })
    },
    getUploadFn(fileRef, file) {
      return () => {
        fileRef.put(file)
          .then(() => this.sentFiles.push(fileRef))
          .catch(err => this.$emit('error', err))
      }
    }
  }
}
</script>

<style lang="css" scoped>
.ic-fb_uploader .ic-fb_uploader-loader {
  display: none;
}
</style>

