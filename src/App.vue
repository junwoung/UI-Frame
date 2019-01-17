<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import router from './router/index.js';
import css from './frame/common/common.css';
export default {
  name: 'App',
  router
}
</script>
