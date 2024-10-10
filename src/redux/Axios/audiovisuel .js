import axios from "axios";

export const audiovisuel = axios.create({
    baseURL: "http://localhost:5000/api/audiovisuels"
  });

  // export const featuredCategory = axios.create({
  //   baseURL: "http://localhost:8000/api/category/",
  //   params: {featured: true}
  // });

