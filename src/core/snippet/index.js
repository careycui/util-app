const sander = require('sander')
const _ = require('lodash')
const path = require('path')
const { CM } = require('../app/app_store').default

class SnippetApi {
  constructor (){
    this.initFilePath = path.join(__dirname, '/snippet.json');
    this.snippetFile = CM.get('mainPath') + CM.get('snippet->storage') + '.json';
    this._init();
  }
  /**
   * snippet初始化
   *   判断是否存在snippet文件
   *     如果存在则不做任何处理
   *     如果不存在则新建一个初始文件，初始文件内容。初始文件配置保存在snippet.json
   * @return {[type]} [description]
   */
  async _init (){
    if(!sander.existsSync(this.snippetFile)){
      let initJson = await sander.readFile(this.initFilePath, {encoding: 'utf8'})
      sander.writeFile(this.snippetFile, initJson, {encoding: 'utf8'});
    }
  }
  /**
   * 获取sninppet的相关配置，包括：
   *   languages 编程语言分类
   *   tags 代码片段标签
   *   files 代码片段列表
   * @return {Object}
   */
  async getSnippetConfig (){
    let fileText =  await sander.readFile(this.snippetFile, { encoding: 'utf8'});
    let languages = [];
    let tags = [];
    let files = [];
    if(fileText){
      let fileObj = JSON.parse(fileText);
      languages = fileObj.languages;
      tags = fileObj.tags;
      files = fileObj.files;
    }
    return {
      languages,
      tags,
      files
    }
  }
}
export const snippetApi = new SnippetApi();