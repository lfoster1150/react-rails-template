import React, { useState }  from 'react'
import { Button, Form, Container } from 'react-bootstrap';
import { ROUTES } from '../resources/routes-constants';

const LoginPage: React.FC = () => {
  //eslint-disable-next-line
  const re = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  const [info, setLoginInfo] = useState<{[key: string]: string}>({
    email: '',
    password: ''
  });
  const [validated, setValidated] = useState(false);

  function validateEmail(email: string) {
    const emailTest = String(email).toLowerCase().match(re);
    return !!emailTest
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const { name } = target;
    const value = target.value;

    setLoginInfo({ ...info, [name]: value });
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
    <Container>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            required
            type="email" 
            name="email"
            placeholder="Enter email" 
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            name="Password"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Button className='bottom-btn' variant='outline-primary' href={ROUTES.SIGNUP_ROUTE}>
        Not a member? Sign up!
      </Button>

    </Container>
  )
}

export default LoginPage