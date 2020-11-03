<template>
  <div class="gallery-items">
    <div class="gallery-items__container">
      <div
        v-for="picture in items"
        :key="picture.cropped_picture"
        class="gallery-items__image-container"
      >
        <img
          class="gallery-items__image"
          :src="picture.cropped_picture"
          v-on:click="imageClickEvent(picture.id)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gallery-items {
  max-width: 1200px;
  margin: 0 auto;

  &__container {
    display: grid;
    grid-template-columns: auto auto auto auto;
  }

  @media only screen and (max-width: 768px) {
    &__container {
      grid-template-columns: auto;
    }
  }

  &__image-container {
    cursor: pointer;
    padding: 11px;
    flex-grow: 1;
    margin: 1px;
  }

  &__image {
    width: 100%;
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class GalleryItems extends Vue {
  @Prop({ default: () => [] }) items!: Array<{
    id: string;
    cropped_picture: string;
  }>;

  private imageClickEvent(id: string): void {
    this.$emit("imageClick", id);
  }
}
</script>
