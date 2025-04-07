import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../../layout/MainLayout";
import TableCustom from "../../../components/table/table-custom";
import { formatDate } from "../../../config/common";
import {
  Col,
  Divider,
  Form,
  Row,
  Modal,
  Button,
  message,
  Switch,
  Space,
} from "antd";
import DatePickerCustomOld from "../../../components/datepicker/DatePickerCustomOld";
import FormItemInput from "../../../components/form-input/FormInput";
import { axiosConfig } from "../../../config/configApi";
import { addMaGiamGia } from "../../../services/MaGiamGiaServices";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import FormSelect from "../../../components/form-select/FormSelect";

import { WechatOutlined } from "@ant-design/icons";
import ButtonCustom from "../../../components/button/button";
import { RepDanhGia } from "../../../services/DanhGia";
import ShowToast from "../../../components/show-toast/ShowToast";

type QuanLyDanhGiaProps = {};

const QuanLyDanhGia: React.FC<QuanLyDanhGiaProps> = () => {
  const navigate = useNavigate();
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  // Định nghĩa các cột cho bảng mã giảm giá
  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "ten_khach_hang",
      key: "ten_khach_hang",
      render: (item: string) => <>{item || "---"}</>,
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "ma_don_hang",
      key: "ma_don_hang",
      render: (item: string) => <>{item || "---"}</>,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "ten_san_pham",
      key: "ten_san_pham",
      render: (item: string) => <>{item || "---"}</>,
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "ma_san_pham",
      key: "ma_san_pham",
      render: (item: string) => <>{item || "---"}</>,
    },
    {
      title: "Đánh giá chất lượng",
      dataIndex: "danh_gia_chat_luong",
      key: "danh_gia_chat_luong",
      render: (item: number) => <>{item}/5</>,
    },
    {
      title: "Nội dung đánh giá",
      dataIndex: "noi_dung_danh_gia",
      key: "noi_dung_danh_gia",
      render: (item: string) => <>{item || "---"}</>,
    },
    {
      title: "Nội dung phản hồi",
      dataIndex: "noi_dung_phan_hoi",
      key: "noi_dung_phan_hoi",
      render: (item: string) => <>{item || "Chưa phản hồi"}</>,
    },
    {
      title: "Ngày đánh giá",
      dataIndex: "ngay_danh_gia",
      key: "ngay_danh_gia",
      render: (item: string) => <>{item ? item : "---"}</>,
    },
  ];

  // Hàm đóng modal
  const handleCancel = () => {
    setIsAddModalVisible(false);
    form.resetFields();
  };

  // Component chỉnh sửa mã giảm giá
  const PhanHoiComponent = () => (
    <>
      <div>
        <Form.Item
          name="noi_dung_phan_hoi"
          style={{ marginBottom: "16px" }}
          label="Nội dung phản hồi"
          rules={[
            { required: true, message: "Vui lòng nhập nội dung phản hồi" },
          ]}
        >
          <TextArea placeholder="Phản hồi đánh giá" />
        </Form.Item>
      </div>
      <Divider />
    </>
  );

  const EditComponent = () => (
    <>
      <div>
        <Form.Item name="ten_khach_hang" style={{ marginBottom: "16px" }}>
          <FormItemInput label="Tên khách hàng" disabled />
        </Form.Item>
        <Form.Item name="ma_don_hang" style={{ marginBottom: "16px" }}>
          <FormItemInput label="Mã đơn hàng" disabled />
        </Form.Item>
        <Form.Item name="ten_san_pham" style={{ marginBottom: "16px" }}>
          <FormItemInput label="Tên sản phẩm" disabled />
        </Form.Item>
        <Form.Item name="danh_gia_chat_luong" style={{ marginBottom: "16px" }}>
          <FormItemInput label="Đánh giá chất lượng" disabled />
        </Form.Item>
        <Form.Item name="noi_dung_danh_gia" style={{ marginBottom: "16px" }}>
          <FormItemInput label="Nội dung đánh giá" type="textarea" disabled />
        </Form.Item>
        <Form.Item
          name="noi_dung_phan_hoi"
          style={{ marginBottom: "16px" }}
          rules={[
            { required: true, message: "Vui lòng nhập nội dung phản hồi" },
          ]}
        >
          <TextArea placeholder="Phản hồi đánh giá" disabled />
        </Form.Item>
      </div>
      <Divider />
    </>
  );
  const formRep = Form.useForm()[0];
  const [isShowModalRep, setIsShowModalRep] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const [RanDataUpdated, setRanDataUpdated] = useState<any>(null);
  const handleOpenModalRep = async (record: any, onDataUpdated: () => void) => {
    console.log("::", record);
    setIsShowModalRep(true);
    setRecord(record);
  };

  const handleRep = async () => {
    const postData = formRep.getFieldsValue();
    console.log("postData::", postData);
    console.log("record::", record);
    await RepDanhGia(record.id, postData)
      .then((res) => {
        console.log("blockusser::", res);
        setIsShowModalRep(false);
        formRep.resetFields();
        ShowToast("success", "Thông báo", "Phản hồi thành công!");
        setRanDataUpdated(Math.random());
      })
      .catch((err) => {});
  };

  return (
    <div>
      <MainLayout label="Quản lý đánh giá">
        <TableCustom
          export_url="/api/ma-giam-gia/export-excel"
          isCheckable={false}
          param_export={{
            Columns: [
              { DisplayName: "Tên khách hàng", PropertyName: "ten_khach_hang" },
              { DisplayName: "Mã đơn hàng", PropertyName: "ma_don_hang" },
              { DisplayName: "Tên sản phẩm", PropertyName: "ten_san_pham" },
              { DisplayName: "Mã sản phẩm", PropertyName: "ma_san_pham" },
              {
                DisplayName: "Đánh giá chất lượng",
                PropertyName: "danh_gia_chat_luong",
              },
              {
                DisplayName: "Nội dung đánh giá",
                PropertyName: "noi_dung_danh_gia",
              },
              {
                DisplayName: "Nội dung phản hồi",
                PropertyName: "noi_dung_phan_hoi",
              },
              {
                DisplayName: "Ngày đánh giá",
                PropertyName: "ngay_danh_gia",
                Format: "dd/MM/yyyy HH:mm:ss",
              },
            ],
            SheetName: "DanhGiaSanPham",
            KeySearch: "",
          }}
          RanDataUpdated={RanDataUpdated}
          isViewDetail={true}
          add_button={false}
          isEditOne={false}
          isDeleteOne={false}
          delete_button={false}
          columns={columns}
          get_list_url="/api/danh-gia/get-all-paging"
          EditComponent={<EditComponent />}
          action_element={(record: any, onDataUpdated: () => void) =>
            record.noi_dung_danh_gia && (
              <WechatOutlined
                className="action-table-edit"
                onClick={() => handleOpenModalRep(record, onDataUpdated)}
              />
            )
          }
          searchComponent={
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="ma_san_pham"
                    style={{ marginBottom: "16px" }}
                  >
                    <FormSelect
                      label="Sản phẩm"
                      selectType="selectApi"
                      placeholder="Chọn sản phẩm"
                      labelField="ten_san_pham"
                      valueField="ma_san_pham"
                      src="/api/DanhSachSanPham/get-all"
                      allowClear
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="muc_danh_gia"
                    style={{ marginBottom: "16px" }}
                  >
                    <FormSelect
                      label="Mức đánh giá"
                      selectType="normal"
                      placeholder="Chọn mức đánh giá"
                      options={[
                        { label: "Tất cả", value: 0 },
                        { label: "1 sao", value: 1 },
                        { label: "2 sao", value: 2 },
                        { label: "3 sao", value: 3 },
                        { label: "4 sao", value: 4 },
                        { label: "5 sao", value: 5 },
                      ]}
                      allowClear
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          }
        />
        <Modal
          title={
            <div>
              {"Phản hồi đánh giá"}
              <Divider />
            </div>
          }
          open={isShowModalRep}
          onCancel={() => {
            setIsShowModalRep(false);
          }}
          centered
          footer={
            <Space className="modal-footer-custom">
              <ButtonCustom
                text="Huỷ"
                variant="outlined"
                onClick={() => setIsShowModalRep(false)}
              />
              <ButtonCustom
                text="Phản hồi"
                variant="solid"
                onClick={() => handleRep()}
              />
            </Space>
          }
        >
          <Form form={formRep}>{PhanHoiComponent()}</Form>
        </Modal>
      </MainLayout>
    </div>
  );
};

export default QuanLyDanhGia;
