module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  router.post('/admin/checkLogin', controller.admin.admin.checkLogin);
  router.get('/admin/getTypeInfo', adminauth, controller.admin.admin.getTypeInfo);
  router.post('/admin/putArticle', adminauth, controller.admin.admin.putArticle);
  router.post('/admin/updateArticle', adminauth, controller.admin.admin.updateArticle);
  router.get('/admin/getArticleList', adminauth, controller.admin.admin.getArticleList);
  router.get('/admin/delArticle/:id', adminauth, controller.admin.admin.delArticle);
  router.get('/admin/getArticleById/:id', adminauth, controller.admin.admin.getArticleById);
};
