import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from '../hooks/useForm.js'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import Loader from 'react-loader-spinner'
import axios from 'axios'

const Login = () => {
  const history = useHistory()

  const initialValues = {
    username: '',
    password: ''
  }

  const [formValues, setFormValues, clearForm] = useForm(initialValues)
  const [formError, setFormError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setLoggingIn(true)

    setTimeout(() => {
      axios
        .post(`http://localhost:5500/api/auth/login`, formValues)
        .then(res => {
          localStorage.setItem('LOGIN', res.data.message)
          localStorage.setItem('TOKEN', res.data.token)
          clearForm()
          setLoggingIn(false)
          setFormError('')
          history.push('/shop')
        })
        .catch(err => {
          setFormError(err.response.data.error)
          setLoggingIn(false)
        })
    }, 2000)
  }

  return (
    <div className='formCont  w-100 d-flex justify-content-center'>
      <div className='d-inline-block d-flex flex-column align-items-center formSubCont'>
        <div className='d-flex justify-content-center'>
          <h2>
            {localStorage.getItem('TOKEN')
              ? localStorage.getItem('LOGIN')
              : 'Log In'}
          </h2>
        </div>

        {!localStorage.getItem('TOKEN') ? (
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
              <Label className=''>*Password</Label>
              <Input
                onChange={setFormValues}
                type='password'
                placeholder='password'
                name='password'
                value={formValues.password}
              />
            </FormGroup>

            <FormGroup className='btnContainer w-100  d-flex justify-content-center'>
              {!loggingIn ? (
                <Button className='submitBtn'>Log In</Button>
              ) : (
                <Loader
                  type='ThreeDots'
                  color='#00BFFF'
                  height={100}
                  width={50}
                />
              )}
            </FormGroup>
          </Form>
        ) : (
          <Form
            onSubmit={handleSubmit}
            className='w-100 d-flex flex-column'
            style={{ maxWidth: '500px' }}
          >
            <FormGroup>
              <Label for='disabledUsername' className=''>
                *Username
              </Label>
              <Input
                onChange={setFormValues}
                type='text'
                placeholder='*username'
                name='username'
                disabled
                value={formValues.username}
                id='disabledUsername'
              />
            </FormGroup>
            <FormGroup>
              <Label for='disabledPassword' className=''>
                *Password
              </Label>
              <Input
                onChange={setFormValues}
                type='password'
                placeholder='*password'
                name='password'
                disabled
                value={formValues.password}
                id='disabledPassword'
              />
            </FormGroup>

            <FormGroup className='btnContainer w-100  d-flex justify-content-center'>
              <Button className='w-50' disabled>Already Logged In</Button>
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
          <Link to='/register' className='formLink '>
            New here? Create an account now!
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
