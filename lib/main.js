const {AutoLanguageClient} = require('atom-languageclient')

class CSharpLanguageClient extends AutoLanguageClient {
  getGrammarScopes () { return [ 'source.cs' ] }
  getLanguageName () { return 'C#' }
  getServerName () { return 'OmniSharp' }

  startServerProcess () {
    return base.spawnChildNode([ require.resolve('omnisharp-client/languageserver/server') ])
  }
}

module.exports = new CSharpLanguageClient()
