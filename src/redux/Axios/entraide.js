import axios from "axios";

export const entraide = axios.create({
    baseURL: "http://localhost:5000/api/entraides"
  });

  // export const featuredCategory = axios.create({
  //   baseURL: "http://localhost:8000/api/category/",
  //   params: {featured: true}
  // });
