import {  RouterProvider, useLocation, useNavigate } from "react-router-dom";
import { router } from "../routes/router";
import "../global.scss";

import React, { useEffect, useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import { menuItem } from "../config";
import HeaderLayout from "./Header";
import ProtectedRoute from "../routes/PrivateRoute";
import { routesConfig } from "../routes/routes";
import GroupLabel from "../components/group-label";
import { jwtDecode, JwtPayload } from "jwt-decode";

const { Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  minWidth: "12%",
  minHeight: "85vh",
  backgroundColor: "var(--color-btn-primary-text) !important"
};

const contentStyle: React.CSSProperties = {
  minHeight: 120,
  // lineHeight: "120px",
  color: "#fff",
  padding: 24,
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  backgroundColor: "#fff",
  position: 'fixed',
  bottom: '0',
  width: '100%',
  boxShadow: "0 0 2px #0000003d, 0 -2px 12px #00000014"  
};

const layoutStyle: React.CSSProperties = {
  borderRadius: 8,
  overflow: "hidden", // Ensure rounded corners apply to the entire layout
};
interface CustomJwtPayload extends JwtPayload {
  dvvc_id?: string; // hoặc number nếu `dvvc_id` là số
}
const MainLayout: React.FC<{children?: React.ReactNode, label?:string }> = ({
  children,
  label = "Chưa có tiêu đề"
}) => {
  const location = useLocation(); // Lấy thông tin route hiện tại
  const navigate = useNavigate();
  const authValue = localStorage.getItem("auth");
  const [auth, setAuth] = useState<CustomJwtPayload>();
  useEffect(()=> {
    if (authValue) {
          const decoded = jwtDecode(authValue);
          setAuth(decoded);
        }
  },[])

  const handleChangeMenu: MenuProps['onClick']  = (item:any) => {
    if(item.key === "dashboard") {
      navigate(routesConfig.dashboard);
    }
    if(item.key === "test-component") {
      navigate(routesConfig.testComponent);
    }
    if(item.key === "quan-ly-danh-muc") {
      navigate(routesConfig.quanLyDanhMuc);
    }
    if(item.key === "danh-sach-san-pham") {
      navigate(routesConfig.quanLySanPham);
    }
    if(item.key === "nhap-kho") {
      navigate(routesConfig.nhapKho);
    }
    if(item.key === "don-hang") {
      navigate(routesConfig.quanLyDonHang);
    }
    if(item.key === "ma-giam-gia") {
      navigate(routesConfig.quanLyMaGiamGia);
    }
    if(item.key === "chuong-trinh-marketing") {
      navigate(routesConfig.chuongTrinhMarketing);
    }
    if(item.key === "quang-cao") {
      navigate(routesConfig.quangCao);
    }
    if(item.key === "don-vi-van-chuyen") {
      navigate(routesConfig.donViVanChuyen);
    }
    if(item.key === "doanh-thu") {
      navigate(routesConfig.doanhThu);
    }
    if(item.key === "so-du") {
      navigate(routesConfig.SoDu);
    }
    if(item.key === "tai-khoan-ngan-hang") {
      navigate(routesConfig.taiKhoanNganHang);
    }
    if(item.key === "cau-hinh-he-thong") {
      navigate(routesConfig.cauHinhHeThong);
    }
    if(item.key === "cau-hinh") {
      navigate(routesConfig.cauHinh);
    }
    if(item.key === "quan-ly-khach-hang") {
      navigate(routesConfig.quanLyKhachHang);
    }
    if(item.key === "quan-ly-danh-gia") {
      navigate(routesConfig.quanLyDanhGia);
    }
  }
  // Kiểm tra nếu route là "/login"
  if (location.pathname === "/login") {
    return <RouterProvider router={router} />;
  }
  

  return (
    <Layout style={layoutStyle}>
      <HeaderLayout />
      <Layout>
        <Sider width="15%" style={siderStyle}>
          <Menu
            theme="light"
            mode="inline"
            style={{ backgroundColor: "white !important" }} // Match Sider background
            defaultSelectedKeys={["1"]}
            items={menuItem}
            onClick={handleChangeMenu}
          />
        </Sider>
        <Content style={contentStyle}>
          <div style={{ padding: 24 }}>{children}</div>
        </Content>
      </Layout>
      <Footer style={footerStyle}>
        DK ©{new Date().getFullYear()} Created by Dương Xuân Khánh
      </Footer>
    </Layout>
  );
};

export default MainLayout;
