import axios from "axios";

export const education = axios.create({
    baseURL: "http://localhost:5000/api/educations"
  });

  // export const featuredCategory = axios.create({
  //   baseURL: "http://localhost:8000/api/category/",
  //   params: {featured: true}
  // });
