import { useParams } from "react-router-dom";
import {
  getDetailCompany,
  getJob,
  getListCity,
  postCV,
} from "../../Services/usersServices";
import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";

function JobDetail() {
  const [data, setData] = useState([]);
  const [dataCity, setDataCity] = useState([]);
  const params = useParams();
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getJob(params.id);
      const inforCompany = await getDetailCompany(response[0].idCompany);
      let dataFinal = { ...inforCompany[0], ...response[0] };
      setData(dataFinal);
      const responseCity = await getListCity();
      setDataCity(responseCity);
    };
    fetchApi();
  }, []);
  let options = [];
  dataCity.forEach((item) => {
    options.push({ value: item.value, label: item.value });
  });
  const handleFinish = (value) => {
    const currentDate = new Date(Date.now());
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      currentDate
    );
    value = {
      ...value,
      id: Date.now().toString(),
      idCompany: data.idCompany,
      idJob: data.id,
      statusRead: false,
      createAt: formattedDate,
    };
    postCV(value);
  };
  return (
    <>
      <h1>{data.name}</h1>
      <Button href="#formApply" type="primary" size="large" className="mb-20">
        ỨNG TUYỂN NGAY
      </Button>
      <div className="mb-20">
        <span>Tags:</span>
        {(data.tags || []).map((item, index) => (
          <Tag color="blue" key={index}>
            {item}
          </Tag>
        ))}
      </div>
      <div className="mb-20">
        <span>Thành phố:</span>
        {(data.city || []).map((item, index) => (
          <Tag color="orange" key={index}>
            {item}
          </Tag>
        ))}
      </div>
      <div>
        Địa chỉ công ty: <strong>{data.address}</strong>
      </div>
      <div>
        Thời gian đăng bài: <strong>{data.createAt}</strong>
      </div>
      <div>
        <p>Mô tả công việc: {data.description}</p>
      </div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        Tạo CV để ứng tuyển
      </Button>

      <Form onFinish={handleFinish}>
        <Row gutter={[10, 10]} justify={"end"}>
          <Col span={8}>
            <Form.Item name="name" label="Họ và tên">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="phone" label="Số điện thoại">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="email" label="Email">
              <Input type="email" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="city" label="Chọn thành phố">
              <Select options={options} placeholder="Thành phố" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="linkProject" label="Link project">
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="description" label="Gớii thiệu bản thân">
              <TextArea rows={10} />
            </Form.Item>
          </Col>
          <Button htmlType="submit" type="primary" size="large">
            Gửi
          </Button>
        </Row>
      </Form>
    </>
  );
}
export default JobDetail;
