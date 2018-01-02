This component is a multi-file uploader for firebase

```js
function getFileName(file) {
  return file.name + Math.floor(Math.random() * 1000)
}

function onUpload(fullPath, doUpload) {
  doUpload();
}

function onDelete(fullPath, doDelete) {
  doDelete();
}

function onClick(fullPath, downloadUrl) {
}

function onUploaded(fullPath) {}

function onDeleted(fullPath) {}
```

  <ic-firebase-upload
    max-files="3"
    path="images"
    :getFileName="getFileName"
    @upload="onUpload"
    @delete="onDelete"
    @uploaded="onUploaded"
    @deleted="onDeleted"
    @click="onClick">
  </ic-firebase-upload>

Dependencies (add them manually):
[Font-Awesome](http://fontawesome.io)
