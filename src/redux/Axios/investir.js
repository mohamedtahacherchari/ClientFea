import axios from "axios";

export const investir = axios.create({
    baseURL: "http://localhost:5000/api/investirs"
  });

  // export const featuredCategory = axios.create({
  //   baseURL: "http://localhost:8000/api/category/",
  //   params: {featured: true}
  // });