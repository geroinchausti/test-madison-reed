<template>
  <v-container>
    <v-row>
      <v-col
        v-for="picture in items"
        :key="picture.id"
        class="d-flex child-flex"
        cols="4"
        xs
      >
        <v-img
          :src="picture.cropped_picture"
          aspect-ratio="1"
          class="grey lighten-2 image"
          v-on:click="imageClickEvent(picture.id)"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
  .v-image {
    cursor: pointer;
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
