import { Container} from "semantic-ui-react";
import { gql, useQuery } from "@apollo/client";
import PostContainer from "../molecules/PostsContainer";
import LoadingPage from "./loadingPage";
import ErrorPage from "./errorPage";
import RefreshIcon from "../atoms/refreshIcon";

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

  const { loading, error, data, refetch } = useQuery(POSTS_QUERY);
  if (loading) {
    return <LoadingPage />
  }
  if (error) {
    return <ErrorPage error={error} />
  }
  // data
  return (
    <Container style={{ padding: "10px", margin: "auto", overflowX: "hidden" }}>
      <RefreshIcon refetch={refetch} />
      <PostContainer posts={data.posts} />
    </Container>
  );
};

export default DiscussionPage;
