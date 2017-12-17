const fs = require('fs');
const path = require('path');
const pl = require('pug-layout');
const filer = require('zinky-filer');

class Zinko {
  constructor(dirname, server) {
    this.dirname = dirname;
    this.server = server;
    this.viewsFolder = 'views';
    this.clientFolder = 'client';
    this.loadViews();
  }

  loadViews() {
    var views = {};
    var viewsPath = path.resolve(this.dirname, this.viewsFolder);
    var viewsBases = fs.existsSync(viewsPath) ? fs.readdirSync(viewsPath) : [];
    viewsBases.forEach(function(viewBase) {
      var viewPath = path.resolve(viewsPath, viewBase);
      var viewType = viewBase.startsWith('L_') ? 'Layout' : 'Page';
      var viewName = path.parse(viewBase).name;
      views[viewName] = new pl[viewType](viewPath);
    });
    this.views = views;
  }

  GET_file(req, res) {
    var dirname = this.dirname;
    var clientFolder = this.clientFolder;
    var filename = req.params.join('/');
    req.filePath = path.resolve(dirname, clientFolder, filename);
    filer(req, res);
  }
}

module.exports = Zinko;