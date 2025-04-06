import React, { useEffect } from "react";
import { Modal, Button, Typography, Divider } from "antd";
import "./phieu-giao-hang.scss";
import Barcode from "react-barcode";
import { formatDate } from "../../../../../config/common";
import ShowToast from "../../../../../components/show-toast/ShowToast";
import { axiosConfig } from "../../../../../config/configApi";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  data?: any;
  handleRefresh?:()=> void
};

const ShippingLabelModal: React.FC<Props> = ({
  isVisible,
  onClose,
  handleRefresh,
  data,
}) => {


  useEffect(()=> {
    console.log("data:::", data);
    
  },[data])
  // Nếu data chưa có, hiển thị loading hoặc giá trị mặc định
  if (!data) {
    return null; // hoặc <p>Đang tải dữ liệu...</p>;
  }


  const maDonHang = data.ma_don_hang || "12312374928731HNVTP";
  const handlePrint = () => {
    window.print();

    setTimeout(() => {
      //gọi api xử lý đơn hàng
      const dataBody = {
        id: data.id,
        trang_thai: 2,
      };
      axiosConfig
        .put(`api/don-hang/xu-ly/${data.id}`, dataBody)
        .then(() => {
          ShowToast("success", "Thông báo", "Chuẩn bị đơn hàng thành công", 3);
          onClose();
          handleRefresh?.()
        })
        .catch(() => {
          ShowToast("error", "Thông báo", "Có lỗi xảy ra", 3);
        });
    }, 500); // Đợi 500ms sau khi in xong
  };
  return (
    <Modal
      centered
      title="Phiếu Giao Hàng"
      open={isVisible}
      onCancel={onClose}
      footer={
        <div style={{ display: "flex", gap: "16px", justifyContent:"flex-end" }}>
            <Button key="print" type="primary" onClick={handlePrint}>
                In Phiếu
            </Button>
            <Button key="close" onClick={onClose}>
                Đóng
            </Button>
        </div>
      }
      width={600}
    >
      <div className="shipping-label">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Barcode value={maDonHang} displayValue={false} lineColor="black" />
          {data.ma_don_hang}
        </div>

        <Divider style={{ borderColor: "#black", margin: "0 !important" }}>
          Chi tiết
        </Divider>
        <Typography.Text style={{ fontWeight: "bold" }}>
          Người nhận: {data.tai_khoan.ten || data.tai_khoan.tai_khoan}
        </Typography.Text>
        <Typography.Text>Ngày đặt: {formatDate(data.ngay_mua)}</Typography.Text>
        {/* số điện thoại */}
        <Typography.Text>
          Số điện thoại: {data.tai_khoan.so_dien_thoai}
        </Typography.Text>
        {/* địa chỉ */}
        <Typography.Text>Địa chỉ: {data.tai_khoan.dia_chi}</Typography.Text>


        {/* Thông tin sản phẩm */}
        <Divider style={{ borderColor: "#black", margin: "0 !important" }}>
          Sản phẩm
        </Divider>
        {
          data.ds_chi_tiet_don_hang.map((item:any)=> {
            return (
              <Typography.Text style={{ fontWeight: "bold" }}>
                {item.ten_san_pham} {item.kich_thuoc ? ` - ${item.kich_thuoc}` : ""} {item.mau_sac ? ` - ${item.mau_sac}` : ""} - SL: {item.so_luong} - {item.thanh_tien.toLocaleString("vi-VN", {style: "currency",currency: "VND",})}
              </Typography.Text>
            )
          })
        }

        <Divider style={{ borderColor: "#black", margin: "0 !important" }}>
        </Divider>
        <Typography.Title className="shipping-label-title">
          Số tiền thu hộ:{" "}
          {data.thanh_tien.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </Typography.Title>
      </div>
    </Modal>
  );
};

export default ShippingLabelModal;
