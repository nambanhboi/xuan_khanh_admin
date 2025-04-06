import  { AxiosResponse } from "axios";
import { axiosConfig, } from "../../config/configApi";

export const RepDanhGia:  (id: string, postData: any) => Promise<AxiosResponse<any>> = (id: string, postData: any) => {
    return axiosConfig.put(`/api/danh-gia/${id}`, postData);
};
