# ic-firebase-uploader
[![Travis](https://img.shields.io/travis/InCuca/ic-firebase-uploader/master.svg)](https://travis-ci.org/InCuca/ic-firebase-uploader/branches)

> This component is a multi-file uploader for firebase

## Installation

### Using yarn

`yarn add ic-firebase-uploader`

### Using npm

`npm i --save ic-firebase-uploader`

### ES6 Modules / CommonJS

```js
import IcFirebaseUploader from 'ic-firebase-uploader';
import 'ic-firebase-uploader/dist/ic-firebase-uploader.min.css';

Vue.component('ic-firebase-uploader', IcFirebaseUploader);
```

### UMD

```html
<script src="https://unpkg.com/vue" charset="utf-8"></script>
<script src="./dist/umd/ic-firebase-uploader.min.js" charset="utf-8"></script>
<link rel="stylesheet" type="text/css" href="./dist/umd/ic-firebase-uploader.min.css">

<script type="text/javascript">
  Vue.component('ic-firebase-uploader', window.IcFirebaseUploader);
</script>
```

## Usage

```js
const firebase = require('firebase')

const config = {
  apiKey: "AIzaSyBMlvoWc9MI1boEeXFWNuD8uYv-8mpAMSU",
  authDomain: "ic-firebase-uploader.firebaseapp.com",
  databaseURL: "https://ic-firebase-uploader.firebaseio.com",
  projectId: "ic-firebase-uploader",
  storageBucket: "ic-firebase-uploader.appspot.com",
  messagingSenderId: "526916383818"
}

function getStorage() {
  firebase.initializeApp(config)
  return firebase.storage()
}

function getFileName(file) {
  return file.name + Math.floor(Math.random() * 1000)
}

function onUpload({fullPath, doUpload}) {
  doUpload();
}

function onDelete({fullPath, doDelete}) {
  doDelete();
}
```

```html
<ic-firebase-upload
  path="images"
  max-files="3"
  :getFileName="getFileName"
  :storage="getStorage()"
  @upload="onUpload"
  @delete="onDelete">
</ic-firebase-upload>
```

## Demo and Docs

`npm run serve`

## Build

Build configuration is located in the `poi.config.js` file, to build just run: `npm run build`, it will build to `cjs` and `umd` directories.

## Tests

This template uses karma with chai by default, you can change test settings in poi.config.js

`npm run test`
`npm run test:watch`
`npm run test:cov`

## License

This project is licensed under [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
