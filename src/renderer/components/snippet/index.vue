<template>
  <el-container>
    <el-aside width="200px">
      <div class="back-home">
        <el-button type="text" icon="el-icon-back" class="block-btn" @click="$router.push('/menu')"></el-button>
      </div>
      <div class="languages">
        <h4 class="menu-title">
          语言类别
          <el-button type="text" icon="el-icon-plus" size="mini" @click="addLanguage" v-if="languages.length<20"></el-button>
        </h4>
        <ul class="num-menus">
          <li class="num-menus__item" v-for="(la, index) in languages" :key="index">
            <span v-text="la.name"></span>
            <span class="num-menus__count" v-text="la.count"></span>
          </li>
        </ul>
      </div>
      <div class="tags">
        <h4 class="menu-title">
          标签
          <el-button type="text" icon="el-icon-plus" size="mini" @click="addTag" v-if="tags.length<20"></el-button>
        </h4>
        <ul class="num-menus">
          <li class="num-menus__item" v-for="(tag, index) in tags" :key="index">
            <span v-text="tag.name"></span>
            <span class="num-menus__count" v-text="tag.count"></span>
          </li>
        </ul>
      </div>
    </el-aside>
    <el-main style="background-color: #f1f1f1;">
      <el-row>
        <el-col style="text-align: center;">
          <div class="search-box">
            <el-input
              class="re-br"
              size="small"
              placeholder="请输入标题关键字"
              prefix-icon="el-icon-search"
              @keyup.enter.native="searchFn"
              v-model="q">
            </el-input>
          </div>
          <div class="add-btn">
            <el-button type="primary" icon="el-icon-plus" round size="small" @click="dialogVisible=true">新建</el-button>
          </div>
        </el-col>
        <el-col>
          <div class="code-container" v-if="files.length > 0">
            <code-card
              v-for="(file, index) in files"
              :key="index"
              :code="index"
              :ref="'code'+index"
              @changeActive="changeActive"
              @deleteFn="delFn"
              @editFn="editFn"
              @copySnippet="copySnippet"
              :file="file">
            </code-card>
          </div>
          <div class="code-container" v-else>
            <h4 style="text-align:center;">还没有添加代码片段</h4>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-dialog
      title="新建"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :show-close="false"
      width="60%">
        <el-form
          label-position="left"
          :model="snippetForm"
          size="mini"
          label-width="100px">
          <el-form-item label="名称">
            <el-input v-model="snippetForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="编程语言">
            <el-select v-model="snippetForm.language" placeholder="请选择">
              <el-option
                v-for="(item,index) in languages"
                :key="index"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签">
              <el-tag
                :key="index"
                size="mini"
                v-for="(tag, index) in snippetForm.tag"
                style="margin:0 5px;"
                type="info">
                {{tag}}
              </el-tag>
            <el-button type="plain" icon="el-icon-plus" @click="tagVisible=true"></el-button>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="snippetForm.desc" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Code">
            <codemirror v-model="snippetForm.value" :options="codeOptions"></codemirror>
          </el-form-item>
        </el-form>
        <el-dialog
          title="标签"
          :visible.sync="tagVisible"
          :append-to-body="true"
          :close-on-click-modal="false"
          :show-close="false"
          width="40%">
            <el-col>
              <el-checkbox-group v-model="snippetForm.tag">
                <el-checkbox
                  v-for="(tag,index) in tags"
                  :key="index"
                  :label="tag.name"
                  border
                  size="mini">
                </el-checkbox>
              </el-checkbox-group>
            </el-col>
            <div slot="footer" class="dialog-footer">
              <el-button @click="tagVisible = false" size="small">关闭</el-button>
            </div>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog" size="small">取 消</el-button>
          <el-button type="primary" @click="create" size="small">确定</el-button>
        </div>
    </el-dialog>
  </el-container>
</template>
<script>
import { Message, MessageBox } from 'element-ui'
import CodeCard from './code_card'
import { remote, clipboard } from 'electron'
const sapi = remote.app.snippetApi

