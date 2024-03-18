import React, { useState, useEffect }  from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Container, Form, Alert, Row, Col, Nav } from 'react-bootstrap';
import { resetPassword } from '../store/actions/thunkActions';
import { useAppDispatch, useAppSelector } from '../store/reducers/store';

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const resetError = useAppSelector((state) => state.errors.resetError)
  const [queryParameters] = useSearchParams()

  const [info, setResetInfo] = useState<{[key: string]: string}>({
    password: '',
    confirmPassword: '',
    token: ''
  });

  const [focus, setFocus] = useState<{[key: string]: boolean}>({
    password: false,
    confirmPassword: false
  });

  const [validated, setValidated] = useState(false);


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
    setResetInfo({ ...info, [name]: value });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setValidated(true);
      const response = await dispatch(resetPassword(info))
      if(response.type === "auth/resetPassword/fulfilled") {
        navigate(`/login`);
      } else {
        console.log("Error")
      }
    }

  };

  useEffect(() => {
    if(queryParameters && info.token.length === 0) {
      const readToken = queryParameters.get('reset_password_token') || ""
      setResetInfo({...info, token: readToken})
    }  
  }, [queryParameters])

  return (
    <Container>
      <Row className="justify-content-center">
        <Col style={{maxWidth: "400px"}}>
          <Form noValidate validated={validated} onSubmit={handleSubmit} autoComplete='off'>
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
            <Alert show={resetError.length > 0} variant="danger">
              {resetError}
            </Alert>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Reset Password
              </Button>
            </div>
            <Nav className='bottom-btn justify-content-center' >
              <Nav.Link href='/reset'>Request New Email</Nav.Link>
            </Nav>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default ResetPasswordPage