<template>
  <div class="HotelierItem">
    <h1>{{ title }}</h1>
    <!-- <router-link :to="`/hotelier/${item.hotelierId}`">Back</router-link> -->
    <div class="container">
      <div class="preview">
        <img :src="item.image ? item.image : require('@/assets/placeholder-image.png')" />
      </div>

      <form @submit.prevent="save" novalidate>
        <div class="control-wrapper">
          <label for="name">Name</label>
          <input type="text" v-model="item.name" class="form-control" id="name" required name="name" :readonly="readonly" />
          <p class="error" v-if="errors.name">{{ errors.name }}</p>
        </div>

        <div class="control-wrapper">
          <label for="rating">Rating</label>
          <input type="number" v-model="item.rating" class="form-control" id="rating" required name="rating" :readonly="readonly" min="0" max="5" />
          <p class="error" v-if="errors.rating">{{ errors.rating }}</p>
        </div>

        <div class="control-wrapper">
          <label for="rating">Category</label>
          <select v-model="item.category" class="form-control" id="category" required name="category" :readonly="readonly">
            <option value="hotel">Hotel</option>
            <option value="alternative">Alternative</option>
            <option value="hostel">Hostel</option>
            <option value="lodge">Lodge</option>
            <option value="resort">Resort</option>
            <option value="guest-house">Guest-house</option>
          </select>
          <p class="error" v-if="errors.category">{{ errors.category }}</p>
        </div>

        <div class="control-wrapper">
          <label for="rating">City</label>
          <input type="text" v-model="item.location.city" class="form-control" id="city" required name="city" :readonly="readonly" />
          <p class="error" v-if="errors.city">{{ errors.city }}</p>
        </div>

        <div class="control-wrapper">
          <label for="rating">State</label>
          <input type="text" v-model="item.location.state" class="form-control" id="state" required name="state" :readonly="readonly" />
          <p class="error" v-if="errors.state">{{ errors.state }}</p>
        </div>

        <div class="control-wrapper">
          <label for="rating">Country</label>
          <input type="text" v-model="item.location.country" class="form-control" id="country" required name="country" :readonly="readonly" />
          <p class="error" v-if="errors.country">{{ errors.country }}</p>
        </div>

        <div class="control-wrapper">
          <label for="rating">Zip Code</label>
          <input type="text" v-model="item.location.zip_code" class="form-control" id="zip_code" required name="zip_code" :readonly="readonly" />
          <p class="error" v-if="errors.zip_code">{{ errors.zip_code }}</p>
        </div>

        <div class="control-wrapper">
          <label for="rating">Address</label>
          <input type="text" v-model="item.location.address" class="form-control" id="address" required name="address" :readonly="readonly" />
          <p class="error" v-if="errors.address">{{ errors.address }}</p>
        </div>

        <div class="control-wrapper">
          <label for="rating">Image URL</label>
          <input type="text" v-model="item.image" class="form-control" id="image" required name="image" :readonly="readonly" />
          <p class="error" v-if="errors.image">{{ errors.image }}</p>
        </div>
        <div class="control-wrapper">
          <label for="rating">Reputation</label>
          <input type="number" v-model="item.reputation" class="form-control" id="reputation" required name="reputation" :readonly="readonly" />
          <p class="error" v-if="errors.reputation">{{ errors.reputation }}</p>
        </div>

        <div class="control-wrapper" v-if="mode === 'view'">
          <label for="rating">Reputation Badge</label>
          <input type="text" v-model="item.reputationBadge" class="form-control" id="reputationBadge" required name="reputationBadge" :readonly="readonly" />
        </div>

        <div class="control-wrapper">
          <label for="rating">Price</label>
          <input type="number" v-model="item.price" class="form-control" id="price" required name="price" :readonly="readonly" />
          <p class="error" v-if="errors.price">{{ errors.price }}</p>
        </div>

        <div class="control-wrapper">
          <label for="rating">Availability</label>
          <input type="number" v-model="item.availability" class="form-control" id="availability" required name="availability" :readonly="readonly" />
          <p class="error" v-if="errors.availability">{{ errors.availability }}</p>
        </div>

        <div class="buttons">
          <input v-if="mode === 'add' || mode === 'edit'" class="btn" type="submit" value="Submit" />
          <router-link :to="`/hotelier/${item.hotelierId}`" tag="button" class="btn" type="button" value="Cancel"> Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HotelierItem",
  props: {},
  data() {
    return {
      id: null,
      title: null,
      mode: "add",
      errors: [],
      valid: false,
      item: {
        id: null,
        hotelierId: null,
        name: null,
        rating: null,
        category: null,
        image: null,
        reputation: null,
        price: null,
        availability: null,
        location: {
          id: null,
          city: null,
          state: null,
          country: null,
          zip_code: null,
          address: null,
        },
        hotelier: {
          id: null,
          name: null,
        },
      },

      errors: {
        name: null,
        rating: null,
        category: null,
        image: null,
        reputation: null,
        price: null,
        availability: null,
        city: null,
        state: null,
        country: null,
        zip_code: null,
        address: null,
      },
    };
  },

  mounted() {
    const routeName = this.$route.name;

    this.item.hotelierId = this.$route.params.hotelierId;

    if (routeName === "view-hotelier-item") {
      this.mode = "view";
      this.title = "View Details";
    } else if (routeName === "add-hotelier-item") {
      this.mode = "add";
      this.title = "Add Hotelier Item";
    } else if (routeName === "edit-hotelier-item") {
      this.mode = "edit";
      this.title = "Edit Details";
    }

    if (this.mode == "view" || this.mode == "edit") {
      axios.get(`/hotelier-item/${this.$route.params.id}`).then((response) => {
        this.item = response.data;
      });
    }
  },
  computed: {
    readonly() {
      return this.mode == "view";
    },
    hasErrors() {
      return Object.values(this.errors).some((v) => v !== null);
    },
  },

  methods: {
    async save() {
      this.validate();

      if (this.hasErrors) return;

      try {
        if (this.mode === "add") {
          await axios.post(`/hotelier-item`, this.item);
        }

        if (this.mode === "edit") {
          await axios.put(`/hotelier-item/${this.item.id}`, this.item);
        }

        this.$router.push(`/hotelier/${this.item.hotelierId}`);
      } catch (error) {
        alert("Unexpected error happened.");
      }
    },

    validate() {
      // I'd rather use a validation library, but I wanted to reduce the number of user thrid party libraries following what mentioned in the requirements.
      let forbiddenWords = ["Free", "Offer", "Book", "Website"];

      this.errors = {
        name: null,
        rating: null,
        category: null,
        image: null,
        reputation: null,
        price: null,
        availability: null,
        city: null,
        state: null,
        country: null,
        zip_code: null,
        address: null,
      };

      if (!this.item.name) {
        this.errors.name = "Name is required.";
      } else if (this.item.name.length <= 10) {
        this.errors.name = "Name should be longer than 10 characters.";
      } else if (forbiddenWords.some((v) => this.item.name.toLowerCase().includes(v.toLowerCase()))) {
        this.errors.name = `Name cannot contain any of ${forbiddenWords.join(", ")}.`;
      }

      if (!this.item.rating) {
        this.errors.rating = "Rating is required.";
      } else if (this.item.rating < 0 || this.item.rating > 5) {
        this.errors.rating = "Rating should be between 0 and 5.";
      } else if (!(this.item.rating + "").match(/^\+?\d+$/)) {
        this.errors.rating = "Rating should be integer.";
      }

      if (!this.item.category) {
        this.errors.category = "Category is required.";
      }

      if (!this.item.location.city) {
        this.errors.city = "City is required.";
      }

      if (!this.item.location.state) {
        this.errors.state = "State is required.";
      }

      if (!this.item.location.country) {
        this.errors.country = "Country is required.";
      }

      if (!this.item.location.zip_code) {
        this.errors.zip_code = "Zip Code is required.";
      } else if (!(this.item.location.zip_code + "").match(/\b\d{5}\b/g)) {
        this.errors.zip_code = "Zip Code should be 5 digits.";
      }

      if (!this.item.location.address) {
        this.errors.address = "Address is required.";
      }

      if (!this.item.image) {
        this.errors.image = "Image URL is required.";
      } else if (!this.item.image.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) {
        this.errors.image = "Image URL should be valid URL.";
      }

      if (!this.item.reputation) {
        this.errors.reputation = "Reputation is required.";
      } else if (this.item.reputation < 0 || this.item.reputation > 1000) {
        this.errors.reputation = "Reputation should be between 0 and 1000.";
      } else if (!(this.item.reputation + "").match(/^\+?\d+$/)) {
        this.errors.reputation = "Reputation should be integer.";
      }
      if (!this.item.price) {
        this.errors.price = "Price is required.";
      } else if (this.item.price < 0) {
        this.errors.price = "Price should be positive number";
      } else if (!(this.item.price + "").match(/^\+?\d+$/)) {
        this.errors.price = "Price should be integer.";
      }
      if (!this.item.availability) {
        this.errors.availability = "Availability is required.";
      } else if (this.item.availability < 0) {
        this.errors.availability = "Availability should be positive number";
      } else if (!(this.item.availability + "").match(/^\+?\d+$/)) {
        this.errors.availability = "Availability should be integer.";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.HotelierItem {
  border: 1px solid #eee;
  margin-bottom: 20px;

  h1 {
    background: #eee;
    padding: 15px;
    margin-bottom: 30px;
  }

  .container {
    display: flex;
    padding-bottom: 30px;
    .preview {
      width: 250px;
      max-width: 100%;
      height: auto;
      margin-right: 30px;

      img {
        max-width: 100%;
        margin: 0 30px;
      }
    }
  }

  .control-wrapper {
    margin-bottom: 10px;
    label {
      text-align: right;
      width: 100px;
      display: inline-block;
      margin-right: 20px;
    }
    .form-control {
      width: 250px;
      height: 30px;
      box-sizing: border-box;
      padding: 5px 10px;
    }
  }

  .errors {
    margin: 0;
    color: #d9534f;
    padding-left: 40px;
    li {
      margin-bottom: 10px;
    }
  }

  .error {
    color: #d9534f;
    font-size: 12px;
    padding-left: 120px;
    margin-top: 5px;
    margin-bottom: 10px;
  }

  .buttons {
    margin-top: 30px;
    margin-left: 120px;
  }
  .btn {
    margin-right: 20px;
    background-color: #237fac;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
}
</style>
