import {Segment, Feed, Image} from 'semantic-ui-react'


const Post = ({post}) => {
  return (
        <Segment>
          <Feed.Event>
            <Feed.Content>
              <Feed.Summary>
              <Image avatar src={post.created_by.img || ""} />
               <strong>{post.created_by.name}</strong> posted 
                <br/>
                <br/>
              </Feed.Summary>
              <Image size="large" src={post.img} />
              <br/>
              <div dangerouslySetInnerHTML = {{__html:post.html}} style={{padding:"10px"}}></div>
            </Feed.Content>
          </Feed.Event>
          </Segment>
  );
}
 
export default Post;