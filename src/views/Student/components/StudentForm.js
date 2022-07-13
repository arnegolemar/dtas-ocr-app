
import React, { useState } from "react";
import { connect } from 'react-redux';
import { SERVER_URI } from 'config';

import {
    SetValue,
    InputDate,
} from 'store/actions/helpers/displayAction';

import {
    SET_STUDENT_VALUE,
} from '../redux/types';

import {
    Row,
    Col,
    Form,
} from "reactstrap";

import StudentFiles from './StudentFiles';
import LabelInput from 'components/Helpers/LabelInput';

const StudentForm = (props) => {
    console.log(props);
    const { values, tempAvatar, } = props.Student;
    var profilePic = null;

    if (values.files) {
        values.files.map((file, i) => {
            if (file.type == "students" && file.status == "current") {
                profilePic = file.path;
            }
        });
    }

    return (
        <>
            <Row className="pt-3 pl-5 pr-5">
                <Col md="4">
                    <div className="avatar-thumbnail-profile"
                        style={{
                            // backgroundImage: `url(${SERVER_URI + "images/users/male-temp.png"})`,
                            backgroundImage: `url(${(tempAvatar.base64 != "")
                                ? tempAvatar.base64
                                : SERVER_URI + "images/students/" + (
                                    (profilePic != null)
                                        ? profilePic
                                        : (values.personalInfo.sex == "")
                                            ? "male-temp.png"
                                            : (values.personalInfo.sex.toLowerCase() + "-temp.png")
                                )
                                })`,
                            width: "100%",
                            height: "280px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            props.toggleProfilePic();
                        }}
                    >
                    </div>
                    <Row>
                        <Col md="12" className="pt-3" style={{textAlign: "center", fontSize:"22px", fontWeight:"bold"}}>
                            <span>{values.studentID}</span>
                        </Col>
                    </Row>
                </Col>
                <Col md="8">
                    <Form>
                        <h5 className="heading-small text-muted mb-4">
                            Student's Information
                        </h5>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="12">
                                    <h6 className="heading-small text-muted mb-4">
                                        Name
                                    </h6>
                                </Col>
                                <Col lg="6">
                                    <LabelInput
                                        label={"First"}
                                        prop={"personalInfo.name.first"}
                                        value={values.personalInfo.name.first}
                                        type="text"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_STUDENT_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="6">
                                    <LabelInput
                                        label={"Middle"}
                                        prop={"personalInfo.name.mid"}
                                        value={values.personalInfo.name.mid}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_STUDENT_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="6">
                                    <LabelInput
                                        label={"Last"}
                                        prop={"personalInfo.name.last"}
                                        value={values.personalInfo.name.last}
                                        type="text"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_STUDENT_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="6">
                                    <LabelInput
                                        label={"Extension"}
                                        prop={"personalInfo.name.ext"}
                                        value={values.personalInfo.name.ext}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_STUDENT_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="12">
                                    <hr />
                                </Col>
                                <Col lg="6">
                                    <LabelInput
                                        label={"Sex"}
                                        prop={"personalInfo.sex"}
                                        value={values.personalInfo.sex}
                                        type="select"
                                        options={[{ text: "", value: "" }, { text: "Female", value: "Female" }, { text: "Male", value: "Male" }]}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_STUDENT_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="6">
                                    <LabelInput
                                        label={"Date of Birth"}
                                        prop={"personalInfo.dob"}
                                        value={props.InputDate(values.personalInfo.dob)}
                                        type="date"
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_STUDENT_VALUE);
                                        }}
                                    />
                                </Col>
                            </Row>


                        </div>
                    </Form>

                </Col>
            </Row>
            <Row className="pt-3 pl-7 pr-5">
                <Col lg="4">
                    <LabelInput
                        label={"Place of Birth"}
                        prop={"personalInfo.pob"}
                        value={values.personalInfo.pob}
                        req={1}
                        type="text"
                        placeholder=""
                        onChange={(e) => {
                            props.SetValue(e, SET_STUDENT_VALUE);
                        }}
                    />
                </Col>
                <Col lg="4">
                    <LabelInput
                        label={"Citizenship"}
                        prop={"personalInfo.citizenship"}
                        value={values.personalInfo.citizenship}
                        options={[{ value: "", text: "" }, { value: "Filipino", text: "Filipino" }, { value: "Dual Citizenship", text: "Dual Citizenship" }]}
                        type="select"
                        placeholder=""
                        onChange={(e) => {
                            props.SetValue(e, SET_STUDENT_VALUE);
                        }}
                    />
                </Col>
                <Col lg="4">
                    <LabelInput
                        label={"Civil Status"}
                        prop={"personalInfo.civilStatus"}
                        value={values.personalInfo.civilStatus}
                        type="select"
                        options={[{ value: "", text: "" }, { value: "Single", text: "Single" }, { value: "Married", text: "Married" }, { value: "Widowed", text: "Widowed" }, { value: "Separated", text: "Separated" }, { value: "Other/s", text: "Other/s" }]}
                        placeholder=""
                        onChange={(e) => {
                            props.SetValue(e, SET_STUDENT_VALUE);
                        }}
                    />
                </Col>
            </Row>


            <Row className="pl-7 pr-5">
                <Col lg="12">
                    <h5 className="heading-small text-muted mb-4">
                        Father's Name
                    </h5>
                </Col>
                <Col lg="4">
                    <LabelInput
                        label={"First"}
                        prop={"personalInfo.father.name.first"}
                        value={values.personalInfo.father.name.first}
                        req={1}
                        type="text"
                        placeholder=""
                        onChange={(e) => {
                            props.SetValue(e, SET_STUDENT_VALUE);
                        }}
                    />
                </Col>
                <Col lg="4">
                    <LabelInput
                        label={"Middle"}
                        prop={"personalInfo.father.name.mid"}
                        value={values.personalInfo.father.name.mid}
                        type="text"
                        placeholder=""
                        onChange={(e) => {
                            props.SetValue(e, SET_STUDENT_VALUE);
                        }}
                    />
                </Col>
                <Col lg="4">
                    <LabelInput
                        label={"Last"}
                        prop={"personalInfo.father.name.last"}
                        value={values.personalInfo.father.name.last}
                        req={1}
                        type="text"
                        placeholder=""
                        onChange={(e) => {
                            props.SetValue(e, SET_STUDENT_VALUE);
                        }}
                    />
                </Col>
            </Row>
            <Row className="pl-7 pr-5">
                <Col lg="12">
                    <h5 className="heading-small text-muted mb-4">
                        Mother's Maiden Name
                    </h5>
                </Col>
                <Col lg="4">
                    <LabelInput
                        label={"First"}
                        prop={"personalInfo.mother.name.first"}
                        value={values.personalInfo.mother.name.first}
                        req={1}
                        type="text"
                        placeholder=""
                        onChange={(e) => {
                            props.SetValue(e, SET_STUDENT_VALUE);
                        }}
                    />
                </Col>
                <Col lg="4">
                    <LabelInput
                        label={"Middle"}
                        prop={"personalInfo.mother.name.mid"}
                        value={values.personalInfo.mother.name.mid}
                        type="text"
                        placeholder=""
                        onChange={(e) => {
                            props.SetValue(e, SET_STUDENT_VALUE);
                        }}
                    />
                </Col>
                <Col lg="4">
                    <LabelInput
                        label={"Last"}
                        prop={"personalInfo.mother.name.last"}
                        value={values.personalInfo.mother.name.last}
                        req={1}
                        type="text"
                        placeholder=""
                        onChange={(e) => {
                            props.SetValue(e, SET_STUDENT_VALUE);
                        }}
                    />
                </Col>
            </Row>

            <div className="pl-7 pr-5">
                <Row>
                    <Col md="12">
                        <h5 className="heading-small text-muted mb-4">
                            Home Address
                        </h5>
                    </Col>
                    <Col md="4">
                        <LabelInput
                            label={"House/Block/Lot No."}
                            prop={"personalInfo.homeAddress.block"}
                            value={values.personalInfo.homeAddress.block}
                            type="text"

                            placeholder=""
                            onChange={(e) => {
                                props.SetValue(e, SET_STUDENT_VALUE);
                            }}
                        />
                    </Col>
                    <Col md="4">
                        <LabelInput
                            label={"Street"}
                            prop={"personalInfo.homeAddress.street"}
                            value={values.personalInfo.homeAddress.street}
                            type="text"

                            placeholder=""
                            onChange={(e) => {
                                props.SetValue(e, SET_STUDENT_VALUE);
                            }}
                        />
                    </Col>
                    <Col md="4">
                        <LabelInput
                            label={"Subdivision/Village"}
                            prop={"personalInfo.homeAddress.village"}
                            value={values.personalInfo.homeAddress.village}
                            type="text"

                            placeholder=""
                            onChange={(e) => {
                                props.SetValue(e, SET_STUDENT_VALUE);
                            }}
                        />
                    </Col>
                </Row>
                <Row>

                    <Col md="6">
                        <LabelInput
                            label={"Barangay"}
                            prop={"personalInfo.homeAddress.brgy"}
                            value={values.personalInfo.homeAddress.brgy}
                            type="text"
                            req={1}
                            placeholder=""
                            onChange={(e) => {
                                props.SetValue(e, SET_STUDENT_VALUE);
                            }}
                        />
                    </Col>

                    <Col md="6">
                        <LabelInput
                            label={"City/Municipality"}
                            prop={"personalInfo.homeAddress.cm"}
                            value={values.personalInfo.homeAddress.cm}
                            type="text"
                            req={1}
                            placeholder=""
                            onChange={(e) => {
                                props.SetValue(e, SET_STUDENT_VALUE);
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <LabelInput
                            label={"Province"}
                            prop={"personalInfo.homeAddress.province"}
                            value={values.personalInfo.homeAddress.province}
                            type="text"
                            req={1}
                            placeholder=""
                            onChange={(e) => {
                                props.SetValue(e, SET_STUDENT_VALUE);
                            }}
                        />
                    </Col>
                    <Col lg="6">
                        <LabelInput
                            label={"Zip code"}
                            prop={"personalInfo.homeAddress.zipcode"}
                            value={values.personalInfo.homeAddress.zipcode}
                            type="text"
                            req={1}
                            placeholder=""
                            onChange={(e) => {
                                props.SetValue(e, SET_STUDENT_VALUE);
                            }}
                        />
                    </Col>
                </Row>
            </div>
            {/* 
            {
                (values.hasOwnProperty("_id") && values._id != "")
                    ? <StudentFiles pType="file" toggleUpload={props.toggleUpload} toggleFile={props.toggleFile} />
                    : ""
            } */}

            {
                (values.hasOwnProperty("_id") && values._id != "")
                    ? <div className="pl-3 pr-5">
                        <StudentFiles toggleUpload={props.toggleUpload} toggleFile={props.toggleFile} />
                    </div>
                    : ""
            }


        </>
    );
};

const mapStateToProps = (state) => ({
    Student: state.Student
})

export default connect(mapStateToProps, {
    SetValue,
    InputDate,
})(StudentForm);