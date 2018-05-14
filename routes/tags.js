const Router = require('koa-router')

const { Tag } = require('../models')
const { General, Auth } = require('../services')

const tags = Router()
const { protect } = Auth

/** 
 * @api {get} /api/tags/ Get all tags
 * @apiGroup Tags
 * @apiSuccess (200) {object[]} void Array contains all tags
 */
tags.get('/', async (ctx) => {
  try {
    const data = await Tag.findAll()

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/tags/ Create a tag
 * @apiGroup Tags
 * @apiParam {string} content Content of the tag
 * @apiParam {integer} user_id The creator's user ID
 * @apiSuccess (201) {object} void The created tag
 * @apiError {string} 401 Protected resource, use Authorization header to get access
 */
tags.put('/', protect, async (ctx) => {
  try {
    const data = await Tag.create(ctx.request.body)

    ctx.body = General.prettyJSON(data)
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {post} /api/tags/ Update a tag
 * @apiGroup Tags
 * @apiParam {string} content Content of the tag
 * @apiSuccess (200) {object} void The Updated tag
 * @apiError {string} 401 Protected resource, use Authorization header to get access
 */
tags.post('/:id', protect, async (ctx) => {
  try {
    let data = await Tag.findOne({ where: { id: ctx.params.id } })
    if (data) {
      if (data.dataValues.user_id === ctx.state.current_user_id) {
        data = await data.update(ctx.request.body)
        ctx.status = 200
        ctx.body = General.prettyJSON(data)
      } else {
        ctx.status = 403
      }
    }
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {delete} /api/tags/:id Delete a tag
 * @apiGroup Tags
 * @apiSuccess (200) {void} void void
 * @apiError {string} 401 Protected resource, use Authorization header to get access
 */
tags.delete('/:id', protect, async (ctx) => {
  try {
    await Tag.destroy({ 
      where: { id: ctx.params.id }
    })
    ctx.status = 200
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { tags }