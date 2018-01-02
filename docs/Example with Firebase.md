Using with firebase

```jsx
const firebase = require('firebase')

const config = {
  apiKey: "AIzaSyBMlvoWc9MI1boEeXFWNuD8uYv-8mpAMSU",
  projectId: "ic-firebase-uploader",
  storageBucket: "ic-firebase-uploader.appspot.com",
}

const app = firebase.initializeApp(config)
window.unload = app.delete

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

function onClick({downloadUrl}) {
  window.open(downloadUrl)
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
