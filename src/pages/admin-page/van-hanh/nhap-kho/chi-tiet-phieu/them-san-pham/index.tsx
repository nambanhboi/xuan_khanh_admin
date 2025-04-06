import React, { useState } from "react";
import TableCustom from "../../../../../../components/table/table-custom";
import { Col, Divider, Form, Image, Row } from "antd";
import FormSelect from "../../../../../../components/form-select/FormSelect";
import ButtonCustom from "../../../../../../components/button/button";
import { BASE_URL } from "../../../../../../config/configApi";
type ThemSanPhamVaoPhieuNhapProps = {
  onCancel?: () => void;
  setDataSource?: React.Dispatch<React.SetStateAction<any>>;
};
type dataSourceInterface = {
  key: string;
  san_pham_id?: string;
  duong_dan_anh_bia?:string;
  ma_san_pham?: string;
  ten_san_pham?: string;
  ten_danh_muc?: string;
  sku?: string;
  so_luong?: number;
  don_gia?: number;
};
const ThemSanPhamVaoPhieuNhap: React.FC<ThemSanPhamVaoPhieuNhapProps> = ({
  onCancel,
  setDataSource,
}) => {
  const [selectedProducts, setSelectedProducts] = useState<
    dataSourceInterface[]
  >([]);

  const columns = [
    {
      title: "Ảnh sản phẩm",
      dataIndex: "duong_dan_anh_bia",
      key: "duong_dan_anh_bia",
      render: (item: any) => (
        <>
          <Image
            width={100}
            src={`${BASE_URL}/${item}`}
          />
        </>
      ),
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "ma_san_pham",
      key: "ma_san_pham",
      render: (item: any) => <>{item}</>,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "ten_san_pham",
      key: "ten_san_pham",
    },
    {
      title: "Danh mục",
      dataIndex: "ten_danh_muc",
      key: "ten_danh_muc",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
  ];

  const handleOK = () => {
    const dataTable = selectedProducts.map((item:any):dataSourceInterface=> {
        return {
            key: item.id,
            san_pham_id: item.id,
            ma_san_pham:item.ma_san_pham,
            sku: item.sku,
            duong_dan_anh_bia: item.duong_dan_anh_bia,
            ten_danh_muc:item.ten_danh_muc,
            ten_san_pham:item.ten_san_pham
        }
    })
    setDataSource?.(dataTable)
    onCancel?.();
  };

  return (
    <div>
      <TableCustom
        get_list_url="api/DanhSachSanPham/get-all-sku"
        add_button={false}
        export_button={false}
        delete_button={false}
        isEditOne={false}
        isDeleteOne={false}
        setSelected={setSelectedProducts}
        columns={columns}
        searchComponent={
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="danh_muc_id">
                <FormSelect
                  style={{ width: "100%" }}
                  selectType="selectApi"
                  allOptionLabel="Tất cả"
                  src="api/DanhMucSanPham/get-all"
                  labelField="ten_danh_muc"
                  valueField={"id"}
                />
              </Form.Item>
            </Col>
          </Row>
        }
      />

      <Divider />
      <div style={{ display: "flex", gap: "18px", justifyContent: "center" }}>
        <ButtonCustom text="Đóng" variant="outlined" onClick={onCancel} />
        <ButtonCustom text="Cập nhật phiếu" onClick={handleOK} />
      </div>
    </div>
  );
};

export default ThemSanPhamVaoPhieuNhap;
