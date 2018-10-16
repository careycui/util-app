<template>
  <ul class="app-menus">
    <li class="app-menus__item">
      <div class="left-icon">
        <i class="web-icon w-icon-code"></i>
      </div>
      <div class="right-desc">
        <div class="title">
          代码片段
        </div>
        <div class="desc">
          记录常用代码片段、页面模板，并提供便捷的使用方式
        </div>
      </div>
    </li>
    <li class="app-menus__item">
      <div class="left-icon">
        <i class="web-icon w-icon-exchange2"></i>
      </div>
      <div class="right-desc">
        <div class="title">
          JSON格式化
        </div>
        <div class="desc">
          格式化JSON字符串
        </div>
      </div>
    </li>
    <li class="app-menus__item">
      <div class="left-icon">
        <i class="web-icon w-icon-server"></i>
      </div>
      <div class="right-desc">
        <div class="title">
          Web Server
        </div>
        <div class="desc">
          简易的web服务器
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
  export default{
    name: 'appMenu'
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