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
function getFileName(file) {
  return file.name + Math.floor(Math.random() * 1000)
}

function onUpload(fullPath, doUpload) {
  doUpload();
}

function onDelete(fullPath, doDelete) {
  doDelete();
}
```

```html
<ic-firebase-upload
  max-files="3"
  path="images"
  :getFileName="getFileName"
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
