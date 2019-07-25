<template>
  <div class="pic" v-loading="loading" element-loading-text="视频分析中" element-loading-spinner="el-icon-loading">
    <div v-if="progress" style="position: absolute; width: 100%; height:100%;background-color: rgba(255, 255, 255, 0.8);">
      <!-- <div style="z-index:3000;position: absolute; left: 50%; right:50%; transform: translate(-50%, -50%);width:300px;height:200px;"> -->
        <el-progress style="left: 50%;top: 50%;transform: translate(-50%, -50%);width: 300px;" :percentage="percentage"></el-progress>
      <!-- </div> -->
      
    </div>
    <div style="background:white;">
      <div style="border-left: 10px solid #67C23A;padding:10px;margin:10px;font-size:14px;border-bottom:1px solid #ccc;">
        视频分析
      </div>
    </div>
    <div style="flex:1;display:flex; flex-direction: column;padding-left: 30px;">
       <!-- <div style="margin-bottom:20px;display:flex;width: 100%;align-items: center; justify-content: flex-end;">

       </div> -->
       <div style="display:flex;">
         <el-upload ref="upload" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" 
         :show-file-list="false" :auto-upload="false" style="width: 700px;height:200px;" @change.native="changeNative">
         <i style="border: 1px dashed #d9d9d9;color:#85ce61; font-size:80px;width: 700px;height:200px;border-radius:10px;" class="avatar-uploader-icon el-icon-upload"></i>
         </el-upload>
         <div style="display:flex;justify-content: flex-end; justify-content: flex-start;
         margin-left:20px;margin-right: 30px;height:200px; flex-direction:column;">
            <!-- <el-button :loading="uploadLoding" size="small" style="margin-bottom:30px;"
            :type="uploadBtn" @click="submitUpload">上传检测</el-button> -->
            <el-button :loading="uploadLoding" size="small" style="margin-bottom:30px;"
            :type="uploadBtn" @click="submitUpload">上传检测</el-button>
            <el-button :loading="uploadLoding"  style="margin-left: 0px;"
            type="danger" size="small" @click="clearAll">清空检测</el-button>
          </div>
       </div>

      <div style="width:100%;border-bottom: 1px solid #ccc;margin-top:10px;margin-bottom:10px;"></div>
      <div v-if="resultList.length" style="flex:1;display:flex;margin-top:30px;flex-wrap: wrap; overflow: auto;">
        
        <div v-for="(item, index) in resultList[0].result" :key="index" 
        style="display:flex; flex-direction: column;padding:5px;" @click="showResult(item)">
           <div style="width: 300px; height: 200px;">
              <img style="width:100%; height:100%;" :src="item.url" alt="">
           </div>
           <div style="display:flex;width: 300px;flex-wrap: wrap;">
             <div style="font-weight: bold;">报警类型：</div>
             <div>{{item.alarmType}}</div>
           </div>
        </div>
      </div>
    </div>
    <record-detail ref="recordDetail"></record-detail>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator';
import moment from 'moment';
import { EgpSvg } from 'egp-web-components';
import Card from '@/components/card/Main.vue';
import API from '@/api';
import { Params, Rule, originRule, Record } from '../../api/intrusion';
import { ElUpload } from 'element-ui/types/upload';
import axios from 'axios';
import uuid from 'uuid/v4';
import recordDetail from './RecordDetail.vue'

interface Point {
  x: number;
  y:number;
}

// http://192.168.3.109:7001/postImg
@Component({
  components: {
    EgpSvg,
    recordDetail
  }
})
export default class IntrusionDetection extends Vue {
  $refs!: {
    upload: ElUpload;
    egpSvg: any;
    recordDetail: recordDetail;
  }
  private svgOptions: any = {};
  private fileList: any[] = [];
  private files: any[] = [];
  private imgSrc = '';
  private uploadLoding = false;
  private detectionResult: any = {} 
  private resultImg = ''
  private secondSelect = false;
  private uploadBtn = 'info';
  private intrusionStyle = true;
  private resultList: any[] = [];
  private loading = false;
  private progress = false;
  private percentage = 1;
  private beginPercentage = 1;

