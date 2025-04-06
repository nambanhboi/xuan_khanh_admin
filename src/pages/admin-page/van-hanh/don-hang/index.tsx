import React, { useState } from "react";
import MainLayout from "../../../../layout/MainLayout";
import { Spin, Tabs } from "antd";
import "./style.scss";
import StatusTable from "./components/statusTable";
type DonHangProps = {};

const DonHang: React.FC<DonHangProps> = ({}) => {

  const items = [
    {
      key: Math.random().toString(),
      label: `Đơn hàng `,
      children: (<StatusTable trang_thai={1}/>)
    },
    {
      key: Math.random().toString(),
      label: `Chờ lấy hàng `,
      children: (<StatusTable trang_thai={2}/>)
    },
    {
      key: Math.random().toString(),
      label: `đang giao `,
      children: (<StatusTable trang_thai={3}/>)
    },
    {
      key: Math.random().toString(),
      label: `Đã giao `,
      children: (<StatusTable trang_thai={4}/>)
    },
    {
      key: Math.random().toString(),
      label: `Trả hàng/Hủy`,
      children: (<StatusTable trang_thai={5}/>)
    },
  ]
  return (
    <MainLayout label="Danh sách đơn hàng">
        <Tabs
          defaultActiveKey="1"
          type="card"
          style={{ marginBottom: 32 }}
          items={items}
        />
    </MainLayout>
  );
};

export default DonHang;
