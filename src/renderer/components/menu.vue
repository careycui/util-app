<template>
  <el-main>
    <h4 style="font-weight:normal;padding:30px;">首页</h4>
     <ul class="app-menus">
      <li class="app-menus__item" v-for="menu in menuList" :key="menu.path" @click="linkTo(menu.path)">
        <div class="left-icon">
          <i :class="menu.icon"></i>
        </div>
        <div class="right-desc">
          <div class="title" v-text="menu.title">
          </div>
          <div class="desc" v-text="menu.desc">
          </div>
        </div>
      </li>
    </ul>
  </el-main>
</template>
<script>

  export default{
    name: 'homeMenu',
    data (){
      return {
        menuList: [
          {
            path: '/snippet',
            icon: 'web-icon w-icon-code',
            title: '代码片段',
            desc: '记录常用代码片段、页面模板，并提供便捷的使用方式'
          },
          {
            path: '/json',
            icon: 'web-icon w-icon-exchange2',
            title: 'JSON格式化',
            desc: '格式化JSON字符串'
          },
          {
            path: '/webserver',
            icon: 'web-icon w-icon-server',
            title: 'Web Server',
            desc: '简易的web服务器'
          }
        ]
      }
    },
    methods: {
      linkTo (path){
        this.$router.push(path);
      }
    }
  }
</script>
<style>
  .app-menus{
    list-style: none;
    margin: 25px;
  }
  .app-menus:after{
    content: ' ';
    display: block;
    clear: both;
    visibility: hidden;
  }
  .app-menus__item{
    float: left;
    width: 220px;
    padding: 10px;
    cursor: pointer;

    box-shadow: 0 0 0 rgba(0, 0, 0, .2);
    transition: all .45s ease-out;
  }
  .app-menus__item:hover{
    box-shadow: 0 0 6px rgba(0,0,0,.4),
                0 6px 15px rgba(0, 0, 0, .2);
  }
  .app-menus__item .left-icon{
    width: 60px;
    line-height: 60px;
    vertical-align: middle;
    text-align: center;
    float:left;
  }
  .app-menus__item .left-icon .web-icon{
    font-size: 32px;
    color: #20a0ff;
  }
  .app-menus__item .right-desc{
    margin-left: 60px;
    text-align: left;
  }
  .app-menus__item .right-desc .title{
    font-size: 14px;
    color: #5e5e5e;
  }
  .app-menus__item .right-desc .desc{
    margin-top: 6px;
    font-size: 12px;
    color: #909090;
  }
</style>