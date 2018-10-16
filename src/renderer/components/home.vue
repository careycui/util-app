<template>
	<el-container class="home">
		<el-header style="height:24px;">
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
    </el-header>
    <el-main>
      <h4 style="font-weight:normal;padding:30px;">首页</h4>
      <app-menu></app-menu>
    </el-main>
		<!-- <el-container>
			<el-aside width="160px">
				<el-menu class="cus-menu">
					<el-menu-item index="0">
		        <i class="el-icon-edit"></i>
		        <span slot="title">代码片段</span>
	      	</el-menu-item>
          <el-menu-item index="1">
            <i class="el-icon-document"></i>
            <span slot="title">页面编辑</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-news"></i>
            <span slot="title">node服务器</span>
          </el-menu-item>
				</el-menu>
			</el-aside>
			<el-main>Main</el-main>
		</el-container> -->
	</el-container>
</template>
<script>
  import { remote } from 'electron';
  import  AppMenu from './common/app_menu';

  const appUtils = remote.app.utils;
	export default{
	  name: 'home',
    components:{
      AppMenu
    },
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
    background-color: #20a0ff;
    background-image: linear-gradient(45deg,#20a0ff,#a8de69);
    color: #333;
    font-size: 12px;
    text-align: center;
    line-height: 24px;

    -webkit-app-region: drag;
}
.el-aside {
	border-right: 1px solid #dcdfe6;
	color: #333;
}

.el-main {
	color: #333;
	text-align: center;
}
.home{
	height: 100%;
}
.cus-menu{
  border-right: none;
}
.cus-menu .el-menu-item{
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  color: #606266;
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