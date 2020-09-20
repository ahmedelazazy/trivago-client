<template>
  <div id="app">
    <router-link to="/"><img class="logo" alt="logo" src="./assets/logo.png"/></router-link>
    <router-view />
  </div>
</template>

<script>
import "@/assets/reset.css";

export default {
  name: "App",
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 1000px;
  max-width: 100%;
  padding: 0 20px;
  margin: auto;
  & > a {
    display: flex;
  }
  .logo {
    width: 200px;
    max-width: 100%;
    height: 100%;
    margin: 40px auto;
  }

  a,
  a:visited,
  a:focus,
  a:active {
    color: #0275d8;
    text-decoration: none;
  }

  a:hover {
    color: #0275d8;
    text-decoration: underline;
  }
}
.link {
  cursor: pointer;
}
</style>
