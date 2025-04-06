import {  RouterProvider, useLocation, useNavigate } from "react-router-dom";
import { router } from "../routes/router";
import "../global.scss";

import React, { useEffect, useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import { menuItem, menuItemVC } from "../config";
import HeaderLayout from "./Header";
import ProtectedRoute from "../routes/PrivateRoute";
import { routesConfig } from "../routes/routes";
import GroupLabel from "../components/group-label";
import { jwtDecode, JwtPayload } from "jwt-decode";

const { Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
  backgroundColor: "var(--color-primary-9)"
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
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          style={{ backgroundColor: "var(--color-primary-9)" }}
          defaultSelectedKeys={["1"]}
          items={(auth?.dvvc_id === '' || auth?.dvvc_id === null) ? menuItem : menuItemVC}
          onClick={handleChangeMenu}
        />
      </Sider>
      <Layout style={{ marginInlineStart: 200 }}>
        <HeaderLayout />
        <GroupLabel label={label}/>
        <Content style={{ margin: "24px 16px 0", overflow: "initial", minHeight: "80vh" }}>
          <div
            style={{
              padding: 24,
              background: "var(--color-primary-1)"
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "end",
            background: "var(--color-primary-1)",
            borderTop: "1px solid var(--color-primary-2)"
          }}
        >
          G-connect seller center ©{new Date().getFullYear()} Created by Vũ Vương Lâm
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
