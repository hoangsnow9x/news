(function () {
	 'use strict';
var app = angular.module('myApp',['ngCookies']);
app.controller('myController', ['$scope','$http','$cookies', function($scope, $http, $cookies){
	var refresh = function(){
		$http.get('/welcome').then(function(res){
			console.log("Hello everyone!");
			$scope.welcome = res.data;
		});
	}
	refresh();

	// event send message
	$scope.btnChat = function(){
		var postBy = $cookies.user;
		var message = $scope.welcome.text;
		if(message == null){
			alert("Bạn đang nghĩ gì?");
		}else{
			$http.post('/message', {message: message, postBy: postBy }).then(function(res){
				alert("Bạn đã cập nhật trạng thái thành công.");
			});
			refresh();
		}
	}

	// event delete message
	$scope.removeMessage = function(id){
		$http.delete('/message/'+id).then(function(res){
			refresh();
		});
	}

	// event singup
	$scope.btnSingup =  function(){
		console.log($scope.singup);
		$http.post('/singup', $scope.singup ).then(function(res){
			alert(res.data);
			// console.log(res.data);
		});
	}

	// event login
	$scope.btnLogin = function(){
		console.log($scope.login);
		$http.post('/login',$scope.login).then(function(res){
			alert(res.data.message);
			if(res.data.user.fullname != null){
				$scope.currentUser = res.data.user.fullname;
				$cookies.user 	   = res.data.user.username;
			}

		});
	}

	// event logout
	$scope.btn_logout = function(){
		$scope.currentUser = null;
	}

	// show category
	$http.get('/category').then(function(res){
		$scope.category = res.data;
	})

	// show slide
	$http.get('/slide').then(function(res){
		$scope.slide = res.data;
	});

	// get tamsu
	$http.get('/tamsu').then(function(res){
		$scope.tamsu = res.data;
	});



	// get meovat
	$http.get('/meovatLeft').then(function(res){
		$scope.meovatLeft = res.data;
		// console.log(res.data.title);
	});
	$http.get('/meovatRight').then(function(res){
		$scope.meovatRight = res.data;
	});

	// get dulich
	$http.get('/dulichLeft').then(function(res){
		$scope.dulichLeft = res.data;
		// console.log(res.data.title);
	});
	$http.get('/dulichRight').then(function(res){
		$scope.dulichRight = res.data;
	});

	// get lamdep
	$http.get('/lamdepTop').then(function(res){
		$scope.lamdepTop = res.data;
		// console.log(res.data.title);
	});
	$http.get('/lamdepBottom').then(function(res){
		$scope.lamdepBottom = res.data;
	});

	// get noitro
	$http.get('/noitroTop').then(function(res){
		$scope.noitroTop = res.data;
		// console.log(res.data.title);
	});
	$http.get('/noitroBottom').then(function(res){
		$scope.noitroBottom = res.data;
	});
	// get suckhoe
	$http.get('/suckhoeTop').then(function(res){
		$scope.suckhoeTop = res.data;
		// console.log(res.data.title);
	});
	$http.get('/suckhoeBottom').then(function(res){
		$scope.suckhoeBottom = res.data;
	});

	// get seemore
	$http.get('/seemore').then(function(res){
		$scope.repeatSeemore = res.data;

	});
	$http.get('/seemore').then(function(res){
		$scope.repeatSeemore = res.data;

	});

	// comment
	var comment = function(){
		$http.get('/detail/comment').then(function(res){
			$scope.comments = res.data;
		});
	}
	comment();
	$scope.btnComment = function() {
		console.log($scope.comment);
		$http.post('/detail/comment', {user: $cookies.user , content: $scope.comment}).then(function(res){
			alert(res.data);
		});
		comment();
	}
	// feedback
	$scope.btnFeedback = function(){
		console.log($scope.feedback);
		$http.post('/feedback', $scope.feedback).then(function(res){
			alert(res.data);
		});
	}

}]);
})();
