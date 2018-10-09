<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'util-app'
  }
</script>

<style>
*{
	margin: 0;
	padding: 0;
	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

html,body{
	height: 100%;
}
#app{
	height: 100%;
}
</style>
