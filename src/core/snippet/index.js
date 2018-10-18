const sander = require('sander')
const path = require('path')

class SnippetApi {
  constructor (){
    this.filePath = path.join(__dirname, '/snippet.json');
  }
  async getSnippetConfig (){
    let blobText = await sander.readFile(this.filePath);
    let result = blobText.toString();
    return result;
  }
}
export const snippetApi = new SnippetApi();