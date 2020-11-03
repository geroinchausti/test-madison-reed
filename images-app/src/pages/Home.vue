<template>
  <v-container class="home">
    <template>
      <GalleryItems :items="pictures" v-on:imageClick="openModal" />
    </template>
    <template  v-if="isLoading">
      <div class="loader-container">
          <img src="../assets/infinity.gif"/>
      </div>
    </template>
    <v-dialog v-model="isModalOpen" fullscreen hide-overlay>
      <ImageDetails
        :imageDetail="currentImageData"
        :isLoading="true"
        v-on:closeModal="isModalOpen = false"
      />
    </v-dialog>
  </v-container>
</template>

<style lang="scss" scoped>
.home {
  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import imageService from "../services/image.service";
import GalleryItems from "../components/GalleryItems.vue";
import ImageDetails from "../components/ImageDetails.vue";
import HomePayload from "../interfaces/home.interface";
import ImageDetail from "../interfaces/image.interface";

@Component({
  components: {
    GalleryItems,
    ImageDetails,
  },
})
export default class Home extends Vue {
  private payload: HomePayload = {
    hasMore: true,
    page: 1,
    pageCount: 1,
    pictures: [],
  };
  loading: boolean = false;
  dialog: boolean = false;
  imageSelected: ImageDetail = {
    id: "",
    author: "",
    camara: "",
    cropped_picture: "",
    full_picture: "",
    tags: "",
  };

  mounted() {
    this.getImages();
    window.onscroll = () => {
      let isInBottom =
        Math.ceil(document.documentElement.scrollTop + window.innerHeight) ===
        Math.ceil(document.documentElement.offsetHeight);
      if (isInBottom) {
        this.getImages();
      }
    };
  }
  
  get page(): number {
    return this.payload.page;
  }

  set page(newPage: number) {
    this.payload.page = newPage;
  }

  get isLoading(): boolean {
    return this.loading;
  }

  set isLoading(newValue: boolean) {
    this.loading = newValue;
  }

  get isModalOpen(): boolean {
    return this.dialog;
  }

  set isModalOpen(newValue: boolean) {
    this.dialog = newValue;
  }

  get pictures(): Array<{ id: string; cropped_picture: string }> {
    return this.payload.pictures;
  }

  get currentImageData() {
    return this.imageSelected;
  }

  set currentImageData(newValue: ImageDetail) {
    this.imageSelected = newValue;
  }

  async openModal(id: string) {
    const response = await imageService.getImageById(id);
    this.currentImageData = response;
    this.isModalOpen = true;
  }

  private async getImages(): Promise<void> {
    if (this.payload.hasMore && !this.isLoading) {
      this.isLoading = true;
      const response = await imageService.getImages({ page: this.page });
      this.payload = {
        ...response,
        pictures: [...this.pictures, ...response.pictures],
      };
      this.page = this.page + 1;
      this.isLoading = false;
    }
  }
}
</script>
