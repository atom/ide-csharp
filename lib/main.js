const cp = require('child_process');
const {AutoBridge} = require('atom-languageclient');

class OmnisharpLanguageServer extends AutoBridge {
  getGrammarScopes() { return [ 'source.cs' ]; }
  getName() { return 'C# (OmniSharp)'; }

  startServerProcess() {
    return cp.spawn('node', [ require.resolve('omnisharp-client/languageserver/server') ]);
  }
}

module.exports = new OmnisharpLanguageServer();
