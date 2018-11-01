const fs = require('fs')
const _ = require('lodash')
const path = require('path')
const util = require('util')
const { CM } = require('../app/app_store').default

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

class SnippetApi {
  constructor () {
    this.initFilePath = path.join(__dirname, '/snippet.json')
    this.snippetFile = path.join(CM.get('mainPath'), CM.get('snippet->storage') + '.json')
    this._init()
  }
  /**
   * snippet初始化
   *   判断是否存在snippet文件
   *     如果存在则不做任何处理
   *     如果不存在则新建一个初始文件，初始文件内容。初始文件配置保存在snippet.json
   * @return {[type]} [description]
   */
  async _init () {
    if (!fs.existsSync(this.snippetFile)) {
      let initJson = await readFile(this.initFilePath, {encoding: 'utf8'})
      writeFile(this.snippetFile, initJson, {encoding: 'utf8'})
    }
  }
  /**
   * 获取sninppet的相关配置，包括：
   *   languages 编程语言分类
   *   tags 代码片段标签
   *   files 代码片段列表
   * @return {Object}
   */
  async getSnippetConfig () {
    let fileText = await readFile(this.snippetFile, { encoding: 'utf8'})
    let languages = []
    let tags = []
    let files = []
    if (fileText) {
      let fileObj = JSON.parse(fileText)
      languages = this.languages = fileObj.languages
      tags = this.tags = fileObj.tags
      files = this.files = fileObj.files
    }
    return {
      languages,
      tags,
      files
    }
  }

  async createSnippet (data) {
    const tags = data.tag;
    const language = data.language;
    this.tags.forEach((tag, index) => {
      let i = -1;
      tags.some((value, ind) => {
         if(tag.name.toLowerCase() === value.toLowerCase()){
          i = ind;
          return true;
         }
         return false;
      });
      (i !== -1) && (this.tags[i].count += 1);
    });

    this.languages.forEach((la, index) => {
      if(la.name.toLowerCase() === language.toLowerCase()){
        la.count += 1;
      }
    });
    data.createdAt = Date.parse(new Date());
    data.updateAt = Date.parse(new Date());
    data.used = 0;
    this.files.unshift(data);

    var text = {
      languages: this.languages,
      tags: this.tags,
      files: this.files
    }
    try{
      await writeFile(this.snippetFile, JSON.stringify(text), {encoding: 'utf8'});
      return text;
    }catch (err){
      return err;
    }
  }

  async delSnippet (code){
    if(!this.files[code]){
      return false;
    }
    this.files.splice(code, 1);

    var text = {
      languages: this.languages,
      tags: this.tags,
      files: this.files
    }
    
    try{
      await writeFile(this.snippetFile, JSON.stringify(text), {encoding: 'utf8'});
      return text;
    }catch(err){
      return err;
    }
  }
}
export const snippetApi = new SnippetApi()
