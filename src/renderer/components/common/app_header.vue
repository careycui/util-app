<template>
  <el-row>
    <el-col :span="8" class="tool-logo">
      Web Util Tools
    </el-col>
    <el-col :span="16">
      <div class="tool-box">
        <i class="el-icon-minus" @click="minWin"></i>
        <i class="web-icon w-icon-big" @click="maxWin" v-show="!isMax"></i>
        <i class="web-icon w-icon-suoxiao" @click="maxWin" v-show="isMax"></i>
        <i class="el-icon-close" @click="close"></i>
      </div>
    </el-col>
  </el-row>
</template>
<script>
   import { remote } from 'electron';
   const appUtils = remote.app.utils;

   export default{
    name: 'appHeader',
    data() {
      return {
        isMax: false
      }
    },
    methods:{
      minWin (){
        appUtils.min();
      },
      maxWin (){
        this.isMax = !this.isMax;
        appUtils.max();
      },
      close (){
        appUtils.close();
      }
    }
   }
</script>
<style>
.el-header{
  width: 100%;
  background-color: #20a0ff;
  background-image: linear-gradient(45deg,#20a0ff,#a8de69);
  color: #333;
  font-size: 12px;
  text-align: center;
  line-height: 24px;

  -webkit-app-region: drag;
}
.tool-logo{
  text-align: left;
  color: #fff;
}
.tool-box{
  text-align: right;
  color: #fff;
}
.tool-box i{
  margin-left: 10px;
  -webkit-app-region: no-drag;
}
</style>