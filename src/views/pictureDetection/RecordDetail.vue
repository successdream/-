<template>
  <el-dialog title="图片详情" :visible.sync="dialogVisible" width="1000px">
    <div style="mix-height: 500px;display:flex;">
      <div style="flex:1;padding:10px;">
        <img :src="detectionResult.url" alt="" width="100%;">
      </div>
      <div v-if="detectionResult && detectionResult.type === 'intrusion'" style="width:250px;border-left:1px solid #ccc;padding:10px;">
        <div v-if="detectionResult && detectionResult.objects && detectionResult.objects[0] && detectionResult.objects[0].rule_id" style="font-size:13px;margin-bottom: 10px;display:flex;align-items:baseline;">
          <h4 style="margin:0;min-width:80px;">rule_id：</h4> 
          {{(detectionResult && detectionResult.objects && detectionResult.objects[0] && detectionResult.objects[0].rule_id) || ''}}
          </div>
        <div v-if="detectionResult && detectionResult.ts" style="font-size:13px;margin-bottom: 10px;display:flex;align-items:baseline;">
          <h4 style="margin:0;min-width:80px;">ts: </h4> {{(detectionResult && detectionResult.ts) || ''}}</div>
      </div>
      <div v-if="detectionResult && detectionResult.type === 'attitude'"
       style="width:250px;border-left:1px solid #ccc;padding:10px;">
        <div v-if="detectionResult && detectionResult.objects" style="
        font-size:13px;margin-bottom: 10px;display:flex;align-items:baseline;align-items: center;flex-direction: column;">
          <div v-for="(item, index) in detectionResult.objects" :key="index" style="border-bottom: 1px solid #ccc;">
            <div style="display:flex;padding: 5px;">
              <h4 style="margin:0;min-width:80px;">location：</h4> 
              <div>{{item.location}}</div>
            </div>
            <div style="display:flex;padding: 5px;align-items: center;">
              <h4 style="margin:0;min-width:80px;">pose：</h4> 
              <div>{{item.pose}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class RecordDetail extends Vue {
  public show(value: any) {
    this.dialogVisible = true;
    this.detectionResult = value;
  }
  private detectionResult: any = {}
  private dialogVisible = false;
}
</script>

<style lang="scss" scoped>
h4{
  text-align: right;
}
</style>


