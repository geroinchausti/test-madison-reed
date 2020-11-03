<template>
  <div class="app-container">
    <AppBar backgroundColor="#0d47a1" color="white">
      <div>
        <h3>{{ title }}</h3>
      </div>
    </AppBar>
    <main class="main">
      <Home />
    </main>
  </div>
</template>

<style lang="scss">
html.no-scroll {
  overflow: hidden;
}

body {
  font-family: "Roboto", "Arial", Times, serif;
  margin: 0;
}

.main {
  display: flex;
  flex: 1 0 auto;
  max-width: 100%;
  transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
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
    AppBar,
  },
})
export default class App extends Vue {
  title: string = "IMAGE GALLERY";
}
</script>
