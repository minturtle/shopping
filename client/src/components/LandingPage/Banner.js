import React,{ Component } from "react";
import { getBanner } from "../../_action/banner_action.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {Spin } from 'antd';
/*<Slider {...this.settings}>
				{this.getState.map((bannerURI)=>{
					return <img src = {bannerURI} alt ="img" />
				})}
			</Slider>*/

//https://minshopping.s3.ap-northeast-2.amazonaws.com/banner/1623420413324.jpg
export default class Banner extends Component{
	constructor(props){
		super(props);
		var state = {};
		getBanner().then((banners,err)=>{
			if(err) return console.log(err);
			this.setState({...state, BannersURI : banners});
		})
		
	}
	settings = {
		dots: true,
		arrows: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: true,
  };
	
	render(){
		if(this.state === null){
			return (<div ><Spin /></div> )
		}
		else{
			return (
		
			<Slider {...this.settings}>
				{this.state.BannersURI.map((uri)=>{
			return <img src = {uri} alt ="banner" />
				})}
			</Slider>
	)
	}
		}
	
	
}