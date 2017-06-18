angular.module('myRouter' , ['ngRoute'])
.config(function($router){
	$router
	.when('/', {
		templateUrl: 'home/index.pug'
	})
	.when('/admin', {
		templateUrl: 'admin/index.pug'
	})
	.when('/admin/users/list', {
		templateUrl: 'admin/users/users.pug'
	})
	.when('/admin/news/list', {
		templateUrl: 'admin/news/list.pug'
	})
	.when('/admin/news/add', {
		templateUrl: 'admin/news/add.pug'
	})
	.when('/singup', {
		templateUrl: 'home/users/singup.pug'
	});
});