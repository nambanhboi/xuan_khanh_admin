import { createBrowserRouter, Navigate } from "react-router-dom";
import React from "react";
import Dashboard from "../pages/admin-page/Dashboard/index";
import AdminLogin from "../pages/admin-page/Authen/AdminLogin";
import NotFoundPage from "../notFoundPage";
import ProtectedRoute from "./PrivateRoute";
import TestComponent from "../pages/admin-page/TestComponent";
import { routesConfig } from "./routes";
import QuanLyDanhMuc from "../pages/admin-page/quan-ly-san-pham/quan-ly-danh-muc";
import DanhSachSanPham from "../pages/admin-page/quan-ly-san-pham/danh-sach-san-pham";
import ThemSanPham from "../pages/admin-page/quan-ly-san-pham/danh-sach-san-pham/components/them-san-pham";
import DanhSachKhachHang from "../pages/admin-page/quan-ly-khach-hang/danh-sach-khach-hang";
import SuaSanPham from "../pages/admin-page/quan-ly-san-pham/danh-sach-san-pham/components/sua-san-pham";
import NhapKho from "../pages/admin-page/van-hanh/nhap-kho";
import DonHang from "../pages/admin-page/van-hanh/don-hang";
import ChiTietPhieuNhap from "../pages/admin-page/van-hanh/nhap-kho/chi-tiet-phieu/CtPhieuNhap";
import AccountInfo from "../pages/admin-page/cau-hinh";
import DanhSachMaGiamGia from "../pages/admin-page/quan-ly-ma-giam-gia/danh-sach";
import DanhSachChuongTrinhMarketing from "../pages/admin-page/quan-ly-chuong-trinh-marketing/danh-sach";
import RevenueStats from "../pages/admin-page/doanh-thu";
import DonHangVanChuyen from "../pages/van-chuyen/don-hang";
import SoDu from "../pages/admin-page/doanh-thu/so-du";
import QuanLyDanhGia from "../pages/admin-page/quan-ly-danh-gia";

export const router = createBrowserRouter([
  {
    path: "trang-chu",
    element: <>trang chủ</>,
  },
  //người bán
  {
    path: "seller-center",
    children: [
      {
        path: "login",
        element: <AdminLogin />,
      },
      {
        path: routesConfig.dashboard,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: routesConfig.testComponent,
        element: (
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        ),
      },
      //quản lý sản phẩm
      {
        path: routesConfig.quanLyDanhMuc,
        element: (
          <ProtectedRoute>
            <QuanLyDanhMuc />
          </ProtectedRoute>
        ),
      },
      {
        path: routesConfig.quanLySanPham,
        element: (
          <ProtectedRoute>
            <DanhSachSanPham />
          </ProtectedRoute>
        ),
      },
      {
        path: routesConfig.themMoiSanPham,
        element: (
          <ProtectedRoute>
            <ThemSanPham />
          </ProtectedRoute>
        ),
      },
      {
        path: `${routesConfig.suaSanPham}/:ma_san_pham`,
        element: (
          <ProtectedRoute>
            <SuaSanPham />
          </ProtectedRoute>
        ),
      },
      // quản lý khách hàng
      {
        path: routesConfig.quanLyKhachHang,
        element: (
          <ProtectedRoute>
            <DanhSachKhachHang />
          </ProtectedRoute>
        ),
      },
      // quản lý mã giảm giá
      {
        path: routesConfig.quanLyMaGiamGia,
        element: (
          <ProtectedRoute>
            <DanhSachMaGiamGia />
          </ProtectedRoute>
        )
      },
      // quản lý mã giảm giá
      {
        path: routesConfig.quanLyDanhGia,
        element: (
          <ProtectedRoute>
            <QuanLyDanhGia />
          </ProtectedRoute>
        )
      },

      // quản lý chương trình mar
      {
        path: routesConfig.chuongTrinhMarketing,
        element: (
          <ProtectedRoute>
            <DanhSachChuongTrinhMarketing />
          </ProtectedRoute>
        )
      },
      //doanh thu
      {
        path: routesConfig.doanhThu,
        element: (
          <ProtectedRoute>
            <RevenueStats />
          </ProtectedRoute>
        )
      },
      {
        path: routesConfig.SoDu,
        element: (
          <ProtectedRoute>
            <SoDu />
          </ProtectedRoute>
        )
      },

      //vận hành
      {
        path: routesConfig.nhapKho,
        element: (
          <ProtectedRoute>
            <NhapKho />
          </ProtectedRoute>
        ),
      },
      {
        path: `${routesConfig.chiTietPhieuNhap}/:id`,
        element: (
          <ProtectedRoute>
            <ChiTietPhieuNhap label="Sửa yêu cầu nhập kho" type="edit"/>
          </ProtectedRoute>
        ),
      },
      {
        path: `${routesConfig.themPhieuNhap}`,
        element: (
          <ProtectedRoute>
            <ChiTietPhieuNhap label="Thêm mới yêu cầu nhập kho" type="add"/>
          </ProtectedRoute>
        ),
      },
      {
        path: routesConfig.quanLyDonHang,
        element: (
          <ProtectedRoute>
            <DonHang />
          </ProtectedRoute>
        ),
      },

      //cấu hình
      {
        path: routesConfig.cauHinh,
        element: (
          <ProtectedRoute>
            <AccountInfo />
          </ProtectedRoute>
        )
      }
    ]
  },

  //shipper
  {
    path: "van-chuyen",
    children:[
      {
        path: "don-hang",
        element: <ProtectedRoute><DonHangVanChuyen /></ProtectedRoute>,
      },
    ]
  },

  //các trường hợp khác
  //path mặc định
  {
    path: "",
    element: <Navigate to="/seller-center/dashboard" replace />,
  },
  //404 not found
  {
    path: "not-found",
    element: <NotFoundPage />, // Hiển thị trang 404
  },
  {
    path: "*",
    element: <Navigate to="/not-found" replace />, // Chuyển hướng đến /not-found nếu đường dẫn không hợp lệ
  },
]);
