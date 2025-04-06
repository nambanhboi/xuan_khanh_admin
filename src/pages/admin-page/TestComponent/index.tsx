import MainLayout from '../../../layout/MainLayout';
import SearchLayout from '../../../layout/search-layout';
import FormItemInput from '../../../components/form-input/FormInput';
import TableCustom from '../../../components/table/table-custom';
import { Col, Row } from 'antd';


const TestComponent = () => {
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render:(item:any)=> (<>{item} {item} {item}</>),
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ];

      const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
       
      ];

    return(
        <MainLayout label='Common Component'>
            <SearchLayout 
                children={
                    <Row gutter={16}> 
                        <Col span={8}>
                            <FormItemInput label="Mã danh mục" style={{ width: "100%" }} />
                        </Col>
                        <Col span={8}>
                            <FormItemInput label="Mã danh mục" style={{ width: "100%" }} />
                        </Col>
                        <Col span={8}>
                            <FormItemInput label="Mã danh mục" style={{ width: "100%" }} />
                        </Col>
                    </Row>
                }
            />
            <TableCustom 
                columns={columns}
                dataSource={dataSource}
            />
        </MainLayout>
    )
}
export default TestComponent;
