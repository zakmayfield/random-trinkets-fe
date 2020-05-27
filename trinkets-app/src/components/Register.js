import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { useForm } from '../hooks/useForm.js'
import Loader from 'react-loader-spinner'
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
          localStorage.setItem('REGISTER', res.data.success)
          clearForm()
          setRegistering(false)
          setFormError('')
          history.push('/login')
        })
        .catch(err => {
          setFormError(err.response.data.error)
          setRegistering(false)
        })
    }, 2000)
  }
  
  return (
    <div className='registerComp  w-100 d-flex justify-content-center formCont'>
      <div className='d-inline-block d-flex flex-column align-items-center formSubCont'>
        <div className='d-flex justify-content-center'>
          <h2>Register</h2>
        </div>

        {!registering ? (
          <Form
            onSubmit={handleSubmit}
            className='w-100 d-flex flex-column'
            style={{ maxWidth: '500px' }}
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
              <Button className='submitBtn'>Sign Up</Button>
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
              <Loader
                type='ThreeDots'
                color='#00BFFF'
                height={100}
                width={50}
              />
            </FormGroup>
          </Form>
        )}

        <div className='errorsDiv w-100 d-flex justify-content-center'>
          {formError && (
            <h4
              className='formErrors p-1'
              style={{ color: 'red', background: 'lightyellow' }}
            >
              {formError}
            </h4>
          )}
        </div>

        <div className='w-100 d-flex justify-content-center'>
          <Link to='/login' className='formLink '>
            Already have an account? Log in here!
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
