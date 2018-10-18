<template>
  <div class="code-card" :class="{'show-more': isMore}">
    Code Card
    <el-button type="primary" @click="checkMore">more</el-button>
  </div>
</template>
<script>
  export default{
    name: 'codeCard',
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
    height: 100px;
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
</style>