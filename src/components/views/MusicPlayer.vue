<template>
  <div id="music-player">
    <youtube
      :video-id="videoId"
      id="video"
      player-width="100%"
      player-height="100%"
      :player-vars="{
        showInfo: 0,
        controls: 0,
        autoplay: 1,
        modestbranding: 1
      }"
      @ready="ready"
      @playing="playing"
      @ended="ended"
    ></youtube>
    <Footer
      v-bind:play="play"
      v-bind:pause="pause"
      v-bind:skipForward="skipForward"
      v-bind:skipBack="skipBack"
      v-bind:isPlaying="isPlaying"
      v-bind:currentVideo="currentVideo"
      v-bind:isCurrentVideo="isCurrentVideo"
      v-bind:currentIndex="currentIndex"
    />
  </div>
</template>

<script>
import Vue from "vue";
import VueYouTubeEmbed, { getIdFromURL } from "vue-youtube-embed";
import api from "@/api";

import Footer from "../controls/Footer";

Vue.use(VueYouTubeEmbed);

export default {
  name: "MusicPlayer",
  components: {
    Footer
  },
  data() {
    return {
      videoId: "",
      isPlaying: true,
      loading: false,
      uploads: [],
      currentVideo: {},
      currentIndex: 0,
      isCurrentVideo: false
    };
  },
  async created() {
    this.refreshUploads();
  },
  methods: {
    async refreshUploads() {
      this.loading = true;
      this.uploads = await api.getUploads();

      if (this.uploads.length > 0) {
        this.uploads = this.shuffleUploads(this.uploads);
        this.setVideo(0);
        this.isCurrentVideo = true;
      }

      this.loading = false;
    },
    ready(event) {
      this.player = event.target;
    },
    play() {
      this.player.playVideo();
    },
    playing(event) {
      // The player is playing a video.
      this.isPlaying = true;
    },
    pause() {
      this.player.pauseVideo();
      this.isPlaying = false;
    },
    skipForward() {
      if (this.currentIndex === this.uploads.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex += 1;
      }

      this.setVideo(this.currentIndex);
    },
    skipBack() {
      if (this.currentIndex === 0) {
        this.currentIndex = this.uploads.length - 1;
      } else {
        this.currentIndex -= 1;
      }

      this.setVideo(this.currentIndex);
    },
    ended(event) {
      this.skipForward();
    },
    setVideo(index) {
      this.currentIndex = index;
      this.videoId = getIdFromURL(this.uploads[index].src);
      this.currentVideo = this.uploads[index];
      this.currentVideo = {
        ...this.currentVideo,
        thumbnail: `//img.youtube.com/vi/${getIdFromURL(
          this.currentVideo.src
        )}/0.jpg`
      };
    },
    shuffleUploads(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  }
};
</script>

<style scoped>
#video {
  position: fixed;
  top: 56px;
  right: 0;
  left: 0;
  bottom: 56px;
  padding-bottom: 106px;
  min-width: 100%;
  min-height: 100%;
  pointer-events: none;
}
</style>
