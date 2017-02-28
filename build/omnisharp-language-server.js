'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _child_process = require('child_process');

var cp = _interopRequireWildcard(_child_process);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _atomLanguageclient = require('atom-languageclient');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let OmnisharpLanguageServer = class OmnisharpLanguageServer {
  constructor() {
    this._pathMatch = /^.+\.cs$/;
    this.name = 'C# (OmniSharp)';
    this.grammarScopes = ['source.cs'];
  }

  activate() {
    this.startServer();
  }

  startServer() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (_this._server != null) return;

      const command = 'node';
      const serverHome = path.join(__dirname, '..', 'node_modules', 'omnisharp-client', 'languageserver', 'server');
      const args = [serverHome];

      console.log(`${_this.name} starting "${command} ${args.join(' ')}"`);
      _this._process = cp.spawn(command, args);
      _this._server = new _atomLanguageclient.RunningServerV2(_this.name, _this._process);
      yield _this._server.start(_this._getInitializeParams());
    })();
  }

  deactivate() {
    this.stopServer();
  }

  stopServer() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (_this2._server == null) return;

      console.log(`${_this2.name} stopping`);
      yield _this2._server.shutdown();
      _this2._server = null;
      _this2._process.kill();
    })();
  }

  provideOutlines() {
    return {
      name: this.name,
      grammarScopes: this.grammarScopes,
      priority: 1,
      getOutline: this.getOutline.bind(this)
    };
  }

  getOutline(editor) {
    return this._server && this._server.symbolProvider ? this._server.symbolProvider.getOutline(editor) : Promise.resolve(null);
  }

  provideLinter() {
    return {
      name: this.name,
      grammarScopes: this.grammarScopes,
      scope: 'project',
      lintOnFly: true,
      lint: this.provideLinting.bind(this)
    };
  }

  provideLinting(editor) {
    return this._server && this._server.linter ? this._server.linter.provideDiagnostics() : Promise.resolve([]);
  }

  provideAutocomplete() {
    return {
      selector: '.source',
      excludeLowerPriority: false,
      getSuggestions: this.provideSuggestions.bind(this)
    };
  }

  provideSuggestions(request) {
    return this._server && this._server.autoComplete ? this._server.autoComplete.provideSuggestions(request) : Promise.resolve([]);
  }

  _getInitializeParams() {
    const rootDirs = atom.project.getDirectories();

    return {
      processId: process.pid,
      capabilities: {},
      rootPath: rootDirs.length > 0 ? rootDirs[0].path : null
    };
  }
};
exports.default = OmnisharpLanguageServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9vbW5pc2hhcnAtbGFuZ3VhZ2Utc2VydmVyLmpzIl0sIm5hbWVzIjpbImNwIiwiZnMiLCJwYXRoIiwiT21uaXNoYXJwTGFuZ3VhZ2VTZXJ2ZXIiLCJfcGF0aE1hdGNoIiwibmFtZSIsImdyYW1tYXJTY29wZXMiLCJhY3RpdmF0ZSIsInN0YXJ0U2VydmVyIiwiX3NlcnZlciIsImNvbW1hbmQiLCJzZXJ2ZXJIb21lIiwiam9pbiIsIl9fZGlybmFtZSIsImFyZ3MiLCJjb25zb2xlIiwibG9nIiwiX3Byb2Nlc3MiLCJzcGF3biIsInN0YXJ0IiwiX2dldEluaXRpYWxpemVQYXJhbXMiLCJkZWFjdGl2YXRlIiwic3RvcFNlcnZlciIsInNodXRkb3duIiwia2lsbCIsInByb3ZpZGVPdXRsaW5lcyIsInByaW9yaXR5IiwiZ2V0T3V0bGluZSIsImJpbmQiLCJlZGl0b3IiLCJzeW1ib2xQcm92aWRlciIsIlByb21pc2UiLCJyZXNvbHZlIiwicHJvdmlkZUxpbnRlciIsInNjb3BlIiwibGludE9uRmx5IiwibGludCIsInByb3ZpZGVMaW50aW5nIiwibGludGVyIiwicHJvdmlkZURpYWdub3N0aWNzIiwicHJvdmlkZUF1dG9jb21wbGV0ZSIsInNlbGVjdG9yIiwiZXhjbHVkZUxvd2VyUHJpb3JpdHkiLCJnZXRTdWdnZXN0aW9ucyIsInByb3ZpZGVTdWdnZXN0aW9ucyIsInJlcXVlc3QiLCJhdXRvQ29tcGxldGUiLCJyb290RGlycyIsImF0b20iLCJwcm9qZWN0IiwiZ2V0RGlyZWN0b3JpZXMiLCJwcm9jZXNzSWQiLCJwcm9jZXNzIiwicGlkIiwiY2FwYWJpbGl0aWVzIiwicm9vdFBhdGgiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7SUFBWUEsRTs7QUFDWjs7SUFBWUMsRTs7QUFDWjs7SUFBWUMsSTs7QUFFWjs7Ozs7O0lBR3FCQyx1QixHQUFOLE1BQU1BLHVCQUFOLENBQThCO0FBQUE7QUFBQSxTQUczQ0MsVUFIMkMsR0FHdEIsVUFIc0I7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QkFBMUIsQ0FBNkNDLE9BQTdDLENBQTVDLEdBQW9HZCxRQUFRQyxPQUFSLENBQWdCLEVBQWhCLENBQTNHO0FBQ0Q7O0FBRURaLHlCQUE0QztBQUMxQyxVQUFNMkIsV0FBdUJDLEtBQUtDLE9BQUwsQ0FBYUMsY0FBYixFQUE3Qjs7QUFFQSxXQUFPO0FBQ0xDLGlCQUFXQyxRQUFRQyxHQURkO0FBRUxDLG9CQUFjLEVBRlQ7QUFHTEMsZ0JBQVVSLFNBQVNTLE1BQVQsR0FBa0IsQ0FBbEIsR0FBc0JULFNBQVMsQ0FBVCxFQUFZN0MsSUFBbEMsR0FBeUM7QUFIOUMsS0FBUDtBQUtEO0FBckYwQyxDO2tCQUF4QkMsdUIiLCJmaWxlIjoib21uaXNoYXJwLWxhbmd1YWdlLXNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XHJcblxyXG5pbXBvcnQgKiBhcyBjcCBmcm9tICdjaGlsZF9wcm9jZXNzJztcclxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuaW1wb3J0IHtMYW5ndWFnZUNsaWVudFYyIGFzIGxzfSBmcm9tICdhdG9tLWxhbmd1YWdlY2xpZW50JztcclxuaW1wb3J0IHtSdW5uaW5nU2VydmVyVjJ9IGZyb20gJ2F0b20tbGFuZ3VhZ2VjbGllbnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT21uaXNoYXJwTGFuZ3VhZ2VTZXJ2ZXIge1xyXG4gIF9wcm9jZXNzOiBjaGlsZF9wcm9jZXNzJENoaWxkUHJvY2VzcztcclxuICBfc2VydmVyOiBSdW5uaW5nU2VydmVyVjI7XHJcbiAgX3BhdGhNYXRjaDogUmVnRXhwID0gL14uK1xcLmNzJC87XHJcblxyXG4gIG5hbWU6IHN0cmluZyA9ICdDIyAoT21uaVNoYXJwKSc7XHJcbiAgZ3JhbW1hclNjb3BlcyA9IFsnc291cmNlLmNzJ107XHJcblxyXG4gIGFjdGl2YXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zdGFydFNlcnZlcigpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgc3RhcnRTZXJ2ZXIoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBpZiAodGhpcy5fc2VydmVyICE9IG51bGwpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBjb21tYW5kID0gJ25vZGUnO1xyXG4gICAgY29uc3Qgc2VydmVySG9tZTogc3RyaW5nID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ25vZGVfbW9kdWxlcycsICdvbW5pc2hhcnAtY2xpZW50JywgJ2xhbmd1YWdlc2VydmVyJywgJ3NlcnZlcicpO1xyXG4gICAgY29uc3QgYXJncyA9IFtzZXJ2ZXJIb21lXTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhgJHt0aGlzLm5hbWV9IHN0YXJ0aW5nIFwiJHtjb21tYW5kfSAke2FyZ3Muam9pbignICcpfVwiYCk7XHJcbiAgICB0aGlzLl9wcm9jZXNzID0gY3Auc3Bhd24oY29tbWFuZCwgYXJncyk7XHJcbiAgICB0aGlzLl9zZXJ2ZXIgPSBuZXcgUnVubmluZ1NlcnZlclYyKHRoaXMubmFtZSwgdGhpcy5fcHJvY2Vzcyk7XHJcbiAgICBhd2FpdCB0aGlzLl9zZXJ2ZXIuc3RhcnQodGhpcy5fZ2V0SW5pdGlhbGl6ZVBhcmFtcygpKTtcclxuICB9XHJcblxyXG4gIGRlYWN0aXZhdGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0b3BTZXJ2ZXIoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHN0b3BTZXJ2ZXIoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBpZiAodGhpcy5fc2VydmVyID09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhgJHt0aGlzLm5hbWV9IHN0b3BwaW5nYCk7XHJcbiAgICBhd2FpdCB0aGlzLl9zZXJ2ZXIuc2h1dGRvd24oKTtcclxuICAgIHRoaXMuX3NlcnZlciA9IG51bGw7XHJcbiAgICB0aGlzLl9wcm9jZXNzLmtpbGwoKTtcclxuICB9XHJcblxyXG4gIHByb3ZpZGVPdXRsaW5lcygpOiBudWNsaWRlJE91dGxpbmVQcm92aWRlciB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgIGdyYW1tYXJTY29wZXM6IHRoaXMuZ3JhbW1hclNjb3BlcyxcclxuICAgICAgcHJpb3JpdHk6IDEsXHJcbiAgICAgIGdldE91dGxpbmU6IHRoaXMuZ2V0T3V0bGluZS5iaW5kKHRoaXMpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRPdXRsaW5lKGVkaXRvcjogYXRvbSRUZXh0RWRpdG9yKTogUHJvbWlzZTw/bnVjbGlkZSRPdXRsaW5lPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VydmVyICYmIHRoaXMuX3NlcnZlci5zeW1ib2xQcm92aWRlciA/IHRoaXMuX3NlcnZlci5zeW1ib2xQcm92aWRlci5nZXRPdXRsaW5lKGVkaXRvcikgOiBQcm9taXNlLnJlc29sdmUobnVsbCk7XHJcbiAgfVxyXG5cclxuICBwcm92aWRlTGludGVyKCk6IGxpbnRlciRTdGFuZGFyZExpbnRlciB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgIGdyYW1tYXJTY29wZXM6IHRoaXMuZ3JhbW1hclNjb3BlcyxcclxuICAgICAgc2NvcGU6ICdwcm9qZWN0JyxcclxuICAgICAgbGludE9uRmx5OiB0cnVlLFxyXG4gICAgICBsaW50OiB0aGlzLnByb3ZpZGVMaW50aW5nLmJpbmQodGhpcyksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJvdmlkZUxpbnRpbmcoZWRpdG9yOiBhdG9tJFRleHRFZGl0b3IpOiA/QXJyYXk8bGludGVyJE1lc3NhZ2U+IHwgUHJvbWlzZTw/QXJyYXk8bGludGVyJE1lc3NhZ2U+PiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VydmVyICYmIHRoaXMuX3NlcnZlci5saW50ZXIgPyB0aGlzLl9zZXJ2ZXIubGludGVyLnByb3ZpZGVEaWFnbm9zdGljcygpIDogUHJvbWlzZS5yZXNvbHZlKFtdKTtcclxuICB9XHJcblxyXG4gIHByb3ZpZGVBdXRvY29tcGxldGUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzZWxlY3RvcjogJy5zb3VyY2UnLFxyXG4gICAgICBleGNsdWRlTG93ZXJQcmlvcml0eTogZmFsc2UsXHJcbiAgICAgIGdldFN1Z2dlc3Rpb25zOiB0aGlzLnByb3ZpZGVTdWdnZXN0aW9ucy5iaW5kKHRoaXMpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByb3ZpZGVTdWdnZXN0aW9ucyhyZXF1ZXN0OiBhbnkpOiBQcm9taXNlPEFycmF5PGF0b20kQXV0b2NvbXBsZXRlU3VnZ2VzdGlvbj4+IHtcclxuICAgIHJldHVybiB0aGlzLl9zZXJ2ZXIgJiYgdGhpcy5fc2VydmVyLmF1dG9Db21wbGV0ZSA/IHRoaXMuX3NlcnZlci5hdXRvQ29tcGxldGUucHJvdmlkZVN1Z2dlc3Rpb25zKHJlcXVlc3QpIDogUHJvbWlzZS5yZXNvbHZlKFtdKTtcclxuICB9XHJcblxyXG4gIF9nZXRJbml0aWFsaXplUGFyYW1zKCk6IGxzLkluaXRpYWxpemVQYXJhbXMge1xyXG4gICAgY29uc3Qgcm9vdERpcnM6IEFycmF5PGFueT4gPSBhdG9tLnByb2plY3QuZ2V0RGlyZWN0b3JpZXMoKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBwcm9jZXNzSWQ6IHByb2Nlc3MucGlkLFxyXG4gICAgICBjYXBhYmlsaXRpZXM6IHsgfSxcclxuICAgICAgcm9vdFBhdGg6IHJvb3REaXJzLmxlbmd0aCA+IDAgPyByb290RGlyc1swXS5wYXRoIDogbnVsbFxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=