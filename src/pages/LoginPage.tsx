import React, { useState }  from 'react'
import { Button, Form, Container, Alert, Row, Col, Nav } from 'react-bootstrap';
import { ROUTES } from '../resources/routes-constants';
import { useAppDispatch, useAppSelector } from '../store/reducers/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../store/actions/thunkActions';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const loginError = useAppSelector((state) => state.errors.loginError)
  const protectedState = useLocation().state
  const fromProtected = protectedState && protectedState.fromProtected
  
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
      <Row className="justify-content-center">
        <Col style={{maxWidth: "400px"}} className="justify-content-center">
          { fromProtected && (
              <Alert variant="danger">
                You must be signed in to view this page
              </Alert>
          )}
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
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
          <div className="d-grid gap-2">
            <Button className='bottom-btn' variant='outline-primary' href={ROUTES.SIGNUP_ROUTE}>
              Not a member? Sign up!
            </Button>
          </div>
          <Nav className='bottom-btn justify-content-center' >
            <Nav.Link href='/reset'>Forgot your password?</Nav.Link>
          </Nav>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage