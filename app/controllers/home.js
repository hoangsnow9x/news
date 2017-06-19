var mongojs = require('mongojs'),
	db 		= mongojs('mongodb://root:123456@ds161121.mlab.com:61121/hoangsnow', ['welcome']),
	db_user	= mongojs('mongodb://root:123456@ds161121.mlab.com:61121/hoangsnow', ['users']),
	db_cate	= mongojs('mongodb://root:123456@ds161121.mlab.com:61121/hoangsnow', ['category']),
	db_news	= mongojs('mongodb://root:123456@ds161121.mlab.com:61121/hoangsnow', ['news']),
	db_cm	= mongojs('mongodb://root:123456@ds161121.mlab.com:61121/hoangsnow', ['comment']),
	db_feed	= mongojs('mongodb://root:123456@ds161121.mlab.com:61121/hoangsnow', ['feedback']);

/* GET home page */
exports.index = function(req, res){
 res.render('home/index', { title: 'Express' });
}

/* Action singup  */
exports.singup = function(req, res){
 res.render('home/users/singup', { title: 'Singup' });
}
exports.singupPost = function(req, res){
	if(req.body.fullname == null){
		res.send("* Vui lòng nhập đủ thông tin");
	}else{
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
	}
}

/*Action login*/
exports.loginPost = function(req, res){
	db_user.users.findOne({"username": req.body.username}, function(err, data) {
		if(data == null){
			var result = {
				message: "Tên đăng nhập không đúng.",
				user    : req.body
			}
			res.json(result);
		}else if(data != null && data.password != req.body.password){
			var result = {
				message: "Mật khẩu không đúng.",
				user    : req.body
			}
			res.json(result);
		}else{
			var result = {
				message: "Đăng nhập thành công.",
				user    : data
			}
			res.json(result);
		}
	});
}

/*Action welcome*/
exports.welcome = function(req, res){
	db.welcome.find().sort({_id:-1}, function(err, data){
		res.json(data);
	});
}

exports.messagePost = function(req, res){
	db.welcome.save({
		message: req.body.message,
		postBy: req.body.postBy
	});
}

exports.messageDelelte = function(req, res){
	var id = req.params.id;
	// console.log(id);
	db.welcome.remove({_id: mongojs.ObjectId(id)}, function(err, data){
		res.json(data);
	});
}

/* GET category */
exports.category = function(req, res){
	db_cate.category.find(function(err, data){
		res.json(data);
	});
}

/* GET slide */
exports.slide = function(req, res){
	db_news.news.find({category: "Mẹo vặt"}).limit(5, function(err,data){
		res.json(data);
	});
}

/* GET tamsu */
exports.tamsu = function(req, res){
	db_news.news.find({category: "Tâm sự"}).limit(8, function(err,data){
		res.json(data);
	});
}


/* GET meovat */
exports.meovatLeft = function(req, res){
	db_news.news.findOne({category: "Mẹo vặt"}, function(err,data){
		res.json(data);
	});
}
exports.meovatRight = function(req, res){
	db_news.news.find({category: "Mẹo vặt"}).limit(5).skip(1, function(err,data){
		res.json(data);
	});
}

/* GET dulich */
exports.dulichLeft = function(req, res){
	db_news.news.findOne({category: "Du lịch"}, function(err,data){
		res.json(data);
	});
}
exports.dulichRight = function(req, res){
	db_news.news.find({category: "Du lịch"}).limit(5).skip(1, function(err,data){
		res.json(data);
	});
}
/* GET lamdep */
exports.lamdepTop = function(req, res){
	db_news.news.findOne({category: "Làm đẹp"}, function(err,data){
		res.json(data);
	});
}
exports.lamdepBottom = function(req, res){
	db_news.news.find({category: "Làm đẹp"}).limit(5).skip(1, function(err,data){
		res.json(data);
	});
}

/* GET noitro */
exports.noitroTop = function(req, res){
	db_news.news.findOne({category: "Nội trợ"}, function(err,data){
		res.json(data);
	});
}
exports.noitroBottom = function(req, res){
	db_news.news.find({category: "Nội trợ"}).limit(5).skip(1, function(err,data){
		res.json(data);
	});
}

/* GET suckhoe */
exports.suckhoeTop = function(req, res){
	db_news.news.findOne({category: "Sức khỏe"}, function(err,data){
		res.json(data);
	});
}
exports.suckhoeBottom = function(req, res){
	db_news.news.find({category: "Sức khỏe"}).limit(5).skip(1, function(err,data){
		res.json(data);
	});
}


/* GET see more page */
exports.seemore = function(req, res){
	db_news.news.find().limit(10, function(err,data){
		res.json(data);
	});
}

/* GET detail page */

exports.detail = function(req, res){
	var id = req.params.id;
	console.log(id);
	db_news.news.findOne({_id: mongojs.ObjectId(id)}, function(err, data){
		res.render('home/news/detail', {news: data});
	});
}

exports.comment = function(req, res){
	console.log(req.body);
	if(req.body.content == null){
		res.send("* Bạn chưa nhập nội dung.");
	}else{
		db_cm.comment.save({
			user: req.body.user,
			content: req.body.content
		}, function(err, data){
			if(err){
				res.send(err);
			}else{
				res.send("Bình luận đã sẵn sàng.");
			}
		});
	}
}

exports.commentGet = function(req, res){
	db_cm.comment.find(function(err, data){
		res.json(data);
	});
}

exports.feedback = function(req, res){
	res.render('home/feedback');
}
exports.feedbackPost = function(req, res){
	if(req.body.fullname == null || req.body.email == null || req.body.content == null){
		res.send("* Vui lòng nhập đủ thông tin.");
	}else{
		db_feed.feedback.save({
			fullname: req.body.fullname,
			email: req.body.email,
			content: req.body.content
		}, function(err, data){
			if(err){
				res.send(err);
			}else{
				res.send("* Thông tin góp ý của bạn đã được gửi đi.Thanks.");
			}
		});
	}
}

// views
exports.viewsId =  (req, res) => {
	var id = req.params.id;
	db_cate.category.findOne( {_id: mongojs.ObjectId(id)}, function(err, data){
		var category = data.title;
		db_news.news.find( {category: category } , function(err, data){
			res.render('home/news/views', {  data: data});
		});

	});


}

exports.views = function(req, res){
	var v = req.query.v;
	switch (v) {
	case 'tamsu':
		db_news.news.find({category: "Tâm sự"}, function(err, data){
			 res.render('home/news/views', { data: data});
		});
			break;
	case 'meovat':
		db_news.news.find({category: "Mẹo vặt"}, function(err, data){
			 res.render('home/news/views', { data: data});
		});
			break;
	case 'dulich':
		db_news.news.find({category: "Du lịch"}, function(err, data){
			 res.render('home/news/views', { data: data});
		});
			break;
	case 'suckhoe':
		db_news.news.find({category: "Sức khỏe"}, function(err, data){
			 res.render('home/news/views', { data: data});
		});
			break;
	case 'lamdep':
		db_news.news.find({category: "Làm đẹp"}, function(err, data){
			 res.render('home/news/views', { data: data});
		});
			break;
	}
}
