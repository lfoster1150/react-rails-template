import React, { useState }  from 'react'
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { ROUTES } from '../resources/routes-constants';
import { useAppDispatch, useAppSelector } from '../store/reducers/store';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/actions/thunkActions';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const loginError = useAppSelector((state) => state.errors.loginError)

  const [info, setLoginInfo] = useState<{[key: string]: string}>({
    email: '',
    password: ''
  });
  const [validated, setValidated] = useState(false);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const { name } = target;
    const value = target.value;

    setLoginInfo({ ...info, [name]: value });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setValidated(true);
      const response = await dispatch(loginUser(info))
      if(response.type === "auth/loginUser/fulfilled") {
        navigate(`/`);
      }
    }};

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
            name="password"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Alert show={loginError.length > 0} variant="danger">
          {loginError}
        </Alert>
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