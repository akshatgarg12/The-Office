import { useContext, useEffect, useRef, useState } from "react";
import { Segment, Feed, Image, Icon } from "semantic-ui-react";
import ShowMessage from '../showMessage'
import { UserContext } from "../../../context/UserContextProvider";
import {REQUEST} from '../../../actions/http'

const Post = ({ post }) => {
  const htmlDiv = useRef();
  const {state} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  useEffect(() => {
    htmlDiv.current.innerHTML = post.html;
  }, [post]);

  const deletePost = async (e) =>{
    e.preventDefault();
    console.log("delete post");
    try{
      const response = await REQUEST({
        path:'/api/post',
        method:"DELETE",
        data:{
          _id:post._id
        },
        setLoading
      })
      setSuccess(response)
      setError(null)
    }catch(e){
      console.log(e.message);
      setError(e.message)
      setSuccess(null)
    }
  }
  return (
    <Segment>
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            <Image avatar src={post.created_by.img || ""} />
            <strong>{post.created_by.name}</strong> posted
            <br />
            <br />
          </Feed.Summary>
          <Image size="large" src={post.img} />
          <br />
          <div ref={htmlDiv} style={{ padding: "10px" }}></div>
        </Feed.Content>
      </Feed.Event>
      {
        state?.user?.isAdmin ? 
        <Icon name="trash" loading={loading} onClick ={deletePost} color="grey"/>
        : null
      }
      <ShowMessage error={error} success={success} />
    </Segment>
  );
};

export default Post;
