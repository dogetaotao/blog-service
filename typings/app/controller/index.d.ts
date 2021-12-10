// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminAdmin = require('../../../app/controller/admin/admin');
import ExportDefaultHome = require('../../../app/controller/default/home');

declare module 'egg' {
  interface IController {
    admin: {
      admin: ExportAdminAdmin;
    }
    default: {
      home: ExportDefaultHome;
    }
  }
}
