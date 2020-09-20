import Vue from "vue";
import VueRouter from "vue-router";
import Hoteliers from "../views/Hoteliers.vue";
import HotelierItems from "../views/HotelierItems.vue";
import HotelierItem from "../views/HotelierItem.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Hoteliers",
    component: Hoteliers,
  },
  {
    path: "/hotelier/:id",
    name: "HotelierItems",
    component: HotelierItems,
  },
  {
    path: "/hotelier/:hotelierId/add",
    name: "add-hotelier-item",
    component: HotelierItem,
  },

  {
    path: "/hotelier/:hotelierId/view/:id",
    name: "view-hotelier-item",
    component: HotelierItem,
  },

  {
    path: "/hotelier/:hotelierId/edit/:id",
    name: "edit-hotelier-item",
    component: HotelierItem,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
