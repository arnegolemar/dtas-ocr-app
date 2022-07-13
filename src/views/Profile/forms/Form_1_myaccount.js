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
import { SavePassword, SaveInfoUpdates } from '../redux/actions';

const Form_1_myaccount = (props) => {
    const { offices, roles } = props.Personnel;
    const { values } = props.Profile;

    var office = offices.filter(off => off._id == values.office);
    var role = roles.filter(r => r._id == values.role);

    console.log(office);
    console.log(role);
    
    const buttonToggle = React.useRef()
    return (
        <>
            <Col id="form-container" className="order-xl-1" xl="8">
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col xs="8">
                                <h3 className="mb-0">Personal Information</h3>
                            </Col>
                            <Col className="text-right" xs="4">
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        props.SaveInfoUpdates();
                                    }}
                                    size="sm"
                                >
                                    Save
                                </Button>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <h6 className="heading-small text-muted mb-4">
                                User information
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="6">
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
                                    </Col>
                                    <Col lg="6">
                                        <LabelInput
                                            className="uneditable"
                                            label={"Email"}
                                            prop={"pds.personalInfo.contact.email"}
                                            value={values.pds.personalInfo.contact.email}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                        // onChange={(e) => {
                                        //     props.SetValue(e, SET_PROFILE_DATA);
                                        // }}
                                        />
                                    </Col>
                                    <Col lg="6">
                                        <LabelInput
                                            className="uneditable"
                                            label={"Office"}
                                            prop={""}
                                            value={(office.length > 0)?office[0].division + " - " + office[0].section:""}
                                            type="text"
                                            placeholder=""
                                        // onChange={(e) => {
                                        //     props.SetValue(e, SET_PROFILE_DATA);
                                        // }}
                                        />
                                    </Col>
                                    <Col lg="6">
                                        <LabelInput
                                            className="uneditable"
                                            label={"App Role"}
                                            prop={""}
                                            value={(role.length> 0)?role[0].name:""}
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
    Profile: state.Profile,
    Personnel: state.Personnel,
})

export default connect(mapStateToProps, {
    SavePassword,
    SaveInfoUpdates,
})(Form_1_myaccount);
