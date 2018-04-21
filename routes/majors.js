import Router from 'koa-router'

import c from '../config'
import { Major } from '../models'
import { fn } from '../utils'

export const majors = Router()

majors.get('/', async (ctx) => {
  try {
    const qs = fn.parseQuerystring(ctx.request.querystring)
    const data = await Major.findAll({
      limit: c.queryLimit,
      offset: fn.getOffset(fn.getPositiveInt(qs.page), c.queryLimit),
    })

    ctx.status = 200
    ctx.body = fn.prettyJSON(data) 
  } catch (err) {
    ctx.throw(500, err)
  }
})