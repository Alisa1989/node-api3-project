const { json } = require('express');
const express = require('express');
const userDb = require("./userDb");
const postDb = require("../posts/postDb");


const router = express.Router();

router.post('/', validateUser(), (req, res) => {
  userDb
  .insert(req.body)
  .then((user)=> {
    res.status(201).json(user);
  })
  .catch((error) => {
    next(error)
  })
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res) => {
  req.body.user_id = req.params.id;
  postDb
  .insert(req.body)
  .then((post)=> {
      res.status(201).json(post);
  })
  .catch((error) => {
    next(error)
  })
});

router.get('/', (req, res) => {
  userDb
    .get()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      next(error)
    });  
});

router.get('/:id', validateUserId(), (req, res) => {
  userDb
    .getById(req.params.id)
    .then((user) => {
        return res.status(200).json(user)
    })
    .catch((error) => {
      next(error)
    });  
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  userDb
    .getUserPosts(req.params.id)
    .then((user) => {
        res.status(200).json(user)
    })
    .catch((error) => {
      next(error)
    });  
});

router.delete('/:id', validateUserId(), (req, res) => {
  userDb
    .remove(req.params.id)
    .then((user) => {
        return res.status(200).json(user)
    })
    .catch((error) => {
      next(error)
    });  
});

// updates user
router.put('/:id', validateUserId(), validateUser(),(req, res) => {
    userDb
    .update(req.params.id, req.body)
    .then((user) => {
        res.status(200).json(user)
    })
    .catch((error) => {
      next(error)
    })
});

//custom middleware

function validateUserId() {
return (req, res, next) => {
  userDb
    .getById(req.params.id)
    .then((user)=> {
      if(!user){
        res.status(404).json({
          message: "user with specified ID does not exist!"
        })
      } else {
        req.user = user;
        next()
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the user",
      });
    });
}}

function validateUser() {
  return (req, res, next) => {
  if (!req.body.name){
    return res.status(400).json({
      message: "please provide a valid name for the user"
    })
  };
  next();
}
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body.text){
      return res.status(400).json({
        message: "please provide valid text for the post"
      })
    };
    next();
}
}

module.exports = router;
