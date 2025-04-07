import { Card, Col, Row, Statistic, Typography } from "antd";
import {
  ArrowUpOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ShopOutlined,
  UndoOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import DatePickerCustomOld from "../../../components/datepicker/DatePickerCustomOld";
import { RangePickerProps } from "antd/es/date-picker";
import MainLayout from "../../../layout/MainLayout";
import { GetDashboardStats } from "../../../services/DoanhThuServices";
import { useNavigate } from "react-router-dom";
import { routesConfig } from "../../../routes/routes";

const { Title, Text } = Typography;

const Dashboard = () => {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs().startOf("month"),
    dayjs(),
  ]);

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    refundRate: 0,
  });

  const onDateRangeChange: RangePickerProps["onChange"] = (dates, dateStrings) => {
    if (dates) {
      setDateRange(dates as [Dayjs, Dayjs]);
      fetchStatistics(dates as [Dayjs, Dayjs]);
    }
  };

  const fetchStatistics = async (dates: [Dayjs, Dayjs]) => {
    try {
      const response = await GetDashboardStats(
        dates[0].format("YYYY-MM-DD"),
        dates[1].format("YYYY-MM-DD")
      );
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStatistics(dateRange);
  }, []);

  const cardStyle = {
    borderRadius: 12,
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  };

  const iconStyle = {
    fontSize: 36,
    marginBottom: 12,
  };

  return (
    <MainLayout label="Dashboard">
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Col>
          <Title level={3}>Tổng quan hoạt động</Title>
          <Text type="secondary">
            Từ ngày {dateRange[0].format("DD/MM/YYYY")} đến {dateRange[1].format("DD/MM/YYYY")}
          </Text>
        </Col>
        <Col>
          <DatePickerCustomOld mode="range" value={dateRange} onChange={onDateRangeChange} />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card style={cardStyle}>
            <DollarCircleOutlined style={{ ...iconStyle, color: "#52c41a" }} />
            <Statistic
              title="Tổng doanh thu"
              value={stats.totalRevenue}
              precision={0}
              suffix="VNĐ"
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            style={cardStyle}
            onClick={() => navigate(routesConfig.quanLyDonHang)}
            hoverable
          >
            <ShoppingCartOutlined style={{ ...iconStyle, color: "#1890ff" }} />
            <Statistic title="Tổng số đơn hàng" value={stats.totalOrders} />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card
            style={cardStyle}
            onClick={() => navigate(routesConfig.quanLyKhachHang)}
            hoverable
          >
            <UserOutlined style={{ ...iconStyle, color: "#722ed1" }} />
            <Statistic title="Tổng số khách hàng" value={stats.totalCustomers} />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            style={cardStyle}
            onClick={() => navigate(routesConfig.quanLySanPham)}
            hoverable
          >
            <ShopOutlined style={{ ...iconStyle, color: "#faad14" }} />
            <Statistic title="Tổng số sản phẩm" value={stats.totalProducts} />
          </Card>
        </Col>
    </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card style={cardStyle}>
            <UndoOutlined style={{ ...iconStyle, color: "#cf1322" }} />
            <Statistic
              title="Tỷ lệ hoàn / hủy đơn"
              value={stats.refundRate}
              precision={1}
              suffix="%"
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
        {/* Có thể thêm các chỉ số khác ở đây nếu cần */}
      </Row>
    </MainLayout>
  );
};

export default Dashboard;
