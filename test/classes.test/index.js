var assert = require('assert')

const data = require('./data')
const { login, request, modified, url } = require('../service')
const config = require('../../config')
const users = require('../users.test/data')
const userA = users[1].mobilephone
const userB = users[2].mobilephone
const password = '000000'
const toUpdate = {
  length: 99,
  date: new Date('1990/06/29'),
  finished: true
}

describe('Class', () => {
  it('Create by visitor should return 401', async () => {
    try {
      await request({
        method: 'PUT',
        url: `${url}/classes`,
        body: data[0]
      })
    } catch(err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create should return 201', async () => {
    for (let i = 0; i < data.length; i++) {
      const session = await login(userA, password)
      await request({
        method: 'PUT',
        url: `${url}/classes`,
        auth: { bearer: session.token },
        body: data[i]
      })
    }
    assert.ok(true)
  })

  it('Get all by visitor should return 401', async () => {
    try {
      await request({ url: `${url}/classes` })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Get all by user should return 200', async () => {
    try {
      const session = await login(config.adminID, config.adminPassword)
      await request({
        url: `${url}/classes`,
        auth: { bearer: session.token }
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })

  it('Update by visitor should return 401', async () => {
    try {
      await request({
        method: 'POST',
        url: `${url}/classes/2`,
        body: toUpdate
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Update by other user should return 403', async () => {
    try {
      const session = await login(userB, password)
      await request({
        method: 'POST',
        url: `${url}/classes/2`,
        body: toUpdate,
        auth: { bearer: session.token }
      })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Update with not satisfiable input should return 416', async () => {
    try {
      const session = await login(userA, password)
      await request({
        method: 'POST',
        url: `${url}/classes/2`,
        body: { length: 999 },
        auth: { bearer: session.token }
      })
    } catch (err) {
      assert.equal(err.statusCode, 416)
    }
  })

  it('Update by owner should return 200', async () => {
    try {
      const session = await login(userA, password)
      await request({
        method: 'POST',
        url: `${url}/classes/2`,
        body: toUpdate,
        auth: { bearer: session.token }
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })

  it('Delete by visitor should return 401', async () => {
    try {
      await request({
        method: 'DELETE',
        url: `${url}/classes/1`,
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Delete by other user should return 403', async () => {
    try {
      const session = await login(userB, password)
      await request({
        method: 'DELETE',
        url: `${url}/classes/1`,
        auth: { bearer: session.token }
      })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Delete by owner should return 200', async () => {
    try {
      const session = await login(userA, password)
      await request({
        method: 'DELETE',
        url: `${url}/classes/1`,
        auth: { bearer: session.token }
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})