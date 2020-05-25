<template>
  <b-navbar toggleable="md">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand class="navbar-brand" to="/"
      >Project Odysseus</b-navbar-brand
    >
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="navbar-wrapper">
        <b-nav-item to="/upload"
          ><ion-icon name="add-outline"></ion-icon>
          <p>Add</p></b-nav-item
        >
        <b-nav-item href="#" @click.prevent="login" v-if="!activeUser">
          <ion-icon name="log-in-outline"></ion-icon>
          <p>Login</p></b-nav-item
        >
        <b-nav-item href="#" @click.prevent="logout" v-else>
          <ion-icon name="log-out-outline"></ion-icon>
          <p>Logout</p></b-nav-item
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Header",
  props: ["login", "logout", "activeUser"]
};
</script>

<style scoped>
.navbar {
  background-color: #ff6ad5;
  z-index: 999;
  box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.57);
  -webkit-box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.57);
}

.navbar-brand {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 18px;
  color: #fff !important;
}

.navbar-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.nav-link {
  color: #fff !important;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.nav-link p {
  margin: 0;
  display: none;
}

ion-icon {
  font-size: 25px;
  margin-right: 5px;
}

@media only screen and (max-width: 600px) {
  .navbar-wrapper {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
  }

  .nav-link p {
    margin: 0;
    display: block;
  }
}
</style>
