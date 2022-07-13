import React from "react";
import { NavLink as NavLinkRRD, Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
} from "reactstrap";

import { LoginAccount } from "./redux/actions";


class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            showPass: {
                p1: false
            }
        }

        this.showPassword = this.showPassword.bind(this);

    }

    showPassword(p) {
        this.setState({
            showPass: {
                ...this.state.showPass,
                [p]: !this.state.showPass[p]
            }
        })
    }
    render() {
        return (
            <>
                <Col lg="8">
                    <img
                        alt={"...."}
                        className="navbar-brand-img banner"
                        style={{ width: "-webkit-fill-available" }}
                        // src={require("../assets/img/nro13-admin-logo.png").default}
                        src={require("../../assets/img/login-background.jpg").default}
                    />
                </Col>

                <Col lg="4">

                    <Card className="bg-secondary shadow border-0">
                        <CardHeader>
                            <img
                                alt={"...."}
                                className="navbar-brand-img"
                                style={{ width: "-webkit-fill-available" }}
                                // src={require("../assets/img/nro13-admin-logo.png").default}
                                src={require("../../assets/img/dtas-ocr-logo.png").default}
                            />
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            <div className="text-center text-muted mb-4">
                                <small>Sign in with credentials</small>
                            </div>
                            <Form role="form">
                                <FormGroup className="mb-3">
                                    <label>Username</label>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-single-02" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder=""
                                            type="text"
                                            autoComplete="new-username"
                                            onChange={(e) => {
                                                this.setState({
                                                    username: e.target.value
                                                })
                                            }}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <label>Password</label>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-lock-circle-open" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder=""
                                            type={(!this.state.showPass.p1) ? "password" : "text"}
                                            autoComplete="new-password"
                                            onChange={(e) => {
                                                this.setState({
                                                    password: e.target.value
                                                })
                                            }}
                                        />
                                        <InputGroupAddon addonType="prepend" onClick={() => this.showPassword("p1")}>
                                            <InputGroupText>
                                                <i className={"clickable fas fa-eye" + ((this.state.showPass.p1) ? "" : "-slash")} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                                <div className="custom-control custom-control-alternative custom-checkbox">
                                    <input
                                        className="custom-control-input"
                                        id=" customCheckLogin"
                                        type="checkbox"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor=" customCheckLogin"
                                    >
                                        <span className="text-muted">Remember me</span>
                                    </label>
                                </div>
                                <div className="text-center">
                                    <Button className="my-4" color="primary" type="button" onClick={() => {
                                        this.props.LoginAccount({ ...this.state })
                                            .then(data => {
                                                console.log(data);
                                                this.props.history.push("/admin");
                                                window.location.reload();
                                            })
                                    }}>
                                        Sign in
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                    <Row className="mt-3">
                        <Col xs="6">
                            <a
                                className="text-light"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                <small>Forgot password?</small>
                            </a>
                        </Col>
                    </Row>
                </Col>
            </>
        );
    };
}

const mapStateToProps = (state) => ({
})

export default withRouter(connect(mapStateToProps, {
    LoginAccount,
})(Login));