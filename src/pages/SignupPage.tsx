import React, { useState }  from 'react'
import { Button, Form } from 'react-bootstrap';

const SignupPage: React.FC = () => {
  //eslint-disable-next-line
  const re = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  const [info, setSignupInfo] = useState<{[key: string]: string}>({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [focus, setFocus] = useState<{[key: string]: boolean}>({
    email: false,
    password: false,
    confirmPassword: false
  });

  const [validated, setValidated] = useState(false);

  function validateEmail(email: string) {
    const emailTest = String(email).toLowerCase().match(re);
    return !!emailTest
  }

  function validatePassword(type: string) {
    if (type === 'confirm') {
      return info.password === info.confirmPassword
    } else if (type === 'length') {
      return info.password.length > 5
    }
  }

  function toggleFocus(name: string) {
    if (focus[name] === false) {
      setFocus({ ...focus, [name]: true })
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const { name } = target;
    const value = target.value;

    toggleFocus(name)
    setSignupInfo({ ...info, [name]: value });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || validateEmail(info.email) === false) {
      event.stopPropagation();
    } else {
      setValidated(true);
      // ADD CALL TO API
    }

  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} autoComplete='off'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          required
          type="email" 
          name="email"
          placeholder="Enter email" 
          onChange={handleInputChange}
          isValid={focus.email && validateEmail(info.email)}
          isInvalid={focus.email && !validateEmail(info.email)}
          autoComplete="new-password"
        />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter a valid email
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password" 
          name="password"
          onChange={handleInputChange}
          isValid={focus.password && validatePassword("length")}
          isInvalid={focus.password && !validatePassword("length")}
          autoComplete="new-password"
        />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Password must be above 6 characters
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control 
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password" 
          onChange={handleInputChange}
          isValid={focus.confirmPassword && validatePassword("confirm")}
          isInvalid={focus.confirmPassword && !validatePassword("confirm")}
          autoComplete="new-password"
        />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Passwords must match!
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default SignupPage