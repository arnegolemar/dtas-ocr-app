import React from "react";
import { connect } from 'react-redux';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Collapse,
    Row,
    Col,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
} from "reactstrap";
import LabelInput from 'components/Helpers/LabelInput';
import { SavePassword, } from '../redux/actions';

const Form_1_myaccount = (props) => {
    const { values } = props.SWVProfile;
    console.log(values);

    const buttonToggle = React.useRef()
    return (
        <>
            <Col id="form-container" className="order-xl-1" xl="8">
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                          
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <h6 className="heading-small text-muted mb-4">
                                Student information
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="6">
                                        <LabelInput
                                            className="uneditable"
                                            label={"Student ID"}
                                            prop={"username"}
                                            value={values.studentID}
                                            type="text"
                                            placeholder=""
                                        // onChange={(e) => {
                                        //     props.SetValue(e, SET_PROFILE_DATA);
                                        // }}
                                        />
                                    </Col>
                                    
                                    <Col lg="12">
                                        <Button
                                            color="primary"
                                            size="sm"
                                            style={{marginBottom: "20px"}}
                                            onClick={() => {
                                                props.toggleCollapse();
                                            }}
                                        >
                                            Change Password
                                        </Button>

                                        <div>
                                            <Collapse isOpen={props.passwordCollapse}>
                                                <Card>
                                                    <CardBody>

                                                        <FormGroup>
                                                            <label>Old Password</label>
                                                            <InputGroup className="input-group-alternative">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="ni ni-lock-circle-open" />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input
                                                                    placeholder=""
                                                                    type={(!props.passwords.old.view) ? "password" : "text"}
                                                                    autoComplete="new-password"
                                                                    onChange={(e) => {
                                                                        props.togglePassword("old", "val", e.target.value)
                                                                    }}
                                                                />
                                                                <InputGroupAddon addonType="prepend" onClick={() => props.togglePassword("old", "view", !props.passwords.old.view)}>
                                                                    <InputGroupText>
                                                                        <i className={"clickable fas fa-eye" + ((props.passwords.old.view) ? "" : "-slash")} />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                            </InputGroup>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <label>New Password</label>
                                                            <InputGroup className="input-group-alternative">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="ni ni-lock-circle-open" />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input
                                                                    placeholder=""
                                                                    type={(!props.passwords.new.view) ? "password" : "text"}
                                                                    autoComplete="new-password"
                                                                    onChange={(e) => {
                                                                        props.togglePassword("new", "val", e.target.value)
                                                                    }}
                                                                />
                                                                <InputGroupAddon addonType="prepend" onClick={() => props.togglePassword("new", "view", !props.passwords.new.view)}>
                                                                    <InputGroupText>
                                                                        <i className={"clickable fas fa-eye" + ((props.passwords.new.view) ? "" : "-slash")} />
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
                                                                    type={(!props.passwords.conf.view) ? "password" : "text"}
                                                                    autoComplete="new-password"
                                                                    onChange={(e) => {
                                                                        props.togglePassword("conf", "val", e.target.value)
                                                                    }}
                                                                />
                                                                <InputGroupAddon addonType="prepend" onClick={() => props.togglePassword("conf", "view", !props.passwords.conf.view)}>
                                                                    <InputGroupText>
                                                                        <i className={"clickable fas fa-eye" + ((props.passwords.conf.view) ? "" : "-slash")} />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                            </InputGroup>
                                                        </FormGroup>

                                                        {
                                                            (props.passwords.conf.val != "")
                                                                ? <div className="text-muted font-italic">
                                                                    <small>
                                                                        {
                                                                            (props.passwords.new.val == props.passwords.conf.val)
                                                                                ? <span className={"text-strong font-weight-700"}>Password Match</span>
                                                                                : <span className={"text-low font-weight-700"}>Password Not Match</span>
                                                                        }
                                                                    </small>
                                                                    <br />
                                                                </div> : ""
                                                        }

                                                        <Button
                                                            color="primary"
                                                            // id="toggler"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                props.SavePassword(props.passwords, () => {
                                                                    props.togglePassword("all");
                                                                    props.toggleCollapse();
                                                                });
                                                            }}
                                                            disabled={(props.passwords.new.val == props.passwords.conf.val) ? false : true}
                                                        >
                                                            Save new Password
                                                        </Button>

                                                    </CardBody>
                                                </Card>
                                            </Collapse>
                                        </div>
                                    </Col>
                                    {/* <Col lg="4">
                                        <LabelInput
                                            className="uneditable"
                                            label={"Username"}
                                            prop={"username"}
                                            value={values.username}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                        // onChange={(e) => {
                                        //     props.SetValue(e, SET_PROFILE_DATA);
                                        // }}
                                        />
                                    </Col> */}
                                </Row>

                            </div>
                            <hr className="my-4" />

                        </Form>

                    </CardBody>
                </Card>
            </Col>

        </>
    );
};

const mapStateToProps = (state) => ({
    SWVProfile: state.SWVProfile,
})

export default connect(mapStateToProps, {
    SavePassword,
})(Form_1_myaccount);
