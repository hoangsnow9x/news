var app = angular.module('myApp', []);

app.controller('myController', ['$scope',  '$http', function($scope,  $http){
	$http.get('/admin/news/category').then(function(res){
		console.log(res.data);
		$scope.category = res.data;
	});
	$scope.news = {};

	$scope.btnUpload = function(){

		var formData = new FormData;

		for(key in $scope.news){
			formData.append(key, $scope.news[key]);
		}

		// getting the file
		var file = $('#file')[0].files[0];
		formData.append('image', file);

		//post data
		$http.post('http://localhost:3000/admin/news/add', formData, {
			transformRequest: angular.identify,
			headers: {
				'Content-Type': undefined
			}
		}).then(function(res){
			$scope.item_news = res.data;
		});
	}

	var refresh = function(){
	    $http.get('http://localhost:3000/admin/category/category').then(function(res){
	      console.log("Đã nhận dữ liệu từ request");
	      $scope.listCategory = res.data;
	      console.log(res.data);
	    });
 	};
  refresh();

  // event upload
  $scope.btnUploadCate =  function(){
		console.log($scope.title);
		$http.post('http://localhost:3000/admin/category/add', {title: $scope.title, code: $scope.code }).then(function(res){
			// alert(res.data);
			console.log(res.data);
		});
    refresh();
  }
  var refreshUser = function(){
    $http.get('/admin/users/contact').then(function(res){
      console.log("Đã nhận dữ liệu từ request");
      $scope.contactlist = res.data;
    });
  };
  refreshUser();

  // event thêm
  $scope.addContact =function(){
    console.log($scope.contact);
    $http.post('/admin/users/contact',$scope.contact).then(function(res){
      console.log(res);
      refresh();
    });


  }

  // xóa dữ liệu trên client sau khi server đã xóa
  $scope.remove =function(id){
    console.log(id);
    $http.delete('/admin/users/contact/'+id).then(function(res){
      refreshUser();
    });
  }
  //lấy dữ liệu từ phía server và hiện thị ra màn hình
  $scope.edit =function(id){
    console.log(id);
    $http.get('/admin/users/contact/'+id).then(function(res){
      $scope.contact=res.data;
    });
  }
  //update dữ liệu
  $scope.update =function(){
    console.log($scope.contact._id);
    $http.put('/admin/users/contact/'+ $scope.contact._id,$scope.contact).then(function(res){
      refreshUser();
    });
  }
  //làm rỗng dữ liệu trên giao diện
  $scope.deselect =function(){
    $scope.contact ="";
  }

  // feedback
  $http.get('/admin/feedback/list').then(function(res){
    $scope.feedback = res.data;
  });
}]);
