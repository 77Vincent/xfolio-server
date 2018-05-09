const Router = require('koa-router')

const { Message } = require('../models')
const { General, Auth } = require('../services')
const c = require('../config')

const messages = Router()
const { authenticate } = Auth

/** 
 * @api {get} /api/messages Get all messages
 * @apiGroup Messages 
 * @apiParam (Query String) {integer} [sender_id] Filtered by the sender's user ID 
 * @apiParam (Query String) {integer} [recipient_id] Filtered by the recipient's user ID
 * @apiParam (Query String) {boolean=0,1} [read=0,1] Filtered by if the message is read 
 * @apiParam (Query String) {string} [content] Search by message content
 * @apiSuccess (200) {object[]} void Array contains all messages 
 * @apiError {string} 401 Protected resource, use Authorization header to get access
 */
messages.get('/', authenticate, async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)
    const filter = General.getFilter(qs, ['sender_id', 'recipient_id', 'read'])

    // Search
    if (qs.content) {
      filter.push({
        content: { $like: `%${decodeURI(qs.content)}%` }
      })
    }

    const data = await Message.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { $and: filter }
    })

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/messages Create a new message
 * @apiGroup Messages 
 * @apiParam {string} content Message content
 * @apiParam {integer} sender_id The sender's user ID 
 * @apiParam {integer} recipient_id The recipient's user ID
 * @apiParam {boolean} [read=0] If the message has been read or not
 * @apiSuccess (201) {object} void The newly created message
 * @apiError {string} 401 Protected resource, use Authorization header to get access
 */
messages.put('/', authenticate, async (ctx) => {
  try {
    const data = await Message.create(ctx.request.body)

    ctx.status = 201
    ctx.body = General.prettyJSON(data) 
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { messages }