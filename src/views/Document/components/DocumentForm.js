
import React, { Fragment, useState } from "react";
import { connect } from 'react-redux';
import { saveAs } from "file-saver";
import { SERVER_URI, DOCUMENT_TYPES } from 'config';
import {
    SetValue,
    ArrangeName,
    ArrangeDate,
    GetList,
} from 'store/actions/helpers/displayAction';

import {
    GetDocumentActivity,
    SetDocumentOwner,
    SetStudents,
    UploadDocument,
} from "../redux/actions";

import {
    SET_DOCUMENT_VALUE,
    SET_DOCUMENTS_SEARCHED_STUD,
} from '../redux/types';

import {
    Row,
    Col,
    Form,
    Button,
} from "reactstrap";

import LabelInput from 'components/Helpers/LabelInput';
import InfoModal from 'components/Helpers/InfoModal';
import QRCode from 'components/Helpers/QRCode';
import FileUpload from 'components/Helpers/FileUpload';
import PDFUploaderViewer from 'components/Helpers/PDFUploaderViewer';

const DocumentForm = (props) => {

    const [activityModal, setActivityModal] = useState(false);
    const [dOwner, setdOwner] = useState("");
    const [file, setFile] = useState(null);

    const { values, offices, students } = props.Document;


    var fileExt = values.name.split(".");
    fileExt = fileExt[fileExt.length - 1];

    var fileType = values.name.split("~")[1];

    DOCUMENT_TYPES.map(type => {
        if (type.value == fileType) {
            fileType = type.text
        }
    })

    const fileTypes = {
        "jpg": "image",
        "png": "image",
        "pdf": "pdf",
    }

    var ownerOffice = "";
    if (values.ownerOffice) {
        ownerOffice = offices.filter(o => o._id == values.ownerOffice);
    }

    console.log("*********************^^^^^^^^^^^^^");
    console.log(values);
    console.log((values.name != "" && values._id != ""));


    const contextComp = {
        sco: (val) => {
            return (
                <Row>
                    <Col lg="4">
                        <LabelInput
                            className="uneditable"
                            label={"Date"}
                            value={props.ArrangeDate(val.date, false)}
                            type="text"
                        />
                    </Col>
                    <Col lg="4">
                        <LabelInput
                            className="uneditable"
                            label={"Semester"}
                            value={val.sem}
                            type="text"
                        />
                    </Col>
                    <Col lg="4">
                        <LabelInput
                            className="uneditable"
                            label={"Academic Year"}
                            value={val.ay}
                            type="text"
                        />
                    </Col>
                    <Col lg="3">
                        <LabelInput
                            className="uneditable"
                            label={"Course Code"}
                            value={val.course.code}
                            type="text"
                        />
                    </Col>
                    <Col lg="9">
                        <LabelInput
                            className="uneditable"
                            label={"Course Title"}
                            value={val.course.title}
                            type="text"
                        />
                    </Col>
                </Row>
            )
        },

        completion: (val) => {
            return (
                <Row>
                    <Col lg="6">
                        <LabelInput
                            className="uneditable"
                            label={"Student's First Name"}
                            value={val.student.fname}
                            type="text"
                        />
                    </Col>
                    <Col lg="6">
                        <LabelInput
                            className="uneditable"
                            label={"Student's Last Name"}
                            value={val.student.lname}
                            type="text"
                        />
                    </Col>
                    <Col lg="4">
                        <LabelInput
                            className="uneditable"
                            label={"Student ID"}
                            value={val.student.id}
                            type="text"
                        />
                    </Col>
                    <Col lg="4">
                        <LabelInput
                            className="uneditable"
                            label={"Year Level"}
                            value={val.student.yr}
                            type="text"
                        />
                    </Col>
                    <Col lg="4">
                        <LabelInput
                            className="uneditable"
                            label={"Grade"}
                            value={val.grade}
                            type="text"
                        />
                    </Col>
                    <Col lg="12">
                        <LabelInput
                            className="uneditable"
                            label={"Grade"}
                            value={val.faculty}
                            type="text"
                        />
                    </Col>

                    <Col lg="3">
                        <LabelInput
                            className="uneditable"
                            label={"Course Code"}
                            value={val.course.code}
                            type="text"
                        />
                    </Col>
                    <Col lg="9">
                        <LabelInput
                            className="uneditable"
                            label={"Course Title"}
                            value={val.course.title}
                            type="text"
                        />
                    </Col>

                </Row>
            )
        },

        unitover: (val) => {
            return (
                <Row>
                    <Col lg="6">
                        <LabelInput
                            className="uneditable"
                            label={"Student's First Name"}
                            value={val.student.fname}
                            type="text"
                        />
                    </Col>
                    <Col lg="6">
                        <LabelInput
                            className="uneditable"
                            label={"Student's Last Name"}
                            value={val.student.lname}
                            type="text"
                        />
                    </Col>
                    <Col lg="4">
                        <LabelInput
                            className="uneditable"
                            label={"Student ID"}
                            value={val.student.id}
                            type="text"
                        />
                    </Col>
                    <Col lg="4">
                        <LabelInput
                            className="uneditable"
                            label={"Program/Course"}
                            value={val.student.prog}
                            type="text"
                        />
                    </Col>
                    <Col lg="4">
                        <LabelInput
                            className="uneditable"
                            label={"Academic Year - Term"}
                            value={val.student.ay + " - " + val.student.sem}
                            type="text"
                        />
                    </Col>

                    <Col lg="4">
                        <LabelInput
                            className="uneditable"
                            label={"Academic Standing"}
                            value={val.student.as}
                            type="text"
                        />
                    </Col>
                    <Col lg="4">
                        <LabelInput
                            className="uneditable"
                            label={"Total Units Earned"}
                            value={val.units.earned}
                            type="text"
                        />
                    </Col>
                    <Col lg="4">
                        <LabelInput
                            className="uneditable"
                            label={"Number of Units Approved"}
                            value={val.units.approved}
                            type="text"
                        />
                    </Col>
                </Row>
            )
        },

        ebs: (val) => {
            return (
                <Row>

                    <Col lg="6">
                        <LabelInput
                            className="uneditable"
                            label={"Facility/Equipment/s Requested"}
                            value={val.facEquip}
                            type="text"
                        />
                    </Col>
                    <Col lg="6">
                        <LabelInput
                            className="uneditable"
                            label={"Date of Use"}
                            value={props.ArrangeDate(val.date, false)}
                            type="text"
                        />
                    </Col>
                    <Col lg="6">
                        <LabelInput
                            className="uneditable"
                            label={"Name of Barrower"}
                            value={(val.students)?(val.student.fname + " " + val.student.lname):""}
                            type="text"
                        />
                    </Col>
                    <Col lg="6">
                        <LabelInput
                            className="uneditable"
                            label={"College - Department"}
                            value={val.college + " - " + val.dept}
                            type="text"
                        />
                    </Col>
                </Row>
            )
        },

    }

    const [autoOpenActivty, setAutoOpenActivty] = useState(props.hasOwnProperty("autoOpenActivty")?props.autoOpenActivty:false);

    var contextEBS = {
        id: "FACILITY [EQUIPMENT USE",
        fields: {
            date: { type: Date, default: Date.now },
            student: {
                fname: { type: String },
                lname: { type: String },
                id: { type: String },
            },

            facEquip: { type: String },
            college: { type: String },
            dept: { type: String },
        }
    };


    if (autoOpenActivty) {
        props.GetDocumentActivity(props.type, () => { setActivityModal(true) })

        if (props.hasOwnProperty("openAction")) {
            props.openAction(values);
        }

        setAutoOpenActivty(false);
    }

    return (
        <>
            <InfoModal
                size={"50%"}
                modal={activityModal}
                toggle={() => {
                    setActivityModal(!activityModal);
                }}
                title={"Document Activity"}
                form={
                    <Fragment>
                        <div id="activities-div">
                            {values.actions.reverse().map((act) => {
                                return (
                                    <div className="activity">
                                        {(act.status == "incoming") ? "FORWARDED" : act.status.toUpperCase()}
                                        <span className="o">{act.office.division}</span>
                                        <span className="d">{props.ArrangeDate(act.date)}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </Fragment>
                }
                buttons={[]}
            />

            {
                (values.name != "" && values._id != "")
                    ? <Row id="document-form" className="pt-3 pl-3 pr-3">
                        <Col sm="12" style={{ textAlign: "end" }}>
                            <Button size="sm" className="button-orange-gradient mt-2" color="primary" onClick={() => {
                                props.GetDocumentActivity(props.type, () => { setActivityModal(true) })

                                if (props.hasOwnProperty("openAction")) {
                                    props.openAction(values);
                                }

                            }}>Show Document Activity</Button>
                        </Col>
                        <Col md="12">
                            <Form>
                                <h6 className="heading-small text-muted mb-4">
                                    Details
                                </h6>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col lg="9" className="pr-5">

                                            <LabelInput
                                                className="uneditable"
                                                label={"Document Type"}
                                                prop={""}
                                                value={fileType}
                                                type="text"
                                                req={1}
                                                placeholder=""
                                                onChange={(e) => {
                                                }}
                                            />
                                            <LabelInput
                                                className="uneditable"
                                                label={"Document Name"}
                                                prop={""}
                                                value={values.name}
                                                type="text"
                                                req={1}
                                                placeholder=""
                                                onChange={(e) => {
                                                }}
                                            />
                                            <LabelInput
                                                className="uneditable"
                                                label={"Document Owner"}
                                                prop={""}
                                                value={(values.owner && values.owner.hasOwnProperty("personalInfo")) ? props.ArrangeName(values.owner.personalInfo.name) : ""}
                                                type="text"
                                                req={1}
                                                placeholder=""
                                                onChange={(e) => {
                                                }}
                                            />
                                        </Col>

                                        <Col lg="3" className="mt-4">
                                            <QRCode value={values._id} />
                                            <LabelInput
                                                style={{ textAlign: "center" }}
                                                className="uneditable"
                                                label={""}
                                                value={values.documentID}
                                                type="text"
                                                placeholder=""
                                                onChange={(e) => {
                                                }}
                                            />
                                        </Col>

                                    </Row>

                                </div>

                            </Form>

                        </Col>
                        <Col md="12">
                            <div id="file-viewer">
                                <div id="document-area">
                                    <div
                                        style={{
                                            padding: "10px"
                                        }}
                                    >
                                        {
                                            (fileTypes[fileExt] == "image")
                                                ? <img
                                                    style={{ width: "100%" }}
                                                    alt={"file"}
                                                    className="navbar-brand-img"
                                                    src={SERVER_URI + "docs/students/" + values.name}
                                                />
                                                : <PDFUploaderViewer origFile={SERVER_URI + "docs/students/" + values.name} wRemove={false} uploadDisabled={true} upload={(file) => { }} />
                                        }

                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col md="12">
                            <Form>
                                <h6 className="heading-small text-muted mb-4">
                                    Context
                                </h6>
                                <div className="pl-lg-4 mt-4">

                                    {
                                        (values.hasOwnProperty("context") && values.context != "")
                                            ?contextComp[values.type](values.context)
                                            :""
                                    }
                                    {/* 
                                        <Col lg="12">
                                            <LabelInput
                                                className="uneditable"
                                                style={{ height: "200px" }}
                                                label={"Content"}
                                                value={"AAAAAAAAAA qwd asd a qwd asd asda sdasdhkajdh ,dbnm,qd kuashdk jqw,djh uoashdsah d,msaAAAAAAAAAA qwd asd a qwd asd asda sdasdhkajdh ,dbnm,qd kuashdk jqw,djh uoashdsah d,msaAAAAAAAAAA qwd asd a qwd asd asda sdasdhkajdh ,dbnm,qd kuashdk jqw,djh uoashdsah d,msaAAAAAAAAAA qwd asd a qwd asd asda sdasdhkajdh ,dbnm,qd kuashdk jqw,djh uoashdsah d,msa"}
                                                type="textarea"
                                            />
                                        </Col>

                                        <Col lg="12" className="mt-2">
                                            <LabelInput
                                                className="uneditable"
                                                style={{ height: "200px" }}
                                                label={"Tags"}
                                                value={"AAAAqwd kugkbm 7q   hkjqbdo hqowdh jnsd uoashdsah d,msaAAAAqwd kugkbm 7q   hkjqbdo hqowdh jnsd uoashdsah d,msaAAAAqwd kugkbm 7q   hkjqbdo hqowdh jnsd uoashdsah d,msa"}
                                                type="textarea"
                                            />
                                        </Col> */}


                                </div>
                            </Form>
                        </Col>

                        <Col md="12" style={{ textAlign: "end" }}>
                            <Button size="md" className="button-orange-gradient mt-2" color="primary" onClick={() => {
                                saveAs(
                                    SERVER_URI + "docs/students/" + values.name,
                                    (fileType).split(" ").join("-") + "-" + (values.owner ? props.ArrangeName(values.owner.personalInfo.name) : (values.ownerOffice.division + " " + values.ownerOffice.section).split(" ").join("-")).split(" ").join("-") + "." + fileExt
                                );
                            }}>Download File</Button>
                        </Col>
                        <Col md="12" style={{ textAlign: "end" }}>

                        </Col>

                    </Row>
                    : <Row id="document-form" className="pt-3 pl-3 pr-3">
                        <Col lg="6">
                            <LabelInput
                                label={"Document Type"}
                                prop={"type"}
                                value={values.type}
                                type="select"
                                options={DOCUMENT_TYPES}
                                req={1}
                                placeholder=""
                                onChange={(e) => {
                                    props.SetValue(e, SET_DOCUMENT_VALUE);
                                }}
                            />
                        </Col>

                        <Col lg="6">
                            <LabelInput
                                label={"Document Owner"}
                                prop={"type"}
                                value={dOwner}
                                type="text"
                                req={1}
                                placeholder=""
                                onChange={(e) => {
                                    setdOwner(e.target.value);
                                    console.log(e.target.value);

                                    if (e.target.value.length >= 3) {
                                        props.GetList("student/get", SET_DOCUMENTS_SEARCHED_STUD, 1, 100000, { name: e.target.value });
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key == "Backspace" && (values.owner != "")) {
                                        props.SetStudents([]);
                                        props.SetDocumentOwner("");
                                        setdOwner("");
                                    }
                                }}
                            />
                            {
                                (students.length > 0)
                                    ? <div id="div-search-suggestions">
                                        {
                                            students.map((stud) => {
                                                return (
                                                    <div
                                                        onClick={() => {
                                                            props.SetStudents([]);
                                                            props.SetDocumentOwner(stud._id, stud);
                                                            setdOwner(props.ArrangeName(stud.personalInfo.name));
                                                        }}
                                                    >
                                                        {props.ArrangeName(stud.personalInfo.name)}
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                    : ""
                            }

                        </Col>
                        <Col lg="12">
                            <PDFUploaderViewer origFile={file} uploadDisabled={values.type == ""} upload={(file) => {
                                props.UploadDocument(file, dOwner,);
                            }} />
                        </Col>


                    </Row>
            }


        </>
    );
};

const mapStateToProps = (state) => ({
    Document: state.Document
})

export default connect(mapStateToProps, {
    SetValue,
    ArrangeName,
    ArrangeDate,
    GetList,
    GetDocumentActivity,
    SetDocumentOwner,
    SetStudents,
    UploadDocument,
})(DocumentForm);