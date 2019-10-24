<template>
    <div id="app">
        {{text}}
        <img src="../img/Concern.png"/>
    </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'Hello Webpack!',
    }
  }
}
</script>

<style lang="less">
    @import "../src/test.less";
</style>
