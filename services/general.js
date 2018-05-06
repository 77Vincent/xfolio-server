const c = require('../config')
const R = require('ramda')

module.exports = {
  isObject: R.is(Object),
  isArray: R.is(Array),
  isNumber: R.is(Number),
  isString: R.is(String),
  msToDay(millisecond) {
    return Math.floor(millisecond / 1000 / 60 / 60) / 24
  },
  prettyJSON(json) {
    return JSON.stringify(json, null, 2)
  },

  /**
   * Parse url querystring and return requesting querystring values
   * @param {string} querystring - format: &key=value&key=value1,value2 
   * @returns {object} each key-value pair is according to the querystring
   */
  parseQuerystring(querystring = '') {
    if (!querystring) { return {} }
    const arr = querystring.split('&')
    let obj = {}
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].indexOf('=') === -1) { break }
      const pair = arr[i].split('=')
      obj[pair[0]] = pair[1]
    }
    return obj
  },

  checkRange(range = {}, input = {}) {
    let result = {}
    R.forEachObjIndexed((value, key) => {
      if (input[key] > value) {
        result[key] = `Field "${key}" should not be bigger than ${value}`
      }
    }, range)

    if (Object.keys(result).length) {
      return result
    } else {
      return false
    }
  },

  /**
   * Count offset for database query pagination
   * @param {number} [page=1] - page number, start = require(1
   * @param {number} [limit=50] - items to display per page 
   * @returns 
   */
  getOffset(page = 1, limit = 50) {
    page = this.getPositiveInt(page)
    return page ? ( page - 1 ) * limit : 0
  },

  /**
   * Return an positive integer 
   * @param {number} [input=1] input number
   * @returns {number} positive integer
   */
  getPositiveInt(input = 1) {
    return R.is(Number, input) ? Math.round(Math.abs(input)) : 1
  },

  /**
   * Create a sequelize specific object for its filter
   * @param {object} [object={}] - source normal object that needs to be converted
   * @param {array} [keys=[]] - array of values that the object's keys to be included
   * @returns {array} array contains objects in this format: [{key: value}, {key: value}]
   */
  getFilter(object = {}, keys = []) {
    let arr = []
    R.forEachObjIndexed((value, key) => {
      if (R.contains(key, keys)) {
        let query = decodeURI(value)
        // Do not filter with empty string
        if (query !== '') {
          arr.push({ [key]: query.split(',') })
        }
      }
    }, object)
    return arr
  },

  logError(ctx, err) {
    console.error(err)
    ctx.throw(500, err)
  },

  getDomain(custom = '') {
    return `${c.protocol}://${c.host}:${c.port}${custom}`
  }
}