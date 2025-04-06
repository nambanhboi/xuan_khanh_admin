import axios, { AxiosResponse } from "axios";
import { axiosConfig, axiosCustom, BASE_URL } from "../../config/configApi";

// Hàm gọi API để thêm mới mã giảm giá
export const addMaGiamGia:  (postData: any) => Promise<AxiosResponse<any>> = (postData: any) => {
return axiosConfig.post('/api/ma-giam-gia', postData);
};
