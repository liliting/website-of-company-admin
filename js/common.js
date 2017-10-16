/*
@Description :　minelan admin
@Author : liliting
 */
$(function(){
	/* menu菜单*/
	$('.menu-body').hide();
	$('.menu-head').click(function(){
		$(this).children('span').toggleClass('slideDown slideUp').end().next('.menu-body').slideToggle(600);
		active($(this),$('.menu-head'));
	});	

	$('.menu-body').click(function(){
		$(this).addClass('active');
	});

	function active(addTarget,target){
		target.each(function(){
			$(this).removeClass('active');
		});
		addTarget.addClass('active');
	}	

	/*checkbox选中样式*/
	$('.admin-checkbox input').on('click',function(){
		var f=$(this).is(':checked');

		var id=$('.admin-checkbox').index($(this).parent());
		if(f){
			$(this).next().addClass('check');
			$('.comment-edit').eq(id).addClass('comment-edit-on');
		}
		else{		
			$(this).next().removeClass('check');
			$('.comment-edit').eq(id).removeClass('comment-edit-on');
		}
	});

	$('.all-check').on('click',function(){
		var allId=$('.all-check').index($(this));
		var inputItem=$('.admin-content').eq(allId).find('input[type=checkbox]');
		if($(this).text()=='全选'){
			inputItem.next().addClass('check');
			$('.comment-edit').addClass('comment-edit-on');
			$(this).text('不选');
		}
		else if($(this).text()=='不选'){
			inputItem.next().removeClass('check');
			$('.comment-edit').removeClass('comment-edit-on');
			$(this).text('全选');
		}
		return false;
	});
	
	/*单选选中*/
	$('.open-close').on('click',function(){
		var ii=$(this).children().is(':radio');
		var dd=$(this).index();
		if(dd==1&&ii){
			$(this).addClass('open-close-open');
			$(this).next().removeClass('open-close-open');
		}
		if(dd==2&&ii){		
			$(this).addClass('open-close-open');
			$(this).prev().removeClass('open-close-open');
		}
	});
	
	$('input[type=file]').on('change',function(){
		var idd=$('input[type=file]').index($(this));
		changeImg(this,$('.min-img:eq('+idd+')'));
	});

	function changeImg(btn,img){
		var files = !!btn.files ? btn.files : [];
		if(!files.length || !window.FileReader)
			return;
		//如果他是一个image的话
		if(/^image/.test(files[0].type)){
			//new一个Filereader对象
			var reader = new FileReader();
			//读取文件的路径
			reader.readAsDataURL(files[0]);
			//当文件上传成功后，将其路径显示在img上
			reader.onloadend = function(){
				img.attr('src',this.result); 
			}
		}
	}

	function wordLimit(target,number){
		var counter = $(target).val().length;
		if(counter > number){
			var num = $(target).val().substr(0,number);
			$(target).val(num);
		}
		else{
   	 		$(target).next().children().text(counter);
		}
	}

	$('textarea[placeholder="描述..."]').on('input',function(){
		var num = $(this).next().text().substr(1,3);
		wordLimit(this,num);
	});

	if($.support.opacity){
		$('textarea[placeholder="描述..."]').on('propertychange',function(){
			var num = $(this).next().text().substr(1,3);
			wordLimit(this,num);
		});
	}
	else{
		$('textarea[placeholder="描述..."]').on('input',function(){
			var num = $(this).next().text().substr(1,3);
			wordLimit(this,num);
		});
	}

	$('.addtr').click(function(){
		var navTable = $(this).parent().parent().find('.nav-table');
		var tr = navTable.find('tr');
		var length = tr.size();
		var trElement = tr.eq(1).clone(true);
		if($.trim(tr.find('th:eq(4)').html()) == '更新时间'){
			trElement.find('td:eq(4)').html(getTime());
			trElement.find('td:eq(3)').html(0);
		}
		if($.trim(tr.find('th:eq(1)').html()) == '排序'){
			trElement.find('td:eq(1)').html(length);
		}
		trElement.find('td').first().find('input[type=checkbox]').attr('id','user'+length);
		trElement.find('td').first().find('label').attr('for','user'+length);
		trElement.appendTo(navTable);	

		function getTime(){
			var d = new Date();
			var vYear = d.getFullYear();
			var vMon = d.getMonth() + 1;
			var vDay = d.getDate();
			date=vYear+"-"+(vMon<10 ? "0" + vMon : vMon)+"-"+(vDay<10 ? "0"+ vDay : vDay);
			return date;
		}
	});

	// $('.del-one').click(function(){
	// 	$(this).parent().parent().remove();
	// });
	

});

function changeMenu(url,j){
	var menu = window.parent.frames['menu-wrapper'];
	var menuList =$(menu.document.getElementsByClassName('menu-head'));
	window.location.href=url;
	for (var i = 0; i < menuList.length; i++) {
		menuList.removeClass('active');
	};
	menuList.eq(j).addClass('active');
}