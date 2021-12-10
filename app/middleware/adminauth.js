module.exports = options => {
  return async function adminauth(ctx, next) {
    console.log(ctx.session);
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = { check: '没有登录' };
    }
  };
};
