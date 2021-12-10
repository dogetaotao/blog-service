'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {

  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = `SELECT userName FROM admins WHERE userName = '${userName}' AND password = '${password}'`;
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = { data: '登陆成功', openId };
    } else {
      this.ctx.body = { data: '登陆失败' };
    }
  }

  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = { data: resType };
  }
  async putArticle() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.insert('article', tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  async updateArticle() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  async getArticleList() {
    const sql = 'SELECT article.id as id ,' +
      'article.title as title ,' +
      'article.introduce as introduce ,' +
      "FROM_UNIXTIME(article.time , '%Y-%m-%d %H:%i:%s') as time ," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.id ' +
      'ORDER BY article.id DESC';
    console.log('收到了');
    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };
    console.log(resList);
  }

  async delArticle() {
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { id });
    this.ctx.body = { data: res };
  }

  async getArticleById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id ,' +
      'article.title as title ,' +
      'article.introduce as introduce ,' +
      'article.article_content as article_content ,' +
      "FROM_UNIXTIME(article.time , '%Y-%m-%d') as time ," +
      'type.typeName as typeName ,' +
      'type.id as type_id ' +
      'FROM article LEFT JOIN type ON article.type_id = type.id ' +
      'WHERE article.id =' + id;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}


module.exports = AdminController;
