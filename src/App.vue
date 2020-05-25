<template>
  <div id="app">
    <Header
      v-bind:login="login"
      v-bind:logout="logout"
      v-bind:activeUser="activeUser"
    />
    <!-- routes will be rendered here -->
    <router-view />
  </div>
</template>

<script>
import Header from "./components/ui/Header";

export default {
  name: "app",
  components: {
    Header
  },
  data() {
    return {
      activeUser: null
    };
  },
  async created() {
    await this.refreshActiveUser();
  },
  watch: {
    // everytime a route is changed refresh the activeUser
    $route: "refreshActiveUser"
  },
  methods: {
    login() {
      this.$auth.loginRedirect();
    },
    async refreshActiveUser() {
      this.activeUser = await this.$auth.getUser();
    },
    async logout() {
      await this.$auth.logout();
      await this.refreshActiveUser();
      this.$router.push("/");
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Heebo&family=Roboto&family=Source+Sans+Pro&display=swap");

body {
  font-family: "Source Sans Pro", sans-serif;
}
</style>
