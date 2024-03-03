import { Form, Input, Checkbox, Button, message } from "antd";
import { login } from "../../Services/usersServices";
import { useDispatch } from "react-redux";
import checkLogin from "../../Action/login";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../Helpers/cookie";

function Login() {
  const [mess, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (inforUser) => {
    const email = inforUser.email;
    const password = inforUser.password;
    const response = await login(email, password);
    if (response.length > 0) {
      mess.success("Bạn đã đăng nhập thành công");
      const time = 1;
      setCookie("id", response[0].id, time);
      setCookie("email", response[0].email, time);
      setCookie("token", response[0].token, time);
      dispatch(checkLogin(true));
      navigate("/");
    }
  };
  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Login;
