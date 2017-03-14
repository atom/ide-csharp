const cp = require('child_process')
const {AutoLanguageClient} = require('atom-languageclient')

class OmnisharpLanguageServer extends AutoLanguageClient {
  getGrammarScopes () { return [ 'source.cs' ] }
  getLanguageName () { return 'C#' }
  getServerName () { return 'OmniSharp' }

  startServerProcess () {
    return cp.spawn('node', [ require.resolve('omnisharp-client/languageserver/server') ])
  }
}

module.exports = new OmnisharpLanguageServer()
