import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../hooks/useForm.js'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import axios from 'axios'

const Login = () => {
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
        })
        .catch(err => {
          setFormError(err.response.data.error)
          setLoggingIn(false)
        })
    }, 2000)
  }

  return (
    <div>
      <h2>
        {localStorage.getItem('TOKEN')
          ? localStorage.getItem('LOGIN')
          : 'Log In'}
      </h2>

      {!localStorage.getItem('TOKEN') ? (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label className='w-100 label'>
              *Username
              <Input
                onChange={setFormValues}
                type='text'
                placeholder='username'
                name='username'
                value={formValues.username}
              />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label className='w-100 label'>
              Password
              <Input
                onChange={setFormValues}
                type='password'
                placeholder='password'
                name='password'
                value={formValues.password}
              />
            </Label>
          </FormGroup>

          {!loggingIn ? (
            <Button className='w-75 mt-4 mb-4 ml-5'>Log In</Button>
          ) : (
            <Button className='w-75 mt-4 mb-4 ml-5' disabled>
              Log In
            </Button>
          )}
        </Form>
      ) : (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              onChange={setFormValues}
              type='text'
              placeholder='*username'
              name='username'
              disabled
              value={formValues.username}
              id='disabledInput'
            />
          </FormGroup>
          <FormGroup>
            <Input
              onChange={setFormValues}
              type='password'
              placeholder='*password'
              name='password'
              disabled
              value={formValues.password}
              id='disabledInput'
            />
          </FormGroup>

          <Button className='loginBtn w-75' disabled>
            Log In
          </Button>
        </Form>
      )}

      <div className="errorsDiv">{formError && <h4 className='formErrors'>{formError}</h4>}</div>

      <Link to='/register' id='formLink'>
        New here? Create an account now!
      </Link>
    </div>
  )
}

export default Login
