import {Message} from 'semantic-ui-react'

const ShowMessage = ({error, success}) => {
  return (
    <>
      {error ? 
        <Message negative>
          <p>{error}</p>
        </Message>
      : null}
      {success ? 
        <Message success>
          <p>{success}</p>
        </Message>
      : null}
     </>
  );
}
 
export default ShowMessage;