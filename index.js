const fs = require('fs');
const path = require('path');
const pl = require('pug-layout');
const filer = require('fooll-filer');

class Foolla {
  constructor(dirname) {
    this.dirname = dirname;
    this.viewsFolder = 'views';
    this.clientFolder = 'client';
  }

  get views() {
    var views = {};
    var viewsFolderPath = path.resolve(this.dirname, this.viewsFolder);
    var viewsDirFiles = fs.readdirSync(viewsFolderPath);
    viewsDirFiles.forEach(function (viewBase) {
      var viewPath = path.resolve(viewsFolderPath, viewBase);
      var viewType = viewBase.startsWith('L_') ? 'Layout' : 'Page';
      var viewName = path.parse(viewBase).name;
      views[viewName] = new pl[viewType](viewPath);
    });
    return views;
  }

  GET_file() {
    var dirname = this.dirname;
    var clientFolder = this.clientFolder;
    var filename = req.params.join('/');
    req.filePath = path.resolve(dirname, clientFolder, filename);
    filer(req, res);
  }
}

module.exports = Foolla;
