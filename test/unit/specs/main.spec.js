import { mount, createLocalVue } from 'vue-test-utils'
import main from '../../../src/main'

describe('main.js', () => {
  const localVue = createLocalVue()
  localVue.use(main)
  let wrapper = null
  let App = null
  const titleClass = '.dialog-x-title'
  const messageClass = '.dialog-x-message'
  const btnClass = ".dialog-x-btn"
  const fieldClass = ".dialog-x-field"
  const itemBtnClass = ".dialog-x-action-item"
  let id = null
  beforeEach(() => {
    // 初始化wrapper
    wrapper = mount(localVue)
    id = new Date().getTime()
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
  })
  afterEach(() => {
    // 废弃wrapper
    wrapper = null
    App = null
  })
  it('为Vue原型链添加$dialog实例', () => {
    let localApp = new localVue()
    expect(('$dialog' in localApp)).toEqual(true)
  })
  it('检查$dialog实例是否包含预期的函数', () => {
    let localApp = new localVue()
    expect('confirm' in localApp.$dialog).toEqual(true)
    expect('alert' in localApp.$dialog).toEqual(true)
    expect('prompt' in localApp.$dialog).toEqual(true)
    expect('actions' in localApp.$dialog).toEqual(true)
    expect('dialog' in localApp.$dialog).toEqual(true)
  })
  it('alert参数是否预期', (done) => {
    App = new localVue()
    let titleText = 'titleText'
    let messageText = 'messageText'
    let testOkText = 'testOkText'
    App.$dialog.alert({
      title: titleText,
      message: messageText,
      okText: testOkText,
      id
    }).then((res) => {
      expect(App.$dialog.$root[id].show).toEqual(false)
      expect(res).toEqual(true)
      done()
    })
    setTimeout(() => {
      expect(App.$dialog.$root[id].$el.querySelector(titleClass).innerHTML).toEqual(titleText)
      expect(App.$dialog.$root[id].$el.querySelector(messageClass).innerHTML).toEqual(messageText)
      expect(App.$dialog.$root[id].$el.querySelector(btnClass).querySelector('a').innerHTML).toEqual(testOkText)
      expect(App.$dialog.$root[id].title).toEqual(titleText)
      expect(App.$dialog.$root[id].message).toEqual(messageText)
      expect(App.$dialog.$root[id].okText).toEqual(testOkText)
      expect(App.$dialog.$root[id].showCancel).toEqual(false)
      App.$dialog.$root[id].confirm()
    }, 200)
  })
  it('confirm参数是否预期', (done) => {
    App = new localVue()
    let cancelText = 'testCancelText'
    App.$dialog.confirm({
      id,
      cancelText
    }).catch(() => {
      expect(App.$dialog.$root[id].show).toEqual(false)
      done()
    })
    setTimeout(() => {
      expect(App.$dialog.$root[id].$el.querySelectorAll(btnClass).length).toEqual(2)
      expect(App.$dialog.$root[id].$el.querySelectorAll(btnClass)[1].innerHTML).toEqual(cancelText)
      App.$dialog.$root[id].cancel()
    }, 200)
  })
  it('prompt参数检查', (done) => {
    App = new localVue()
    let fieldText = 'test prompt 参数回调检查'
    App.$dialog.prompt({
      id
    })
      .then(res => {
        expect(App.$dialog.$root[id].show).toEqual(false)
        expect(res).toEqual(fieldText)
        done()
      })
    setTimeout(() => {
      expect(App.$dialog.$root[id].showField).toEqual(true)
      expect(App.$dialog.$root[id].$el.querySelectorAll(fieldClass).length).toEqual(1)
      App.$dialog.$root[id].fieldMessage = fieldText
      expect(App.$dialog.$root[id].fieldMessage).toEqual(fieldText)
      App.$dialog.$root[id].confirm()
    }, 200)
  })
  it('actions 参数检查', (done) => {
    App = new localVue()
    let actionList = [
      {
        okText: '操作1'
      },
      {
        okText: '操作2'
      },
      {
        okText: '操作3'
      },
      {
        okText: '操作4'
      }
    ]
    const expectClickBtnIdx = 3
    App.$dialog.actions({
      actions: actionList,
      id
    }).then((res) => {
      expect(res).toEqual(expectClickBtnIdx)
      done()
    })
    setTimeout(() => {
      expect(App.$dialog.$root[id].showActions).toEqual(true)
      expect(App.$dialog.$root[id].actions.length).toEqual(actionList.length)
      expect(App.$dialog.$root[id].$el.querySelectorAll(itemBtnClass).length).toEqual(actionList.length)
      expect(App.$dialog.$root[id].$el.querySelectorAll(itemBtnClass)[expectClickBtnIdx].querySelector('a').innerHTML).toEqual(actionList[expectClickBtnIdx].okText)
      App.$dialog.$root[id].$el.querySelectorAll(itemBtnClass)[expectClickBtnIdx].click()
    }, 200)
  })
  it('dialog 参数检查', (done) => {
    App = new localVue()
    let testId = 'testId'
    let testText = '123231大苏打伟大'
    let testHtml = `<div id=${testId}>${testText}</div>`
    App.$dialog.dialog({
      html: testHtml,
      id
    })
    setTimeout(() => {
      expect(App.$dialog.$root[id].$el.querySelector(`#${testId}`).innerHTML).toEqual(testText)
      done()
    }, 200)
  })
  it('异步关闭', (done) => {
    let a = 4
    let b = 5
    let wait = next => {
      setTimeout(() => {
        b = a
        next()
      }, 700)
    }
    App = new localVue()
    App.$dialog.confirm({
      wait,
      id
    }).then(() => {
      expect(b).toEqual(a)
      expect(App.$dialog.$root[id].loading).toEqual(false)
      done()
    })
    App.$dialog.$root[id].confirm()
    expect(App.$dialog.$root[id].loading).toEqual(true)
  })
  it('validationFieldMessageLegal', () => {
    App = new localVue()
    App.$dialog.prompt({
      id
    })
    expect(App.$dialog.$root[id].validationFieldMessageLegal()).toEqual(true)
    let newApp = new localVue()
    let fieldMessageTestReturnMessage = '测试返回数据'
    newApp.$dialog.prompt({
      fieldMessageTest: () => fieldMessageTestReturnMessage,
      id
    })
    expect(newApp.$dialog.$root[id].validationFieldMessageLegal()).toEqual(fieldMessageTestReturnMessage)
  })
  it('callBackFn', (done) => {
    App = new localVue()
    App.$dialog.prompt({
      id
    })
    let num = 3
    let newnumber = 12
    App.$dialog.$root[id].resolve = (param) => {num = param}
    setTimeout(() => {
      expect(App.$dialog.$root[id].loading).toEqual(false)
      expect(App.$dialog.$root[id].show).toEqual(true)
      App.$dialog.$root[id].callBackFn(newnumber)
      expect(App.$dialog.$root[id].loading).toEqual(false)
      expect(App.$dialog.$root[id].show).toEqual(false)
      expect(num).toEqual(newnumber)
      done()
    }, 500)
  })
  it('cancel', (done) => {
    App = new localVue()
    App.$dialog.prompt({
      id
    })
    let num = 3
    let newnumber = 12
    App.$dialog.prompt({
      id
    })
    App.$dialog.$root[id].reject = () => num = newnumber
    setTimeout(() => {
      expect(App.$dialog.$root[id].show).toEqual(true)
      App.$dialog.$root[id].cancel()
      expect(App.$dialog.$root[id].show).toEqual(false)
      expect(num).toEqual(newnumber)
      done()
    }, 500)
  })
  it('mountIfNotMounted', () => {
    let VueDialogX = new main.VueDialogX(localVue)
    let id = 888888
    let _id = VueDialogX.mountIfNotMounted(id)
    expect(_id).toEqual(id)
    expect(_id in VueDialogX.$root).toEqual(true)
    VueDialogX.$root[id].$emit('confirm')
    expect(_id in VueDialogX.$root).toEqual(false)
  })
})