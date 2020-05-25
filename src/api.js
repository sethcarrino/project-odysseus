import Vue from "vue";
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8081/",
  json: true
});

export default {
  async execute(method, resource, data) {
    // inject the accessToken for each request
    let accessToken = await Vue.prototype.$auth.getAccessToken();
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(req => {
      return req.data;
    });
  },
  getUploads() {
    return this.execute("get", "/uploads");
  },
  getUpload(id) {
    return this.execute("get", `/uploads/${id}`);
  },
  createUpload(data) {
    return this.execute("post", "/uploads", data);
  },
  updateUpload(id, data) {
    return this.execute("put", `/uploads/${id}`, data);
  },
  deleteUpload(id) {
    return this.execute("delete", `/uploads/${id}`);
  }
};
