import { Layout } from "antd";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import MenuSider from "../MenuSider";
import "./layoutAdmin.scss";
import { useState } from "react";
const { Sider, Content } = Layout;

function LayoutAdmin() {
  const [collapse, setCollapse] = useState(false);
  return (
    <>
      <Layout className="layout--admin">
        <Header collapsed={collapse} setCollapsed={setCollapse} />
        <Layout className="layout--admin__content">
          <Sider
            className="layout--admin__sider"
            theme="light"
            collapsed={collapse}
          >
            <MenuSider />
          </Sider>
          <Content>
            <Outlet />
          </Content>
        </Layout>
        <Footer className="layout--admin__footer" />
      </Layout>
    </>
  );
}

export default LayoutAdmin;
