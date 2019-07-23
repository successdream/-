<template>
  <div class="home">
    <div class="top">
      <div class="top-nav" v-for="item in navs" :key="item.name" @click="$router.push(item.path)"
        :class="{ 'nav-active': item.name === $route.name}" style="cursor:pointer;">
        <i :class="item.meta.icon"></i> {{item.meta.name}}
      </div>
    </div>
    <div class="content">
      <div class="left">
        <div class="left-nav" v-for="item in navs" :key="item.name" @click="$router.push(item.path)"
          :class="{ 'left-nav-active': item.name === $route.name}">
          <i :class="item.meta.icon"></i>
        </div>
      </div>
      <div class="right">
        <el-breadcrumb class="bread" separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.meta.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="width:100%;height:100%;padding:10px;box-sizing: border-box;">
          <router-view style="width:100%;height:100%;box-sizing: border-box;"/>
          <!-- <PictureDetection style="width:100%;height:100%;box-sizing: border-box;"></PictureDetection>   -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PictureDetection from '@/views/pictureDetection/Main.vue';
import { routes } from '@/router';

@Component({
  components:{
    PictureDetection
  }
})
export default class Home extends Vue {
  private navs: any[] = [];

  private mounted() {
    this.navs = routes[0].children;
  }
}
</script>

<style lang="scss" scoped>
.home{
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding-top: 60px;
  position: relative;
  .top{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background:#333;
    display: flex;
    padding-left: 80px;
    box-sizing: border-box;
    .top-nav{
      padding: 0 10px;
      color: white;
      font-size: 14px;
      height: 60px;
      line-height: 60px;
    }
  }
  .content {
    width: 100%;
    height: 100%;
    padding-left: 80px;
    position: relative;
    box-sizing: border-box;
    background: #eee;
    .left{
      width: 80px;
      height: 100%;
      background: white;
      position: absolute;
      top: 0;
      left: 0;
      .left-nav{
        color: #373E4A;
        height: 70px;
        width: 80px;
        line-height: 70px;
        font-size: 30px;
        text-align: center;
        cursor: pointer;
      }
    }
    .right{
      width: 100%;
      height: 100%;
      padding-top: 22px;
      position: relative;
      box-sizing: border-box;
      .bread{
        width: 100%;
        background: white;
        font-size: 12px;
        padding: 5px;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
}

.nav-active{
  background: #080808;
}

.left-nav-active {
  background: #eee;
}
</style>

