import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { axiosConfig } from "../../../config/configApi";
import dayjs, { Dayjs } from "dayjs";
import ShowToast from "../../../components/show-toast/ShowToast";
import { Card, Col, Row, Statistic, Typography, Modal } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import TableCustom from "../../../components/table/table-custom";
import { ConvertNumberToVND } from "../../../config/common";
import { RangePickerProps } from "antd/es/date-picker";
import DatePickerCustomOld from "../../../components/datepicker/DatePickerCustomOld";

const SoDu: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs().startOf("month"),
    dayjs(),
  ]);
  const [SoDu, setSoDu] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  const onDateRangeChange: RangePickerProps["onChange"] = (
    dates,
    dateStrings
  ) => {
    if (dates) {
      setDateRange(dates as [Dayjs, Dayjs]);
      // Fetch updated stats based on new date range
    }
  };

  useEffect(() => {
    setLoading(true);
    const dataQuery = {
      startDate: dateRange[0],
      endDate: dateRange[1],
    };

    axiosConfig
      .post("api/doanh-thu/so-du", dataQuery)
      .then((res: any) => {
        setSoDu(res.data.items.length>0 ? res.data.items[0].so_du : 0);
        setDataSource(res.data.items);
      })
      .catch((err: any) => {
        ShowToast("error", "Thông báo", `Có lỗi xảy ra:${err}`, 3);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dateRange]);

  return (
    <MainLayout label="Số dư tài khoản">
      <Row gutter={16}>
        <Col span={7}>
          <Card variant="borderless">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <Typography.Text>Chọn ngày</Typography.Text>
              <DatePickerCustomOld
                mode="range"
                value={dateRange}
                onlyDate={false}
                format="DD/MM/YYYY HH:mm:ss"
                onChange={onDateRangeChange}
              />
            </div>
          </Card>
        </Col>
        <Col span={4}>
          <Card variant="borderless" style={{ height: "100%" }}>
            <Statistic
              title="Số dư"
              value={SoDu ? SoDu : 0}
              valueStyle={{ color: "#3f8600" }}
              suffix="VND"
            />
          </Card>
        </Col>
      </Row>

      <TableCustom
        add_button={false}
        delete_button={false}
        isEditOne={false}
        isDeleteOne={false}
        isCheckable={false}
        otherAction={null}
        isViewDetail={false}
        columns={[
          {
            title: "Ngày",
            dataIndex: "ngay_giao_dich",
            key: "ngay",
            render: (text: any) => {
              return dayjs(text).format("DD/MM/YYYY HH:mm:ss");
            },
          },
          {
            title: "Phương thức giao dịch",
            dataIndex: "phuong_thuc_giao_dich",
            key: "phuong_thuc_giao_dich",
            render: (text: any) => {
              return text === 0 ? "Stripe" : "ZaloPay";
            },
          },
          {
            title: "Giao dịch",
            dataIndex: "giao_dich",
            key: "giao_dich",
            render: (text: any) => {
              return ConvertNumberToVND(text);
            },
          },
          {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text: any) => {
              return text === "Success" ? "Thành công" : "Thất bại";
            },
          },
        ]}
        dataSource={dataSource??[]}
      />
      
    </MainLayout>
  );
};

export default SoDu;
