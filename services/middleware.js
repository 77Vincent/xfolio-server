const sessionsService = require('../routes/sessions/service')

module.exports = {
  authenticate: async (ctx, next) => {
    try {
      const { id, password } = ctx.request.body
      const token = sessionsService.getToken(ctx.request.headers.authorization)

      // Authenticate credentials
      const user = await sessionsService.auth(id, password, token)    

      // Users can only modify their own data
      // Or sign in as admin
      const isValid = user 
        && (String(ctx.params.id) === String(user.dataValues.id) || user.dataValues.role_id === 1)

      if (isValid) {
        ctx.state.user = user
        await next()
      } else {
        ctx.status = 401
        ctx.body = 'Protected resource, use Authorization header to get access\n'
      }
    } catch (err) {
      // When token is given but invalid
      if (err.message === 'invalid signature') {
        ctx.status = 403
        ctx.body = err.message
      } else {
        throw err
      }
    }
  }
}