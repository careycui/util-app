<template>
  <div class="code-card" :class="{'show-more': isMore}">
    <!-- Code Card -->
    <el-row style="padding: 10px 20px;">
      <el-col :span="18" class="code-card__title">
        <h4>
          <span :class="icon" style="font-size:24px;margin-right:10px;"></span>
          {{file.name}}
        </h4>
      </el-col>
      <el-col :span="6" class="code-card__btns">
        <el-button type="text" icon="web-icon w-icon-copy" style="padding: 10px 5px;"></el-button>
        <el-button type="text" icon="el-icon-edit" style="padding: 10px 5px;"></el-button>
        <el-button type="text" icon="el-icon-delete" style="padding: 10px 5px;"></el-button>
        <el-button type="text" icon="web-icon w-icon-more" style="padding: 10px 5px;" @click="checkMore()"></el-button>
      </el-col>
      <el-col :span="24" class="code-card__tags bb1">
        <span class="web-icon w-icon-tag"></span>
        <el-tag
          :key="index"
          size="mini"
          v-for="(tag, index) in file.tag"
          style="margin:0 5px;"
          type="info">
          {{tag}}
        </el-tag>
      </el-col>
      <el-col :span="24" style="padding: 10px 0;">
        <p v-text="file.desc"></p>
      </el-col>
      <el-col :span="24">
        <codemirror v-model="file.value" :options="options"></codemirror>
      </el-col>
      <el-col :span="24" class="footer-info">
        <el-col :span="6">
          创建时间: {{createAt}}
        </el-col>
        <el-col :span="6">
          更新时间: {{updateAt}}
        </el-col>
        <el-col :span="6" :offset="6" style="text-align:right;">
          used: {{file.used}}
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import format from 'date-format'

  export default{
    name: 'codeCard',
    props: {
      file: {
        type: Object,
        requied: true,
        default: {}
      },
      code: [String, Number],
    },
    data () {
      return {
        isMore: false,
        options:{
          tabSize: 4,
          lineNumbers: true,     // 显示行数
          indentUnit: 4,         // 缩进单位为4
          styleActiveLine: true, // 当前行背景高亮
          matchBrackets: true,   // 括号匹配
          lineWrapping: true,    // 自动换行
          line: true,
          mode: 'text/javascript',
          theme: 'monokai'
        }
      }
    },
    computed:{
      icon () {
        return 'web-icon w-icon-' + this.file.language.toLowerCase();
      },
      createAt (){
        return format('yyyy/MM/dd hh:mm', new Date(this.file.createdAt));
      },
      updateAt (){
        return format('yyyy/MM/dd hh:mm', new Date(this.file.updateAt));
      }
    },
    methods: {
      setMore (isMore){
        this.isMore = isMore; 
      },
      checkMore () {
        this.isMore = !this.isMore;
        this.$emit('changeActive', {code:this.code,isMore:this.isMore});
      }
    }
  }
</script>
<style>
  .code-card{
    height: 264px;
    margin: 0px 20px;
    background-color: #fff;
    box-shadow: 0 0 0 rgba(0, 0, 0, .2);

    transition: all .25s ease-in-out;
  }
  .code-card.show-more{
    margin: 10px 0;
    height: 500px;
    box-shadow: 0 0 15px rgba(0, 0, 0, .2);
  }
  .code-card__title{
    padding: 5px 0;
    color: #333;
    text-align: left;
  }
  .code-card__title h4{
    font-weight: normal;
    font-size: 18px;
  }
  .code-card__btns{
    text-align: right;
  }
  .code-card__tags{
    padding: 10px 0;
    text-align: left;
  }
  .code-card__more{
    text-align: center;
  }
  .get-more{
    display: block;
    padding: 5px 0;
    height: 100%;
    font-size: 12px;
    color: #333;
    cursor: pointer;
  }
  .CodeMirror {
    border: 1px solid #eee;
    height: 100px;
    transition: all .25s ease-in-out;
  }
  .show-more .CodeMirror{
    height: 340px;
  }
  .footer-info{
    padding: 5px 0;
    font-size: 12px;
    color: #666;
  }
  .bb1{
    border-bottom: 1px solid #e4e4e4;
  }
  .bt1{
    border-top: 1px solid #e4e4e4;
  }
</style>