import { Container, Dimmer, Loader } from "semantic-ui-react";
import { gql, useQuery } from "@apollo/client";
import PostContainer from "../molecules/PostsContainer";

const DiscussionPage = () => {
  const POSTS_QUERY = gql`
    {
      posts {
        _id
        html
        img
        created_by {
          name
          img
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(POSTS_QUERY);
  if (loading) {
    return (
      <Dimmer active>
        <Loader size="small">Loading</Loader>
      </Dimmer>
    );
  }
  if (error) {
    return (
      <Dimmer active>
        <p>Some error occured! {error}</p>
      </Dimmer>
    );
  }
  // data
  return (
    <Container style={{ padding: "10px", margin: "auto", overflowX: "hidden" }}>
      <PostContainer posts={data.posts} />
    </Container>
  );
};

export default DiscussionPage;
