$(function(){
	var w_w=$(window).width();
	var m_l=(1920-w_w)/2;
	$('.fw .fw_bg img').css('margin-left','-'+m_l+'px');
	
	$('.nav_m .n_icon').click(function(){
		$(this).siblings('ul').slideToggle();
	});
	$('.nav_m ul li').click(function(){
		$(this).parents('ul').slideUp();	
	});
	
	
	$('.i_brd_m li:last-child').css('margin-right',0+'px');
	$('.scd_l .s_nav li').click(function(){
		$(this).siblings('li').removeClass('now');
		$(this).addClass('now');
	});
	
	$('.pro_l li:nth-child(3n)').css('margin-right',0+'px');
	
})


/*如果URL的后缀名是html，或者无文件(默认index.html)的话，才开启轮播。后台编辑时不会轮播*/
if(window.location.pathname.split('.').pop().toLowerCase() == 'html' || window.location.pathname.split('.').pop().toLowerCase() == '/'){
	//由JS自动复制头部、尾部的nav导航
	try{
		document.getElementById("m_nav").innerHTML = document.getElementById("nav").innerHTML;
		document.getElementById("foot_nav").innerHTML = document.getElementById("nav").innerHTML;
	}catch(err){}
	
	//由JS自动复制内页左侧的nav导航
	try{
		document.getElementById("nei_left_nav").innerHTML = document.getElementById("nav").innerHTML;
	}catch(err){}
}