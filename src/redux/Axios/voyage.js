import axios from "axios";

export const voyage = axios.create({
    baseURL: "http://localhost:5000/api/voyages"
  });

  // export const featuredCategory = axios.create({
  //   baseURL: "http://localhost:8000/api/category/",
  //   params: {featured: true}
  // });