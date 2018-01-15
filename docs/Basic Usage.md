Using with firebase

```jsx
function getFileName(file) {
  return Math.floor(Math.random() * 1000) + file.name
}

function getStorage() {
  return app.storage()
}

function onUpload({doUpload}) {
  doUpload();
}

function onDelete({doDelete}) {
  doDelete();
}

function onClick(event) {
  event.preventDefault();
  event.getDownloadURL().then(window.open)
}

function onError(err) {
  console.error(err)
}

<ic-firebase-uploader
  path="images"
  max-files="3"
  :getFileName="getFileName"
  :storage="getStorage()"
  @upload="onUpload"
  @delete="onDelete"
  @click="onClick"
  @error="onError">
</ic-firebase-uploader>
```
