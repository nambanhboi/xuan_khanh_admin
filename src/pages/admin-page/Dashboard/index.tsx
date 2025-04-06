import { Card, Col, Row, Statistic } from "antd";
import { ArrowUpOutlined, ShoppingCartOutlined, UserOutlined, ShopOutlined, UndoOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import DatePickerCustomOld from "../../../components/datepicker/DatePickerCustomOld";
import { RangePickerProps } from "antd/es/date-picker";
import MainLayout from "../../../layout/MainLayout";
import { GetDashboardStats } from "../../../services/DoanhThuServices";
import { useNavigate } from "react-router-dom";
import { routesConfig } from "../../../routes/routes";

const Dashboard = () => {
    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
        dayjs().startOf("month"),
        dayjs()
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
            // Fetch updated stats based on new date range
            fetchStatistics(dates as [Dayjs, Dayjs]);
        }
    };

    const fetchStatistics = async (dates: [Dayjs, Dayjs]) => {
        try {
            const response = await GetDashboardStats(dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD'));
            setStats(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchStatistics(dateRange);
    }, []);

    return (
        <MainLayout label="Dashboard">
            <h2>Tổng quan</h2>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <DatePickerCustomOld mode="range" value={dateRange} onChange={onDateRangeChange} />
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Tổng doanh thu"
                            value={stats.totalRevenue}
                            precision={0}
                            prefix="₫"
                            suffix="VNĐ"
                            valueStyle={{ color: "#3f8600" }}
                            //prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card onClick={() => navigate(routesConfig.quanLyDonHang)} style={{ cursor: "pointer" }}>
                        <Statistic
                            title="Tổng số đơn hàng"
                            value={stats.totalOrders}
                            prefix={<ShoppingCartOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card onClick={() => navigate(routesConfig.quanLyKhachHang)} style={{ cursor: "pointer" }}>
                        <Statistic
                            title="Tổng số khách hàng"
                            value={stats.totalCustomers}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card onClick={() => navigate(routesConfig.quanLySanPham)} style={{ cursor: "pointer" }}>
                        <Statistic
                            title="Tổng số sản phẩm"
                            value={stats.totalProducts}
                            prefix={<ShopOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Tỷ lệ hoàn đơn / hủy đơn"
                            value={stats.refundRate}
                            precision={1}
                            suffix="%"
                            valueStyle={{ color: "#cf1322" }}
                            prefix={<UndoOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
        </MainLayout>
    );
};

export default Dashboard;
