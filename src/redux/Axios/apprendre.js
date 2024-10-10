import axios from "axios";

export const apprendre = axios.create({
    baseURL: "http://localhost:5000/api/apprendres"
  });

  // export const featuredCategory = axios.create({
  //   baseURL: "http://localhost:8000/api/category/",
  //   params: {featured: true}
  // });

