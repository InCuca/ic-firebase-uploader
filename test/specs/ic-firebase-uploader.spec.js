import Vue from 'vue'
import Component from '../../src/ic-firebase-uploader/ic-firebase-uploader'

describe('ic-firebase-uploader.vue', () => {
  const Constructor = Vue.extend(Component)
  let propsData

  beforeEach(() => {
    propsData = {}
  })

  it('should instance the right component', () => {
    const vm = new Constructor({propsData})
    expect(vm.$options.name).to.equal('ic-firebase-uploader')
  })

  it.skip('max-files prop should be required', () => {
    // TODO: Implement test
  })

  it.skip('path prop should be required', () => {
    // TODO: Implement test
  })

  it.skip('getFileName prop should be required', () => {
    // TODO: Implement test
  })

  it.skip('getFileName should be called with a file', () => {
    // TODO: Implement test
  })

  it.skip('max-files should limit the number of uploaded files', () => {
    // TODO: Implement test
  })

  it.skip('files should match path of firebase', () => {
    // TODO: Implement test
  })

  it.skip('should emit upload on file upload with fullPath and doUpload', () => {
    // TODO: Implement test
  })

  it.skip('calling doUpload should upload the file', () => {
    // TODO: Implement test
  })

  it.skip('should emit delete on file deletion with fullPath and doDelete', () => {
    // TODO: Implement test
  })

  it.skip('calling doDelete should delete the file', () => {
    // TODO: Implement test
  })

  it.skip('should emit click on clicking file', () => {
    // TODO: Implement test
  })
});
