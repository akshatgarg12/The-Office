import Post from '../../Atoms/Post'

const PostContainer = ({posts}) => {
  return (
    <>
    {
      posts.map((post) => {
        return (
          <Post key = {post._id}  post = {post}/>
          )
      })
    }
  </>
  );
}
 
export default PostContainer;


  