const { json } = require('express');
const express = require('express');
const userDb = require("./userDb");
const postDb = require("../posts/postDb");


const router = express.Router();

router.post('/', (req, res) => {
  if(!req.body.name)
  {
    return res.status(400).json({
      errorMessage: "Please provide a body for the user"
    })
  }
  userDb
  .insert(req.body)
  .then((user)=> {
    res.status(201).json(user);
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json({
      error: "something went wrong"
    })
  })
});

router.post('/:id/posts', (req, res) => {
  req.body.user_id = req.params.id;
  if(!req.body.text)
  {
    return res.status(400).json({
      errorMessage: "Please provide a body for the post"
    })
  }
  postDb
  .insert(req.body)
  .then((post)=> {
    if(!post){
      res.status(404).json({
        message: "The user with the specified ID couldn't be found"
      })
    }else {
      res.status(201).json(post);
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json({
      error: "something went wrong"
    })
  })
});

router.get('/', (req, res) => {
  userDb
    .get()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "something went wrong",
      });
    });  
});

router.get('/:id', (req, res) => {
  userDb
    .getById(req.params.id)
    .then((user) => {
      if(user) {
        return res.status(200).json(user)
      } else {
        return res.status(404).json({
          message: "The user with the specified ID does not exist"
        })
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "something went wrong",
      });
    });  
});

router.get('/:id/posts', (req, res) => {
  userDb
    .getUserPosts(req.params.id)
    .then((user) => {
      if (!user){
        res.status(404).json({
          message: "The user with the specified ID does not exist"
        })
      } else {
        res.status(200).json(user)
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "something went wrongr",
      });
    });  
});

router.delete('/:id', (req, res) => {
  userDb
    .remove(req.params.id)
    .then((user) => {
      if(user) {
        return res.status(200).json(user)
      } else {
        return res.status(404).json({
          message: "The user with the specified ID does not exist"
        })
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "something went wrong",
      });
    });  
});

// updates user
router.put('/:id', (req, res) => {
  if (!req.body.name){
    return res.status(400).json({
      message: "please provide a valid name"
    })}
    userDb
    .update(req.params.id, req.body)
    .then((user) => {
      if (!user){
        res.status(404).json({
          message: "The user with the specified ID does not exist"
        })
      } else {
        res.status(200).json(user)
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "something went wrongr",
      });
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
