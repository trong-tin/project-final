import { useEffect, useState } from "react";
import { getCookie } from "../../Helpers/cookie";
import { changeCompany, getDetailCompany } from "../../Services/usersServices";
import { Button, Card, Col, Form, Input, Row, message } from "antd";

function InfoCompany() {
  const idCompany = getCookie("id");
  const [data, setData] = useState();
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [form] = Form.useForm();
  const [mess, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const { TextArea } = Input;
  const handleClick = () => {
    setComponentDisabled(!componentDisabled);
  };

  const rules = [
    {
      required: true,
      message: "Vui lòng nhập đầy đủ thông tin",
    },
  ];

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDetailCompany(idCompany);
      setData(response[0]);
    };
    fetchApi();
  }, [loading]);
  const handleFinish = (value) => {
    changeCompany(idCompany, value);
    mess.success("Bạn đã thay đổi thông tin thành công");
    setLoading(!loading);
    setComponentDisabled(!componentDisabled);
  };
  return (
    <>
      {contextHolder}
      {data && (
        <Card
          title="Thông tin công ty"
          extra={
            componentDisabled ? (
              <Button danger onClick={handleClick}>
                Chỉnh sửa
              </Button>
            ) : (
              <Button type="primary" danger onClick={handleClick}>
                Hủy
              </Button>
            )
          }
        >
          <Form
            layout="vertical"
            initialValues={data}
            form={form}
            disabled={componentDisabled}
            onFinish={handleFinish}
          >
            <Row gutter={20} justify="end">
              <Col span={24}>
                <Form.Item label="Tên công ty" name="companyName" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Email" name="email" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Địa chỉ" name="address" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Số lượng nhân sự"
                  name="quantityPeople"
                  rules={rules}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Thời gian làm việc"
                  name="workingTime"
                  rules={rules}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Link website" name="website" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Mô tả ngắn" name="description" rules={rules}>
                  <TextArea rows={10} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Mô tả chi tiết" name="detail" rules={rules}>
                  <TextArea rows={10} />
                </Form.Item>
              </Col>
              {!componentDisabled && (
                <Col span={2}>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      type="primary"
                      size="large"
                      style={{ width: "100%" }}
                    >
                      OK
                    </Button>
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Form>
        </Card>
      )}
    </>
  );
}
export default InfoCompany;
