const Sequelize = require('sequelize')

const R = require('ramda')
const { Op } = Sequelize

const is = (input) => {
  return Object.prototype.toString.call(input)
}

/**
 * This is a Class used for quick filtering and searching in sequelize
 * @class Filter
 * @param {Object} sourceObject The source input of filtering or searching, key is label, value is content
 * @return {Object} Plain object that can be directly used for sequelize query
 */
class Filter {
  constructor(sourceObject = {}) {
    this.sourceObject = sourceObject
  }

  alias(aliasList = {}) {
    if (is(aliasList) !== '[object Object]') {
      throw new Error('Input of alias should be an object')
    }

    for (let key in aliasList) {
      if (aliasList.hasOwnProperty(key)) {
        const alias = aliasList[key]

        // Remove the origin property 
        if (this.sourceObject[key]) {
          delete this.sourceObject[key]
        }

        // Add a new property using alias and give it origin value
        if (this.sourceObject[alias]) {
          this.sourceObject[key] = this.sourceObject[alias]
          delete this.sourceObject[alias]
        }
      }
    }

    return this
  }

  filterBy(...keys) {
    R.forEachObjIndexed((value, key) => {
      if (R.contains(key, [...keys])) {
        let query = decodeURI(value)
        // Do not filter with empty string
        if (query !== '') {
          this[key] = query.split(',')
        }
      }
    }, this.sourceObject)
    return this
  }

  searchBy(...keys) {
    const arr = []
    const searchBy = [...keys]
    const { search } = this.sourceObject

    searchBy.map((value) => {
      arr.push({ [value]: { [Op.like]: `%${decodeURI(search)}%` } })
    })
   
    if (search) {
      this[Op.or] = arr 
    }
    return this
  }

  done() {
    // Return plain object for sequelize
    let obj = {}
    R.forEachObjIndexed((value, key) => {
      obj[key] = value
    }, this)

    if (this[Op.or]) {
      obj[Op.or] = this[Op.or]
    }

    delete obj.sourceObject
    return obj
  }
}

module.exports = Filter