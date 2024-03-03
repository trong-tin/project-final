import { Button, Form, Input } from "antd";
import enerateRandomString from "../../Components/RandomString";
import { getCompany, postCompany } from "../../Services/usersServices";
import { useEffect, useState } from "react";
function Register() {
  const [dataCompany, setDataCompany] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getCompany();
      setDataCompany(response);
    };
    fetchApi();
  }, []);
  const handleFinissh = (value) => {
    const companyName = value.companyName;
    const phone = value.companyPhone;
    const email = value.companyEmail;
    const passWord = value.companyPassWord;
    const token = enerateRandomString(20).toString();
    const checkEmail = dataCompany.some((item) => item.email === email);
    if (checkEmail) {
      alert("Email đã được đăng ký");
    } else {
      const option = {
        companyName: companyName,
        phone: phone,
        email: email,
        password: passWord,
        token: token,
        id: Date.now().toString(),
      };
      postCompany(option);
      alert("Bạn đã đăng ký tài khoản cho công ty thành công");
    }
  };
  return (
    <>
      <Form
        name="register"
        onFinish={handleFinissh}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        style={{
          maxWidth: "100%",
          textAlign: "center",
        }}
      >
        <Form.Item
          name="companyName"
          label="Nhập tên công ty"
          rules={[
            { required: true, message: "Vui lòng nhập tên của công ty!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="companyPhone"
          label="Nhập số điện thoại"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại của công ty!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="companyEmail"
          label="Nhập email"
          rules={[
            { required: true, message: "Vui lòng nhập email của công ty!" },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name="companyPassWord"
          label="Nhập mật khẩu"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Register;
