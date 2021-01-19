import Post from "../../atoms/post";

const PostContainer = ({ posts }) => {
  return (
    <>
      {posts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </>
  );
};

export default PostContainer;
