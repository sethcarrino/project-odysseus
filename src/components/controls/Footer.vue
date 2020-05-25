<template>
  <div id="footer">
    <div class="footer-wrapper">
      <div class="info-container">
        <div class="image-container">
          <img :src="currentVideo.thumbnail" />
        </div>
        <div class="track-info" v-if="isCurrentVideo">
          <p class="track-artist">{{ currentVideo.artist }}</p>
          <p class="track-title">{{ currentVideo.title }}</p>
        </div>
        <div class="track-info" v-else>
          <p class="track-artist">No Artist Available</p>
          <p class="track-title">
            Please upload your favorite Vaporwave songs to get started
          </p>
        </div>
      </div>
      <div class="controls-container" v-if="isCurrentVideo">
        <div class="skip-back control-icon" v-on:click="skipBack">
          <ion-icon name="play-skip-back-outline"></ion-icon>
        </div>
        <div
          class="play-pause control-icon"
          v-on:click="play"
          v-if="!isPlaying"
        >
          <ion-icon name="play-circle-outline"></ion-icon>
        </div>
        <div class="play-pause control-icon" v-on:click="pause" v-else>
          <ion-icon name="pause-circle-outline"></ion-icon>
        </div>
        <div class="skip-forward control-icon" v-on:click="skipForward">
          <ion-icon name="play-skip-forward-outline"></ion-icon>
        </div>
      </div>
      <div v-else />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "Footer",
  props: [
    "play",
    "pause",
    "skipForward",
    "skipBack",
    "isPlaying",
    "currentVideo",
    "isCurrentVideo",
    "currentIndex"
  ]
};
</script>

<style scoped>
#footer {
  height: 56px;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  background-color: #202020;
  box-shadow: 0px -5px 16px 0px rgba(0, 0, 0, 0.68);
  -webkit-box-shadow: 0px -5px 16px 0px rgba(0, 0, 0, 0.68);
  -moz-box-shadow: 0px -5px 16px 0px rgba(0, 0, 0, 0.68);
}

.footer-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.info-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
}

.image-container {
  height: 40px;
  width: 40px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
}

.track-artist,
.track-title {
  color: #fff;
  margin: 0;
  margin-left: 10px;
}

.track-artist {
  text-transform: uppercase;
}
.track-title {
  font-size: 12px;
}

.controls-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.control-icon {
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}

.control-icon:hover {
  cursor: pointer;
  opacity: 0.7;
}

ion-icon {
  color: #fff;
  font-size: 20px;
}
</style>
