import {
  Card,
  Col,
  Collapse,
  Divider,
  Row,
  Spin,
  Table,
  Typography,
  Upload,
} from "antd";
import MainLayout from "../../../../../layout/MainLayout";
import { CloseOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { CSSProperties, useEffect, useState } from "react";
import ShowToast from "../../../../../components/show-toast/ShowToast";
import "./them-san-pham.scss";
import FormItemInput from "../../../../../components/form-input/FormInput";
import FormSelect from "../../../../../components/form-select/FormSelect";
import FormAreaCustom from "../../../../../components/text-area/FormTextArea";
import ButtonCustom from "../../../../../components/button/button";
import FormInputNumber from "../../../../../components/form-input-number/FormInputNumber";
import { useNavigate, useParams } from "react-router-dom";
import { routesConfig } from "../../../../../routes/routes";
import {
  axiosConfig,
  axiosConfigUpload,
  BASE_URL,
} from "../../../../../config/configApi";
import { UploadFile } from "antd/lib";
import { UploadFileStatus } from "antd/es/upload/interface";
import { RcFile } from "antd/lib/upload";
type tuyChonPhanLoaiProps = {
  key: number;
  tuy_chon_phan_loai?: any;
};
type phanLoaiProps = {
  ten_phan_loai?: "mau-sac" | "size";
  phan_loai?: tuyChonPhanLoaiProps[];
};

interface DataSourceItem {
  mau_sac?: any;
  kich_thuoc?: any;
  gia?: number;
  khuyen_mai?: number;
  so_luong?: number;
  sku?: string;
  [key: string]: any;
}
const SuaSanPham: React.FC = () => {
  const labelStyle: CSSProperties = {
    fontWeight: "bold",
    fontSize: "20px",
    color: "var(--color-primary-7)",
  };

  const [loading, setLoading] = useState<boolean>(false);

  //thông tin sản phẩm
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [fileAnhBia, setFileAnhBia] = useState<UploadFile<any>[]>([]);
  const [maSanPham, setMaSanPham] = useState<string>("");
  const [tenSanPham, setTenSanPham] = useState<string>("");
  const [xuatXu, setXuatXu] = useState<string>("");
  const [danhMuc, setDanhMuc] = useState<string>("");
  const [moTa, setMoTa] = useState<string>("");

  //thông tin bán hàng
  const handleChange = ({ fileList }: any) => {
    if (fileList.length > 9) {
      ShowToast("warning", "Thông báo", "Tối đa có thể tải lên 9 ảnh", 3);
      return;
    }

    setFileList(fileList);
  };
  const handleChangeAnhBia = ({ fileList }: any) => {
    if (!fileList || fileList.length > 1) {
      ShowToast("warning", "Thông báo", "Tối đa có thể tải lên 1 ảnh", 3);
      return;
    }
    setFileAnhBia(fileList);
  };

  //#region thông tin sản phẩm
  const Items1 = [
    {
      key: "1",
      label: <span style={labelStyle}>Thông tin cơ bản</span>,
      children: (
        <div className="thong-tin-san-pham">
          <Row gutter={22} className="anh-san-pham thong-tin-sp">
            <Col span={4} className="label-sp">
              <Typography.Text>
                Hình ảnh sản phẩm <span style={{ color: "red" }}>*</span>:
              </Typography.Text>
            </Col>
            <Col span={20}>
              <Upload
                listType="picture-card"
                multiple
                fileList={fileList}
                accept="image/*"
                onChange={handleChange}
                beforeUpload={() => false} // Chặn upload ngay, chỉ xử lý trong React
              >
                {fileList.length < 9 && (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>
                      Thêm hình ảnh ({fileList.length}/9)
                    </div>
                  </div>
                )}
              </Upload>
            </Col>
          </Row>

          <Row gutter={22} className="anh-bia thong-tin-sp">
            <Col span={4} className="label-sp">
              <Typography.Text>
                Ảnh bìa <span style={{ color: "red" }}>*</span>:
              </Typography.Text>
            </Col>
            <Col span={20}>
              <Upload
                listType="picture-card"
                fileList={fileAnhBia}
                accept="image/*"
                onChange={handleChangeAnhBia}
                beforeUpload={() => false} // Chặn upload ngay, chỉ xử lý trong React
              >
                {fileAnhBia.length < 1 && (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>
                      Thêm hình ảnh ({fileAnhBia.length}/1)
                    </div>
                  </div>
                )}
              </Upload>
            </Col>
          </Row>

          <Row gutter={22} className="ma-san-pham thong-tin-sp">
            <Col span={4} className="label-sp">
              <Typography.Text>
                Mã sản phẩm <span style={{ color: "red" }}>*</span>:
              </Typography.Text>
            </Col>
            <Col span={20}>
              <FormItemInput
                placeholder="Mã sản phẩm"
                value={maSanPham}
                onChange={(e: any) => setMaSanPham(e.target.value)}
              />
            </Col>
          </Row>
          <Row gutter={22} className="ten-san-pham thong-tin-sp">
            <Col span={4} className="label-sp">
              <Typography.Text>
                Tên sản phẩm <span style={{ color: "red" }}>*</span>:
              </Typography.Text>
            </Col>
            <Col span={20}>
              <FormItemInput
                placeholder="Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật"
                value={tenSanPham}
                onChange={(e: any) => setTenSanPham(e.target.value)}
              />
            </Col>
          </Row>

          <Row gutter={24} className="danh-muc-san-pham thong-tin-sp">
            <Col span={4} className="label-sp">
              <Typography.Text>
                Danh mục sản phẩm <span style={{ color: "red" }}>*</span>:
              </Typography.Text>
            </Col>
            <Col span={20}>
              <FormSelect
                selectType="selectApi"
                src="/api/DanhMucSanPham/get-all"
                labelField="ten_danh_muc"
                valueField="id"
                style={{ width: "100%" }}
                placeholder="Chọn danh mục sản phẩm"
                value={danhMuc}
                onChange={(val: string) => setDanhMuc(val)}
                allowClear={true}
              />
            </Col>
          </Row>

          <Row gutter={24} className="xuat-xu-san-pham thong-tin-sp">
            <Col span={4} className="label-sp">
              <Typography.Text>Xuất xứ:</Typography.Text>
            </Col>
            <Col span={20}>
              <FormItemInput
                placeholder="Nhập xuất xứ"
                value={xuatXu}
                onChange={(e: any) => setXuatXu(e.target.value)}
              />
            </Col>
          </Row>

          <Row gutter={24} className="mo-ta-san-pham thong-tin-sp">
            <Col span={4} className="label-sp">
              <Typography.Text>
                Mô tả sản phẩm <span style={{ color: "red" }}>*</span>:
              </Typography.Text>
            </Col>
            <Col span={20}>
              <FormAreaCustom
                placeholder="Nhập mô tả sản phẩm"
                value={moTa}
                onChange={(e: any) => setMoTa(e.target.value)}
                style={{ height: "200px" }}
              />
            </Col>
          </Row>
        </div>
      ),
    },
  ];
  //#endregion

  //#region Thông tin bán hàng
  const [dataSource, setDataSource] = useState<DataSourceItem[]>([]);
  const [phan_loai, set_phan_loai] = useState<phanLoaiProps[]>([
    {
      ten_phan_loai: "mau-sac",
      phan_loai: [
        {
          key: 1,
          tuy_chon_phan_loai: "",
        },
      ],
    },
  ]);

  const columns = [
    ...phan_loai.map((item: any) => ({
      title: item.ten_phan_loai === "mau-sac" ? "Màu sắc" : "Kích thước",
      dataIndex: item.ten_phan_loai,
      key: item.ten_phan_loai,
      width: 250,
      render: (text: any, record: any, index: any) => ({
        children: text || record[item.ten_phan_loai],
        props: {
          rowSpan:
            item.ten_phan_loai === "mau-sac"
              ? getRowSpan(dataSource, index, "mau-sac")
              : null,
        },
      }),
    })),
    {
      title: "Giá",
      dataIndex: "gia",
      key: "gia",
      render: (text: any, record: any) => (
        <>
          <FormInputNumber
            value={record.gia}
            style={{ width: "100%" }}
            afterPrefixIcon="VND"
            onChange={(value: number | null, values: string | null) => {
              if (value !== null) {
                const updatedDataSource = dataSource.map((item, index) =>
                  item.key === record.key ? { ...item, gia: value } : item
                );
                setDataSource(updatedDataSource);
              }
            }}
          />
        </>
      ),
    },
    {
      title: "Giá khuyến mại",
      dataIndex: "khuyen_mai",
      key: "khuyen_mai",
      render: (text: any, record: any) => (
        <>
          <FormInputNumber
            value={record.khuyen_mai}
            style={{ width: "100%" }}
            afterPrefixIcon="VND"
            onChange={(value: number | null, values: string | null) => {
              if (value !== null) {
                const updatedDataSource = dataSource.map((item, index) =>
                  item.key === record.key
                    ? { ...item, khuyen_mai: value }
                    : item
                );
                setDataSource(updatedDataSource);
              }
            }}
          />
        </>
      ),
    },
    {
      title: "Kho hàng",
      dataIndex: "so_luong",
      key: "so_luong",
      render: (text: any, record: any) => (
        <>
          <FormInputNumber
            value={record.so_luong}
            style={{ width: "100%" }}
            onChange={(value: number | null, values: string | null) => {
              if (value !== null) {
                const updatedDataSource = dataSource.map((item, index) =>
                  item.key === record.key ? { ...item, so_luong: value } : item
                );
                setDataSource(updatedDataSource);
              }
            }}
          />
        </>
      ),
    },
    {
      title: "SKU phân loại",
      dataIndex: "sku",
      key: "sku",
      render: (text: any, record: any) => (
        <>
          <FormItemInput
            value={record.sku}
            onChange={(e: any) => {
              const updatedDataSource = dataSource.map((item, index) => {
                return item.key === record.key
                  ? { ...item, sku: e.target.value }
                  : item;
              });
              setDataSource(updatedDataSource);
            }}
          />
        </>
      ),
    },
  ];

  // Hàm tính rowSpan cho cột "màu sắc"
  const getRowSpan = (data: any, index: any, field: any) => {
    if (index === 0 || data[index - 1][field] !== data[index][field]) {
      const count = data.filter(
        (item: any) => item[field] === data[index][field]
      ).length;
      return count;
    }
    return 0;
  };

  useEffect(() => {
    if (
      phan_loai.length === 2 &&
      phan_loai[0].ten_phan_loai === phan_loai[1].ten_phan_loai &&
      phan_loai[0].ten_phan_loai !== undefined &&
      phan_loai[1].ten_phan_loai !== undefined
    ) {
      ShowToast(
        "warning",
        "Thông báo",
        `Phân loại "${
          phan_loai[1].ten_phan_loai === "mau-sac" ? "Màu sắc" : "Kích thước"
        }" đã tồn tại`
      );
      const updatedPhanLoai = [...phan_loai];
      updatedPhanLoai[1].ten_phan_loai =
        updatedPhanLoai[0].ten_phan_loai === "mau-sac" ? "size" : "mau-sac";
      set_phan_loai(updatedPhanLoai);
    }

    var arr: DataSourceItem[] = [];

    const mauSac =
      phan_loai.find((item: any) => item.ten_phan_loai === "mau-sac")
        ?.phan_loai || [];
    const kichThuoc =
      phan_loai.find((item: any) => item.ten_phan_loai === "size")?.phan_loai ||
      [];

    mauSac.forEach((mau: any) => {
      if (kichThuoc.length > 0) {
        kichThuoc.forEach((size: any) => {
          const existingItem = dataSource.find(
            (item) =>
              item["mau-sac"] === mau.tuy_chon_phan_loai &&
              item.size === size.tuy_chon_phan_loai
          );

          arr.push({
            key: existingItem?.key || `${Math.random()}`,
            "mau-sac": mau.tuy_chon_phan_loai,
            size: size.tuy_chon_phan_loai,
            gia: existingItem?.gia || undefined,
            khuyen_mai: existingItem?.khuyen_mai || undefined,
            so_luong: existingItem?.so_luong || undefined,
            sku: existingItem?.sku || undefined,
          });
        });
      } else {
        const existingItem = dataSource.find(
          (item) => item["mau-sac"] === mau.tuy_chon_phan_loai
        );

        arr.push({
          key: existingItem?.key || `${Math.random()}`,
          "mau-sac": mau.tuy_chon_phan_loai,
          khuyen_mai: existingItem?.khuyen_mai || undefined,
          gia: existingItem?.gia || undefined,
          so_luong: existingItem?.so_luong || undefined,
          sku: existingItem?.sku || undefined,
        });
      }
    });

    setDataSource(arr);
  }, [phan_loai]);
  const Items2 = [
    {
      key: "1",
      label: <span style={labelStyle}>Thông tin bán hàng</span>,
      children: (
        <div className="thong-tin-ban-hang">
          <Row gutter={22} className="phan-loai thong-tin-sp">
            <Col span={4} className="label-sp">
              <Typography.Text>Phân loại hàng:</Typography.Text>
            </Col>
            <Col span={20}>
              {phan_loai.map((item: any) => {
                return (
                  <>
                    <Card
                      extra={
                        <CloseOutlined
                          className="btn btn-close"
                          onClick={() => {
                            const updatedPhanLoai = phan_loai.filter(
                              (phanLoaiItem) => phanLoaiItem !== item
                            );
                            set_phan_loai(updatedPhanLoai);
                          }}
                        />
                      }
                      title={
                        item.ten_phan_loai === "mau-sac"
                          ? "Màu sắc"
                          : "Kích thước"
                      }
                      style={{ margin: "8px 0" }}
                    >
                      <FormSelect
                        selectType="normal"
                        label="Phân loại"
                        value={item.ten_phan_loai}
                        allOptionLabel=""
                        defaultFirstOption={true}
                        onChange={(val: "mau-sac" | "size") => {
                          const updatedPhanLoai = phan_loai.map(
                            (phanLoaiItem) =>
                              phanLoaiItem === item
                                ? { ...phanLoaiItem, ten_phan_loai: val }
                                : phanLoaiItem
                          );
                          set_phan_loai(updatedPhanLoai);
                        }}
                        options={[
                          {
                            label: "Màu sắc",
                            value: "mau-sac",
                          },
                          {
                            label: "Kích thước",
                            value: "size",
                          },
                        ]}
                      />

                      <div>
                        <div style={{ marginBottom: "4px" }}>
                          <Typography.Text>Tùy chọn</Typography.Text>
                          <PlusOutlined
                            className="btn btn-add"
                            onClick={() => {
                              const updatedPhanLoai = phan_loai.map(
                                (phanLoaiItem) => {
                                  if (phanLoaiItem === item) {
                                    return {
                                      ...phanLoaiItem,
                                      phan_loai: [
                                        ...(phanLoaiItem.phan_loai || []),
                                        {
                                          key: Date.now(),
                                          tuy_chon_phan_loai: "",
                                        },
                                      ],
                                    };
                                  }
                                  return phanLoaiItem;
                                }
                              );
                              set_phan_loai(updatedPhanLoai);
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(3, 1fr)`,
                            gap: "8px",
                          }}
                        >
                          {item.phan_loai.map((pl: any) => {
                            return (
                              <div style={{ display: "flex" }}>
                                <FormItemInput
                                  value={pl.tuy_chon_phan_loai}
                                  onChange={(e: any) => {
                                    const updatedPhanLoai = phan_loai.map(
                                      (phanLoaiItem: any) => {
                                        if (phanLoaiItem === item) {
                                          const updatedOptions =
                                            phanLoaiItem.phan_loai?.map(
                                              (option: any) =>
                                                option === pl
                                                  ? {
                                                      ...option,
                                                      tuy_chon_phan_loai:
                                                        e.target.value,
                                                    }
                                                  : option
                                            );
                                          return {
                                            ...phanLoaiItem,
                                            phan_loai: updatedOptions,
                                          };
                                        }
                                        return phanLoaiItem;
                                      }
                                    );
                                    set_phan_loai(updatedPhanLoai);
                                  }}
                                />
                                <DeleteOutlined
                                  className="btn btn-delete"
                                  onClick={() => {
                                    const updatedPhanLoai = phan_loai.map(
                                      (phanLoaiItem) => {
                                        if (phanLoaiItem === item) {
                                          const filteredOptions =
                                            phanLoaiItem.phan_loai?.filter(
                                              (option) => option !== pl
                                            );
                                          return {
                                            ...phanLoaiItem,
                                            phan_loai: filteredOptions,
                                          };
                                        }
                                        return phanLoaiItem;
                                      }
                                    );
                                    set_phan_loai(updatedPhanLoai);
                                  }}
                                />
                                <PlusOutlined
                                  className="btn btn-add"
                                  onClick={() => {
                                    const updatedPhanLoai = phan_loai.map(
                                      (phanLoaiItem) => {
                                        if (phanLoaiItem === item) {
                                          return {
                                            ...phanLoaiItem,
                                            phan_loai: [
                                              ...(phanLoaiItem.phan_loai || []),
                                              {
                                                key: Date.now(),
                                                tuy_chon_phan_loai: "",
                                              },
                                            ],
                                          };
                                        }
                                        return phanLoaiItem;
                                      }
                                    );
                                    set_phan_loai(updatedPhanLoai);
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </Card>
                  </>
                );
              })}
              <ButtonCustom
                text="Thêm mới phân loại"
                style={{ marginTop: "8px" }}
                className={phan_loai.length === 2 ? "hide" : ""}
                onClick={() => {
                  if (phan_loai.length < 2) {
                    set_phan_loai([
                      ...phan_loai,
                      {
                        ten_phan_loai: "mau-sac",
                        phan_loai: [
                          { key: Date.now(), tuy_chon_phan_loai: "" },
                        ],
                      },
                    ]);
                  }
                }}
              />
            </Col>
          </Row>
          <Divider />

          <Row gutter={22} className="ds-phan-loai thong-tin-sp">
            <Col span={4} className="label-sp">
              <Typography.Text>Danh sách phân loại hàng:</Typography.Text>
            </Col>

            <Col span={20}>
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
              />
            </Col>
          </Row>
        </div>
      ),
    },
  ];
  //#endregion
  const { ma_san_pham } = useParams<{ ma_san_pham: string }>();
  const fetchAndConvertImage = async (
    imageUrl: string,
    fileName: string
  ): Promise<UploadFile<any> | null> => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: blob.type });

      return {
        uid: `${Math.random()}`, // Để tránh lỗi key
        name: fileName,
        status: "done",
        url: imageUrl, // Giữ URL hiển thị preview
        originFileObj: file as RcFile, // Quan trọng để gửi lên server
      };
    } catch (error) {
      console.error("Lỗi khi tải ảnh:", error);
      return null;
    }
  };
  useEffect(() => {
    setLoading(true);
    axiosConfig
      .get(`api/DanhSachSanPham/get-by-ma/${ma_san_pham}`)
      .then(async (res: any) => {
        var dataSP = res.data[0];
        var dataBienThe = res.data;

        setMaSanPham(dataSP.ma_san_pham);
        setTenSanPham(dataSP.ten_san_pham);
        setDanhMuc(dataSP.danh_muc_id);
        setXuatXu(dataSP.xuat_xu);
        setMoTa(dataSP.mo_ta);
        const fileName = dataSP.duong_dan_anh_bia.split("/").pop() || "image.jpg";
        const convertFile = await fetchAndConvertImage(
          `${BASE_URL}/${dataSP.duong_dan_anh_bia}`,
          fileName
        );
        var anhBia: UploadFile<any>[] = convertFile ? [convertFile] : [];
        var anhSanPham = await Promise.all(
          dataSP.ds_anh_san_pham.map(async (item: any) => {
            const fileName = item.split("/").pop() || "image.jpg";
            return await fetchAndConvertImage(
              `${BASE_URL}/${item}`,
              fileName
            );
          })
        );

        setFileList(anhSanPham);
        setFileAnhBia(anhBia);
        var phan_loai = dataSP.ls_phan_loai.map((item: any) => {
          return {
            ten_phan_loai: item.ten_phan_loai,
            phan_loai: item.phan_loai.map((pl: any, index: any) => {
              return {
                key: index,
                tuy_chon_phan_loai: pl,
              };
            }),
          };
        });
        set_phan_loai(phan_loai);

        var dataSrc = dataBienThe.map((item: any, index: any) => {
          return {
            key: index,
            "mau-sac": item.mau_sac,
            size: item.size,
            khuyen_mai: item.khuyen_mai,
            gia: item.gia,
            so_luong: item.so_luong,
            sku: item.sku,
          };
        });

        setDataSource(dataSrc);
      })
      .catch((err: any) => {
        ShowToast("error", "Thông báo", "có lỗi xảy ra", 3);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const navigate = useNavigate();

  const handleOk = async () => {
    setLoading(true);
    //lưu ảnh trước => trả ra đường dẫn => lưu data sản phẩm
    const formData = new FormData();
    const formDataMuti = new FormData();
    fileAnhBia.forEach((file: any) => {
      if (file.originFileObj) {
        formData.append("file", file.originFileObj);
      }
    });
    fileList.forEach((file: any) => {
      if (file.originFileObj) {
        formDataMuti.append("files", file.originFileObj);
      }
    });

    const formDataToSend = new FormData();
    if (ma_san_pham) {
      formDataToSend.append("ma", ma_san_pham);
    } else {
      console.error("ma_san_pham is undefined");
    }

    fileAnhBia.forEach((file: any) => {
      if (file.originFileObj) {
        formDataToSend.append("anh_bia", file.originFileObj);
      }
    });

    fileList.forEach((file: any) => {
      if (file.originFileObj) {
        formDataToSend.append("ls_anh_san_pham", file.originFileObj);
      }
    });

    formDataToSend.append(
      "data_san_pham",
      JSON.stringify(
        dataSource.map((item: any) => {
          return {
            danh_muc_id: danhMuc || null,
            ma_san_pham: maSanPham || null,
            ten_san_pham: tenSanPham || null,
            mo_ta: moTa || null,
            xuat_xu: xuatXu || null,
            mau_sac: item["mau-sac"] || null,
            size: item["size"] || null,
            gia: item.gia || null,
            khuyen_mai: item.khuyen_mai || null,
            so_luong: item.so_luong || null,
            sku: item.sku || null,
          };
        })
      )
    );

    try {
      axiosConfigUpload.put("api/DanhSachSanPham/update-san-pham", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          ShowToast("success", "Thông báo", "Cập nhật sản phẩm thành công", 3);
          navigate(routesConfig.quanLySanPham);
        })
        .catch(() => {
          ShowToast("error", "Thông báo", "Cập nhật sản phẩm thất bại", 3);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      ShowToast("error", "Thông báo", "Lỗi khi tải ảnh lên", 3);
      setLoading(false);
    }
    return false;
  };

  return (
    <>
      <MainLayout label="Cập nhật sản phẩm">
        <Spin spinning={loading}>
          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={() => false}
            items={Items1}
            style={{ marginBottom: "16px" }}
          />

          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={() => false}
            items={Items2}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            <ButtonCustom
              text="Hủy"
              variant="outlined"
              style={{ width: "100px" }}
              onClick={() => {
                navigate(routesConfig.quanLySanPham);
              }}
            />
            <ButtonCustom
              text="Lưu"
              variant="solid"
              style={{ width: "100px" }}
              onClick={handleOk}
            />
          </div>
        </Spin>
      </MainLayout>
    </>
  );
};

export default SuaSanPham;
