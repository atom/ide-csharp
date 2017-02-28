const cp = require('child_process')
const {AutoBridge} = require('atom-languageclient')

class OmnisharpLanguageServer extends AutoBridge {
  constructor() {
    super()
    this.name = 'C# (OmniSharp)'
    this.grammarScopes = [ 'source.cs' ]
  }

  startServerProcess() {
    return cp.spawn('node', [ require.resolve('omnisharp-client/languageserver/server') ])
  }
}

module.exports = new OmnisharpLanguageServer()
