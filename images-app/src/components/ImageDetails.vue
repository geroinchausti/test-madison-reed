<template>
  <div class="image-details">
    <div class="image-details__header">
      <i class="material-icons" v-on:click="isPanoramic = !isPanoramic">
        panorama_wide_angle
      </i>
      <i class="material-icons" v-on:click="closeModal">
        close
      </i>
    </div>
    <div class="image-details__carousel">
      <div
        v-for="picture in images"
        :key="picture"
        class="image-details__carousel__item"
      >
        <div
          v-bind:class="[
            isPanoramic
              ? 'image-details__carousel__item__wrapper image-details__carousel__item__wrapper--panoramic'
              : 'image-details__carousel__item__wrapper',
          ]"
          v-if="picture === currentPicture"
        >
          <img :src="picture" :width="width" />
        </div>
      </div>

      <i
        class="material-icons image-details__carousel__prev"
        v-on:click="back()"
        >keyboard_arrow_left</i
      >
      <i
        class="material-icons image-details__carousel__next"
        v-on:click="next()"
        >keyboard_arrow_right</i
      >
    </div>

    <div class="image-details__footer">
      <div class="image-details__footer__title">
        Author: {{ imageDetail.author }}
      </div>
      <div class="image-details__footer__subtitle">
        Camera: {{ imageDetail.camera }}
      </div>
      <button class="image-details__footer__share" v-on:click="share">
        <i class="material-icons">
          share
        </i>
      </button>
      <div class="image-details__footer__hashtags">
        <span
          class="image-details__footer__hashtags__item"
          v-for="hashTag in hashTags"
          :key="hashTag"
        >
          {{ hashTag }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image-details {
  &__header {
    display: flex;
    justify-content: flex-end;

    .material-icons {
      cursor: pointer;
      margin-left: 6px;
    }
  }

  &__carousel {
    position: relative;
    animation-name: fade;
    animation-duration: 1.5s;
    background: rgba(0, 0, 0, 0.8);

    &__item {
      max-width: 500px;
      margin: 0 auto;

      &__wrapper {
        position: relative;
        width: 100%;
        padding-bottom: 100%;
        cursor: zoom-in;
        transition: transform 0.2s;
        z-index: 99;

        &--panoramic {
          padding-bottom: 56.2%;
        }

        &:hover {
          transform: scale(1.5);
        }

        img {
          position: absolute;
          object-fit: cover;
          height: 100%;
        }
      }
    }

    &__prev,
    &__next {
      position: absolute;
      top: 50%;
      color: white;
      cursor: pointer;
      z-index: 999;

      &:hover {
        background-color: rgba(0, 0, 0, 0.8);
      }
    }

    &__next {
      right: 0;
      border-radius: 3px 0 0 3px;
    }
  }

  &__footer {
    position: relative;
    min-height: 100px;

    &__title {
      font-size: 18px;
      font-weight: 600;
    }

    &__subtitle {
      font-size: 14px;
    }

    &__subtitle,
    &__title {
      padding: 8px 8px 0 8px;
    }

    &__share {
      position: absolute;
      top: -13px;
      right: 6px;
      color: white;
      background: #0d47a1;
      border-radius: 50%;
      height: 44px;
      width: 44px;
      margin: 0;
      padding: 0;
      border: none;
      z-index: 999;
    }

    &__hashtags {
      margin: 14px 8px;
      display: flex;
      flex-wrap: wrap;

      &__item {
        background: lightgray;
        color: black;
        border-radius: 18px;
        margin-right: 6px;
        font-size: 14px;
        padding: 6px;
        margin-top:6px;
      }
    }
  }

  @keyframes fade {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 1;
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
  panoramic: boolean = false;
  width: string = "100%";
  currentPicture = "";

  mounted() {
    this.currentPicture = this.imageDetail.full_picture;
  }

  get hashTags() {
    const hashes = [...this.imageDetail.tags.split(" ").slice(0, -1)!];
    return hashes;
  }

  get images() {
    return [this.imageDetail.full_picture, this.imageDetail.cropped_picture];
  }

  get isPanoramic() {
    return this.panoramic;
  }

  set isPanoramic(newValue: boolean) {
    console.log(newValue);
    this.panoramic = newValue;
  }

  back() {
    this.currentPicture = this.imageDetail.full_picture;
  }

  next() {
    this.currentPicture = this.imageDetail.cropped_picture;
  }

  changeZoom() {
    this.width = this.width === "100%" ? "150%" : "100%";
  }

  closeModal() {
    this.$emit("closeModal");
    this.isPanoramic = false;
    this.width = "50%";
  }

  share() {
    const url = "http://twitter.com/share?text=I found this pretty pic! &url=";
    window.open(`${url}${window.location}${this.imageDetail.id}`, "_blank");
  }
}
</script>
