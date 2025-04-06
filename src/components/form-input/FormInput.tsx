import { ChangeEvent, FunctionComponent, KeyboardEvent, ReactNode, useEffect, useRef } from "react";
import "./form-input.scss";
import { Input, Typography } from "antd";
import { InputStatus } from "antd/es/_util/statusUtils";
import { CloseOutlined } from "@ant-design/icons";

type FormItemInputProps = {
  formItemName?: any;
  label?: string; 
  labelStyle?: any;
  prefixIcon?: ReactNode | string;
  afterPrefixIcon?: ReactNode;
  placeholder?: string;
  suffix?: ReactNode | string;
  readOnly?: boolean;
  value?: string | string[] | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  passwordInput?: boolean;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  status?: InputStatus;
  type?: string;
  required?: boolean;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  className?:string
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  prefix?: React.ReactNode;
  allowClear?: boolean | {clearIcon?: ReactNode} | undefined
  maxLength?: number; // Thêm thuộc tính maxLength
  valueRender?: any;
  fromRender?: boolean;
};

const FormItemInput: FunctionComponent<FormItemInputProps> = ({
  formItemName,
  label, // Nhận label từ props
  labelStyle,
  prefixIcon,
  afterPrefixIcon,
  placeholder,
  value,
  onChange,
  onKeyPress,
  disabled,
  readOnly,
  suffix,
  style = { marginBottom: "0px" },
  status,
  required = false,
  onBlur,
  autoFocus,
  className,
  onPaste,
  prefix,
  allowClear,
  maxLength,
  valueRender,
  fromRender,
  ...rest
}) => {

  const inputRef = useRef<any>(null);
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      //inputRef.current.focus();
    }
  }, [autoFocus]);

  // Hàm xử lý để loại bỏ khoảng trắng đầu cuối
  const handleChangeBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.trim();
    // Gọi hàm onChange nếu được truyền từ props
    if (onChange) {
      onChange({
        ...e,
        target: { ...e.target, value: trimmedValue },
      });
    }

    if(onBlur){
      onBlur(e)
    }
  };

  return (
    <div className="ant-form-item-control-input-content">
    <div className="form-item form-item-custom">
      <Typography.Text style={labelStyle || { fontSize: "16px" }}>{label} {required ? (<span style={{color:"red"}}>*</span>) : ""}</Typography.Text>
      <Input
        prefix={prefix}
        onBlur={handleChangeBlur}
        disabled={disabled}
        addonBefore={prefixIcon}
        addonAfter={afterPrefixIcon}
        value={value}
        //value={fromRender === true ? valueRender : value}
        style={{width:"100%"}}
        readOnly={readOnly}
        suffix={suffix}
        status={status}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        allowClear={allowClear ?? {
          clearIcon:<CloseOutlined className="clearContentIcon2" />
        }}
        required={required}
        autoFocus={autoFocus}
        ref={inputRef}
        onPaste={onPaste}
        maxLength={maxLength}
        {...rest}
        className={`form-input ${className ?? ''}`}
      />
    </div>
    </div>
  );
};

export default FormItemInput;
