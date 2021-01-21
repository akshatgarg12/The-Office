import { Container, Header, Segment, Card, Icon } from "semantic-ui-react";
import Footer from "../templates/footer";

const PolicyCard = ({ description, link, header }) => {
  return (
    <Card>
      <Card.Content header={header} />
      <Card.Content description={description} />
      <Card.Content extra>
        <Icon name="file alternate" />
        <a href={link} target="_blank" rel="noreferrer">
          open document
        </a>
      </Card.Content>
    </Card>
  );
};

const data = [
  {
    _id: 1,
    header: "Policy",
    description:
      "A file containing set of rules and regulations regarding working of company.",
    link: "../../../assets/policy.pdf",
  },
  {
    _id: 2,
    header: "Holidays",
    description: "A document containing the holidays of the year.",
    link: "../../../assets/holidays.jpg",
  },
  {
    _id: 3,
    header: "Company logo",
    description:
      "A file containing company logo, cannot be used for commercial purposes without permission",
    link: "../../../assets/logo.jpg",
  },
];
const HomePage = () => {
  return (
    <>
    <Container>
      <div className="hero">
        <h3>The Office</h3>
      </div>
      <Segment>
        <Header as="h3" block>
          Company Policies and Holidays
        </Header>
        <Card.Group>
          {data.map((d) => {
            return (
              <PolicyCard
                key={d._id}
                header={d.header}
                description={d.description}
                link={d.link}
              />
            );
          })}
        </Card.Group>
      </Segment>
    </Container>
    <Footer />
    </>
  );
};

export default HomePage;
