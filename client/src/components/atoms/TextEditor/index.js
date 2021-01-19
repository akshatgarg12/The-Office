import RichTextEditor from "react-rte";
import { Container } from "semantic-ui-react";

const MyTextEditor = ({ details, setDetails, setHtml }) => {
  // const [value, setValue] = useState(RichTextEditor.createEmptyValue())
  const onChange = (value) => {
    setDetails({ ...details, value });
    setHtml(value.toString("html"));
    // console.log(value.toString('html'))
  };
  return (
    <Container>
      <RichTextEditor value={details.value} onChange={onChange} />
    </Container>
  );
};

export default MyTextEditor;
