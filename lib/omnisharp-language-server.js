import * as cp from 'child_process';
import * as path from 'path';
import {AutoBridge} from 'atom-languageclient';

export default class OmnisharpLanguageServer extends AutoBridge {
  name = 'C# (OmniSharp)';
  grammarScopes = [ 'source.cs' ];

  async startServerProcess() {
    const command = 'node';
    const args = [ path.join(__dirname, '..', 'node_modules', 'omnisharp-client', 'languageserver', 'server') ];

    this._log(`${this.name} starting "${command} ${args.join(' ')}"`);
    return await cp.spawn(command, args);
  }
}
