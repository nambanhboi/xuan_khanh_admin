import React from 'react';
import { Button, Result } from 'antd';
import { routesConfig } from './routes/routes';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi! trang bạn truy cập không tồn tại."
      extra={<Button type="primary" onClick={()=> {navigate(routesConfig.dashboard);}}>Back Home</Button>}
    />
  );
}

export default NotFoundPage;