<template>
  <div class="app-container">
    <AppBar backgroundColor="#0d47a1" color="white">
      <div>
        <h3>{{ title }}</h3>
      </div>
    </AppBar>
    <v-main>
      <Home />
    </v-main>
  </div>
</template>

<style lang="scss">
  body {
     font-family: "Arial", Times, serif;
  }
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Home from "./pages/Home.vue";
import AppBar from "./components/AppBar.vue";

@Component({
  components: {
    Home,
    AppBar
  },
})
export default class App extends Vue {
  title: string = "IMAGE GALLERY"; 
}
</script>
