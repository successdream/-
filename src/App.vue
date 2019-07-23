<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 14px;
}
::-webkit-scrollbar-track-piece {
  background-color:#f8f8f8;
}
::-webkit-scrollbar {
  width:7px;
  height: 7px;
}
::-webkit-scrollbar-thumb {
  background-color:rgba(144, 147, 153, 0.2);
  background-clip: padding-box;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius:20px;
}
::-webkit-scrollbar-thumb:hover {
  background-color:rgba(144, 147, 153, 0.3);
}
</style>
