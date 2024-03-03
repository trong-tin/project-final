import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  UserOutlined,
  ProfileOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem(<Link to="admin">Tổng quan</Link>, "1", <AppstoreOutlined />),
  getItem(
    <Link to="info-company">Thông tin công ty</Link>,
    "2",
    <UserOutlined />
  ),
  getItem(
    <Link to="job-manage">Quản lý việc làm</Link>,
    "3",
    <ProfileOutlined />
  ),
  getItem(<Link to="cv-manage">Quản lý CV</Link>, "4", <MailOutlined />),
];

function MenuSider() {
  return (
    <>
      <div className="sider__menu">
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="light"
          items={items}
        />
      </div>
    </>
  );
}

export default MenuSider;
