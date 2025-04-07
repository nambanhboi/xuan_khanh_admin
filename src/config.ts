import { CarOutlined, ControlOutlined, DollarOutlined, NotificationOutlined, PieChartOutlined, ProductOutlined, SettingOutlined, StarOutlined, TeamOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import React from 'react';


export const config = {
    
}

export const menuItem :MenuProps["items"] = [
    {
      key: "thong-ke",
      icon: React.createElement(PieChartOutlined), 
      label: "Thống kê",
      children: [
        {
          key: "dashboard",
          label: "Dashboard",
        },
      ],
    },
    {
      key: "quan-ly-khach-hang",
      icon: React.createElement(UsergroupAddOutlined), 
      label: "Quản lý khách hàng",
    },
    {
      key: "quan-ly-danh-gia",
      icon: React.createElement(StarOutlined), 
      label: "Quản lý đánh giá",
    },
    {
      key: "quan-ly-san-pham",
      icon: React.createElement(ProductOutlined), 
      label: "Quản lý sản phẩm",
      children: [
        {
          key: "quan-ly-danh-muc",
          label: "Quản lý danh mục",
        },
        {
          key: "danh-sach-san-pham",
          label: "Danh sách sản phẩm",
        },
        {
          key: "don-hang",
          label: "Đơn hàng",
        },
      ],
    },
    // {
    //   key: "van-hanh",
    //   icon: React.createElement(ControlOutlined), 
    //   label: "Vận hành",
    //   children: [
    //     {
    //       key: "nhap-kho",
    //       label: "Nhập kho",
    //     },
    //   ],
    // },
    {
      key: "marketing",
      icon: React.createElement(NotificationOutlined), 
      label: "Marketing",
      children: [
        {
          key: "ma-giam-gia",
          label: "Quản lý mã giảm giá",
        },
        // {
        //   key: "chuong-trinh-marketing",
        //   label: "Chương trình marketing",
        // },
        // {
        //   key: "quang-cao",
        //   label: "Quảng cáo",
        // },
      ],
    },
    // {
    //   key: "don-vi-van-chuyen",
    //   icon: React.createElement(CarOutlined), 
    //   label: "Đơn vị vận chuyển",
    // },
    {
      key: "tai-chinh",
      icon: React.createElement(DollarOutlined), 
      label: "Tài chính",
      children: [
        {
          key: "doanh-thu",
          label: "Doanh thu",
        },
        {
          key: "so-du",
          label: "Số dư",
        },
        // {
        //   key: "tai-khoan-ngan-hang",
        //   label: "Tài khoản ngân hàng",
        // },
      ],
    },
    {
      key: "cau-hinh",
      icon: React.createElement(UserOutlined), 
      label: "Cấu hình hệ thống",
    },
    // {
    //   key: "test-component",
    //   icon: React.createElement(SettingOutlined), 
    //   label: "Common Component",
    // },
  ];

// export const menuItemVC :MenuProps["items"] = [
//   {
//     key: "shipper-vc",
//     icon: React.createElement(ControlOutlined), 
//     label: "Đơn hàng",
//     children: [
//       {
//         key: "don-hang-vc",
//         label: "Đơn hàng",
//       },
//     ],
//   },
// ]