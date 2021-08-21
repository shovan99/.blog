"use strict";

var Post = require("../models/Post");

exports.createPost = function _callee(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          post = new Post(req.body);
          _context.next = 3;
          return regeneratorRuntime.awrap(post.save(function (err, post) {
            if (err) {
              return res.status(500).json({
                errors: "Unable To Save Post"
              });
            }

            res.json({
              message: "".concat(post.title, " Saved Into DB")
            });
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getAllPosts = function _callee2(req, res) {
  var username, category, posts;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          username = req.query.username;
          category = req.query.category;
          _context2.prev = 2;

          if (!username) {
            _context2.next = 9;
            break;
          }

          _context2.next = 6;
          return regeneratorRuntime.awrap(Post.find({
            username: username
          }));

        case 6:
          posts = _context2.sent;
          _context2.next = 18;
          break;

        case 9:
          if (!category) {
            _context2.next = 15;
            break;
          }

          _context2.next = 12;
          return regeneratorRuntime.awrap(Post.find({
            categories: req.query.category
          }));

        case 12:
          posts = _context2.sent;
          _context2.next = 18;
          break;

        case 15:
          _context2.next = 17;
          return regeneratorRuntime.awrap(Post.find({}));

        case 17:
          posts = _context2.sent;

        case 18:
          return _context2.abrupt("return", res.json(posts));

        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](2);
          console.log(_context2.t0);

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 21]]);
};

exports.getPostById = function _callee3(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Post.findById({
            _id: req.params.id
          }));

        case 3:
          post = _context3.sent;
          return _context3.abrupt("return", res.json(post));

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.updatePost = function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Post.findByIdAndUpdate(req.params.id, {
            $set: req.body
          }, {
            $new: true,
            useFindAndModify: false
          }));

        case 3:
          res.json("Post Updated");
          _context4.next = 9;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.deletePostById = function _callee5(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(post["delete"]());

        case 6:
          res.json("Post Removed");
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};