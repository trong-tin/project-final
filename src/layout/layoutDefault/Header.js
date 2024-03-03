import { NavLink } from "react-router-dom";
import { Button } from "antd";
import { LaptopOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import {
  UnorderedListOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

function Header() {
  const isLogin = useSelector((state) => state.loginReducer);
  return (
    <>
      <header className="layout--default__header">
        <div className="layout--default__logo">
          <LaptopOutlined className="layout--default__logo icon" />
          <h3 className="layout--default__logo title">IT Jobs</h3>
        </div>
        <div className="layout--default__menu">
          <NavLink to="/">Home</NavLink>
        </div>
        <div className="layout--default__account">
          {isLogin ? (
            <>
              <NavLink to="/admin">
                <Button icon={<UnorderedListOutlined />}>Quản lí</Button>
              </NavLink>
              <NavLink to="/logout">
                <Button type="primary" danger icon={<LogoutOutlined />}>
                  Đăng xuất
                </Button>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <Button type="primary" icon={<LoginOutlined />}>
                  Đăng nhập
                </Button>
              </NavLink>

              <NavLink to="/register">
                <Button icon={<UserAddOutlined />}>Đăng ký</Button>
              </NavLink>
            </>
          )}
        </div>
      </header>
    </>
  );
}
export default Header;
