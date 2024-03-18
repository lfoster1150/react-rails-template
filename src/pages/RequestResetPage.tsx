import React, { useState }  from 'react'
import { Button, Container, Form, Alert, Row, Col, Nav } from 'react-bootstrap';
import { requestResetPassword } from '../store/actions/thunkActions';
import { useAppDispatch, useAppSelector } from '../store/reducers/store';

const RequestResetPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const requestResetError = useAppSelector((state) => state.errors.requestResetError)

  const [info, setResetInfo] = useState<{[key: string]: string}>({
    email: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);


  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const { name } = target;
    const value = target.value;

    setResetInfo({ ...info, [name]: value });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true)
    const response = await dispatch(requestResetPassword(info.email))
    if(response.type === "auth/resetPassword/fulfilled") {
      setSubmitted(true)
    } else {
      console.log("Error")
    }

  };


  return (
    <Container>
      <Row className="justify-content-center">
        <Col style={{maxWidth: "400px"}}>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" style={{textAlign: "center"}}>
              <Form.Label style={{fontSize: "2.4em"}}>Reset Password</Form.Label>
              <Form.Label>{"Enter your email address below, and we'll send you reset instructions."}</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Email Address" 
                name="email"
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Reset Password
              </Button>
            </div>
            <Nav className='bottom-btn justify-content-center' >
              <Nav.Link href='/login'>Login</Nav.Link>
            </Nav>
            <Alert show={submitted} variant="success">
              Reset instructions sent to email provided
            </Alert>
            <Alert show={requestResetError.length > 0} variant="danger">
              {requestResetError}
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default RequestResetPage