const { app } = require('electron')
const _ = require('lodash')
const Store = require('electron-store')
const path = require('path')
const os = require('os')

const isDev = (process.env.NODE_ENV === 'development')

const store = new Store({name: 'UtilAppConf'})

const getAppDataPath = () => {
  let pa = path.join(app.getPath('appData'), 'WUtilApp')
  if (isDev) {
    pa = path.join(os.tmpdir(), 'WUtilApp')
  }
  return pa
}
const DEFAULT_CONF = {
  userId: 'test',
  mainPath: getAppDataPath(),
  snippet: {
    storage: 'snippet'
  }
}

const init = () => {
  let config = store.get('config')
  if (config) {
    config = DEFAULT_CONF
    config = store.set('config', config)
    return
  }
  config = _.merge(DEFAULT_CONF, config)
  if (!_.isEqual(DEFAULT_CONF, config)) {
    store.set('config', config)
  }
}

const get = (option) => {
  let config = store.get('config')
  if (!config) {
    config = DEFAULT_CONF
  }
  if (typeof option === 'string') {
    const optionPath = option.split('->')
    let od = config[optionPath[0]]
    for (let i = 1; i < optionPath.length; i++) {
      od = od[optionPath[i]]
    }
    return od
  } else {
    return config
  }
}

const set = (cf) => {
  const curCf = get()
  const newCf = _.merge({}, DEFAULT_CONF, curCf, cf)
  store.set('config', newCf)
}

init()

export default{
  get,
  set
}