export default{
  name: 'snippet',
  components: {
    CodeCard
  },
  data () {
    return {
      q: '',
      languages: [],
      tags: [],
      files: [],
      dialogVisible: false,
      codeOptions: {
        tabSize: 4,
        lineNumbers: true, // 显示行数
        indentUnit: 4, // 缩进单位为4
        styleActiveLine: true, // 当前行背景高亮
        matchBrackets: true, // 括号匹配
        lineWrapping: true, // 自动换行
        line: true,
        mode: 'text/javascript',
        theme: 'monokai'
      },
      snippetForm: {
        code: '',
        name: '',
        language: '',
        tag: [],
        desc: '',
        value: ''
      },
      tagVisible: false
    }
  },
  methods: {
    changeActive (obj) {
      const refs = this.$refs
      Object.keys(this.$refs).forEach((code, index) => {
        if (code.indexOf('code') > -1 && code !== 'code' + obj.code && obj.isMore) {
          refs[code][0].setMore(!obj.isMore)
        }
      })
    },
    closeDialog (){
      this.snippetForm = {
        code: '',
        name: '',
        language: '',
        tag: [],
        desc: '',
        value: ''
      };
      this.dialogVisible = false;
      this.isEdit = false;
    },
    addLanguage (){
      var _this = this;
      this.$prompt('输入新的编程语言', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\w+$/,
        inputErrorMessage: '不可为空'
      }).then(({ value }) => {
        sapi.addLanguage(value).then((result) => {
          if(result.status){
            _this.languages = result.data.languages;
          }
        }).catch((err) => {
          Message({
            showClose: true,
            message: '保存失败',
            type: 'error'
          })
        })
      }).catch(() => {
      });
    },
    addTag (){
      var _this = this;
      this.$prompt('输入新的标签', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\w+$/,
        inputErrorMessage: '不可为空'
      }).then(({ value }) => {
        sapi.addTag(value).then((result) => {
          if(result.status){
            _this.tags = result.data.tags;
          }
        }).catch((err) => {
          Message({
            showClose: true,
            message: '保存失败',
            type: 'error'
          })
        })
      }).catch(() => {
      });
    },
    create () {
      var _this = this;
      if(this.snippetForm.code || this.snippetForm.code == 0){
        sapi.updateSnippet(this.snippetForm).then((result) => {
          if(result.status){
            let data = result.data;
            _this.files = data.files;
            _this.dialogVisible = false;
            _this.snippetForm = {
              code: '',
              name: '',
              language: '',
              tag: [],
              desc: '',
              value: ''
            };

          }else{
            Message({
              showClose: true,
              message: '更新失败',
              type: 'error'
            });
          }
        }).catch((err) => {
          Message({
            showClose: true,
            message: '更新失败',
            type: 'error'
          });
        })
      }else{
        sapi.createSnippet(this.snippetForm).then((result) => {
          if(result.status){
            let data = result.data
            _this.languages = data.languages
            _this.tags = data.tags
            _this.files = data.files
            _this.dialogVisible = false
            _this.snippetForm = {
              code: '',
              name: '',
              language: '',
              tag: [],
              desc: '',
              value: ''
            }

          }else{
            Message({
              showClose: true,
              message: '保存失败',
              type: 'error'
            })
          }
        }).catch((err) => {
          Message({
            showClose: true,
            message: '保存失败',
            type: 'error'
          })
        })
      }
    },
    delFn (code) {
      var _this = this
      MessageBox.confirm('此操作将永久删除该片段，确认删除该片段吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sapi.delSnippet(code).then((result) => {
          if(result.status){
            let data = result.data
            _this.languages = data.languages
            _this.tags = data.tags
            _this.files = data.files
          }else{
            Message({
              showClose: true,
              message: '操作失败',
              type: 'error'
            })
          }
        }).catch((err) => {
          Message({
            showClose: true,
            message: '操作失败',
            type: 'error'
          })
        })
      }).catch((err) => {
      })
    },
    editFn (code){
      let file = this.files[code];
      if(!file){
        return;
      }
      this.snippetForm.name = file.name;
      this.snippetForm.language = file.language;
      this.snippetForm.tag = file.tag;
      this.snippetForm.desc = file.desc;
      this.snippetForm.value = file.value;
      this.snippetForm.code = code;
      this.dialogVisible = true;
    },
    searchFn (){
      let _this = this;
      sapi.findByQ(this.q).then((result) => {
        if(result.status){
          _this.files = result.data;
        }
      }).catch((err) => {
        Message({
          showClose: true,
          message: '查询失败',
          type: 'error'
        })
      });
    },
    copySnippet (code){
      let file = this.files[code];
      clipboard.writeText(file.value);
      this.$message({
        message: '已复制到粘贴板',
        type: 'success',
        duration: 2000,
        showClose: true
      });
    }
  },
  created () {
    let _this = this
    sapi.getSnippetConfig().then((result) => {
      _this.languages = result.languages
      _this.tags = result.tags
      _this.files = result.files
    })
  }
}
</script>
<style>
.el-aside{
  border-right: 1px solid #dcdfe6;
}
.el-main{
  background-color: #fbfbfb;
}
.cus-menu{
  border-right: none;
}
.cus-menu .el-menu-item{
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  color: #606060;
}
.re-br .el-input__inner{
  border-radius: 15px;
}
.search-box{
  display: inline-block;
  width: 340px;
}
.add-btn{
  display: inline-block;
  text-align: left;
  padding: 0 26px;
}
.menu-title{
  padding: 10px 10px;
  color: #606060;
  font-size: 14px;
  font-weight: normal;
}
.num-menus{
  line-height: 32px;
  vertical-align: middle;
  list-style: none;
}
.num-menus__item{
  position: relative;
  padding: 0 20px;
  font-size: 14px;
  color: #333;
  background-color: #fff;

  transition: all .25s ease-out;
}
.num-menus__item:hover{
  background-color: #e4e4e4;
}
.num-menus__item .num-menus__count {
  display: inline-block;
  position: absolute;
  padding: 0 3px;
  height: 20px;
  min-width: 20px;
  right: 20px;
  top: 50%;
  margin-top: -10px;
  line-height: 20px;
  font-size: 12px;
  vertical-align: middle;
  text-align: center;
  color: #fff;
  background-color: #409EFF;

  transition: all .25s ease-out;
}
.num-menus__item:hover .num-menus__count{
  background-color: #78baff;
}
.code-container{
  margin: 20px 0;
}
.CodeMirror {
  border: 1px solid #eee;
  height: 100px;
  font-size: 12px;
  line-height: 1.5;
}
</style>