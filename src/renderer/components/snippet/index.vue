<template>
  <el-container>
    <el-aside width="200px">
      <div class="languages">
        <h4 class="menu-title">语言类别</h4>
        <ul class="num-menus">
          <li class="num-menus__item" v-for="(la, index) in languages" :key="index">
            <span v-text="la.name"></span>
            <span class="num-menus__count" v-text="la.count"></span>
          </li>
        </ul>
      </div>
      <div class="tags">
        <h4 class="menu-title">标签</h4>
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
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="q">
            </el-input>
          </div>
          <div class="add-btn">
            <el-button type="primary" icon="el-icon-plus" round size="small">新建</el-button>
          </div>
        </el-col>
        <el-col>
          <div class="code-container" v-if="files.length > 0">
            <code-card v-for="(file, index) in files" :key="index" :file="file"></code-card>
          </div>
          <div class="code-container" v-else>
            <h4 style="text-align:center;">还没有添加代码片段</h4>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
  import  CodeCard from './code_card';
  import { remote } from 'electron';
  const sapi = remote.app.snippetApi;

  export default{
    name: 'snippet',
    components:{
      CodeCard
    },
    data (){
      return {
        q: '',
        languages:[],
        tags:[],
        files:[]
      }
    },
    created (){
      let _this = this;
      sapi.getSnippetConfig().then((result) => {
        _this.languages = result.languages;
        _this.tags = result.tags;
        _this.files = result.files;
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
</style>