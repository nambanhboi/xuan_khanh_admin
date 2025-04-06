import { Col, Form, Modal, Row, Spin, Typography } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import React, {  useState } from "react";
import MainLayout from "../../../../layout/MainLayout";
import TableCustom from "../../../../components/table/table-custom";
import { formatDate } from "../../../../config/common";
import FormItemInput from "../../../../components/form-input/FormInput";
import DatePickerCustomOld from "../../../../components/datepicker/DatePickerCustomOld";
import { useNavigate } from "react-router-dom";
import { routesConfig } from "../../../../routes/routes";
import ButtonCustom from "../../../../components/button/button";
import { axiosConfig } from "../../../../config/configApi";
import ShowToast from "../../../../components/show-toast/ShowToast";

type NhapKhoProps = {};

const NhapKho: React.FC<NhapKhoProps> = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [reacordDetail, setReacordDetail] = useState<any>();
  const navigate = useNavigate();
  const columns = [
    {
      title: "Mã phiếu",
      dataIndex: "ma",
      key: "ma",
      render: (item: any) => <>{item}</>,
    },
    {
      title: "Ngày nhận dự kiến",
      dataIndex: "ngay_du_kien",
      key: "ngay_du_kien",
      render: (item: any) => <>{formatDate(item)}</>,
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "ngay_het_han",
      key: "ngay_het_han",
      render: (item: any) => <>{formatDate(item)}</>,
    },
    {
      title: "Nhà Cung cấp",
      dataIndex: "nha_cung_cap",
      key: "nha_cung_cap",
      render: (item: any) => <>{item}</>,
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      key: "trang_thai",
      render: (item: any) => (
        <>
          {item === 1 ? (
            <div className="status-field-1">Phiếu mới</div>
          ) : item === 2 ? (
            <div className="status-field-2">Hết hạn</div>
          ) : (
            <div className="status-field-3">Hoàn thành</div>
          )}
        </>
      ),
    },
    {
      title: "Ngày tạo phiếu",
      dataIndex: "created",
      key: "created",
      render: (item: any) => <>{formatDate(item)}</>,
    },
  ];

  const [isOpenModalDetail, setIsOpenModalDetail] = useState<boolean>(false);
  const handleOpenDetailModalCustom = () => {
    setIsOpenModalDetail(true);
  };
  
  const handleConfirmPhieuNhap = () => {
    setLoading(true)
    axiosConfig.put(`api/phieu-nhap-kho/xu-ly/${reacordDetail.id}`)
      .then((res:any)=> {
        setIsOpenModalDetail(false)
        ShowToast("success", "Thông báo", "Nhập đơn hàng thành công", 3)
      })
      .catch(()=>{
        setIsOpenModalDetail(false)
        ShowToast("error", "Thông báo", "Có lỗi xảy ra", 3)
      })
      .finally(()=>{
        setLoading(false)
      })
  }

  return (
    <MainLayout label="Danh sách yêu cầu nhập kho">
      <Spin spinning={loading}>
        <TableCustom
          columns={columns}
          dieu_kien1={(record: any) => record.trang_thai === 1}
          dieu_kien2={(record: any) => record.trang_thai === 1}
          dieu_kien3={(record: any) => record.trang_thai === 1}
          dieu_kien4={(record: any) => true}
          get_list_url="/api/phieu-nhap-kho"
          delete_one_url="/api/phieu-nhap-kho"
          export_url="/api/phieu-nhap-kho/export"
          handleOpenModalAddCustom={() => navigate(routesConfig.themPhieuNhap)}
          otherAction={
            <InboxOutlined
              onClick={handleOpenDetailModalCustom}
              className="action-table-1"
            />
          }
          edit_url_page={routesConfig.chiTietPhieuNhap}
          edit_url_page_filter_field="id"
          setRecord={setReacordDetail}
          action_width={120}
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
                <Form.Item name="ngay_du_kien">
                  <DatePickerCustomOld
                    mode="range"
                    label="Ngày dự kiến"
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
      </Spin>

      <Modal
        centered
        title="Xử lý phiếu nhập"
        footer={false}
        open={isOpenModalDetail}
        onCancel={() => setIsOpenModalDetail(false)}
      >
        <div style={{display:"grid",}}>
          <Typography.Text>
            Đơn hàng nhập đã tới kho hàng và được kiểm tra cẩn thận?
          </Typography.Text>
          <Typography.Title>
            Tiến hành nhập sản phẩm vào kho
          </Typography.Title>

          <div
            style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop:"16px" }}
          >
            <ButtonCustom
              text="Đóng"
              variant="outlined"
              onClick={() => setIsOpenModalDetail(false)}
            />
            <ButtonCustom text="Hoàn thành" variant="solid" onClick={handleConfirmPhieuNhap}/>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
};

export default NhapKho;
