import React, { useState } from "react";
import Banner from "./Banner.js";
import { useSelector } from "react-redux";

import { withRouter } from "react-router";


//for css
import { Layout, Menu} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
 ShoppingCartOutlined,
  BellOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

function LandingPage(props){
	const [collapsed , setCollapsed] = useState(false);

	const toggle = () => {
	setCollapsed(!collapsed);
	};

	let nav1 = null;
	let isLogin = useSelector((state)=>{return state.isLogin});
	
	let movePageToLoginPage = function(){
		props.history.push('/login');
	}
	
	  if(isLogin){
		 nav1 = <Menu.Item key="1" icon={<UserOutlined />}>
			  내 정보
			</Menu.Item>
		 }
	  else{
		 nav1 = <Menu.Item key="1" icon={<UserOutlined />} onClick={movePageToLoginPage}>
			  로그인
			</Menu.Item>
		 }
	return (
	  <Layout style ={{width: "100%"}}>
		<Sider trigger={null} collapsible collapsed={collapsed}>
		  <div className="logo" />
		  <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
			{nav1}
			<Menu.Item key="2" icon={<ShoppingCartOutlined />}>
			  장바구니
			</Menu.Item>
			<Menu.Item key="3" icon={<BellOutlined />}>
			  알림
			</Menu.Item>
		  </Menu>
		</Sider>
		<Layout className="site-layout">
		  <Header theme = "dark" className="site-layout-background" style={{ padding: "0 20px", color: "white", display : 'flex', alignItems : "center"}}>
			{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
			  className: 'trigger',
			  onClick: toggle,
			})}
			  <h4 style = {{display : "inline-block", padding : "0 20px"}}><a href= "/">#MinShop</a></h4>
		  </Header>
		  <Content
			className="site-layout-background"
			style={{
				padding: "0 3%",
			  minHeight: 280,
			}}
		  >
			<section style = {{border: "1px solid skyblue",  width : "70%", margin : '0 auto'}}>
				<div style ={{padding: "5%",backgroundColor: "skyblue"}} ><Banner /></div>
		  </section>
		  <main style ={{width: "100%", height : "1000px" ,border: "2px solid skyblue"}}>
			  main</main>
		  </Content>
		</Layout>
	  </Layout>
	);
}

export default withRouter(LandingPage);