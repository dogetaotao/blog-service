'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'API HI';
  }

  async getArticleList() {

    const sql = 'SELECT article.id as id ,' +
      'article.title as title ,' +
      'article.introduce as introduce ,' +
      "FROM_UNIXTIME(article.time , '%Y-%m-%d') as time ," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.id';
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

  async getArticleById() {

    const id = this.ctx.params.id;

    const sql = 'SELECT article.id as id ,' +
      'article.title as title ,' +
      'article.introduce as introduce ,' +
      'article.article_content as article_content ,' +
      "FROM_UNIXTIME(article.time , '%Y-%m-%d') as time ," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.id ' +
      'WHERE article.id=' + id;

    const result = await this.app.mysql.query(sql);

    this.ctx.body = { data: result };
  }

  // 获得类别分类
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }
  // 根据类别id获取文章列表
  async getListById() {

    const id = this.ctx.params.id;

    const sql = 'SELECT article.id as id ,' +
      'article.title as title ,' +
      'article.introduce as introduce ,' +
      "FROM_UNIXTIME(article.time , '%Y-%m-%d') as time ," +
      'article.view_count as view_count ,' +
      'article.type_id as type_id ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.id ' +
      'WHERE type_id=' + id;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }


}

module.exports = HomeController;
