<template>
  <div class="code-card" :class="{'show-more': isMore}">
    <!-- Code Card -->
    <el-row style="padding: 10px 20px;">
      <el-col :span="18" class="code-card__title">
        <h4 v-text="file.name"></h4>
      </el-col>
      <el-col :span="6" class="code-card__btns">
        <el-button type="text" icon="el-icon-edit" size="mini"></el-button>
        <el-button type="text" icon="el-icon-delete" size="mini"></el-button>
      </el-col>
      <el-col :span="24" class="code-card__tags bb1">
        <span class="web-icon w-icon-tag"></span>
        <el-tag
          :key="index"
          size="mini"
          v-for="(tag, index) in file.tag"
          type="info">
          {{tag}}
        </el-tag>
      </el-col>
      <el-col :span="24" style="padding: 10px 0;">
        <p v-text="file.desc"></p>
      </el-col>
      <el-col :span="24" class="code-card__more bt1">
        <span class="get-more" @click="checkMore"> 更多 </span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    name: 'codeCard',
    props:{
      file:{
        type: Object,
        requied: true,
        default: {}
      }
    },
    data (){
      return {
        isMore: false
      }
    },
    methods:{
      checkMore (){
        this.isMore = !this.isMore;
      }
    }
  }
</script>
<style>
  .code-card{
    height: 170px;
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
    padding: 12px 0;
    font-weight: normal;
  }
  .code-card__btns{
    padding: 5px 0;
    text-align: right;
  }
  .code-card__tags{
    padding: 5px 0;
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
  .bb1{
    border-bottom: 1px solid #e4e4e4;
  }
  .bt1{
    border-top: 1px solid #e4e4e4;
  }
</style>