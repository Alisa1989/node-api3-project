const express = require("express");
const postDb = require("./postDb");

const router = express.Router();

router.get("/posts", (req, res) => {
  postDb
    .get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post",
      });
    });
});

router.get("/:id", (req, res) => {
  postDb
    .getById(req.params.id)
    .then((post) => {
      if (post) {
        return res.status(200).json(post);
      } else {
        return res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post",
      });
    });
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
