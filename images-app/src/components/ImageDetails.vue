<template>
  <v-card class="image-details">
    <v-row justify="end" class="icons-container py-3">
      <v-icon class="mr-3" v-on:click="changeZoom">
        mdi-magnify-plus
      </v-icon>
      <v-icon  class="mr-3"  v-on:click="changeRatio">
        mdi-panorama-horizontal
      </v-icon>
      <v-icon v-on:click="closeModal">
        mdi-close
      </v-icon>
    </v-row>
    <v-carousel v-model="carouselModel">
      <v-carousel-item v-for="picture in images" :key="picture">
        <v-row class="image-container" justify="center">
          <v-img
            :aspect-ratio="ratio"
            :src="picture"
            :width="width"
            class="grey lighten-2 image"
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
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <v-col class="footer-container">
      <v-card-title> Author: {{ imageDetail.author }} </v-card-title>
      <v-card-subtitle> Camera: {{ imageDetail.camera }} </v-card-subtitle>
      <v-btn class="mx-2" fab dark small color="primary" v-on:click="share">
        <v-icon dark>
          mdi-share
        </v-icon>
      </v-btn>
      <v-row>
        <div  class="pl-4" v-for="hashTag in hashTags" :key="hashTag">
          <v-chip color="secondary" class="ma-2" small>
            {{ hashTag }}
          </v-chip>
        </div>
      </v-row>
    </v-col>
  </v-card>
</template>

<style lang="scss" scoped>
.image-details {
  .icons-container {
    width: 100%;
  }

  .image-container {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);

    .image {
      flex: none;
    }
  }

  .footer-container {
    position: relative;

    .v-btn--fab {
      position: absolute;
      top: -20px;
      z-index: 99;
      right: 6px;
    }
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import ImageDetail from "../interfaces/image.interface";

@Component
export default class ImageDetails extends Vue {
  @Prop({ default: () => {} }) imageDetail!: ImageDetail;
  ratio: number = 1;
  width: string = "50%";
  carouselModel: number = 0;

  get hashTags() {
    const hashes = [... this.imageDetail.tags.split(" ").slice(0, -1)!];
    return hashes;
  }

  get images() {
    return [this.imageDetail.full_picture, this.imageDetail.cropped_picture];
  }

  changeRatio() {
    this.ratio = this.ratio === 1 ? 16 / 9 : 1;
  }

  changeZoom() {
    this.width = this.width === "50%" ? "100%" : "50%";
  }

  closeModal() {
    this.$emit("closeModal");
    this.ratio = 1;
    this.width = "50%";
  }

  share() {
    const url ="http://twitter.com/share?text=I found this pretty pic! &url=";
    window.open( `${url}${window.location}${this.imageDetail.id}`, "_blank");
  }
}
</script>
