Using with firebase

```jsx
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
    initialFiles: {},
    dbRef: null,
  }),
  methods: {
    getFileName(file) {
      return Math.floor(Math.random() * 1000) + file.name
    },
    getStorage() {
      return app.storage()
    },
    onUpload({doUpload}) {
      const key = this.dbRef.push().key
      doUpload(key);
    },
    onUploaded({id, fullPath}) {
      dbRef.child(id).set(fullPath)
    },
    onDelete({doDelete}) {
      doDelete();
    },
    onDeleted({id}) {
      this.dbRef.child(id).remove()
    },
    onError(err) {
      console.error(err)
    },
  },
  mounted() {
    this.dbRef = app.database().ref('files')
    this.dbRef.on(
      'value',
      ds => this.initialFiles = ds.val() || {}
    )
  },
  destroyed() {
    this.dbRef.off('value')
  }
})
```
