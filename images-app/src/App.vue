<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h3>{{ title }}</h3>
      </div>
    </v-app-bar>
    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Home from "./pages/Home.vue";

@Component({
  components: {
    Home,
  },
})
export default class App extends Vue {
  title: string = "IMAGE GALLERY";
}
</script>
