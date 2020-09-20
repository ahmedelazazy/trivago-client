<template>
  <div class="HotelierItems">
    <div class="flex">
      <h1>{{ hotelierName }}</h1>
      <router-link :to="`/hotelier/${hotelierId}/add`" v-if="hotelierItems && hotelierItems.length">Add Item</router-link>
    </div>
    <div class="items">
      <div>
        <div class="item" v-for="item in hotelierItems" :key="item.id">
          <div class="image-holder" :style="{ backgroundImage: `url(${item.image})` }"></div>
          <div class="col">
            <div class="info">
              <h3>{{ item.name }}</h3>

              <div class="inline-block">{{ item.category }}</div>
              <div class="inline-block badge" :class="item.reputationBadge">{{ item.rating }}</div>
              <p>{{ item.location.state }}, {{ item.location.country }}</p>

              <router-link :to="`/hotelier/${hotelierId}/view/${item.id}`">View</router-link> | <router-link :to="`/hotelier/${hotelierId}/edit/${item.id}`">Edit</router-link> |
              <a href="#" @click.prevent="remove(item.id, item.name)">Delete</a> |
              <a v-if="item.availability !== 0" href="#" @click.prevent="book(item.id, item.name)">Book</a>
            </div>

            <div class="price">
              <h3>${{ item.price.toFixed(2) }}</h3>
              <p>{{ item.availability }} available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="no-data" v-if="!hotelierItems || !hotelierItems.length">No items found. <router-link :to="`/hotelier/${hotelierId}/add`">Add the first item</router-link>.</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HotelierItems",

  data() {
    return {
      hotelierId: null,
      hotelierName: null,
      hotelierItems: [],
    };
  },

  async mounted() {
    this.hotelierId = this.$route.params.id;
    await this.reset();
  },
  methods: {
    async reset() {
      axios.get(`/hotelier/${this.hotelierId}`).then((response) => {
        this.hotelierName = response.data.name;
        if (response.data.hotelier_items) {
          this.hotelierItems = response.data.hotelier_items.sort((a, b) => a.id - b.id);
        }
      });
    },

    async remove(id, name) {
      const answer = confirm(`Are you sure to delete ${name}?`);
      if (!answer) return;

      try {
        await axios.delete(`/hotelier-item/${id}`);
        await this.reset();
      } catch (error) {
        alert("Unexpected error happened.");
      }
    },

    async book(id, name) {
      const answer = confirm(`Are you sure to book ${name}?`);
      if (!answer) return;

      try {
        await axios.put(`/hotelier-item/book/${id}`);
        await this.reset();
      } catch (error) {
        alert("Unexpected error happened.");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.HotelierItems {
  .flex {
    display: flex;
    justify-content: space-between;
  }
  h1 {
    font-size: 24px;
  }
  .no-data {
    padding: 100px 30px;
    text-align: center;
    font-size: 20px;
  }
  .items {
    .item {
      display: flex;
      background: #eeeeee75;
      border: 1px solid #eee;
      border-radius: 5px;
      margin: 20px 0;
      .image-holder {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        width: 300px;
        height: auto;
        max-width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        margin: 0;
      }
      .col {
        padding: 20px 30px;
        width: 100%;
        display: flex;
        justify-content: space-between;

        h3 {
          font-weight: 600;
          font-size: 24px;
          margin-bottom: 10px;
        }
      }

      .info {
        p {
          margin-bottom: 5px;
        }
        .inline-block {
          display: inline-block;
          line-height: 25px;
          margin-right: 10px;
          margin-bottom: 10px;
        }
        .badge {
          text-align: center;
          width: 25px;
          height: 25px;
          border-radius: 100%;
          color: #fff;
          font-weight: 600;
          font-size: 14px;
        }
        .green {
          background: #5cb85c;
        }
        .yellow {
          background: #f0ad4e;
        }
        .red {
          background: #d9534f;
        }
      }

      .price {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        text-align: center;
        p {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
