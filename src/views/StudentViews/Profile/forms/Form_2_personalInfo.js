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
import { SET_PROFILE_DATA_STU } from '../redux/types';

const Form_2_personalInfo = (props) => {
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
                                User information
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="4">
                                        <LabelInput
                                            className="uneditable"
                                            label={"First Name"}
                                            prop={"name.first"}
                                            value={props.values.personalInfo.name.first}
                                            type="text"
                                        />
                                    </Col>
                                    <Col lg="4">
                                        <LabelInput
                                            className="uneditable"
                                            label={"Middle Name"}
                                            prop={"name.mid"}
                                            value={props.values.personalInfo.name.mid}
                                            type="text"
                                        />
                                    </Col>
                                    <Col lg="4">
                                        <LabelInput
                                            className="uneditable"
                                            label={"Last Name"}
                                            prop={"name.last"}
                                            value={props.values.personalInfo.name.last}
                                            type="text"
                                        />
                                    </Col>
                                    <Col lg="3">
                                        <LabelInput
                                            className="uneditable"
                                            label={"Place of Birth"}
                                            prop={"personalInfo.birth.date"}
                                            value={props.values.personalInfo.pob}
                                            type="text"
                                        />
                                    </Col>
                                    <Col lg="3">
                                        <LabelInput
                                            className="uneditable"
                                            label={"Date of Birth"}
                                            prop={"personalInfo.birth.date"}
                                            value={props.GetDate(new Date(props.values.personalInfo.dob || ""))}
                                            type="date"
                                        />
                                    </Col>
                                    <Col lg="3">
                                        <LabelInput
                                            className="uneditable"
                                            label={"Sex"}
                                            prop={"personalInfo.sex"}
                                            value={props.values.personalInfo.sex}
                                            type="text"
                                        />
                                    </Col>
                                    <Col lg="3">
                                        <LabelInput
                                            className="uneditable"
                                            label={"Citizenship"}
                                            prop={"personalInfo.citizenship"}
                                            value={props.values.personalInfo.citizenship}
                                            type="text"
                                        />
                                    </Col><Col lg="3">
                                        <LabelInput
                                            className="uneditable"
                                            label={"Civil Status"}
                                            prop={"personalInfo.civilStatus"}
                                            value={props.values.personalInfo.civilStatus}
                                            type="text"
                                        />
                                    </Col>
                                </Row>
                            </div>

                            <hr className="my-4" />
                            {/* Address */}
                            <h6 className="heading-small text-muted mb-4">
                                Home Address
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col md="4">
                                        <LabelInput
                                            className="uneditable"
                                            label={"House/Block/Lot No."}
                                            prop={"personalInfo.address.0.block"}
                                            value={props.values.personalInfo.homeAddress.block}
                                            type="text"
                                        />
                                    </Col>
                                    <Col md="4">
                                        <LabelInput
                                            className="uneditable"
                                            label={"Street"}
                                            prop={"personalInfo.homeAddress.0.street"}
                                            value={props.values.personalInfo.homeAddress.street}
                                            type="text"
                                        />
                                    </Col>
                                    <Col md="4">
                                        <LabelInput
                                            className="uneditable"
                                            label={"Subdivision/Village"}
                                            prop={"personalInfo.homeAddress.0.village"}
                                            value={props.values.personalInfo.homeAddress.village}
                                            type="text"
                                        />
                                    </Col>
                                </Row>
                                <Row>

                                    <Col md="6">
                                        <LabelInput
                                            className="uneditable"
                                            label={"Barangay"}
                                            prop={"personalInfo.homeAddress.0.brgy"}
                                            value={props.values.personalInfo.homeAddress.brgy}
                                            type="text"
                                        />
                                    </Col>

                                    <Col md="6">
                                        <LabelInput
                                            className="uneditable"
                                            label={"City/Municipality"}
                                            prop={"personalInfo.homeAddress.0.cm"}
                                            value={props.values.personalInfo.homeAddress.cm}
                                            type="text"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <LabelInput
                                            className="uneditable"
                                            label={"Province"}
                                            prop={"personalInfo.homeAddress.0.province"}
                                            value={props.values.personalInfo.homeAddress.province}
                                            type="text"
                                        />
                                    </Col>
                                    <Col lg="6">
                                        <LabelInput
                                            className="uneditable"
                                            label={"Zip code"}
                                            prop={"personalInfo.homeAddress.0.zipcode"}
                                            value={props.values.personalInfo.homeAddress.zipcode}
                                            type="text"
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
    SWVProfile: state.SWVProfile,
    values: state.SWVProfile.values
})

export default connect(mapStateToProps, {
    SetValue,
    GetDate,
    SaveInfoUpdates,
})(Form_2_personalInfo);
