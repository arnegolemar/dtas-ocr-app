
import React, { useState } from "react";
import { connect } from 'react-redux';
import { SERVER_URI } from 'config';

import {
    GetDate,
} from 'store/actions/helpers/dateAction';
import {
    SetValue,
} from 'store/actions/helpers/displayAction';

import {
    Row,
    Col,
    Form,
} from "reactstrap";

import {
    SET_PERSONNEL_VALUE,
} from '../redux/types';

import LabelInput from 'components/Helpers/LabelInput';


const PersonnelForm = (props) => {
    const [office, setOffice] = useState((props.Personnel.values.office.hasOwnProperty("division"))?props.Personnel.values.office.division:"");
    const { values, offices, roles, positions, tempAvatar } = props.Personnel;

    var officeList = [], deptList = [], roleList = [], positionList = [], divisions = [];


    officeList = offices.map((office) => {
        if (divisions.indexOf(office.division) == -1) {
            divisions.push(office.division);
            return {
                text: office.division,
                value: office.division,
            };
        }
    });

    officeList = officeList.filter(off => off != null);

    deptList = (office == "") ? [] : offices.map((off) => {

        if (office == off.division) {
            return {
                text: off.section,
                value: off._id,
            };
        }

    });

    deptList = deptList.filter(d => d != null);

    roleList = roles.map((role) => {
        return {
            text: role.name,
            value: role._id,
        };
    });

    positionList = positions.map((position) => {
        return {
            text: position.name,
            value: position._id,
        };
    });

    var profilePic = null;

    values.files.map((file, i) => {
        if (file.type == "avatar" && file.status == "current") {
            profilePic = file.path;
        }
    });


    return (
        <>
            <Row className="pt-3 pl-3 pr-3">
                <Col md="4">
                    <div className="avatar-thumbnail-profile"
                        style={{
                            // backgroundImage: `url(${SERVER_URI + "images/users/male-temp.png"})`,
                            backgroundImage: `url(${(tempAvatar.base64 != "")
                                ? tempAvatar.base64
                                : SERVER_URI + "images/users/" + (
                                    (profilePic != null)
                                        ? profilePic
                                        : (values.pds.personalInfo.sex == "")
                                            ? "male-temp.png"
                                            : (values.pds.personalInfo.sex.toLowerCase() + "-temp.png")
                                )
                                })`,
                            width: "280px",
                            height: "280px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            props.toggleProfilePic();
                        }}
                    >
                    </div>
                </Col>
                <Col md="8">
                    <Form>
                        <h6 className="heading-small text-muted mb-4">
                            Account information
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="6">
                                    <LabelInput
                                        label={"Office"}
                                        prop={"office"}
                                        value={office}
                                        type="select"
                                        options={[{ text: "", value: "" }, ...officeList]}
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            setOffice(e.target.value)
                                        }}
                                    />
                                </Col>
                                <Col lg="6">
                                    <LabelInput
                                        label={"Department"}
                                        prop={"office"}
                                        value={(typeof values.office == "object") ? values.office._id : (values.office || "")}
                                        type="select"
                                        options={[{ text: "", value: "" }, ...deptList]}
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_PERSONNEL_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="6">
                                    <LabelInput
                                        label={"Position"}
                                        prop={"designation"}
                                        value={values.designation}
                                        options={[{ text: "", value: "" }, ...positionList]}
                                        type="select"
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_PERSONNEL_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="6">
                                    <LabelInput
                                        label={"App Role"}
                                        prop={"role"}
                                        value={(typeof values.role == "object" && values.role != null) ? values.role._id : (values.role || "")}
                                        type="select"
                                        options={[{ text: "", value: "" }, ...roleList]}
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_PERSONNEL_VALUE);
                                        }}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <h6 className="heading-small text-muted mb-4">
                            User information
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="4">
                                    <LabelInput
                                        label={"First Name"}
                                        prop={"name.first"}
                                        value={values.name.first}
                                        type="text"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_PERSONNEL_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="4">
                                    <LabelInput
                                        label={"Middle Name"}
                                        prop={"name.mid"}
                                        value={values.name.mid}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_PERSONNEL_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="4">
                                    <LabelInput
                                        label={"Last Name"}
                                        prop={"name.last"}
                                        value={values.name.last}
                                        type="text"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_PERSONNEL_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="3">
                                    <LabelInput
                                        label={"Date of Birth"}
                                        prop={"pds.personalInfo.birth.date"}
                                        value={props.GetDate(new Date(values.pds.personalInfo.birth.date || ""))}
                                        type="date"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_PERSONNEL_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="3">
                                    <LabelInput
                                        label={"Sex"}
                                        prop={"pds.personalInfo.sex"}
                                        value={values.pds.personalInfo.sex}
                                        type="select"
                                        options={[{ value: "", text: "" }, { value: "Female", text: "Female" }, { value: "Male", text: "Male" }]}
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_PERSONNEL_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="3">
                                    <LabelInput
                                        label={"Email"}
                                        prop={"pds.personalInfo.contact.email"}
                                        value={values.pds.personalInfo.contact.email}
                                        type="text"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_PERSONNEL_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="3">
                                    <LabelInput
                                        label={"Mobile Number"}
                                        prop={"pds.personalInfo.contact.mobile"}
                                        value={values.pds.personalInfo.contact.mobile}
                                        type="text"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_PERSONNEL_VALUE);
                                        }}
                                    />
                                </Col>
                            </Row>
                            <h6 className="heading-small text-muted mb-4">
                                Address
                            </h6>
                            <Row>
                                <Col md="4">
                                    <LabelInput
                                        label={"House/Block/Lot No."}
                                        prop={"pds.personalInfo.address.0.block"}
                                        value={values.pds.personalInfo.address.length > 0 ? values.pds.personalInfo.address[0].block : ""}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_PERSONNEL_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col md="4">
                                    <LabelInput
                                        label={"Street"}
                                        prop={"pds.personalInfo.address.0.street"}
                                        value={values.pds.personalInfo.address.length > 0 ? values.pds.personalInfo.address[0].street : ""}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_PERSONNEL_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col md="4">
                                    <LabelInput
                                        label={"Subdivision/Village"}
                                        prop={"pds.personalInfo.address.0.village"}
                                        value={values.pds.personalInfo.address.length > 0 ? values.pds.personalInfo.address[0].village : ""}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_PERSONNEL_VALUE);
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>

                                <Col md="6">
                                    <LabelInput
                                        label={"Barangay"}
                                        prop={"pds.personalInfo.address.0.brgy"}
                                        value={values.pds.personalInfo.address.length > 0 ? values.pds.personalInfo.address[0].brgy : ""}
                                        type="text"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_PERSONNEL_VALUE);
                                        }}
                                    />
                                </Col>

                                <Col md="6">
                                    <LabelInput
                                        label={"City/Municipality"}
                                        prop={"pds.personalInfo.address.0.cm"}
                                        value={values.pds.personalInfo.address.length > 0 ? values.pds.personalInfo.address[0].cm : ""}
                                        type="text"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_PERSONNEL_VALUE);
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6">
                                    <LabelInput
                                        label={"Province"}
                                        prop={"pds.personalInfo.address.0.province"}
                                        value={values.pds.personalInfo.address.length > 0 ? values.pds.personalInfo.address[0].province : ""}
                                        type="text"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_PERSONNEL_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="6">
                                    <LabelInput
                                        label={"Zip code"}
                                        prop={"pds.personalInfo.address.0.zipcode"}
                                        value={values.pds.personalInfo.address.length > 0 ? values.pds.personalInfo.address[0].zipcode : ""}
                                        type="text"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_PERSONNEL_VALUE);
                                        }}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Form>

                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => ({
    Personnel: state.Personnel
})

export default connect(mapStateToProps, {
    GetDate,
    SetValue,
})(PersonnelForm);