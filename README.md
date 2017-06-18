# news
Website News using MEAN stack 
* Mô hình MVC cho MEAN
Cấu trúc thư thục
MVC
app
	controllers
		admin.js
		home.js
	modules
		admin.js
		home.js
	routes
		routes.js
		uploads
			news 
	views
		admin
			users
				users.pug
			category
				add.pug 
			feedback
				list.pug 
			news 
				add.pug 
				list.pug 
			index.pug
			header.pug
		home
			layout 
				layout_header.pug 
			news 
				detail.pug 
				views.pug 
			users 
				singup.pug 
			index.pug
			feedback.pug 

		app.js
	public
		images
		css
			style.css
		js
			functions.js
		libs
			angular
				angular.min.js
			bootstrap
	server.js
Làm việc với file server.js
cài đặt & Khai báo các module 
var express 	 	 = require('express'),//npm install express
	app			 = express(),
	path		 	 = require('path'),// npm install path
	multer		 = require('multer'),// npm install multer
	morgan		 = require('morgan'),// npm install morgan
	bodyParser   	 = require('body-parser'),// npm install body-parser
	cookieParser 	 = require('cookie-parser'),// npm install cookie-parser
	server 		 = require('http').Server(app),
	port 		 	 = process.env.PORT || 3000;
 
Sử dụng folder views
app.set('views', path.join(__dirname +'/app/views'));
ở trong join(): app là thư mục chứa thư mục views, views là thư mục views
Sử dụng folder routes
Chèn router
var index 	  = require('./app/routes/route_index.js'),
      admin     = require('./app/routes/route_admin.js'),
      news      = require('./app/routes/route_news.js'),
      users      = require('./app/routes/route_users.js');
 
sử dụng
app.use('/', index);
app.use('/admin', admin);
app.use('/admin/news', news);
app.use('/admin/users', users);
 
			
 
Sử dụng body-parser
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
Khai báo port
server.listen(port , function(err){
	if(err){
		console.log(err);
	}else{
		console.log("Listen port on " + port);
	}
});
 
Làm việc với routes
routes/route_index.js
//file sẽ get các route
var express = require('express');
var router = express.Router();
 
router.get('/', function(req, res){
	res.render('home/index');
});
router.get('/error', function(req, res){
	res.render('home/error');
});
 
module.exports = router;
 
routes/route_admin.js
var express = require('express');
var router = express.Router();
 
router.get('/', function(req, res){
	res.render('home/index');
});
 
 
module.exports = router;
 
app.js
File sẽ cấu hình đường dẫn url
angular.module('myRouter' , ['ngRoute'])
.config(function($router){
	$router
	.when('/', {
		templateUrl: 'home/index.pug'
	})
	.when('/admin', {
		templateUrl: 'admin/index.pug'
	});
});
Làm việc với views
Trang quản lý thành viên
admin/users/users.pug
doctype
html(ng-app="userApp")
	head
		title Trang quản trị thành viên
		link(rel="stylesheet", href="../../public/css/admin.css")
		script(src="../../public/libs/angular/angular.min.js")
		script(src="../../controllers/user_controller.js")
		script(src="../../public/libs/tinymce/tinymce.min.js")
		script(src="../../public/js/tinymce.js")
		
	body(ng-controller="userController")
		include ../header.pug
		div.main
			div.title Trang quản trị thành viên
			div.user
				div.repeat
					div.item Fullname
					div.item Username
					div.item Passowrd
					div.item Method
				
				form(name="myform")
					div.repeat
						div.item
							input(required,type='text', ng-model='contact.fullname')
						div.item
							input(required,type='text', ng-model='contact.username')
						div.item
							input(required,type='password', ng-model='contact.password')
						div.item
							button(ng-click='myform.$valid && addContact()') Add member
			div(ng-repeat="x in contactlist").user
				div.repeat
					div.item {{x.fullname}}
					div.item {{x.username}}
					div.item {{x.password}}
					div.item
						button(ng-click="edit(x._id)") Sửa
						button(ng-click="remove(x._id)") Xóa
 
