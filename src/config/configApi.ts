import axios from "axios";
import { log } from "console";
import { useNavigate } from "react-router-dom";
import { refreshToken } from "../services/AuthenServices";
import ShowToast from "../components/show-toast/ShowToast";
import { Modal } from "antd";


export const BASE_URL = process.env.REACT_APP_BASE_API_URL;
export const axiosCustom: any = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 60 * 60 * 10,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});
export const axiosConfigUpload: any = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 60 * 60 * 10,
  withCredentials: false,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
export const axiosConfig: any = axios.create({
    baseURL: BASE_URL,
    timeout: 1000 * 60 * 60 * 10,
    withCredentials: false,
    headers: {
      "Content-Type": "application/json",
    },
  });

axiosConfig.interceptors.request.use(
  
    (config: any) => {

      const auth = localStorage.getItem("auth");
      if(auth) {
        config.headers["Authorization"] = `Bearer ${JSON.parse(auth).token}`;        
      }
      return config;
    },

    (error: any) => {
      return Promise.reject(error);
    }
);

axiosConfig.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (error.response && error.response.status === 401) {
      //xử lý khi hết hạn token
      refreshToken({refreshToken: JSON.parse(localStorage.getItem("auth")!).refreshToken})
      .then(async (res:any)=> {
        if(res.data.errrorMessage && res.data.errrorMessage === "Refresh Token đã hết hạn") {
          localStorage.removeItem("auth");
          await ShowToast("warning", "Thông báo", "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
          setTimeout(() => {
            window.location.href = '/seller-center/login';
          }, 2000);
        }
        else{
          localStorage.setItem("auth", JSON.stringify(res.data));
        }
      })
      .catch(async (err: any) => {
        await ShowToast("error", "Lỗi", "Lỗi khi lấy access token mới");
      });
    }
    return Promise.reject(error);
  }
);