import  { AxiosResponse } from "axios";
import { axiosConfig, } from "../../config/configApi";

export const GetRevenueStats:  (startDate: any, endDate: any) => Promise<AxiosResponse<any>> = (startDate: any, endDate: any) => {
    return axiosConfig.get('/api/doanh-thu/thong-ke?startDate=' + startDate + '&endDate=' + endDate);
};

export const GetDashboardStats:  (startDate: any, endDate: any) => Promise<AxiosResponse<any>> = (startDate: any, endDate: any) => {
    return axiosConfig.get('/api/doanh-thu/dashboard?startDate=' + startDate + '&endDate=' + endDate);
};
