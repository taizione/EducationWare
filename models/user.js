var mongodb = require('./db');

function User(username,times) {
  this.username = username;
  this.times =times;
};
module.exports = User;

User.prototype.save = function save(callback) {
  // 存入 Mongodb 的文檔
  var user = {
    username: this.username,
    times: 1,
  };

  console.log("save 1");
  mongodb.open(function(err, db) {
  console.log("save 2");
    if (err) {
      mongodb.close();
      return callback(err);
    }
    // 讀取 users 集合
    db.collection('users', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      // 爲 name 屬性添加索引
  console.log("save 3");
      collection.ensureIndex('username', {unique: true});
      // 寫入 user 文檔
      collection.insert(user, {safe: false}, function(err, user) {
        callback(err, user);
      });
    });
  });
};
User.prototype.update = function update(callback) {
  // 存入 Mongodb 的文檔
  var user = {
    username: this.username,
  };
  console.log("update 1");
  mongodb.open(function(err, db) {
    if (err) {
      mongodb.close();
      return callback(err);
    }
    console.log("update 2");
    // 讀取 record 集合
    db.collection('users', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      console.log("update 3");
      collection.update(user, {$inc: {times:1}}, function(err, user) {
        mongodb.close();
        callback(err, user);
      });
    });
  });
};
User.get = function get(username, callback) {
  console.log("get1");
  mongodb.open(function(err, db) {
      console.log("get2");
    if (err) {
      mongodb.close();
      return callback(err);
    }
    // 讀取 users 集合
    db.collection('users', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      // 查找 name 屬性爲 username 的文檔
        console.log("get3");
      collection.findOne({username: username}, function(err, doc) {
        mongodb.close();
        if (doc) {
          // 封裝文檔爲 User 對象
  console.log("get4");
          var user = new User(doc);
          callback(err, user);
        } else {       
          callback(err, null);
        }
      });
    });
  });
};
