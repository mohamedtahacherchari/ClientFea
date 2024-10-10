import axios from "axios";

export const sadaqa = axios.create({
    baseURL: "http://localhost:5000/api/sadaqas"
  });

  // export const featuredCategory = axios.create({
  //   baseURL: "http://localhost:8000/api/category/",
  //   params: {featured: true}
  // });