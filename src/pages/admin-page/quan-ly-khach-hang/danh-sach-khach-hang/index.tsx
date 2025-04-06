import React from 'react'
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../../../layout/MainLayout';
import TableCustom from '../../../../components/table/table-custom';
import { formatDate } from '../../../../config/common';
import { Col, Divider, Form, Row } from 'antd';
import DatePickerCustomOld from '../../../../components/datepicker/DatePickerCustomOld';
import FormItemInput from "../../../../components/form-input/FormInput";
import FormAreaCustom from '../../../../components/text-area/FormTextArea';
import { LockOutlined, UnlockOutlined  } from "@ant-design/icons";
import { BlockUser } from '../../../../services/AuthenServices';
import ShowToast from '../../../../components/show-toast/ShowToast';
type DanhSachKhachHangProps = {

}
const DanhSachKhachHang:React.FC<DanhSachKhachHangProps> = ({

}) => {
    const navigate = useNavigate();
    const columns = [
        {
            title: "Tên khách hàng",
            dataIndex: "ten",
            key: "ten",
            render: (item: any) => <>{item}</>,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Ngày sinh",
            dataIndex: "ngay_sinh",
            render: (item: any) => <>{formatDate(item)}</>,
        },
        {
            title: "Địa chỉ",
            dataIndex: "dia_chi",
        },
        {
            title: "Giới tính",
            render: (item: any) => <>{item == "0" ? "Nữ" : "Nam"}</>,
            dataIndex: "gioi_tinh",
        },
        {
            title: "Số điện thoại",
            dataIndex: "so_dien_thoai",
        },
        {
            title: "Trạng thái",
            dataIndex: "trang_thai",
            render: (item: any) => <>{item === true ? "Hoạt động" : "Không hoạt động"}</>,
        },
        {
            title: "Ngày tạo",
            dataIndex: "created",
            render: (item: any) => <>{formatDate(item)}</>,
        },
        ];

    const handleAddSanPham =() => {
        // navigate(`${routesConfig.themMoiSanPham}`)
    }
    const EditComponent = () => ( 
        <>
            <div>
                <Form.Item
                    name="ten"
                    style={{ marginBottom: "16px" }}
                >
                <FormItemInput label="Tên khách hàng" />
                </Form.Item>
                <Form.Item
                    name="email"
                    style={{ marginBottom: "16px" }}
                >
                <FormItemInput label="Email" />
                </Form.Item>
                <Form.Item name="dia_chi" style={{ marginBottom: "16px" }}>
                    <FormAreaCustom label="Địa chỉ" />
                </Form.Item>
            </div>
            <Divider />
        </>
    );

    const handleLockAccount =async (record: any, onDataUpdated: () => void) => {
        console.log("::", record)
        await BlockUser(record.id) 
        .then(res => {
            console.log("blockusser::", res);
            if(res && res?.data) {
                ShowToast("success", "Thông báo", "Khóa/Mở khóa tài khách hàng thành công!")
                onDataUpdated()
            }            
        })
        .catch(err => {

        })
    }
      
    
    return (
        <div>
            <MainLayout label="Quản lý danh sách khách hàng">
                <TableCustom
                    isViewDetail={true}
                    columns={columns}
                    DeleteTitle="Xóa sản phẩm"
                    export_url='/api/khach-hang/export-excel' 
                    get_list_url={`/api/khach-hang?keySearch={"is_super_admin": false}`}   
                    handleOpenModalAddCustom={handleAddSanPham}
                    EditComponent={<EditComponent />}
                    add_button={false}
                    isEditOne={false}
                    isDeleteOne={false}
                    delete_button={false}
                    isSearchGeneral={true}
                    param_export={{
                        "Columns": [
                            { "DisplayName": "Tên khách hàng", "PropertyName": "ten" },
                            { "DisplayName": "Email", "PropertyName": "email" },
                            { "DisplayName": "Ngày sinh", "PropertyName": "ngay_sinh", "Format": "dd/MM/yyyy" },
                            { "DisplayName": "Địa chỉ", "PropertyName": "dia_chi" },
                            { "DisplayName": "Giới tính", "PropertyName": "gioi_tinh", "BoolTrueValue": "Nam", "BoolFalseValue": "Nữ" },
                            { "DisplayName": "Số điện thoại", "PropertyName": "so_dien_thoai" },
                            { "DisplayName": "Trạng thái", "PropertyName": "trang_thai", "BoolTrueValue": "Đang hoạt động", "BoolFalseValue": "Đã khóa" },
                            { "DisplayName": "Ngày tạo", "PropertyName": "created", "Format": "dd/MM/yyyy HH:mm:ss" }
                        ],
                        "SheetName": "DanhSachKhachHang",
                        "KeySearch": "" // Lọc dữ liệu (tùy chọn)
                    }}  
                    action_element={(record: any, onDataUpdated: () => void) => (
                        record.trang_thai ? 
                            <LockOutlined
                                className="action-table-edit"
                                onClick={() => handleLockAccount(record, onDataUpdated)}
                            /> 
                            : <UnlockOutlined 
                                className="action-table-edit"
                                onClick={() => handleLockAccount(record, onDataUpdated)}
                            /> 
                    )}
                    searchComponent={
                        <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item name="ten">
                            <FormItemInput
                                label="Tên khách hàng"
                                style={{ width: "100%" }}
                            />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="email">
                            <FormItemInput
                                label="Email"
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
    )
}


export default DanhSachKhachHang;