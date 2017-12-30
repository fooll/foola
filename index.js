const fs = require('fs');
const path = require('path');
const pl = require('pug-layout');

class Zinko {
  constructor(dirname, app) {
    this.dirname = dirname;
    this.app = app;
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
    var filePath = path.resolve(dirname, clientFolder, filename);
    res.download(filePath);
  }
}

module.exports = Zinko;