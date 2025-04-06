import { Col, Divider, Form, Row } from "antd";
import TableCustom from "../../../../components/table/table-custom";
import MainLayout from "../../../../layout/MainLayout";
import SearchLayout from "../../../../layout/search-layout";
import FormItemInput from "../../../../components/form-input/FormInput";
import FormAreaCustom from "../../../../components/text-area/FormTextArea";
import "./index.scss";
import DatePickerCustomOld from "../../../../components/datepicker/DatePickerCustomOld";
import { formatDate } from "../../../../config/common";

type QuanLyDanhMucProps = {};

const QuanLyDanhMuc: React.FC<QuanLyDanhMucProps> = ({}) => {
  const columns = [
    {
      title: "Mã danh mục",
      dataIndex: "ma_danh_muc",
      key: "ma_danh_muc",
      render: (item: any) => <>{item}</>,
    },
    {
      title: "Tên danh mục",
      dataIndex: "ten_danh_muc",
      key: "ten_danh_muc",
    },
    {
      title: "Mô tả",
      dataIndex: "mo_ta",
    },
    {
      title: "Ngày tạo",
      dataIndex: "created",
      render: (item: any) => <>{formatDate(item)}</>,
    },
  ];

  return (
    <div>
      <MainLayout label="Quản lý danh mục sản phẩm">
        <TableCustom
          columns={columns}
          get_list_url="/api/DanhMucSanPham/get-all"
          DeleteTitle="Xóa danh mục"
          EditTitle="Chỉnh Sửa danh mục"
          EditComponent={
            <div>
              <div>
                <Form.Item
                  name="ma_danh_muc"
                  style={{ marginBottom: "16px" }}
                  validateTrigger="onBlur"
                  rules={[
                    { required: true, message: "vui lòng nhập mã danh mục!" },
                  ]}
                >
                  <FormItemInput label="Mã danh mục" required={true} />
                </Form.Item>
                <Form.Item
                  name="ten_danh_muc"
                  style={{ marginBottom: "16px" }}
                  rules={[
                    { required: true, message: "vui lòng nhập tên danh mục!" },
                  ]}
                >
                  <FormItemInput label="Tên danh mục" required={true} />
                </Form.Item>
                <Form.Item name="mo_ta" style={{ marginBottom: "16px" }}>
                  <FormAreaCustom label="Tên danh mục" />
                </Form.Item>
              </div>
              <Divider />
            </div>
          }
          add_url="/api/DanhMucSanPham/create"
          edit_url="/api/DanhMucSanPham/edit"
          delete_one_url="/api/DanhMucSanPham/delete"
          delete_any_url="/api/DanhMucSanPham/delete-any"
          export_url="/api/DanhMucSanPham/export"
          searchComponent={
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="ma_danh_muc">
                  <FormItemInput
                    label="Mã danh mục"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="ten_danh_muc">
                  <FormItemInput
                    label="Tên danh mục"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="created">
                  <DatePickerCustomOld 
                    mode="range"
                    label="Ngày tạo"
                    style={{ width: "100%" }} 
                  />
                </Form.Item>
              </Col>
            </Row>
          }
        />
      </MainLayout>
    </div>
  );
};

export default QuanLyDanhMuc;
