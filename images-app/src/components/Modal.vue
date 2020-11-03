<template>
  <div v-if="isVisible" class="modal">
    <div class="modal__overlay">
      <div class="modal__container">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  &__overlay {
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  &__container {
    height: 100%;
    width: 100%;
    background: white;
    overflow: auto;
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

@Component
export default class Modal extends Vue {
  @Prop({ default: false }) visible!: boolean;

  get isVisible() {
    return this.visible;
  }

  @Watch("visible")
  onVisibleChange(value: boolean, oldValue: boolean) {
    const root = document.getElementsByTagName("html")[0];
    root.setAttribute("class", value ? "no-scroll" : "");
  }
}
</script>
