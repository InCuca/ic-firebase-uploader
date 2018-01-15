const firebase = require('firebase')

window.app = firebase.initializeApp({
  apiKey: "AIzaSyBMlvoWc9MI1boEeXFWNuD8uYv-8mpAMSU",
  projectId: "ic-firebase-uploader",
  storageBucket: "ic-firebase-uploader.appspot.com",
  databaseURL: "https://ic-firebase-uploader.firebaseio.com/",
})

window.unload = app.delete
