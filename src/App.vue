<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import router from './router/index.js';
export default {
  name: 'App',
  router
}
</script>
<style>
html{padding:0;margin:0;height:100%;}
body{padding:0;margin:0;height:100%;}
#app{padding:0;margin:0;}
.clearfix{zoom : 1;}
.clearfix:after,.clearfix:before {content : '';display : block;width : 0;height : 0;visibility : hidden;}
.clearfix:after {clear : both;}
</style>
