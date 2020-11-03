<template>
  <nav :style="styles" class="app-bar">
    <slot />
  </nav>
</template>

<style lang="scss" scoped>
.app-bar {
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class AppBar extends Vue {
  @Prop({ default: "#c2185b" }) backgroundColor!: string;
  @Prop({ default: "white" }) color!: string;

  get styles() {
    return {
      backgroundColor: this.backgroundColor,
      color: this.color,
    };
  }
}
</script>
