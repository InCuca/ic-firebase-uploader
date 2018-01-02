<template>
  <div class="ic-fb_uploader">
    <ul class="ic-fb_uploader-files">
      <li>Lorem Ipsum1.jpg</li>
      <li>Lorem Ipsum2.jpg</li>
      <li>Lorem Ipsum3.jpg</li>
    </ul>

    <button class="ic-fb_uploader-btn">
      UPLOAD
    </button>
  </div>
</template>

<script>
export default {
  name: 'ic-firebase-uploader',
  props: {
    maxFiles: {
      type: [Number, String],
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    getFileName: {
      type: Function,
      required: true,
    },
    storage: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style lang="css" scoped>

</style>

