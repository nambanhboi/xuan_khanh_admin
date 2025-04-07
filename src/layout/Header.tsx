import { Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import "./Header.scss";
import { Avatar, Badge, Dropdown, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { MenuProps } from "antd/lib";
import { useNavigate } from "react-router-dom";
import { router } from "../routes/router";
import { routesConfig } from "../routes/routes";
interface CustomJwtPayload extends JwtPayload {
  dvvc_id?: string; // hoặc number nếu `dvvc_id` là số
}
const HeaderLayout = () => {
  const navigate = useNavigate(); // Dùng để điều hướng

  const itemsMenu = [
    {
      key: "dang-xuat",
      label: "Đăng xuất",
    },
  ];
  // Xử lý khi chọn item trong dropdown
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "dang-xuat") {
      localStorage.removeItem("auth"); // Xóa token
      setAuth(undefined); // Cập nhật state
      navigate("/seller-center/login"); // Điều hướng về trang đăng nhập
    }
  };

  const authValue = localStorage.getItem("auth");
  const [auth, setAuth] = useState<CustomJwtPayload>();
  useEffect(() => {
    if (authValue) {
      const decoded = jwtDecode(authValue);
      setAuth(decoded);
    }
  }, []);
  return (
    <Header
      className="header-layout"
      style={{ padding: 0, background: "white" }}
    >
      <div className="left-header" style={{ height:"100%" }}>
        <img
          src="/images/logo.jpg"
          alt="DK Logo"
          style={{ height:"60%", marginTop:"10%", marginLeft:"30px" }}
        />
      </div>

      <div className="right-header">
        {/* <div className="thong-bao">
          <Badge count={5}>
            <Avatar shape="square" icon={<UserOutlined />} />
          </Badge>
        </div> */}
        <div className="nguoi-dung-avt">
          <Dropdown
            menu={{ items: itemsMenu, onClick: handleMenuClick }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar icon={<UserOutlined />} />{" "}
                {auth?.dvvc_id === "" || auth?.dvvc_id === null
                  ? "DK Administrator"
                  : "Shipper"}
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default HeaderLayout;
