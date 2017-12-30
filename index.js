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
    viewsBases.forEach(vBase => {
      var vPath = path.resolve(viewsPath, vBase);
      var vType = vBase.startsWith('L_') ? 'Layout' : 'Page';
      var vName = path.parse(vBase).name;
      if (this.app.stopPugLayout) views[vName] = fs.readFileSync(vPath, 'utf-8');
      else views[vName] = new pl[vType](vPath);
    });
    this.views = views;
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