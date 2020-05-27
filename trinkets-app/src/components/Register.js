import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { useForm } from '../hooks/useForm.js'
import axios from 'axios'

const Register = () => {
  const initialValues = {
    username: '',
    email: '',
    password: ''
  }

  const history = useHistory()

  const [formValues, setFormValues, clearForm] = useForm(initialValues)
  const [formError, setFormError] = useState('')
  const [registering, setRegistering] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setRegistering(true)

    setTimeout(() => {
      axios
        .post(`http://localhost:5500/api/auth/register`, formValues)
        .then(res => {
          // res.data.success
          console.log(res)
          localStorage.setItem('REGISTER', res.data.success)
          clearForm()
          setRegistering(false)
          setFormError('')
          history.push('/login')
        })
        .catch(err => {
          console.log(err)
          setFormError(err.response.data.error)
          setRegistering(false)
        })
    }, 2000)
  }
  return (
    <div className='registerComp  w-100 d-flex justify-content-center'>
      <div className='d-inline-block w-50 '>
        <div className='d-flex justify-content-center'>
          <h2>Register</h2>
        </div>

        {!localStorage.getItem('REGISTER') ? (
          <Form
            onSubmit={handleSubmit}
            className='registerForm  w-100 d-flex flex-column'
          >
            <FormGroup>
              <Label className=''>*Username</Label>
              <Input
                onChange={setFormValues}
                type='text'
                placeholder='username'
                name='username'
                value={formValues.username}
              />
            </FormGroup>
            <FormGroup>
              <Label>*Email</Label>
              <Input
                onChange={setFormValues}
                type='text'
                placeholder='email'
                name='email'
                value={formValues.email}
              />
            </FormGroup>
            <FormGroup>
              <Label>*Password</Label>
              <Input
                onChange={setFormValues}
                type='password'
                placeholder='password'
                name='password'
                value={formValues.password}
              />
            </FormGroup>

            <FormGroup className='btnContainer w-100  d-flex justify-content-center'>
              <Button className='w-50'>Sign up</Button>
            </FormGroup>
          </Form>
        ) : (
          <Form
            onSubmit={handleSubmit}
            className='registerForm  w-100 d-flex flex-column'
          >
            <FormGroup>
              <Label className=''>*Username</Label>
              <Input
                onChange={setFormValues}
                type='text'
                placeholder='username'
                name='username'
                disabled
                value={formValues.username}
              />
            </FormGroup>
            <FormGroup>
              <Label>*Email</Label>
              <Input
                onChange={setFormValues}
                type='text'
                placeholder='email'
                name='email'
                disabled
                value={formValues.email}
              />
            </FormGroup>
            <FormGroup>
              <Label>*Password</Label>
              <Input
                onChange={setFormValues}
                type='password'
                placeholder='password'
                name='password'
                disabled
                value={formValues.password}
              />
            </FormGroup>

            <FormGroup className='btnContainer w-100  d-flex justify-content-center'>
              <Button className='w-50' disabled>
                Sign up
              </Button>
            </FormGroup>
          </Form>
        )}

        <div className='w-100 d-flex justify-content-center'>
          <Link to='/login' className='formLink '>
            Already have an account? Log in here!
          </Link>
        </div>
      </div>
    </div>

    /////if things go to shit, use this/////
    // <div>
    //   <h2>
    //     Register
    //   </h2>

    //   {!localStorage.getItem('TOKEN') ? (
    //     <Form onSubmit={handleSubmit}>
    //       <FormGroup>
    //         <Label className='w-100 label'>
    //           *Username
    //           <Input
    //             onChange={setFormValues}
    //             type='text'
    //             placeholder='username'
    //             name='username'
    //             value={formValues.username}
    //           />
    //         </Label>
    //       </FormGroup>
    //       <FormGroup>
    //         <Label className='w-100 label'>
    //           *Email
    //           <Input
    //             onChange={setFormValues}
    //             type='text'
    //             placeholder='email'
    //             name='email'
    //             value={formValues.email}
    //           />
    //         </Label>
    //       </FormGroup>
    //       <FormGroup>
    //         <Label className='w-100 label'>
    //           Password
    //           <Input
    //             onChange={setFormValues}
    //             type='password'
    //             placeholder='password'
    //             name='password'
    //             value={formValues.password}
    //           />
    //         </Label>
    //       </FormGroup>

    //       {!registering ? (
    //         <Button className='w-75 mt-4 mb-4 ml-5'>Sign up</Button>
    //       ) : (
    //         <Button className='w-75 mt-4 mb-4 ml-5' disabled>
    //           Sign up
    //         </Button>
    //       )}
    //     </Form>
    //   ) : (
    //     <Form onSubmit={handleSubmit}>
    //       <FormGroup>
    //         <Input
    //           onChange={setFormValues}
    //           type='text'
    //           placeholder='*username'
    //           name='username'
    //           disabled
    //           value={formValues.username}
    //           id='disabledInput'
    //         />
    //       </FormGroup>
    //       <FormGroup>
    //         <Input
    //           onChange={setFormValues}
    //           type='password'
    //           placeholder='*password'
    //           name='password'
    //           disabled
    //           value={formValues.password}
    //           id='disabledInput'
    //         />
    //       </FormGroup>

    //       <Button className='loginBtn w-75' disabled>
    //         Sign up
    //       </Button>
    //     </Form>
    //   )}

    //   <Link to='/login' className='formLink'>
    //     Already have an account? Log in here!
    //   </Link>
    // </div>
  )
}

export default Register
