import React from "react";
import { connect } from 'react-redux';

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
import LabelInput from 'components/Helpers/LabelInput';
import { SetValue } from 'store/actions/helpers/displayAction.js';
import { GetDate } from 'store/actions/helpers/dateAction.js';
import { SaveInfoUpdates } from '../redux/actions';
import { SET_PROFILE_DATA } from '../redux/types';

const Form_2_personalInfo = (props) => {
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
                                    <Col lg="4">
                                        <LabelInput
                                            label={"First Name"}
                                            prop={"name.first"}
                                            value={props.pValues.name.first}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="4">
                                        <LabelInput
                                            label={"Middle Name"}
                                            prop={"name.mid"}
                                            value={props.pValues.name.mid}
                                            type="text"
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="4">
                                        <LabelInput
                                            label={"Last Name"}
                                            prop={"name.last"}
                                            value={props.pValues.name.last}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="3">
                                        <LabelInput
                                            label={"Date of Birth"}
                                            prop={"pds.personalInfo.birth.date"}
                                            value={props.GetDate(new Date(props.pValues.pds.personalInfo.birth.date || ""))}
                                            type="date"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="3">
                                        <LabelInput
                                            label={"Sex"}
                                            prop={"pds.personalInfo.sex"}
                                            value={props.pValues.pds.personalInfo.sex}
                                            type="select"
                                            options={[{ value: "", text: "" }, { value: "Female", text: "Female" }, { value: "Male", text: "Male" }]}
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="3">
                                        <LabelInput
                                            label={"Email"}
                                            prop={"pds.personalInfo.contact.email"}
                                            value={props.pValues.pds.personalInfo.contact.email}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="3">
                                        <LabelInput
                                            label={"Mobile Number"}
                                            prop={"pds.personalInfo.contact.mobile"}
                                            value={props.pValues.pds.personalInfo.contact.mobile}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </div>

                            <hr className="my-4" />
                            {/* Address */}
                            <h6 className="heading-small text-muted mb-4">
                                Address
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col md="4">
                                        <LabelInput
                                            label={"House/Block/Lot No."}
                                            prop={"pds.personalInfo.address.0.block"}
                                            value={(props.pValues.pds.personalInfo.address.hasOwnProperty("0"))?props.pValues.pds.personalInfo.address[0].block:""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col md="4">
                                        <LabelInput
                                            label={"Street"}
                                            prop={"pds.personalInfo.address.0.street"}
                                            value={(props.pValues.pds.personalInfo.address.hasOwnProperty("0"))?props.pValues.pds.personalInfo.address[0].street:""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col md="4">
                                        <LabelInput
                                            label={"Subdivision/Village"}
                                            prop={"pds.personalInfo.address.0.village"}
                                            value={(props.pValues.pds.personalInfo.address.hasOwnProperty("0"))?props.pValues.pds.personalInfo.address[0].village:""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>

                                    <Col md="6">
                                        <LabelInput
                                            label={"Barangay"}
                                            prop={"pds.personalInfo.address.0.brgy"}
                                            value={(props.pValues.pds.personalInfo.address.hasOwnProperty("0"))?props.pValues.pds.personalInfo.address[0].brgy:""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>

                                    <Col md="6">
                                        <LabelInput
                                            label={"City/Municipality"}
                                            prop={"pds.personalInfo.address.0.cm"}
                                            value={(props.pValues.pds.personalInfo.address.hasOwnProperty("0"))?props.pValues.pds.personalInfo.address[0].cm:""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <LabelInput
                                            label={"Province"}
                                            prop={"pds.personalInfo.address.0.province"}
                                            value={(props.pValues.pds.personalInfo.address.hasOwnProperty("0"))?props.pValues.pds.personalInfo.address[0].province:""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="6">
                                        <LabelInput
                                            label={"Zip code"}
                                            prop={"pds.personalInfo.address.0.zipcode"}
                                            value={(props.pValues.pds.personalInfo.address.hasOwnProperty("0"))?props.pValues.pds.personalInfo.address[0].zipcode:""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Form>

                    </CardBody>
                </Card>
            </Col>

        </>
    );
};

const mapStateToProps = (state) => ({
    Profile: state.Profile,
    pValues: state.Profile.values
})

export default connect(mapStateToProps, {
    SetValue,
    GetDate,
    SaveInfoUpdates,
})(Form_2_personalInfo);
