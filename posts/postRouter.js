const express = require("express");
const postDb = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  postDb
    .get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      next(error)
    });
});

router.get("/:id", validatePostId(), (req, res) => {
  postDb
    .getById(req.params.id)
    .then((post) => {
        return res.status(200).json(post);
    })
    .catch((error) => {
      next(error)
    });
});

//delete post
router.delete("/:id", validatePostId(), (req, res) => {
  postDb
    .remove(req.params.id)
    .then((post) => {
        return res.status(200).json(post);
    })
    .catch((error) => {
      next(error)
    });
});


//udate post
router.put("/:id", validatePostId(), (req, res) => {
  if(!req.body.text){
    res.status(400).json({
      message: "must include valid text"
    })
  }
  postDb
  .update(req.params.id, req.body)
  .then((post)=> {
      res.status(200).json(post)
  })
  .catch((error) => {
    next(error)
  });
});

// custom middleware

function validatePostId() {
  return (req, res, next) => {
    postDb
    .getById(req.params.id)
    .then((post)=> {
      if(!post){
        res.status(404).json({
          message: "post with specified ID does not exist!"
        })
      } else {
        req.post = post;
        next()
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post",
      });
});
  }}
module.exports = router;
