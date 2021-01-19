import { useState } from "react";
import { REQUEST } from "../../../actions/http";
import { Segment, Form, Image } from "semantic-ui-react";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageUploaderComponent = ({ details, setDetails }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const ImageUploader = async () => {
    if (!selectedFile) return;
    const file = await toBase64(selectedFile);
    const imgUpload = await REQUEST({
      path: "/api/fileUpload",
      method: "POST",
      data: {
        file,
      },
      setLoading,
    });
    console.log(imgUpload);
    setDetails({ ...details, img: imgUpload });
  };

  return (
    <Segment attached="bottom" inverted className="form-container">
      <Image src={details.img || ""} size="medium" centered />
      <Form inverted className="form-container" onSubmit={ImageUploader}>
        <Form.Input
          type="file"
          label="Image of Employee"
          name="img"
          onChange={(e, { value }) => {
            setSelectedFile(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />
        <Form.Button type="submit" loading={loading}>
          upload Image
        </Form.Button>
      </Form>
    </Segment>
  );
};
export default ImageUploaderComponent;
