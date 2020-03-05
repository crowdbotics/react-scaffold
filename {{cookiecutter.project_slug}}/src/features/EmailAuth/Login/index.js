import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { connect } from "react-redux";
import * as emailAuthActions from "../redux/actions";
import classnames from "classnames";
const emailRegEx =
  // eslint-disable-next-line max-len
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  submitLogin = async () => {
    //e.preventDefault();

    try {
      const { email, password } = this.state;
      
      if (!emailRegEx.test(email)) {
        this.setState({
          message: "Email is not valid!",
          messageType: "error"
        });
        return;
      }

      if (password.length < 8) {
        this.setState({
          message: "Password should be longer than 8 letters!",
          messageType: "error"
        });
        return;
      }

      const { login } = this.props;

      await login({ email, password });

    } catch (error) {
      console.log(error);
      this.setState({
        message: "Login failed",
        messageType: "error"
      });
    }
  };

  render() {
    let { message, messageType } = this.state;
    const { signInErrors, loggedIn } = this.props

    if(!message && signInErrors){
      message = signInErrors
      messageType = "error"
    }

    if (this.props.loggedIn) {
      this.props.history.push(`/`);
    }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      {message && (
                        <div
                          className={classnames("alert", {
                            "alert-success": messageType === "success",
                            "alert-danger": messageType === "error"
                          })}
                          role="alert"
                        >
                          {message}
                        </div>
                      )}

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Email"
                          autoComplete="email"
                          name="email"
                          required
                          //value={this.state.email}
                          onChange={this.onChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Password"
                          name="password"
                          autoComplete="current-password"
                          required
                          //value={this.state.password}
                          onChange={this.onChange}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            onClick={this.submitLogin}
                          >
                            Login
                          </Button>
                        </Col>
                        
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>You don't have a login account yet.</p>
                      <Link to="/register">
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  signInErrors: state.EmailAuth.errors.SignIn,
  loggedIn: state.EmailAuth.loggedIn,
});

const mapDispatchToProps = {
  login: emailAuthActions.login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);