const Post = require("../model/post");

const CREATE = async (req, res) => {
  const { html, img } = req.body;
  const created_by = req.user._id;
  if (!html) {
    return res.status(400).send("Please send HTML with a post");
  }
  try {
    const newPost = new Post({
      html,
      img,
      created_by,
    });
    await newPost.save();
    console.log(newPost);
    return res.send("new post successfully created");
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

module.exports = {
  CREATE,
};
