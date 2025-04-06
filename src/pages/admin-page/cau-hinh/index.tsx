import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Typography, Divider, Modal, Form, Input, message, List, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, CheckCircleOutlined } from '@ant-design/icons';
import MainLayout from '../../../layout/MainLayout';
import { getDetailAcc, UpdateEmail, UpdatePassword, UpdatePhone, AddBankAccount, UpdateBankAccount, DeleteBankAccount, SetDefaultBankAccount } from '../../../services/AuthenServices';

const { Title, Text } = Typography;

interface BankAccount {
  id: string;
  ten_tai_khoan: string;
  so_tai_khoan: string;
  ten_ngan_hang: string;
  so_the: string;
  is_default: boolean;
}

interface AccountData {
  so_dien_thoai: string;
  email: string;
  listNganHangs: BankAccount[];
}

const AccountInfo: React.FC = () => {
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPhoneModalVisible, setIsPhoneModalVisible] = useState<boolean>(false);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState<boolean>(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState<boolean>(false);
  const [isBankModalVisible, setIsBankModalVisible] = useState<boolean>(false);
  const [editingBankAccount, setEditingBankAccount] = useState<BankAccount | null>(null);

  // Tạo các instance form riêng biệt cho từng modal
  const [phoneForm] = Form.useForm();
  const [emailForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [bankForm] = Form.useForm();

  // Hàm lấy dữ liệu tài khoản
  const getData = async () => {
    setLoading(true);
    await getDetailAcc()
      .then((response) => {
        setAccountData(response.data);
      })
      .catch((error) => {
        message.error('Không thể lấy thông tin tài khoản. Vui lòng thử lại sau.');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // Hàm mở modal chỉnh sửa số điện thoại
  const showPhoneModal = () => {
    phoneForm.setFieldsValue({ so_dien_thoai: accountData?.so_dien_thoai });
    setIsPhoneModalVisible(true);
  };

  // Hàm mở modal chỉnh sửa email
  const showEmailModal = () => {
    emailForm.setFieldsValue({ email: accountData?.email });
    setIsEmailModalVisible(true);
  };

  // Hàm mở modal cập nhật mật khẩu
  const showPasswordModal = () => {
    setIsPasswordModalVisible(true);
  };

  // Hàm mở modal thêm/sửa tài khoản ngân hàng
  const showBankModal = (bankAccount?: BankAccount) => {
    if (bankAccount) {
      setEditingBankAccount(bankAccount);
      bankForm.setFieldsValue(bankAccount);
    } else {
      setEditingBankAccount(null);
      bankForm.resetFields();
    }
    setIsBankModalVisible(true);
  };

  // Hàm đóng modal
  const handleCancel = () => {
    setIsPhoneModalVisible(false);
    setIsEmailModalVisible(false);
    setIsPasswordModalVisible(false);
    setIsBankModalVisible(false);
    // Reset form tương ứng khi đóng modal
    phoneForm.resetFields();
    emailForm.resetFields();
    passwordForm.resetFields();
    bankForm.resetFields();
    setEditingBankAccount(null);
  };

  // Hàm cập nhật số điện thoại
  const handleUpdatePhone = async (values: { so_dien_thoai: string }) => {
    const postData = {
      so_dien_thoai: values.so_dien_thoai,
    };
    await UpdatePhone(postData)
      .then((response) => {
        setAccountData((prev) => (prev ? { ...prev, so_dien_thoai: values.so_dien_thoai } : null));
        message.success('Cập nhật số điện thoại thành công!');
        handleCancel();
      })
      .catch((error) => {
        message.error('Cập nhật số điện thoại thất bại. Vui lòng thử lại.');
        console.error(error);
      });
  };

  // Hàm cập nhật email
  const handleUpdateEmail = async (values: { email: string }) => {
    const postData = {
      email: values.email,
    };
    await UpdateEmail(postData)
      .then((response) => {
        message.success('Cập nhật email thành công!');
        setAccountData((prev) => (prev ? { ...prev, email: values.email } : null));
        handleCancel();
      })
      .catch((error) => {
        message.error('Cập nhật email thất bại. Vui lòng thử lại.');
        console.error(error);
      });
  };

  // Hàm cập nhật mật khẩu
  const handleUpdatePassword = async (values: { oldPassword: string; newPassword: string }) => {
    const postData = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    await UpdatePassword(postData)
      .then((response) => {
        message.success('Cập nhật mật khẩu thành công!');
        handleCancel();
      })
      .catch((error) => {
        message.error('Cập nhật mật khẩu thất bại. Vui lòng thử lại.');
        console.error(error);
      });
  };

  // Hàm thêm hoặc cập nhật tài khoản ngân hàng
  const handleBankAccountSubmit = async (values: Omit<BankAccount, 'id'>) => {
    try {
      if (editingBankAccount) {
        // Cập nhật tài khoản ngân hàng
        //await UpdateBankAccount(editingBankAccount.id, values);
        message.success('Cập nhật tài khoản ngân hàng thành công!');
        setAccountData((prev) => {
          if (!prev) return prev;
          const updatedBankAccounts = prev.listNganHangs.map((account) =>
            account.id === editingBankAccount.id ? { ...account, ...values } : account
          );
          return { ...prev, listNganHangs: updatedBankAccounts };
        });
      } else {
        // Thêm tài khoản ngân hàng mới
        const response = await AddBankAccount(values);
        message.success('Thêm tài khoản ngân hàng thành công!');
        setAccountData((prev) => {
          if (!prev) return prev;
          return { ...prev, listNganHangs: [...(prev.listNganHangs || []), response.data] };
        });
      }
      handleCancel();
    } catch (error) {
      message.error(
        editingBankAccount
          ? 'Cập nhật tài khoản ngân hàng thất bại. Vui lòng thử lại.'
          : 'Thêm tài khoản ngân hàng thất bại. Vui lòng thử lại.'
      );
      console.error(error);
    }
  };

  // Hàm xóa tài khoản ngân hàng
  const handleDeleteBankAccount = async (id: string) => {
    try {
      await DeleteBankAccount(id);
      message.success('Xóa tài khoản ngân hàng thành công!');
      setAccountData((prev) => {
        if (!prev) return prev;
        const updatedBankAccounts = prev.listNganHangs.filter((account) => account.id !== id);
        return { ...prev, listNganHangs: updatedBankAccounts };
      });
    } catch (error) {
      message.error('Xóa tài khoản ngân hàng thất bại. Vui lòng thử lại.');
      console.error(error);
    }
  };

  // Hàm đặt tài khoản ngân hàng làm mặc định
  const handleSetDefaultBankAccount = async (id: string) => {
    try {
      await SetDefaultBankAccount(id);
      message.success('Đặt tài khoản ngân hàng mặc định thành công!');
      setAccountData((prev) => {
        if (!prev) return prev;
        const updatedBankAccounts = prev.listNganHangs.map((account) => ({
          ...account,
          isDefault: account.id === id,
        }));
        return { ...prev, listNganHangs: updatedBankAccounts };
      });
        getData();
    } catch (error) {
      message.error('Đặt tài khoản ngân hàng mặc định thất bại. Vui lòng thử lại.');
      console.error(error);
    }
  };

  return (
    <MainLayout label="Cấu hình hệ thống">
      <Card
        style={{
          maxWidth: 600,
          margin: '20px auto',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Divider orientation="left">Thông tin tài khoản</Divider>

        {/* Số điện thoại */}
        <Row
          justify="space-between"
          align="middle"
          style={{ padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}
        >
          <Col>
            <Text strong>Số điện thoại</Text>
            <br />
            <Text>{accountData?.so_dien_thoai ?? 'Chưa có dữ liệu'}</Text>
          </Col>
          <Col>
            <Button icon={<EditOutlined />} type="default" onClick={showPhoneModal}>
              Sửa
            </Button>
          </Col>
        </Row>

        {/* Email */}
        <Row
          justify="space-between"
          align="middle"
          style={{ padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}
        >
          <Col>
            <Text strong>Email</Text>
            <br />
            <Text>{accountData?.email ?? 'Chưa có dữ liệu'}</Text>
          </Col>
          <Col>
            <Button icon={<EditOutlined />} type="default" onClick={showEmailModal}>
              Sửa
            </Button>
          </Col>
        </Row>

        {/* Mật khẩu đăng nhập */}
        <Row
          justify="space-between"
          align="middle"
          style={{ padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}
        >
          <Col>
            <Text strong>Mật khẩu đăng nhập</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Nhấn nút: Bạn nên thường xuyên thay đổi mật khẩu để tránh các sự cố về vấn đề bảo mật
            </Text>
          </Col>
          <Col>
            <Button type="default" onClick={showPasswordModal}>
              Cập nhật
            </Button>
          </Col>
        </Row>

        {/* Tài khoản ngân hàng */}
        <Divider orientation="left">Tài khoản ngân hàng</Divider>
        <Row justify="space-between" align="middle" style={{ padding: '10px 0' }}>
          <Col>
            <Text strong>Danh sách tài khoản ngân hàng</Text>
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showBankModal()}>
              Thêm tài khoản
            </Button>
          </Col>
        </Row>
        <List
          dataSource={accountData?.listNganHangs || []}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => showBankModal(item)}
                >
                  Sửa
                </Button>,
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteBankAccount(item.id)}
                >
                  Xóa
                </Button>,
                    item.is_default ? (
                  <Tag color="green">Mặc định</Tag>
                ) : (
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={() => handleSetDefaultBankAccount(item.id)}
                  >
                    Đặt làm mặc định
                  </Button>
                ),
              ]}
            >
              <List.Item.Meta
                title={item.ten_ngan_hang}
                description={
                  <div>
                    <Text>Số tài khoản: {item.so_tai_khoan}</Text>
                    <br />
                    <Text>Chủ tài khoản: {item.ten_tai_khoan}</Text>
                  </div>
                }
              />
            </List.Item>
          )}
          locale={{ emptyText: 'Chưa có tài khoản ngân hàng nào.' }}
        />

        <Divider />
      </Card>

      {/* Modal chỉnh sửa số điện thoại */}
      <Modal
        title="Chỉnh sửa số điện thoại"
        open={isPhoneModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={phoneForm} onFinish={handleUpdatePhone}>
          <Form.Item
            name="so_dien_thoai"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              { pattern: /^[0-9]{10}$/, message: 'Số điện thoại phải có 10 chữ số!' },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal chỉnh sửa email */}
      <Modal
        title="Chỉnh sửa email"
        open={isEmailModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={emailForm} onFinish={handleUpdateEmail}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal cập nhật mật khẩu */}
      <Modal
        title="Cập nhật mật khẩu"
        open={isPasswordModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={passwordForm} onFinish={handleUpdatePassword}>
          <Form.Item
            name="oldPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
          >
            <Input.Password placeholder="Nhập mật khẩu cũ" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
              { min: 6, message: 'Mật khẩu mới phải có ít nhất 6 ký tự!' },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>
          <Form.Item
            name="confirmNewPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu mới" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal thêm/sửa tài khoản ngân hàng */}
      <Modal
        title={editingBankAccount ? 'Chỉnh sửa tài khoản ngân hàng' : 'Thêm tài khoản ngân hàng'}
        open={isBankModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={bankForm} onFinish={handleBankAccountSubmit}>
          <Form.Item
            name="ten_ngan_hang"
            rules={[{ required: true, message: 'Vui lòng nhập tên ngân hàng!' }]}
          >
            <Input placeholder="Tên ngân hàng" />
          </Form.Item>
          <Form.Item
            name="so_tai_khoan"
            rules={[
              { required: true, message: 'Vui lòng nhập số tài khoản!' },
              { pattern: /^[0-9]+$/, message: 'Số tài khoản chỉ được chứa số!' },
            ]}
          >
            <Input placeholder="Số tài khoản" />
          </Form.Item>
          <Form.Item
            name="so_the"
            rules={[
              { required: true, message: 'Vui lòng nhập số thẻ!' },
              { pattern: /^[0-9]+$/, message: 'Số thẻ chỉ được chứa số!' },
            ]}
          >
            <Input placeholder="Số thẻ" />
          </Form.Item>
          <Form.Item
            name="ten_tai_khoan"
            rules={[{ required: true, message: 'Vui lòng nhập tên chủ tài khoản!' }]}
          >
            <Input placeholder="Tên chủ tài khoản" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </MainLayout>
  );
};

export default AccountInfo;