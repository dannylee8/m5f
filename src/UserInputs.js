import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

const UserInputs = () => (
  <div>
    <InputGroup size='sm' key='username' className='mb-3 new-user-input'>
      <InputGroup.Prepend>
        <InputGroup.Text id='basic-addon1'>@</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder='Username'
        aria-label='Username'
        aria-describedby='basic-addon1'
      />
    </InputGroup>
    <InputGroup size='sm' key='email_address' className='mb-3 new-user-input'>
      <InputGroup.Prepend>
        <InputGroup.Text id='basic-addon1'><span role='img' aria-label='email'>📧</span></InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder='Email address'
        aria-label='Email address'
        aria-describedby='basic-addon1'
      />
    </InputGroup>
  </div>
)

export default UserInputs
