import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../../../layout/MainLayout';
import TableCustom from '../../../../components/table/table-custom';
import { formatDate } from '../../../../config/common';
import { Col, Divider, Form, Row, Modal, Button, message, Switch } from 'antd';
import DatePickerCustomOld from '../../../../components/datepicker/DatePickerCustomOld';
import FormItemInput from "../../../../components/form-input/FormInput";
import { axiosConfig } from '../../../../config/configApi';
import { addMaGiamGia } from '../../../../services/MaGiamGiaServices';
import FormSelect from '../../../../components/form-select/FormSelect';

type DanhSachChuongTrinhMarketingProps = {};

const DanhSachChuongTrinhMarketing: React.FC<DanhSachChuongTrinhMarketingProps> = () => {
  const navigate = useNavigate();
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  // Định nghĩa các cột cho bảng mã giảm giá
  const columns = [
    {
      title: 'Tên chương trình',
      dataIndex: 'ten',
      key: 'ten',
      render: (item: string) => <>{item}</>,
    },
    {
      title: 'Công cụ',
      dataIndex: 'cong_cu_string',
      key: 'cong_cu_string',
      render: (item: string) => <>{item}</>,
    }
  ];

  // Hàm mở modal thêm mã giảm giá
  const handleAddMaGiamGia = () => {
    setIsAddModalVisible(true);
  };

  // Hàm đóng modal
  const handleCancel = () => {
    setIsAddModalVisible(false);
    form.resetFields();
  };

  const optionsCongCu = [
    { value: 1, label: 'Khuyến mãi' },
    { value: 2, label: 'Flash Sale' },
    { value: 3, label: 'Mã giảm giá' },
]
  // Component chỉnh sửa mã giảm giá
  const EditComponent = () => (
    <>
      <div>
        <Form.Item name="ten" style={{ marginBottom: '16px' }}>
          <FormItemInput label="Tên chương trình" />
        </Form.Item>
        <Form.Item name="cong_cu" style={{ marginBottom: '16px' }}>
            <FormSelect label="Công cụ" style={{ width: '100%' }} options={optionsCongCu}
                selectType='normal'
                placeholder='Chọn công cụ'
                />
        </Form.Item>        
      </div>
      <Divider />
    </>
  );


  return (
    <div>
      <MainLayout label="Chương Trình Marketing Của cửa hàng">
        <TableCustom
            edit_url='/api/chuong-trinh-marketing'
            delete_one_url='/api/chuong-trinh-marketing'
            export_url='/api/chuong-trinh-marketing/export-excel'  
            param_export={{
                "Columns": [
                    { "DisplayName": "Tên chương trình", "PropertyName": "ten" },
                    { "DisplayName": "Công cụ", "PropertyName": "cong_cu_string", "Format": "" }
                ],
                "SheetName": "ChuongTrinhMarketing",
                "KeySearch": "" // Lọc dữ liệu (tùy chọn)
            }}          
            isViewDetail={true}
            columns={columns}
            DeleteTitle="Xóa mã chương trình marketing"
            get_list_url="/api/chuong-trinh-marketing"
            add_url='/api/chuong-trinh-marketing'
            delete_any_url='/api/chuong-trinh-marketing/delete-multiple'
            isSearchGeneral={true}
            EditComponent={<EditComponent />}          
            searchComponent={
                <Row gutter={16}>
                <Col span={8}>
                    <Form.Item name="ten">
                    <FormItemInput label="Tên chương trình" style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="cong_cu">
                        <FormSelect label="Công cụ" style={{ width: '100%' }} options={optionsCongCu}
                            selectType='normal'
                            placeholder='Chọn công cụ'
                            allowClear={true}
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

export default DanhSachChuongTrinhMarketing;