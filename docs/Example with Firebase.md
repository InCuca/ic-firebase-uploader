Using with firebase

```jsx
const firebase = require('firebase')

const config = {
  apiKey: "AIzaSyBMlvoWc9MI1boEeXFWNuD8uYv-8mpAMSU",
  authDomain: "ic-firebase-uploader.firebaseapp.com",
  databaseURL: "https://ic-firebase-uploader.firebaseio.com",
  projectId: "ic-firebase-uploader",
  storageBucket: "ic-firebase-uploader.appspot.com",
  messagingSenderId: "526916383818"
}

function getFileName(file) {
  return file.name + Math.floor(Math.random() * 1000)
}

function getStorage() {
  firebase.initializeApp(config)
  return firebase.storage()
}

function onUpload(fullPath, doUpload) {
  doUpload();
}

function onDelete(fullPath, doDelete) {
  doDelete();
}

function onClick(fullPath, downloadUrl) {
  window.open(downloadUrl)
}

<ic-firebase-uploader
  path="images"
  max-files="3"
  :getFileName="getFileName"
  :storage="getStorage()"
  @upload="onUpload"
  @delete="onDelete"
  @click="onClick">
</ic-firebase-uploader>
```