  private uploadData: {
    confidence: number,
    nms: number,
    type: string,
    region: string,
  } = {
    confidence: 0.8,
    nms: 0.4,
    type: 'attitude',
    region: '',
  };

  mounted(){
    this.$router.push('/')
    if(this.uploadData && this.uploadData.hasOwnProperty('confidence'))  delete this.uploadData.confidence;
    if(this.uploadData && this.uploadData.hasOwnProperty('nms'))  delete this.uploadData.nms;
    if(this.uploadData && this.uploadData.hasOwnProperty('region'))  delete this.uploadData.region;
  }
  
  private async submitUpload() {  
    const {uploadFiles} = (this.$refs.upload as any);
    if(!uploadFiles.length) {
      this.$message({
          message: '请选择文件后上传',
          type: 'warning'
      });
      return;
    }
    const flie = [(this.$refs.upload as any).uploadFiles.pop()];
    const data = (window as any).EcvAlarmData.data.find((item: any) =>{
       return item.filename === flie[0].name
    });
    if(!data){
      console.log('文件上传出错');
      this.$message({
        type:'error',
        message:'文件上传出错'
      })
      return;
    }
    let num: number = 0;
    this.progress = true;
     const t1 = setInterval(() => {
       num ++
       this.percentage = num * this.beginPercentage > 100 ? 100 : num * this.beginPercentage;
          if(num > 100){
            window.clearInterval((t1 as any));
            this.progress = false;
            this.resultList = [data];
            this.percentage = 1;
            this.uploadBtn = 'info';
          } 
     },100);
  }
  
  private originToCommon(rules: originRule[]): Rule[] {
    return rules.map(item => ({ location: item.data, rule_id: item.id }));
  }

  private clearAll() {
    this.fileList = [];
    this.imgSrc = '';
    if(this.$refs.egpSvg) this.$refs.egpSvg.setData([]);
    this.resultList = [];
    this.uploadBtn = 'info';
  }
  
  private uploadChange(file: any, fileList: any) {

  }
  
  private uploadSuccess(res: any, file: any, fileList: any) {

  }
  
  private uploadError(res: any, file: any, fileList: any){

  }
  
  //清空数据
  private clearData(){

  }
 //展示结果
  private showResult(data: any){
    this.$nextTick(() => {
      this.$refs.recordDetail.show(data);
    })
  }

  private nativeUploadChange(e: any){

  }
  

  private selectChange(value: string) {
    if(value === 'intrusion') {
      this.intrusionStyle = false;
      this.$nextTick(() => {
        this.svgOptions = { type: 'polygon', name: value, color: 'red' };
        this.uploadData = { confidence: 0.8, nms: 0.4, type: 'intrusion',region: '',};
      })
      console.log(this.uploadData, 'uploadData', this.svgOptions )
    } else {
      if(this.$refs.egpSvg) this.$refs.egpSvg.setData([]);
      this.svgOptions = {};
      this.intrusionStyle = true;
      if(this.uploadData && this.uploadData.hasOwnProperty('confidence')) {
        delete this.uploadData.confidence;
      }
      if(this.uploadData && this.uploadData.hasOwnProperty('nms')) {
        delete this.uploadData.nms;
      }
      if(this.uploadData && this.uploadData.hasOwnProperty('region')) {
        delete this.uploadData.region;
      }
    }
  }

  private clerarAll(){
    (this.$refs.upload as any).uploadFiles = []
  }
  private changeNative(){
    if((this.$refs.upload as any).uploadFiles.length) this.uploadBtn = 'success';
    // this.uploadBtn = 'success'
  }

}
</script>

<style lang="scss" scoped>
.pic{
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
}
h4{
  text-align: right;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>

