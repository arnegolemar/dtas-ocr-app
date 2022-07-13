import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

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
    CardFooter,
} from "reactstrap";
import { textChangeRangeIsUnchanged } from "typescript";

import { CheckFields } from "../../store/actions/helper";
import { RegisterAccount } from "./redux/actions";

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            strength: "",
            agree: false,
            isClicked: false,
            registered: false,

            info: {
                name: {
                    first: "",
                    last: "",
                },
                email: "",
                password: "",
                password2: "",
            },

            showPass: {
                p1: false,
                p2: false
            }
        }

        this.changeForm = this.changeForm.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
        this.showPassword = this.showPassword.bind(this);

    }

    changeForm(no) {
        this.setState({
            form: no
        })
    }

    showPassword(p) {
        this.setState({
            showPass: {
                ...this.state.showPass,
                [p]: !this.state.showPass[p]
            }
        })
    }

    updateInfo(e, key) {

        key = key.split(".");
        this.setState({
            info: {
                ...this.state.info,
                [key[0]]: (key.length == 2) ? {
                    ...this.state.info[key[0]],
                    [key[1]]: e.target.value
                } : e.target.value
            }
        })
    }

    render() {
        var isComplete = this.props.CheckFields(this.state.info);

        return (
            <>
                {(!this.state.registered)
                    ? <Col lg="6" md="8" id="register">
                        <Card className="bg-secondary shadow border-0">

                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <small>Sign up with credentials</small>
                                </div>
                                <Form role="form">
                                    <Row>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label>First Name</label>
                                                <InputGroup className="input-group-alternative mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="" type="text"
                                                        onChange={(e) => { this.updateInfo(e, "name.first") }}
                                                    />
                                                </InputGroup>

                                            </FormGroup>
                                        </Col>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label>Last Name</label>
                                                <InputGroup className="input-group-alternative mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="" type="text"
                                                        onChange={(e) => { this.updateInfo(e, "name.last") }}
                                                    />
                                                </InputGroup>

                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup>
                                        <label>Email</label>
                                        <InputGroup className="input-group-alternative mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-email-83" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder=""
                                                type="email"
                                                autoComplete="new-email"
                                                onChange={(e) => { this.updateInfo(e, "email") }}
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
                                                onChange={(e) => { this.updateInfo(e, "password") }}
                                            />
                                            <InputGroupAddon addonType="prepend" onClick={() => this.showPassword("p1")}>
                                                <InputGroupText>
                                                    <i className={"clickable fas fa-eye" + ((this.state.showPass.p1) ? "" : "-slash")} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className="last">
                                        <label>Confirm Password</label>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-lock-circle-open" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder=""
                                                type={(!this.state.showPass.p2) ? "password" : "text"}
                                                autoComplete="new-password"
                                                onChange={(e) => { this.updateInfo(e, "password2") }}
                                            />
                                            <InputGroupAddon addonType="prepend" onClick={() => this.showPassword("p2")}>
                                                <InputGroupText>
                                                    <i className={"clickable fas fa-eye" + ((this.state.showPass.p2) ? "" : "-slash")} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>
                                    {
                                        (this.state.strength != "")
                                            ? <div className="text-muted font-italic">
                                                <small>
                                                    password strength:{" "}
                                                    <span className={"text-" + this.state.strength + " font-weight-700"}>{this.state.strength}</span>
                                                </small>
                                            </div> : ""
                                    }
                                    {
                                        (this.state.info.password2 != "")
                                            ? <div className="text-muted font-italic">
                                                <small>
                                                    {
                                                        (this.state.info.password == this.state.info.password2)
                                                            ? <span className={"text-strong font-weight-700"}>Password Match</span>
                                                            : <span className={"text-low font-weight-700"}>Password Not Match</span>
                                                    }
                                                </small>
                                            </div> : ""
                                    }

                                    <Row className="my-4">
                                        <Col xs="12">
                                            <div className="custom-control custom-control-alternative custom-checkbox">
                                                <input
                                                    className="custom-control-input"
                                                    id="customCheckRegister"
                                                    type="checkbox"
                                                    onChange={(e) => { this.setState({ agree: !this.state.agree }) }}
                                                />
                                                <label
                                                    className="custom-control-label"
                                                    htmlFor="customCheckRegister"
                                                >
                                                    <span className="text-muted">
                                                        I agree with the{" "}
                                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                            Privacy Policy
                                                        </a>
                                                    </span>
                                                </label>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="text-center">
                                        <Button className="mt-4 register-btn" onClick={() => {
                                            this.setState({ isClicked: true })// && !this.state.isClicked
                                            this.props.RegisterAccount({ ...this.state.info })
                                                .then(res => {
                                                    console.log(res);
                                                    if (res.status) {
                                                        this.setState({
                                                            isClicked: false,
                                                            registered: true,
                                                        })
                                                    }
                                                });
                                        }} disabled={!(isComplete && this.state.agree)} color="primary" type="button">
                                            {(this.state.isClicked) ? <i className="rotate fas fa-circle-notch" /> : "Create account"}
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    : <Col lg="6" md="8" id="register-success">
                        <Card className="bg-secondary shadow border-0">
                            <CardHeader className="bg-transparent pb-5">
                                <i className={"far fa-check-circle"} />
                                <span>Congratulations!</span>
                            </CardHeader>

                            <CardBody className="px-lg-5 py-lg-5">
                                <span>Your account has been successfully created</span>
                            </CardBody>

                            <CardFooter>
                                <Link
                                    className="h4 mb-0 text-light d-none d-lg-inline-block"
                                    to="/auth/login"
                                >
                                    Login
                                </Link>
                            </CardFooter>
                        </Card>
                    </Col>
                }
            </>
        );
    }
};

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
    CheckFields,
    RegisterAccount,
})(Register);