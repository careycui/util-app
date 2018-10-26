<template>
  <el-container class="home">
    <el-header style="height:24px;">
      <app-header></app-header>
    </el-header>
    <el-container>
      <router-view></router-view>
    </el-container>
	</el-container>
</template>
<script>
  import AppHeader from '@/components/common/app_header'

export default{
	  name: 'home',
    components: {
      AppHeader
    },
    mounted () {
      this.$router.push('/menu')
  }
}
</script>
<style>
.el-aside {
  height: 100%
}

.el-main {
  height: 100%;
	color: #333;
}
.home{
	height: 100%;
}
</style>