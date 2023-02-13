import { setupInterceptor } from "./interceptor";
import axios from "axios"
import { BaseUrl } from "./environment";



const axiosInstance = setupInterceptor(axios.create())

export const apiGet = async (path) => axiosInstance.get(`${BaseUrl}${path}`)

export const apiPost = async (path, data) => axiosInstance.post(`${BaseUrl}${path}`, data)

export const apiPut = async (path, data) => axiosInstance.put(`${BaseUrl}${path}`, data)

export const apiDelete = async (path) => axiosInstance.delete(`${BaseUrl}${path}`)