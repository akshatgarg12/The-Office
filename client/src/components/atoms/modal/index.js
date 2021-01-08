import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

function modalReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false }
    case 'open':
      return { open: true}
    default:
      throw new Error('Unsupported action...')
  }
}

const MiniModal = ({ButtonText, onConfirm}) => {
  const [state, dispatch] = React.useReducer(modalReducer, {
    open: false,
  })
  const onConfirmHandler = async () => {
    dispatch({ type: 'close' })
    const data = await onConfirm();
  }
  return (
    <>
        <Button onClick={() => dispatch({ type: 'open'})}>
          {ButtonText}
        </Button>
        <Modal
          size='mini'
          open={state.open}
          onClose={() => dispatch({ type: 'close' })}
        >
        <Modal.Header>Confirm Request</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to create this request?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={()=>dispatch({ type: 'close' })}>
            No
          </Button>
          <Button positive onClick={onConfirmHandler} >
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default MiniModal