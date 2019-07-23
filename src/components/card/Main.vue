<template>
  <div style="width:300px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);" @click="$emit('click')">
    <img :src="imgSrc" alt="" width="100%;">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
  @Prop({default: ''}) private imgSrc!: string;
}
</script>

