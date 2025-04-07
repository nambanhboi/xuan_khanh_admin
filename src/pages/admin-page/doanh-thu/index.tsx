import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Statistic, Tabs, message } from 'antd';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import dayjs, { Dayjs } from 'dayjs';
import DatePickerCustomOld from '../../../components/datepicker/DatePickerCustomOld';
import MainLayout from '../../../layout/MainLayout';
import { GetRevenueStats } from '../../../services/DoanhThuServices';
import ShowToast from '../../../components/show-toast/ShowToast';
import { RangePickerProps } from 'antd/es/date-picker';
// import { GetRevenueStats } from '../services/AuthenServices';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface RevenueStats {
    totalRevenue: number;
    revenueByDate: { date: string; revenue: number }[];
    revenueByMonth: { month: string; revenue: number }[];
    revenueByOrder: { orderId: string; revenue: number }[];
    revenueByProduct: { productId: string; productName: string; revenue: number }[];
    revenueByBank: { nganHangId: string; tenNganHang: string; revenue: number; isDefault: boolean }[];
}

const RevenueStats: React.FC = () => {
    const [stats, setStats] = useState<RevenueStats | null>(null);
    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
        dayjs().startOf('month'),
        dayjs()
    ]);

    const fetchRevenueStats = async (startDate: string, endDate: string) => {
        try {
            const response = await GetRevenueStats(startDate, endDate);
            setStats(response.data);
        } catch (error) {
            message.error('Lấy thống kê doanh thu thất bại.');
            console.error(error);
        }
    };

    useEffect(() => {
        if (dateRange && dateRange[0] && dateRange[1]) {
            fetchRevenueStats(
                dateRange[0].format('YYYY-MM-DD'),
                dateRange[1].format('YYYY-MM-DD')
            );
        }
    }, [dateRange]);

    // Biểu đồ doanh thu theo ngày (Line Chart)
    const lineChartDataByDate = {
        labels: stats?.revenueByDate.map(item => dayjs(item.date, 'DD/MM/YYYY').format('DD/MM/YYYY')) || [],
        datasets: [
            {
                label: 'Doanh thu (VND)',
                data: stats?.revenueByDate.map(item => item.revenue) || [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            }
        ]
    };
    

    // Biểu đồ doanh thu theo tháng (Line Chart)
    const lineChartDataByMonth = {
        labels: stats?.revenueByMonth.map(item => item.month) || [],
        datasets: [
            {
                label: 'Doanh thu (VND)',
                data: stats?.revenueByMonth.map(item => item.revenue) || [],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
            }
        ]
    };

    // Biểu đồ doanh thu theo đơn hàng (Bar Chart)
    const barChartDataByOrder = {
        labels: stats?.revenueByOrder.map(item => item.orderId) || [],
        datasets: [
            {
                label: 'Doanh thu theo đơn hàng (VND)',
                data: stats?.revenueByOrder.map(item => item.revenue) || [],
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
            }
        ]
    };

    // Biểu đồ doanh thu theo sản phẩm (Pie Chart)
    const pieChartDataByProduct = {
        labels: stats?.revenueByProduct.map(item => item.productName) || [],
        datasets: [
            {
                label: 'Doanh thu theo sản phẩm',
                data: stats?.revenueByProduct.map(item => item.revenue) || [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            }
        ]
    };

    
    const onDateRangeChange: RangePickerProps["onChange"] = (dates, dateStrings) => {
        if (dates && dates.length === 2) {
            setDateRange(dates as [Dayjs, Dayjs]); // Ép kiểu để chắc chắn là [Dayjs, Dayjs]
        } else {
            setDateRange([dayjs().startOf("month"), dayjs()]);
        }
    };
    
    

    return (
        <MainLayout label="📈 Thống kê doanh thu">
            <div style={{ padding: 24, background: '#f9f9f9', minHeight: '100vh' }}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Card style={{ borderRadius: 10 }}>
                            <h2 style={{ marginBottom: 16 }}>🔎 Chọn khoảng thời gian</h2>
                            <DatePickerCustomOld
                                mode="range"
                                value={dateRange}
                                format="DD/MM/YYYY"
                                onChange={onDateRangeChange}
                                style={{ width: '100%' }}
                            />
                        </Card>
                    </Col>

                    <Col span={24}>
                        <Tabs
                            defaultActiveKey="overview"
                            tabPosition="top"
                            type="card"
                            items={[
                                {
                                    key: 'overview',
                                    label: '📊 Tổng quan',
                                    children: (
                                        <Card
                                            title="Tổng doanh thu"
                                            style={{ borderRadius: 10 }}
                                            bordered={false}
                                        >
                                            <Statistic
                                                value={stats?.totalRevenue || 0}
                                                suffix="VND"
                                                valueStyle={{ color: '#3f8600', fontWeight: 'bold' }}
                                            />
                                        </Card>
                                    )
                                },
                                {
                                    key: 'byDay',
                                    label: '📅 Theo ngày',
                                    children: (
                                        <Card title="Biểu đồ doanh thu theo ngày" bordered={false}>
                                            <Line data={lineChartDataByDate} />
                                        </Card>
                                    )
                                },
                                {
                                    key: 'byMonth',
                                    label: '📆 Theo tháng',
                                    children: (
                                        <Card title="Biểu đồ doanh thu theo tháng" bordered={false}>
                                            <Line data={lineChartDataByMonth} />
                                        </Card>
                                    )
                                },
                                {
                                    key: 'byOrder',
                                    label: '📦 Theo đơn hàng',
                                    children: (
                                        <Card title="Biểu đồ doanh thu theo đơn hàng" bordered={false}>
                                            <Bar data={barChartDataByOrder} />
                                        </Card>
                                    )
                                },
                                {
                                    key: 'byProduct',
                                    label: '🛍️ Theo sản phẩm',
                                    children: (
                                        <Card title="Biểu đồ doanh thu theo sản phẩm" bordered={false}>
                                            <Pie data={pieChartDataByProduct} />
                                        </Card>
                                    )
                                }
                            ]}
                        />
                    </Col>
                </Row>
            </div>
        </MainLayout>
    );
};

export default RevenueStats;