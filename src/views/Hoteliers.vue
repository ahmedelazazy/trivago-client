<template>
  <div class="Hoteliers">
    <router-link :to="`/hotelier/${hotelier.id}`" tag="div" class="card" v-for="hotelier in hoteliers" :key="hotelier.id">
      <h2>{{ hotelier.name }}</h2>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Hoteliers",
  data: () => ({
    hoteliers: null,
  }),
  mounted() {
    axios.get("/hotelier").then((response) => {
      this.hoteliers = response.data;
    });
  },
};
</script>

<style lang="scss" scoped>
.Hoteliers {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  .card {
    background: #eee;
    padding: 30px;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;

    &:hover {
      box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
    }

    h2 {
      font-size: 24px;
    }
  }
}
</style>
