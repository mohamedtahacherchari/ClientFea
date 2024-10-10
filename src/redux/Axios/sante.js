import axios from "axios";

export const sante = axios.create({
    baseURL: "http://localhost:5000/api/santes"
  });

  // export const featuredCategory = axios.create({
  //   baseURL: "http://localhost:8000/api/category/",
  //   params: {featured: true}
  // });