var express = require('express'),
	router 	= express.Router();

var home  = require('../controllers/home.js'),
    admin = require('../controllers/admin.js');

var multer	= require('multer'),
    upload	= multer({dest: 'app/uploads/news/'}),
    fs 		= require('fs');
//  index
router.get('/', home.index)
	  .get('/singup', home.singup)
	  .get('/views', home.views)
	  .get('/welcome', home.welcome)
	  .get('/category', home.category)
	  .get('/slide', home.slide)
	  // .get('/views', home.views)
	  .get('/views/?v=:v', home.views)
	  .get('/views/:id', home.viewsId)
	  .get('/seemore', home.seemore)
	  .get('/tamsu', home.tamsu)
	  .get('/meovatLeft', home.meovatLeft)
	  .get('/meovatRight', home.meovatRight)
	  .get('/dulichLeft', home.dulichLeft)
	  .get('/dulichRight', home.dulichRight)
	  .get('/lamdepTop', home.lamdepTop)
	  .get('/lamdepBottom', home.lamdepBottom)
	  .get('/noitroTop', home.noitroTop)
	  .get('/noitroBottom', home.noitroBottom)
	  .get('/suckhoeTop', home.suckhoeTop)
	  .get('/suckhoeBottom', home.suckhoeBottom)
	  .get('/tamsu', home.tamsu)

	  .get('/detail/comment', home.commentGet)
	  .get('/feedback', home.feedback)
	  .get('/detail/:id', home.detail)


router.post('/singup', home.singupPost)
      .post('/login', home.loginPost)
      .post('/message', home.messagePost)
      .post('/detail/comment', home.comment)
      .post('/feedback', home.feedbackPost)

router.delete('/message/:id', home.messageDelelte)

// admin
router.get('/admin', admin.index)
      .get('/admin/news/add', admin.addNews)
      .get('/admin/news/list', admin.listNews)
      .get('/admin/news/category', admin.cateNews)
      .get('/admin/users/list', admin.addUsers)
      .get('/admin/users/contact', admin.contact)
      .get('/admin/category/add', admin.addCategory)
      .get('/admin/category/category', admin.categoryGet)
      .get('/admin/feedback', admin.feedback)
      .get('/admin/feedback/list', admin.feedbackList)

router.post('/admin/news/add',upload.any(), admin.addNewsPost)
	  .post('/admin/category/add', admin.categoryPost)
	  .post('/admin/users/contact', admin.contactPost)

router.delete('/admin/news/contact/:id', admin.contactDelete)
module.exports = router;
