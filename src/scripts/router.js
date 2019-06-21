import Vue from "vue";
import Router from "vue-router";
import Demo from "./pages/Demo.vue";

Vue.use(Router);

const routes = [
    {
        path: "/demo",
        name: "Demo",
        component: Demo,
        meta: {
            description: ""
        }
    }
];

export default new Router({
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    linkActiveClass: "is-active",
    linkExactActiveClass: "is-exact-active",
    routes
});
