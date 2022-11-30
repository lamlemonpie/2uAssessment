import React from "react";
import { Breadcrumb, Layout as AntLayout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const items = [
    { key: 0, label: "Invoices" },
    { key: 1, label: "Other" },
  ];

  return (
    <AntLayout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          items={items}
        />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Invoices</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">{children}</div>
      </Content>
    </AntLayout>
  );
};
