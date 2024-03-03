import { Button, Form, Input, Row, Select, Col, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getListCity } from "../../Services/usersServices";
import { useNavigate } from "react-router-dom";
function SearchForm() {
  const navigate = useNavigate();
  const [city, setCity] = useState([]);
  const rules = [{ require: true, message: "City is required" }];
  const onFinish = (value) => {
    let city = value.city || "";
    city = value.city === "All" ? "" : city;
    let keyword = value.keywords || "";
    navigate(`search?city=${city}&keyword=${keyword}`);
  };
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListCity();
      const allCity = {
        key: 0,
        value: "All",
        id: "2024",
      };
      setCity([allCity, ...response]);
    };
    fetchApi();
  }, []);
  return ( 
    <>
      <h1>1000+ Jobs IT</h1>
      {city && (
        <Form onFinish={onFinish} name="complex-form">
          <Row gutter={[6, 12]} justify={"center"} align={"middle"}>
            <Col xxl={6} xl={6} lg={6}>
              <Form.Item name="city" rules={rules} style={{ width: "100%" }}>
                <Select options={city} placeholder="Chọn thành phố" />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12}>
              <Form.Item name="keywords">
                <Input placeholder="Nhập job muốn tìm kiếm"  />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={3}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                >
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
}
export default SearchForm;
