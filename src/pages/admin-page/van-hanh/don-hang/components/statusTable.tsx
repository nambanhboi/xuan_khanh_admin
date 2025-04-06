import React, { useEffect, useState } from "react";
import TableCustom from "../../../../../components/table/table-custom";
import { axiosConfig, BASE_URL } from "../../../../../config/configApi";
import ShowToast from "../../../../../components/show-toast/ShowToast";
import { CheckCircleOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Col, Form, Image, Modal, Row, Spin } from "antd";
import { formatDate } from "../../../../../config/common";
import ButtonCustom from "../../../../../components/button/button";
import ShippingLabelModal from "./phieu-giao-hang";
import ShippingLabelModalDetail from "./detail";
import DatePickerCustomOld from "../../../../../components/datepicker/DatePickerCustomOld";
import FormSelect from "../../../../../components/form-select/FormSelect";

type StatusTable = {
  trang_thai?: number;
  is_ship?: boolean;
  refresh?:any;
};
type DataTableInterface = {
  id?: string;
  account_id?: string;
  dvvc_id?: string;
  ma_don_hang?: string;
  trang_thai?: number;
  ngay_mua?: string; // ISO string format for DateTime
  tong_tien?: number;
  thanh_tien?: number;
};

const StatusTable: React.FC<StatusTable> = ({
  trang_thai = 0,
  is_ship = false,
  refresh,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "anh_dai_dien",
      render: (item: any) => (
        <div>
          <Image width={70} src={`${BASE_URL}/${item}`} />
        </div>
      ),
    },
    {
      title: "Tổng hóa đơn",
      dataIndex: "thanh_tien",
      render: (text: any, record: any) => (
        <>
          {text.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
        </>
      ),
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "ma_don_hang",
      render: (text: any, record: any) => text,
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      render: (item: any) => (
        <>
          {item === 1 ? (
            <div className="status-field-3">Đơn mới</div>
          ) : item === 2 ? (
            <div className="status-field-4">Chờ lấy hàng</div>
          ) : item === 3 ? (
            <div className="status-field-5">Đang giao hàng</div>
          ) : item === 4 ? (
            <div className="status-field-1">Đã giao</div>
          ) : (
            <div className="status-field-2">Trả hàng/hủy</div>
          )}
        </>
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "created",
      render: (item: any) => {
        return <>{formatDate(item)}</>;
      },
    },
  ];
  const [refreshKey, setRefreshKey] = useState(0);
useEffect(()=> {
  setRefreshKey(refresh)
},[refresh])
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1); // Thay đổi key để remount component con
  };
  const [recordDetail, setRecordDetail] = useState<any>();
  const [rows, setRows] = useState<any>();
  const [typeXL, setTypeXL] = useState<any>();
  const [isOpenModalGuidvvc, setIsOpenModalGuidvvc] = useState<boolean>(false);
  const [isVisibleXLN, setIsVisibleXLN] = useState<boolean>(false);
  const [isOpenModaldvvc, setIsOpenModaldvvc] = useState<boolean>(false);
  const [isOpenModalInPhieu, setIsOpenModalInPhieu] = useState<boolean>(false);
  const [isOpenModalInPhieuDetail, setIsOpenModalInPhieuDetail] =
    useState<boolean>(false);

  // type = 1 => đơn hàng => chờ lấy hàng
  // type = 2 => chờ lấy hàng => đang giao
  const handleOpenModalXLNhieu = (selectedRows: any, type: number) => {
    setIsVisibleXLN(true);
    setRows(selectedRows);
    setTypeXL(type);
  };

  const handleXuLyNhieu = () => {
    var newData = rows.map((item: any) => {
      return {
        id: item,
        trang_thai: typeXL === 1 ? 2 : 3,
      };
    });
    axiosConfig
      .put(`/api/don-hang/xu-ly-nhieu`, newData)
      .then((res: any) => {
        ShowToast("success", "Thông báo", "Chuẩn bị đơn hàng thành công", 3);
        setIsVisibleXLN(false)
        handleRefresh();
      })
      .catch(() => {
        ShowToast("error", "Thông báo", "Có lỗi xảy ra", 3);
      });
  };

  const open = (data: any) => {
    setRecordDetail(data);
    setIsOpenModalInPhieuDetail(true);
  };

  return (
    <div>
      <Spin spinning={loading}>
        <TableCustom
          key={refreshKey}
          columns={columns}
          get_list_url={`/api/don-hang/get-all?trang_thai=${trang_thai}`}
          add_button={false}
          delete_button={false}
          isDeleteOne={false}
          isEditOne={false}
          dieu_kien1={(me: any) => me.trang_thai !== 4 && me.trang_thai !== 5}
          isViewDetail={true}
          setRecord={setRecordDetail}
          searchComponent={
            trang_thai === null || trang_thai === 0 ? (
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name="trang_thai">
                    <FormSelect
                      selectType="normal"
                      label="Trạng thái"
                      style={{ width: "100%" }}
                      placeholder="Tất cả"
                      options={[
                        {
                          label: "Đơn mới",
                          value: 1,
                        },
                        {
                          label: "Chờ lấy hàng",
                          value: 2,
                        },
                        {
                          label: "Đang giao hàng",
                          value: 3,
                        },
                        {
                          label: "Đã giao hàng",
                          value: 4,
                        },
                        {
                          label: "Hoàn hàng/hủy",
                          value: 5,
                        },
                      ]}
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
            ) : (
              ""
            )
          }
          operationButtonCustom={
            trang_thai === 1 ? (
              <ButtonCustom text="Giao hàng loạt" />
            ) : trang_thai === 2 ? (
              <ButtonCustom text="Gửi hàng loạt" />
            ) : (
              ""
            )
          }
          HandleOperationButton={(rows: any) => {
            if (trang_thai === 1) {
              handleOpenModalXLNhieu?.(rows, 1);
            } else if (trang_thai === 2) {
              handleOpenModalXLNhieu?.(rows, 2);
            }
          }}
          handleOpenModalEditCustom={open}
          otherAction={
            is_ship ? (
              <CheckCircleOutlined
                className="action-table-1"
                onClick={() => {
                  setIsOpenModaldvvc(true);
                }}
              />
            ) : trang_thai === 1 ? (
              <SendOutlined
                className="action-table-1"
                onClick={() => {
                  setIsOpenModalInPhieu(true);
                }}
              />
            ) : trang_thai === 2 ? (
              <SendOutlined
                className="action-table-1"
                onClick={() => {
                  setIsOpenModalGuidvvc(true);
                }}
              />
            ) : (
              ""
            )
          }
        />

        {/* đon hàng => chờ lấy hàng */}
        <ShippingLabelModal
          handleRefresh={handleRefresh}
          isVisible={isOpenModalInPhieu}
          onClose={() => {
            setIsOpenModalInPhieu(false);
          }}
          data={recordDetail}
        />

        <ShippingLabelModalDetail
          isVisible={isOpenModalInPhieuDetail}
          onClose={() => {
            setIsOpenModalInPhieuDetail(false);
          }}
          data={recordDetail}
        />

        {/* chờ lấy hàng => đang giao */}
        <Modal
          title="Gửi cho đơn vị vận chuyển"
          centered
          open={isOpenModalGuidvvc}
          onCancel={() => {
            setIsOpenModalGuidvvc(false);
          }}
          footer={
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "16px",
              }}
            >
              <ButtonCustom
                text="Đóng"
                variant="outlined"
                onClick={() => {
                  setIsOpenModalGuidvvc(false);
                }}
              />
              <ButtonCustom
                text="Gửi"
                onClick={() => {
                  setLoading(true);
                  //gọi api xử lý đơn hàng
                  const dataBody = {
                    id: recordDetail.id,
                    trang_thai: 3,
                  };
                  axiosConfig
                    .put(`api/don-hang/xu-ly/${recordDetail.id}`, dataBody)
                    .then(() => {
                      ShowToast(
                        "success",
                        "Thông báo",
                        "Đã bàn giao đơn hàng cho đơn vị vận chuyển",
                        3
                      );
                      setIsOpenModalGuidvvc(false);
                      handleRefresh();
                    })
                    .catch(() => {
                      ShowToast("error", "Thông báo", "Có lỗi xảy ra", 3);
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                }}
              />
            </div>
          }
        >
          Xác nhận gửi đơn hàng cho đơn vị vận chuyển?
        </Modal>

        {/* đang giao => đã giao */}
        <Modal
          title="Giao hàng"
          centered
          open={isOpenModaldvvc}
          onCancel={() => {
            setIsOpenModaldvvc(false);
          }}
          footer={
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "16px",
              }}
            >
              <ButtonCustom
                text="Đóng"
                variant="outlined"
                onClick={() => {
                  setIsOpenModaldvvc(false);
                }}
              />
              <ButtonCustom
                text="Gửi"
                onClick={() => {
                  setLoading(true);
                  //gọi api xử lý đơn hàng
                  const dataBody = {
                    id: recordDetail.id,
                    trang_thai: 4,
                  };
                  axiosConfig
                    .put(`api/don-hang/xu-ly/${recordDetail.id}`, dataBody)
                    .then(() => {
                      ShowToast(
                        "success",
                        "Thông báo",
                        "Giao hàng thành công",
                        3
                      );
                      setIsOpenModaldvvc(false);
                      handleRefresh();
                    })
                    .catch(() => {
                      ShowToast("error", "Thông báo", "Có lỗi xảy ra", 3);
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                }}
              />
            </div>
          }
        >
          Xác nhận giao hàng?
        </Modal>

        {/* xử lý nhiều */}
        <Modal
          centered
          title="Gửi nhiều đơn hàng"
          open={isVisibleXLN}
          onCancel={() => setIsVisibleXLN(false)}
          footer={
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "flex-end",
              }}
            >
              <ButtonCustom text="Gửi" onClick={handleXuLyNhieu} />
              <Button key="close" onClick={() => setIsVisibleXLN(false)}>
                Đóng
              </Button>
            </div>
          }
          width={600}
        ></Modal>
      </Spin>
    </div>
  );
};

export default StatusTable;
