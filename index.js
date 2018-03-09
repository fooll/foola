const fs = require('fs');
const path = require('path');
const pl = require('pug-layout');

class Zinko {
  constructor(dirname, app) {
    this.dirname = dirname;
    this.app = app;
    this.viewsFolder = 'views';
    this.clientFolder = 'client';
  }

  v(viewName) {
    var viewsPath = path.resolve(this.dirname, this.viewsFolder);
    var viewsBases = fs.existsSync(viewsPath) ? fs.readdirSync(viewsPath) : [];
    var vBase = viewsBases.find(b => viewName == path.parse(b).name);
    var vPath = path.resolve(viewsPath, vBase);
    var vType = vBase.startsWith('L_') ? 'Layout' : 'Page';
    if (this.app.stopPugLayout) return fs.readFileSync(vPath, 'utf-8');
    return new pl[vType](vPath);
  }

  GET_file(req, res) {
    var dirname = this.dirname;
    var clientFolder = this.clientFolder;
    var filename = req.params.join('/');
    var filePath = path.resolve(dirname, clientFolder, filename);
    res.sendFile(filePath);
  }
}

module.exports = Zinko;