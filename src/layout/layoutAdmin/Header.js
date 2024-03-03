import { NavLink } from "react-router-dom";
import { Button } from "antd";
import { LogoutOutlined, HomeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
function Header(props) {
  const { collapsed, setCollapsed } = props;
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <header className="layout--admin__header">
        <div
          className="header__logo"
          style={{ width: collapsed ? "60px" : "180px" }}
        >
          IT A{!collapsed && `dmin`}
        </div>
        <div className="header__left">
          <div className="header__collapse" onClick={handleCollapse}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </div>
        <div className="header__right">
          <div className="layout--admin__home">
            <NavLink to="/">
              <Button icon={<HomeOutlined />}>Trang chủ</Button>
            </NavLink>
          </div>
          <div className="layout--admin__account">
            <NavLink to="/logout">
              <Button icon={<LogoutOutlined />} type="primary" danger>
                Đăng xuất
              </Button>
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
