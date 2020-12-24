<template>
  <div class="container-fluid mt-4">
    <div class="upload-header-wrapper">
      <h1 class="h1">UPLOAD MANAGER</h1>
      <b-btn class="home-btn" to="/" v-if="!loading && uploads.length > 0">
        Listen to music
      </b-btn>
    </div>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-alert :show="!loading && uploads.length === 0" variant="info">
        Please upload your first awesome vaporwave song to get started.
    </b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Artist</th>
              <th>Title</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="upload in uploads" :key="upload.id">
              <td>{{ upload.id }}</td>
              <td>
                <div class="upload-thumbnail-wrapper">
                  <img :src="createThumbnail(upload.src)" />
                </div>
              </td>
              <td>{{ upload.artist }}</td>
              <td>{{ upload.title }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateUploadToEdit(upload)"
                  >Edit</a
                >
                -
                <a href="#" @click.prevent="deleteUpload(upload.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="form.id ? 'Edit Upload ID#' + form.id : 'New Upload'">
          <form @submit.prevent="saveUpload">
            <b-form-group label="Artist*">
              <b-form-input type="text" v-model.trim="$v.form.artist.$model" :state="!$v.form.artist.$error ? null : false" />
            </b-form-group>
            <div class="error" v-if="$v.form.artist.$error">Artist name is required</div>
            <b-form-group label="Title*">
              <b-form-input type="text" v-model.trim="$v.form.title.$model" :state="!$v.form.title.$error ? null : false" />
            </b-form-group>
            <div class="error" v-if="$v.form.title.$error">Song title is required</div>
            <b-form-group label="Youtube URL*">
              <b-form-input type="text" v-model.trim="$v.form.src.$model" :state="!$v.form.src.$error ? null : false"></b-form-input>
            </b-form-group>
            <div class="error" v-if="$v.form.src.$error">YouTube URL is required</div>
            <div>
              <b-btn type="submit" variant="success" class="upload-btn" :disabled="submitStatus === 'PENDING'"
                >Save Upload</b-btn
              >
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from "@/api";
import { getIdFromURL } from "vue-youtube-embed";
import { required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      loading: false,
      uploads: [],
      form: {
        artist: '',
        title: '',
        src: ''
      },
      submitStatus: null
    };
  },
  validations: {
    form: {
      artist: {
        required,
      },
      title: {
        required,
      }, 
      src: {
        required,
      }
    }
  },
  async created() {
    this.refreshUploads();
  },
  methods: {
    async refreshUploads() {
      this.loading = true;
      this.uploads = await api.getUploads();
      this.loading = false;
    },
    async populateUploadToEdit(upload) {
      this.form = Object.assign({}, upload);
    },
    async saveUpload() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        if (this.form.id) {
          await api.updateUpload(this.form.id, this.form);
        } else {
          await api.createUpload(this.form);
        }
        this.form = {}; // reset form
        await this.refreshUploads();
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }
    },
    async deleteUpload(id) {
      if (confirm("Are you sure you want to delete this upload?")) {
        // if we are editing a upload we deleted, remove it from the form
        if (this.form.id === id) {
          this.form = {};
        }
        await api.deleteUpload(id);
        await this.refreshUploads();
      }
    },
    createThumbnail(url) {
      return `//img.youtube.com/vi/${getIdFromURL(url)}/0.jpg`;
    }
  }
};
</script>

<style scoped>
.upload-header-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.home-btn {
  background-color: #ff6ad5 !important;
  border: none;
  margin-left: 15px;
}

.upload-btn {
  background-color: #ff6ad5;
  border: none;
}

.upload-thumbnail-wrapper {
  height: 35px;
  width: 50px;
}

.upload-thumbnail-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
}

.error {
  margin-top: -10px;
  margin-bottom: 15px;
  font-size: 12px;
  color: red;
}
</style>
