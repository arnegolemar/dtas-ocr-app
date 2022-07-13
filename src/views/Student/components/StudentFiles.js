
import React, { useState } from "react";
import { connect } from 'react-redux';
import { DOCUMENT_TYPES } from 'config';
import { FaRegFileExcel } from "react-icons/fa";

import {
    SetValue,
    ArrangeDate,
} from 'store/actions/helpers/displayAction';

import {
    SERVER_URI,
} from 'config';

import {
} from '../redux/types';

import {
    Row,
    Col,
    Button,
} from "reactstrap";

import LabelInput from 'components/Helpers/LabelInput';

const StudentFile = (props) => {

    var docTypes = {};

    for (let x = 0; x < DOCUMENT_TYPES.length; x++) {
        docTypes[DOCUMENT_TYPES[x].value] = DOCUMENT_TYPES[x].text;
    }

    var files = [];

    // if (props.pType == "file") {
    //     files = props.Student.values.files;
    // } else if (props.pType == "document") { 
    files = props.Student.values.documents || [];
    // }

    return (
        <div style={{ padding: "0 30px" }}>
            <Button
                color="primary"
                size="sm"
                className="mb-2 mt-5"
                onClick={() => {
                    props.toggleUpload();
                }}
            >
                Upload Document
            </Button>

            <Row className="pt-3 pl-3 pr-3">
                <Col lg="12">
                    <h5 className="heading-small text-muted mb-4">
                        Documents
                    </h5>
                </Col>
            </Row>
            <Row className="pt-3 pl-3 pr-3" id="student-documents">
                {
                    files.map((file, i) => {
                        return (file.type != "students" && file.status == "current") ? (
                            <Col lg="4"
                                onClick={() => {
                                    props.toggleFile(SERVER_URI + "docs/students/" + file.path);
                                    // window.open(SERVER_URI + "docs/students/" + file.path);

                                    // console.log(docTypes);
                                    // console.log(file);
                                }}
                            >
                                <div className="document card">
                                    {docTypes[file.type]}
                                    <span>Uploaded: {props.ArrangeDate(new Date(file.dateUploaded), false)}</span>
                                </div>
                                <h6 className="heading-small mt-2 mb-4 ml-2">
                                </h6>
                            </Col>
                        ) : ""
                    })
                }

            </Row>

        </div>
    );
};

const mapStateToProps = (state) => ({
    Student: state.Student
})

export default connect(mapStateToProps, {
    SetValue,
    ArrangeDate,
})(StudentFile);