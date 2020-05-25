<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Upload Manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Updated At</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="upload in uploads" :key="upload.id">
              <td>{{ upload.id }}</td>
              <td>{{ upload.title }}</td>
              <td>{{ upload.updatedAt }}</td>
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
        <b-card :title="model.id ? 'Edit Upload ID#' + model.id : 'New Upload'">
          <form @submit.prevent="saveUpload">
            <b-form-group label="Artist">
              <b-form-input type="text" v-model="model.artist"></b-form-input>
            </b-form-group>
            <b-form-group label="Title">
              <b-form-input type="text" v-model="model.title"></b-form-input>
            </b-form-group>
            <b-form-group label="Youtube URL">
              <b-form-input type="text" v-model="model.src"></b-form-input>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Upload</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from "@/api";
export default {
  data() {
    return {
      loading: false,
      uploads: [],
      model: {}
    };
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
      this.model = Object.assign({}, upload);
    },
    async saveUpload() {
      if (this.model.id) {
        await api.updateUpload(this.model.id, this.model);
      } else {
        await api.createUpload(this.model);
      }
      this.model = {}; // reset form
      await this.refreshUploads();
    },
    async deleteUpload(id) {
      if (confirm("Are you sure you want to delete this upload?")) {
        // if we are editing a upload we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {};
        }
        await api.deleteUpload(id);
        await this.refreshUploads();
      }
    }
  }
};
</script>
