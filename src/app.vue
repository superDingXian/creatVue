<template>
    <div id="app">
        {{text}}
        <img src="../img/Concern.png"/>
        <div class="gifBg"></div>
    </div>
</template>

<script>
var imgSrc = require('../img/jingao.jpg');
export default {
    data() {
        return {
        text: 'Hello Webpack!',
        }
    },
    mounted: function() {
        var img = new Image();
        img.id = 'img-js';
        img.src = imgSrc;
        document.body.appendChild(img);
    }
}
</script>

<style lang="less">
    @import "../src/test.less";
</style>
