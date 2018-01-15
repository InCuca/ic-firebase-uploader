Using with firebase

```jsx
const firebase = require('firebase')
const app = firebase.initializeApp({
  apiKey: "AIzaSyBMlvoWc9MI1boEeXFWNuD8uYv-8mpAMSU",
  projectId: "ic-firebase-uploader",
  storageBucket: "ic-firebase-uploader.appspot.com",
  databaseURL: "https://ic-firebase-uploader.firebaseio.com/",
})
const dbRef = app.database().ref('files')
window.unload = () => {
  dbRef.off('value')
  app.delete()
}

new Vue({
  template: `
    <ic-firebase-uploader
      path="images"
      max-files="3"
      :initial-files="initialFiles"
      :getFileName="getFileName"
      :storage="getStorage()"
      @upload="onUpload"
      @uploaded="onUploaded"
      @delete="onDelete"
      @deleted="onDeleted"
      @error="onError">
    </ic-firebase-uploader>
  `,
  data: () => ({
    initialFiles: {}
  }),
  methods: {
    getFileName(file) {
      return Math.floor(Math.random() * 1000) + file.name
    },
    getStorage() {
      return app.storage()
    },
    onUpload({doUpload}) {
      const key = dbRef.push().key
      doUpload(key);
    },
    onUploaded({id, fullPath}) {
      dbRef.child(id).set(fullPath)
    },
    onDelete({doDelete}) {
      doDelete();
    },
    onDeleted({id}) {
      dbRef.child(id).remove()
    },
    onError(err) {
      console.error(err)
    },
  },
  mounted() {
    dbRef.on(
      'value',
      ds => this.initialFiles = ds.val() || {}
    )
  }
})
```
