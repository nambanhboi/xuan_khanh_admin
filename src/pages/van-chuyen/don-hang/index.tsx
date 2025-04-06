import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import TableCustom from "../../../components/table/table-custom";
import StatusTable from "../../admin-page/van-hanh/don-hang/components/statusTable";
import ButtonCustom from "../../../components/button/button";
import { Modal, Spin } from "antd";

const DonHangVanChuyen:React.FC = () => {
    return (
        <MainLayout label="Đơn hàng">
                <StatusTable trang_thai={3} is_ship={true}/>
        </MainLayout>
    )
}

export default DonHangVanChuyen;