controllers/user_controller.js
angular.module('userApp', [])
.controller('userController', ['$scope','$http', function($scope, $http){
  console.log("Đây là usersController.");
  // refresh lại trình duyệt
  var refresh = function(){
    $http.get('admin/users/contact').then(function(response){
      console.log("Đã nhận dữ liệu từ request");
      $scope.contactlist = response.data;
    });
  };
  refresh();
Qua route_users.js thêm:
	var express   = require('express'),
 	  router 	  = express.Router(),
	  mongojs   = require('mongojs'),
	  db 		    = mongojs('db_news', ['users']);
 
router.get('/users', function(req, res){
	console.log('I received a GET request.');
	db.users.find(function(err,doc){
		res.json(doc);
	});
});
 
 
  // event thêm
  $scope.addContact =function(){
    console.log($scope.contact);
    $http.post('/admin/users/contact',$scope.contact).then(function(response){
      console.log(response);
      refresh();
    });
    
    
  }
  Qua route_users.js thêm:
router.post('/contact', function (req, res) {
  console.log(req.body);
  db.users.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});
 
 
  // xóa dữ liệu trên client sau khi server đã xóa
  $scope.remove =function(id){
    console.log(id);
    $http.delete('/admin/users/contact/'+id).then(function(response){
      refresh();
    });
  }
 Qua route_users.js thêm:
router.delete('/contact/:id', function (req, res) {
  var id = req.params.id;
  db.users.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});
 
 
 
  //lấy dữ liệu từ phía server và hiện thị ra màn hình
  $scope.edit =function(id){
    console.log(id);
    $http.get('/admin/users/contact/'+id).then(function(response){
      $scope.contact=response.data;
    });
  }
Qua route_users.js thêm:
 
router.get('/contact/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.users.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});
 
 
  //update dữ liệu
  $scope.update =function(){
    console.log($scope.contact._id);
    $http.put('/admin/users/contact/'+ $scope.contact._id,$scope.contact).then(function(response){
      refresh();
    });
  }
Qua route_users.js thêm:
 
router.put('/contact/:id', function (req, res) {
  var id = req.params.id;
  db.users.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});
 
module.exports = router;
 
 
Xây dựng chức năng đăng ký cho thành viên
Tạo trang home/users/singup.pug
doctype
html(ng-app="myApp")
	head
		title Trang đăng ký
		meta(charset="utf-8")
		link(rel="stylesheet", href="public/css/style.css")
		link(rel="stylesheet", href="public/libs/font-awesome/css/font-awesome.min.css")
		script(src="public/libs/angular/angular.min.js")
		script(src="public/libs/angular/angular-cookies.js")
		script(src="controllers/home_controller.js")
 
	body(ng-controller="myController")
		.main
			include ../layout_header.pug
			form(name="myform").singup
				h3 Đăng ký thành viên
				input(type="text", placeholder="Họ và tên", ng-model="singup.fullname", required)
				input(placeholder="Tên đăng nhập", ng-model="singup.username", required)
				input(type="password",placeholder="Mật khẩu", ng-model="singup.password", required)
				input(ng-click="$valid='myform' && btnSingup()", value="Đăng ký",type="submit")
			a(href="/") Quay lại trang chủ
					
qua file controllers/home_controller.js
// Tạo module
angular.module('myApp',['ngCookies'])
.controller('myController', function($scope, $http, $cookies){
	// event singup
	$scope.btnSingup =  function(){
		console.log($scope.singup);
		$http.post('/singup', $scope.singup ).then(function(res){
			alert(res.data);
			// console.log(res.data);
		});
	}
 
	Qua route_index.js thêm:
	// khai báo các module
	var express = require('express'),
	router 	= express.Router(),
	mongojs = require('mongojs'),
	db 		= mongojs('db_news', ['welcome']);
	db_user	= mongojs('db_news', ['users']);
	// render đến page index
	router.get('/', function(req, res){
		res.render('home/index');
		// res.send('ok');
});
	
	// render đến page singup
		router.get('/singup', function(req, res){
			res.render('home/users/singup')
});
// event singup
	router.post('/singup', function(req, res){
	// Tìm kiếm tên đăng ký trong database, nếu tồn tại thì ko cho đăng ký, nếu ko thì cho đăng ký
	db_user.users.findOne({"username": req.body.username}, function(err, data) {
		if(data != null){
			res.send("Tên đăng ký đã tồn tại.");
		}else{
			db_user.users.save({
				fullname: req.body.fullname,
				username: req.body.username,
				password: req.body.password
			}, function(err,data){
				res.send("Đăng ký thành công.");
			});
		}
    	
	});
	
});
 
	
	
	
//
	
Xây dựng chức năng đăng nhập cho thành viên	
	// event login
	$scope.btnLogin = function(){
		console.log($scope.login);
		$http.put('/login',$scope.login).then(function(res){
			// thông báo dữ liệu trả về trong file route_index.js
			alert(res.data.message);
		// kiểm tra nếu tồn tại user thì tạo currentUser và cookies
			if(res.data.user.fullname != null){
				$scope.currentUser = res.data.user.fullname;
		// khai báo cookies
		// để dùng cookie ta thêm thư viện cookies và dùng trong khi tạo module ở trên tức có thêm  phần ngCookies và $cookies
$cookies.user 	   = res.data.user.username;
			}
			
		});
	}
Qua file route_index.js thêm:
// login
router.put('/login', function(req, res, next){
	// tìm kiếm tên đăng nhập trong database
	db_user.users.findOne({"username": req.body.username}, function(err, data) {
	// kiểm tra nếu username ko tồn tại thì báo tên đăng nhập ko đúng
		if(data == null){
			var result = {
				message: "Tên đăng nhập không đúng.",
				user    : req.body
			}
			res.json(result);
		// ngược lại nếu tồn tại username mà passwor ko đúng thì báo mật khẩu ko đúng
		}else if(data != null && data.password != req.body.password){
			var result = {
				message: "Mật khẩu không đúng.",
				user    : req.body
			}
			res.json(result);
		// ngược lại báo đăng nhập thành công
		}else{
			var result = {
				message: "Đăng nhập thành công.",
				user    : data
			}
			res.json(result);
		}
	});
});
 
	
 
Xây dựng chức năng đăng xuất
Trong file home_controller.js
// event logout
	$scope.btn_logout = function(){
		// tạo biến currentUser = null để sử dụng ng-hide trong view
		$scope.currentUser = null;
	}
});
 
Tạo form chat
Trang views/home/index.pug
doctype
html(ng-app="myApp")
	head
		title demo by hoang kun
		meta(charset="utf-8")
		link(rel="stylesheet", href="public/css/style.css")
		link(rel="stylesheet", href="public/libs/font-awesome/css/font-awesome.min.css")
		script(src="public/libs/jquery/jquery.min.js")
		script(src="public/libs/angular/angular.min.js")
		script(src="public/libs/angular/angular-cookies.js")
		script(src="controllers/home_controller.js")
	body(ng-controller="myController")
		.main
			include layout_header.pug
			.content
				.login
					div(ng-hide="currentUser")
						h3 Login
						form
							input(type='text', ng-model="login.username", placeholder="Tên đăng nhập")
							input(type='password',ng-model="login.password",placeholder="Mật khẩu")
							input(type="submit" , value="Login",ng-click="btnLogin()")
							a(href="/singup") Not a member? Singup
					div(ng-show="currentUser")
						p
							span Hello, 
								b {{currentUser}}
						a(href="", ng-click="btn_logout()") Logout
						
				.boxChat
					form(ng-show="currentUser")
						input(type="text", placeholder="Bạn đang nghĩ gì?", ng-model="welcome.text").txtChat
						input(type="submit", value="Gửi", ng-click="btnChat(welcome)").btnChat
					.display {{txtChat}}
					div(ng-repeat="x in welcome")
						.item
							i.fa.fa-user
							span.color_blue {{x.message}}
							button(ng-click="removeMessage(x._id)").remove X
							p(ng-show="currentUser")
								span Post by: 
								b {{x.postBy}}
					
 
Trong file home_controller.js
// show message ra trang chủ
var refresh = function(){
		$http.get('/welcome').then(function(res){
			console.log("Hello everyone!");
			$scope.welcome = res.data;
		});
	}
	refresh();
Qua route_index.js thêm:
// show message
router.get('/welcome', function(req, res, next){
	db.welcome.find().sort({_id:-1}, function(err, data){
		res.json(data);
	});
	
});
 
 
// event send message
	$scope.btnChat = function(){
		// sử dụng cookies để phát hiện tên người đăng
		var postBy = $cookies.user;
		var message = $scope.welcome.text;
		// kiểm tra nếu người dùng ko nhập dữ liệu thì thông báo
		if(message == null){
			alert("Bạn đang nghĩ gì?");
		}else{
		// ngược lại post dữ liệu
			$http.post('/message', {message: message, postBy: postBy }).then(function(res){
				alert("Bạn đã cập nhật trạng thái thành công.");
			});
			refresh();
		}
	}
	Qua route_index.js thêm:
	// send a message
router.post('/message', function(req, res, next){
	db.welcome.save({
		message: req.body.message,
		postBy: req.body.postBy
	});
});
 
// event delete message
	$scope.removeMessage = function(id){
		$http.delete('/message/'+id).then(function(res){
			refresh();
		});
	}
Qua route_index.js thêm:
// remove status
router.delete('/message/:id', function(req, res, next){
	var id = req.params.id;
	// console.log(id);
	db.welcome.remove({_id: mongojs.ObjectId(id)}, function(err, data){
		res.json(data);
	});
});
 
 
 
 
	
 
