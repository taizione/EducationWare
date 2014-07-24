var crypto = require('crypto');
var User = require('../models/user.js');
var Post = require('../models/post.js');
var Record = require('../models/record.js');
var i18n=require('i18n');
var path = require('path');

locale='zh';
i18n.configure({
  locales: ['en', 'zh'],
  directory: path.normalize(__dirname + '/../locales')
}); 

module.exports = function(app) {
  app.get('/', function(req, res) {
        i18n.init(req, res);
    req.setLocale(locale);
    Record.calculateTimes(function(err, records) {
      if (err) {
        records = [];
      }
      console.log(records);
      res.render('index', {
        title: res.__('HomePage'),
        records: records,
      });
    });
  });
  
  app.get('/reg', checkNotLogin);
  app.get('/reg', function(req, res) {
    res.render('reg', {
      title: '用户注册',
    });
  });
  
  app.post('/reg', checkNotLogin);
  app.post('/reg', function(req, res) {
    //檢驗用戶兩次輸入的口令是否一致
    if (req.body['password-repeat'] != req.body['password']) {
      req.flash('error', '密码输入不一制');
      return res.redirect('/reg');
    }
  
    //生成口令的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    
    var newUser = new User({
      name: req.body.username,
      password: password,
    });
    
    //檢查用戶名是否已經存在
    User.get(newUser.name, function(err, user) {
      if (user)
        err = 'Username already exists.';
      if (err) {
        req.flash('error', err);
        return res.redirect('/reg');
      }
      //如果不存在則新增用戶
      newUser.save(function(err) {
        if (err) {
          req.flash('error', err);
          return res.redirect('/reg');
        }
        req.session.user = newUser;
        req.flash('success', '注册成功');
        res.redirect('/');
      });
    });
  });
  
  app.get('/login', checkNotLogin);
  app.get('/login', function(req, res) {
    // i18n.init(req, res);
    // req.setLocale(locale); 
    // console.log(i18n);
    // console.log( path.normalize(__dirname + '/../locales'));
    // console.log("locale"+ locale);
    // console.log(res.__('username'));
    res.render('login', {
      title: '用户登录',
      
    });
  }); 
  
  app.post('/login', checkNotLogin);
  app.post('/login', function(req, res) {
    //生成口令的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    
    User.get(req.body.username, function(err, user) {
      if (!user) {
        req.flash('error', '用户不存在');
        return res.redirect('/login');
      }
      if (user.password != password) {
        req.flash('error', '用户密码错误');
        return res.redirect('/login');
      }
      req.session.user = user;
      req.flash('success', '登录成功');
      res.redirect('/educationhome');
    });
  });

  app.get('/educationHome', checkLogin);
  app.get('/educationHome',function(req, res) {
    

    Record.calculateTimes(function(err, records) {
      if (err) {
        records = [];
      }

      res.render('educationhome', {
        title: 'GSSC Training Platform',
        records: records,
        });
      });
  });
  app.get('/gvtEducation', checkLogin);
   app.get('/gvtEducation',function(req, res) {

    Record.calculateTimes(function(err, records) {
      if (err) {
        records = [];
      }


      res.render('gvtEducation', {
        title: 'GSSC Training Platform',
        coursetype:"gvtEducation",
        videosource: 'GVT_Education.mp4',
        videoicon:'GVT.jpg',
        layout: 'mainLayout',
        records: records,
        });
      });
  });
  app.get('/tvtProcess', checkLogin);
      app.get('/tvtProcess',function(req, res) {
      Record.calculateTimes(function(err, records) {
      if (err) {
        records = [];
      }

      
      res.render('tvtProcess', {
        title: 'GSSC Training Platform',
        coursetype:"tvtProcess",
        videosource: 'TVT Process.mp4',
        videoicon:'tvtProcess.jpg',
        layout: 'mainLayout',
        records: records,
        });
      });  
  });
  app.get('/uaTools', checkLogin);
    app.get('/uaTools',function(req, res) {
      Record.calculateTimes(function(err, records) {
                if (err) {
                  records = [];
                }

                res.render('uaTools', {
                  title: 'GSSC Training Platform',
                  coursetype:"uaTools",
                  videosource: 'UA tool demo update.mp4',
                  videoicon:'UATools.jpg',
                  layout: 'mainLayout',
                  records: records,
                  });
                });
  });

  app.get('/tips_for_better_doing_tvt_go_nogo_accessment', checkLogin);
    app.get('/tips_for_better_doing_tvt_go_nogo_accessment',function(req, res) {
      Record.calculateTimes(function(err, records) {
                if (err) {
                  records = [];
                }

                res.render('tips_for_better_doing_tvt_go_nogo_accessment', {
                  title: 'GSSC Training Platform',
                  coursetype:"tips_for_better_doing_tvt_go_nogo_accessment",
                  videosource: '0627_TVT_GO-NOGO_Assessment_Education.flv',
                  videoicon:'0627_TVT_GO-NOGO_Assessment_Education.jpg',
                  layout: 'mainLayout',
                  records: records,
                  });
                });
  });

      app.get('/gvt_ta_example_sharing', checkLogin);
    app.get('/gvt_ta_example_sharing',function(req, res) {
      Record.calculateTimes(function(err, records) {
                if (err) {
                  records = [];
                }

                res.render('gvt_ta_example_sharing', {
                  title: 'GSSC Training Platform',
                  coursetype:"gvt_ta_example_sharing",
                  videosource: '0627_GVT_TestArea_Example_Sharing.flv',
                  videoicon:'0627_GVT_TestArea_Example_Sharing.jpg',
                  layout: 'mainLayout',
                  records: records,
                  });
                });
  });
      app.get('/speed_kpi_definition_and_gso_project_data_collection', checkLogin);
    app.get('/speed_kpi_definition_and_gso_project_data_collection',function(req, res) {
      Record.calculateTimes(function(err, records) {
                if (err) {
                  records = [];
                }

                res.render('speed_kpi_definition_and_gso_project_data_collection', {
                  title: 'GSSC Training Platform',
                  coursetype:"speed_kpi_definition_and_gso_project_data_collection",
                  videosource: '2014_KPI_Speed_definition_and_GSO_Project_Data_Collection.flv',
                  videoicon:'2014_KPI_Speed_definition_and_GSO_Project_Data_Collection.jpg',
                  layout: 'mainLayout',
                  records: records,
                  });
                });
  });
      app.get('/defect_creation_tips', checkLogin);
    app.get('/defect_creation_tips',function(req, res) {
      Record.calculateTimes(function(err, records) {
                if (err) {
                  records = [];
                }

                res.render('defect_creation_tips', {
                  title: 'GSSC Training Platform',
                  coursetype:"defect_creation_tips",
                  videosource: 'GSSC_Defect_Creation_Tips.flv',
                  videoicon:'GSSC_Defect_Creation_Tips.jpg',
                  layout: 'mainLayout',
                  records: records,
                  });
                });
  });

  app.get('/logout', checkLogin);
  app.get('/logout', function(req, res) {
    req.session.user = null;
    req.flash('success', '登出成功');
    res.redirect('/');
  });
 
  
  app.get('/record',function(req, res){

  var coursename=req.query.coursename;
  var currentUser = req.session.user;
    Record.get(currentUser.name,coursename,function(error,result){

      var record = new Record(currentUser.name, coursename);

      if(!result)
        {
          console.log("save");
          record.save(function(err) {
                if (err) {
                  req.flash('error', err);
                  return res.redirect('/');
                }
                req.flash('success', '记录成功');
                res.redirect('/u/' + currentUser.name);
              });
       }
       else{
          console.log("update");
        record.update(function(err) {
                if (err) {
                  req.flash('error', err);
                  return res.redirect('/');
                }
                req.flash('success', '更新成功');
                console.log("update success");
                res.redirect('/u/' + currentUser.name);
              });
       }
    })
 });

  app.get('/say', checkLogin);
  app.get('/say', function(req, res) {
            i18n.init(req, res);
    req.setLocale(locale);
    Post.get(null, function(err, posts) {
      if (err) {
        posts = [];
      }
      console.log("posts"+posts);
      res.render('say', {
        title: '首页',
        posts: posts,
        layout: 'infolayout',
      });
    });
  });
  app.get('/profile', checkLogin);
    app.get('/profile', function(req, res) {
        var currentUser = req.session.user;
        Record.list(currentUser.name, function(err, profileResults) {
          if (err) {
            profileResults = [];
          }
          console.log("profileResults"+profileResults);
          res.render('profile', {
            title: '首页',
            profileResults:profileResults,
            layout:'infolayout',
          });
      });
  });
        app.get('/versionRecord', function(req, res) {
    
      res.render('versionRecord', {
        title: '首页',
        layout:'infolayout',
      });
  });
    app.get('/aboutUs', function(req, res) {
    
      res.render('aboutUS', {
        title: '首页',
        layout:'infolayout',
      });
  });
  
  app.get('/u/:user', function(req, res) {
    User.get(req.params.user, function(err, user) {
      if (!user) {
        req.flash('error', '用户不存在');
        return res.redirect('/');
      }
      Post.get(user.name, function(err, posts) {
        if (err) {
          req.flash('error', err);
          return res.redirect('/');
        }
        res.render('user', {
          title: user.name,
          posts: posts,
        });
      });
    });
  });
  
  app.post('/postIdea', checkLogin);
  app.post('/postIdea', function(req, res) {


    var currentUser = req.session.user;
    var post = new Post(currentUser.name, req.body.ideaName,req.body.ideaDesc);
    post.save(function(err) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      req.flash('success', '发表成功');
      res.redirect('/say');
    });
  });
};


function checkLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('error', '未登录');
    return res.redirect('/login');
  }
  next();
}

function checkNotLogin(req, res, next) {
  if (req.session.user) {
    req.flash('error', '已登录');
    return res.redirect('/');
  }
  next();
}

 function calculateTimes(req, res, next){

    Record.calculateTimes(function(error,times){
      console.log("function:"+times);
      res.render('tree',{
        times: times,
      });
    });
    next();
 }
