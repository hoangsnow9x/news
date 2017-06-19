var mongojs = require('mongojs'),
	db_user	= mongojs('mongodb://root:123456@ds161121.mlab.com:61121/hoangsnow', ['users']),
	db_cate	= mongojs('mongodb://root:123456@ds161121.mlab.com:61121/hoangsnow', ['category']),
	db_news	= mongojs('mongodb://root:123456@ds161121.mlab.com:61121/hoangsnow', ['news']);
	db_feed	= mongojs('mongodb://root:123456@ds161121.mlab.com:61121/hoangsnow', ['feedback']);


/* GET admin page */
exports.index = function(req, res){
 res.render('admin/index', { title: 'Express' });
};

/* GET news control page */
exports.addNews = function(req, res){
 res.render('admin/news/add', { title: 'Thêm tin tức' });
};
exports.listNews = function(req, res){
 res.render('admin/news/list', { title: 'Danh sách tin tức' });
};
exports.addNewsPost = function(req, res){
	if(req.files){
		req.files.forEach(function(file){
			console.log(file);

			var filename = (new Date).valueOf() + "-" + file.originalname
			fs.rename(file.path, 'app/uploads/news/' + filename, function(err){
				if(err){
					console.log(err);
				}else {
					console.log("File uploaded ..........");
					db_news.news.save({
						title: req.body.title,
						category: req.body.category,
						summary: req.body.summary,
						image: filename
					}, function(err, result){
						if(err){
							console.log(err);
						}
						res.json(result);
					});
				}
			})
		})
	}
}
exports.cateNews = function(req, res){
	db_cate.category.find(function(err, data){
		res.json(data);
	});
}

/* GET users control page */
exports.addUsers = function(req, res){
 res.render('admin/users/users', { title: 'Thêm thành viên' });
};
exports.contact = function(req, res){
	console.log('I received a GET request.');
	db.users.find(function(err,doc){
		res.json(doc);
	});
};

exports.contactPost = function(req, res){
  console.log(req.body);
  db.users.insert(req.body, function(err, doc) {
    res.json(doc);
  });
};

/* GET category control page */
exports.addCategory = function(req, res){
 res.render('admin/category/add', { title: 'Thêm danh mục tin' });
};
exports.categoryGet = function(req, res){
	db_cate.category.find(function(err, data){
		res.json(data);
	});
};
exports.categoryPost = function(req, res){
	if(req.body.title != null){
		db_cate.category.save({
			title: req.body.title,
			code: req.body.code
		},function(err, data){
			res.render('admin/category/add');
		})
	}
};
exports.contactDelete = function(req, res){
	var id = req.params.id;
    db.users.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    	res.json(doc);
    });
};

// feedback

exports.feedback  = function(req, res){
	res.render('admin/feedback/list');
}
exports.feedbackList  = function(req, res){
	db_feed.feedback.find(function(err, data){
		res.json(data);
	})
}
