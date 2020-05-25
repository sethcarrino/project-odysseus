<template>
  <div id="music-player">
    <youtube
      :video-id="videoId"
      id="video"
      player-width="100%"
      player-height="100%"
    ></youtube>
  </div>
</template>

<script>
import Vue from "vue";
import VueYouTubeEmbed, { getIdFromURL } from "vue-youtube-embed";
Vue.use(VueYouTubeEmbed);

export default {
  name: "MusicPlayer",
  data() {
    return {
      videoId: getIdFromURL("https://www.youtube.com/embed/8GW6sLrK40k")
    };
  }
};
</script>

<style scoped>
#music-player {
  position: fixed;
  top: 56px;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}

#video {
  position: fixed;
  top: 56px;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}
</style>
