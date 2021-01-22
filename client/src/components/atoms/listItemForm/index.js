import { useState } from 'react'
import { Button, Segment, Form } from 'semantic-ui-react'
import { REQUEST } from '../../../actions/http'
import {TodoItemStatus} from '../../../constants'
import ShowMessage from '../showMessage'

const ListItemForm = ({section, refetch}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [text, setText] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    try{
      const response = await REQUEST({
        path:'/api/kanban',
        method:"POST",
        data:{
          text,
          status:TodoItemStatus.TODO,
          section
        },
        setLoading
      })
      setSuccess(response)
      setError(null)
    }catch(e){
      console.log(e.message)
      setError(e.message)
      setSuccess(null)
    }finally{
      refetch();
      return;
    }
  }
  return (
    <Segment>
      <Form>
        <Form.Field>
          <label>Text</label>
          <input placeholder={`Text of List Item for ${section}...`} value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Field>
        <Button type='submit' loading={loading} onClick={submitHandler}>Submit</Button>
      </Form>
      <ShowMessage error={error} success={success} />
    </Segment>
  );
}
 
export default ListItemForm;