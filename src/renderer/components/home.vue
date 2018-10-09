<template>
	<el-container class="home">
  		<el-header style="height:40px;">Header</el-header>
		<el-container>
			<el-aside width="160px">
				<el-menu>
					<el-menu-item index="0">
				        <i class="el-icon-edit"></i>
				        <span slot="title">代码片段</span>
			      	</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main>Main</el-main>
		</el-container>
	</el-container>
</template>
<script>
	export default{
		name: 'home'
	}
</script>
<style>
.el-header{
    background-color: #20a0ff;
    background-image: linear-gradient(45deg,#20a0ff,#a8de69);
    color: #333;
    text-align: center;
    line-height: 40px;
}
  
.el-aside {
	border-right: 1px solid #dcdfe6;
	color: #333;
	text-align: center;
}

.el-main {
	background-color: #E9EEF3;
	color: #333;
	text-align: center;
}
.home{
	height: 100%;
}
</style>