import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../../../layout/MainLayout';
import TableCustom from '../../../../components/table/table-custom';
import { formatDate } from '../../../../config/common';
import { Col, Divider, Form, Row, } from 'antd';
import DatePickerCustomOld from '../../../../components/datepicker/DatePickerCustomOld';
import FormItemInput from "../../../../components/form-input/FormInput";

type DanhSachMaGiamGiaProps = {};

const DanhSachMaGiamGia: React.FC<DanhSachMaGiamGiaProps> = () => {
  // const navigate = useNavigate();
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  // Định nghĩa các cột cho bảng mã giảm giá
  const columns = [
    {
      title: 'Tên Voucher',
      dataIndex: 'ten',
      key: 'ten',
      render: (item: string) => <>{item}</>,
    },
    {
      title: 'Mã voucher',
      dataIndex: 'ma',
      key: 'ma',
    },
    {
      title: 'Sản phẩm áp dụng',
      dataIndex: 'san_pham_ap_dung', // Giả định
      key: 'san_pham_ap_dung',
      render: () => <>Tất cả sản phẩm</>,
    },
    {
      title: 'Nguồn mua mục tiêu',
      dataIndex: 'nguon_mua_muc_tieu', // Giả định
      key: 'nguon_mua_muc_tieu',
      render: () => <>Tất cả Nguồn mua</>,
    },
    {
      title: 'Giảm giá',
      dataIndex: 'giam_gia',
      key: 'giam_gia',
      render: (item: number) => <>{item.toLocaleString()}đ</>,
    },
    {
      title: 'Tổng số lượng sử dụng',
      dataIndex: 'so_luong',
      key: 'so_luong',
    },
    {
      title: 'Đã sử dụng',
      dataIndex: 'da_su_dung', // Giả định
      key: 'da_su_dung',
      render: () => <>0</>,
    },
    {
      title: 'Thời gian lưu mã giảm giá',
      dataIndex: 'thoi_gian',
      key: 'thoi_gian',
      render: (_: any, record: any) => (
        <>
          {formatDate(record.bat_dau)} - {formatDate(record.ket_thuc)}
        </>
      ),
    }
  ];

  // Hàm mở modal thêm mã giảm giá
  // const handleAddMaGiamGia = () => {
  //   setIsAddModalVisible(true);
  // };

  // Hàm đóng modal
  const handleCancel = () => {
    setIsAddModalVisible(false);
    form.resetFields();
  };


  // Component chỉnh sửa mã giảm giá
  const EditComponent = () => (
    <>
      <div>
        <Form.Item name="ten" style={{ marginBottom: '16px' }}>
          <FormItemInput label="Tên mã giảm giá" />
        </Form.Item>
        <Form.Item name="ma" style={{ marginBottom: '16px' }}>
          <FormItemInput label="Mã giảm giá" />
        </Form.Item>
        <Form.Item name="giam_gia" style={{ marginBottom: '16px' }}>
          <FormItemInput label="Giá trị giảm giá (VNĐ)" type="number" />
        </Form.Item>
        <Form.Item name="so_luong" style={{ marginBottom: '16px' }}>
          <FormItemInput label="Số lượng" type="number" />
        </Form.Item>
        <Form.Item name="thoi_gian" style={{ marginBottom: '16px' }}>
          <DatePickerCustomOld
            mode="range"
            label="Thời gian lưu mã giảm giá"
            style={{ width: '100%' }}
          />
        </Form.Item>
      </div>
      <Divider />
    </>
  );


  return (
    <div>
      <MainLayout label="Mã Giảm Giá Của cửa hàng">
        <TableCustom
            edit_url='/api/ma-giam-gia'
            delete_one_url='/api/ma-giam-gia'
            export_url='/api/ma-giam-gia/export-excel'  
            param_export={{
                "Columns": [
                    { "DisplayName": "Mã giảm giá", "PropertyName": "ma" },
                    { "DisplayName": "Tên mã giảm giá", "PropertyName": "ten" },
                    { "DisplayName": "Giá trị giảm giá", "PropertyName": "giam_gia" },
                    { "DisplayName": "Số lượng", "PropertyName": "so_luong" },
                    { "DisplayName": "Thời gian bắt đầu", "PropertyName": "bat_dau", "Format": "dd/MM/yyyy HH:mm:ss" },
                    { "DisplayName": "Thời gian kết thúc", "PropertyName": "ket_thuc", "Format": "dd/MM/yyyy HH:mm:ss" },
                    { "DisplayName": "Trạng thái", "PropertyName": "is_active" }
                ],
                "SheetName": "MaGiamGia",
                "KeySearch": "" // Lọc dữ liệu (tùy chọn)
            }}          
            isViewDetail={true}
            columns={columns}
            DeleteTitle="Xóa mã giảm giá"
            get_list_url="/api/ma-giam-gia"
            delete_any_url='/api/ma-giam-gia/delete-multiple'
            add_url='/api/ma-giam-gia'
            isSearchGeneral={true}
            EditComponent={<EditComponent />}          
            searchComponent={
                <Row gutter={16}>
                <Col span={8}>
                    <Form.Item name="ten">
                    <FormItemInput label="Tên mã giảm giá" style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="ma">
                    <FormItemInput label="Mã voucher" style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="thoi_gian">
                    <DatePickerCustomOld
                        mode="range"
                        label="Thời gian lưu mã giảm giá"
                        style={{ width: '100%' }}
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

export default DanhSachMaGiamGia;