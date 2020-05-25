import Vue from "vue";
import Router from "vue-router";
import MusicPlayer from "@/components/views/MusicPlayer";
import UploadManager from "@/components/views/UploadManager";
import Auth from "@okta/okta-vue";

Vue.use(Auth, {
  issuer: "https://dev-962752.okta.com/oauth2/default",
  client_id: "0oad15qvxa4L2Gnfj4x6",
  redirect_uri: "http://localhost:8080/implicit/callback",
  scope: "openid profile email"
});

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "MusicPlayer",
      component: MusicPlayer
    },
    {
      path: "/implicit/callback",
      component: Auth.handleCallback()
    },
    {
      path: "/upload",
      name: "UploadManager",
      component: UploadManager,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
