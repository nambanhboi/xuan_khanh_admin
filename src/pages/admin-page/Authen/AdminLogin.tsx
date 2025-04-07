import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  notification,
  Spin,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./AdminLogin.scss";
import { loginAdmin } from "../../../services/AuthenServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowToast from "../../../components/show-toast/ShowToast";
import { jwtDecode, JwtPayload } from "jwt-decode";

const { Title, Text } = Typography;
interface CustomJwtPayload extends JwtPayload {
  dvvc_id?: string; // hoặc number nếu `dvvc_id` là số
}
const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    const body = {
      tai_khoan: values.tai_khoan,
      mat_khau: values.mat_khau,
      is_super_admin: true,
    };
    await loginAdmin(body)
      .then((res: any) => {
        localStorage.setItem("auth", JSON.stringify(res.data));
        var dataUser = jwtDecode<CustomJwtPayload>(res.data.token)
        if(dataUser.dvvc_id === null || dataUser.dvvc_id === ''){
          navigate("/seller-center/dashboard");
          ShowToast(
            "success",
            "Đăng nhập thành công",
            "Chào mừng bạn đến với DK Seller Center"
          );
        }else{
          navigate("/van-chuyen/don-hang");
          ShowToast(
            "success",
            "Đăng nhập thành công",
            "Chào mừng bạn đến với DK Seller Center"
          );
        }
      })
      .catch((err: any) => {
        ShowToast(
          "error",
          "Đăng nhập thất bại",
          "Tài khoản hoặc mật khẩu không đúng"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Spin spinning={loading}>
      <div className="admin-login-container">
        <Card className="login-card">
          <div className="login-title">
            <img
              src="/images/logo.jpg"
              alt="DK Logo"
              style={{ width: "50%" }}
            />
            <Title level={3}>DK Seller Center</Title>
          </div>

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            className="login-form"
          >
            <Form.Item
              name="tai_khoan"
              rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="mat_khau"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
                size="large"
              >
                LOGIN
              </Button>
            </Form.Item>

            <div className="login-links">
              <Text>
                <a href="#">Quên mật khẩu?</a>
              </Text>
            </div>
          </Form>
        </Card>
      </div>
    </Spin>
  );
};

export default AdminLogin;
