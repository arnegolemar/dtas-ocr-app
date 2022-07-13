import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { FaRegFileExcel } from "react-icons/fa";

import {
    Button,
    Col,
    Row,
} from "reactstrap";
import LabelInput from 'components/Helpers/LabelInput';
import FileUpload from 'components/Helpers/FileUpload';

import { SERVER_URI, DOCUMENT_TYPES } from 'config';

import { UploadStudentDocument, } from '../redux/actions';

class StudentFileUpload extends Component {

    constructor(props) {
        super(props);


        this.state = {
            fileType: DOCUMENT_TYPES[0].value,
            file: null,
        }
    }

    render() {

        return (
            <>
                <div id="student-file-upload">
                    <Row className="pt-3 pl-3 pr-3" id="student-documents">
                        <Col lg="6">
                            <LabelInput
                                label={"File Type"}
                                value={this.state.fileType}
                                type="select"
                                options={DOCUMENT_TYPES}
                                placeholder=""
                                onChange={(e) => {
                                    this.setState({
                                        fileType: e.target.value
                                    })
                                }}
                            />
                        </Col>
                        <Col lg="12">
                            <FileUpload
                                GetProfileFile={(file) => {
                                    this.setState({
                                        file: file[0].file
                                    });
                                }}
                                file={null}
                                doctype="e.target.value"
                            />
                        </Col>
                    </Row>
                    <Button
                        color="primary"
                        size="md"
                        style={{ float: "right" }}
                        className="mt-3 mr-3"
                        disabled={this.state.file?false:true}
                        onClick={() => {
                            this.props.UploadStudentDocument(this.state.file, this.state.fileType, () => { 
                                this.props.toggleModalFileUpload();
                            });
                        }}
                    >
                        Upload
                    </Button>
                </div>
            </>
        );
    };
};

const mapStateToProps = (state) => ({
    Student: state.Student,
})

export default connect(mapStateToProps, {
    UploadStudentDocument,
})(StudentFileUpload);
