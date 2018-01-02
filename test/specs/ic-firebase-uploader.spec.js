import Vue from 'vue'
import Component from '../../src/ic-firebase-uploader/ic-firebase-uploader'

describe('ic-firebase-uploader.vue', () => {
  const Constructor = Vue.extend(Component)
  let propsData

  beforeEach(() => {
    propsData = {
      maxFiles: 3,
      path: 'images',
      getFileName: () => {}
    }
  })

  it('should instance the right component', () => {
    const vm = new Constructor({propsData})
    expect(vm.$options.name).to.equal('ic-firebase-uploader')
  })

  it('max-files prop should be required', () => {
    const vm = new Constructor({ propsData })
    expect(vm.$options.props.maxFiles.required).to.equal(true)
  })

  it('path prop should be required', () => {
    const vm = new Constructor({propsData})
    expect(vm.$options.props.path.required).to.equal(true)
  })

  it('getFileName prop should be required', () => {
    const vm = new Constructor({propsData})
    expect(vm.$options.props.getFileName.required).to.equal(true)
  })

  it('storage prop should be required', () => {
    const vm = new Constructor({ propsData })
    expect(vm.$options.props.storage.required).to.equal(true)
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
