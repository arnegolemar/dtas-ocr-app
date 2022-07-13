
import React, { useState } from "react";
import { connect } from 'react-redux';
import { DOCUMENT_TYPES } from 'config';
import { FaRegFileExcel } from "react-icons/fa";

import {
} from 'store/actions/helpers/displayAction';

import {
} from 'config';

import {
} from '../redux/types';

import {
    Row,
    Col,
    Button,
} from "reactstrap";

import LabelInput from 'components/Helpers/LabelInput';

const FileViewer = (props) => {

    console.log(props.selectedFile);
    console.log(typeof props.selectedFile);

    var fileExt = ((typeof props.selectedFile == "string")?props.selectedFile:"").split(".");
    fileExt = fileExt[fileExt.length - 1];

    console.log(fileExt);

    const fileTypes = {
        "jpg": "image",
    }

    return (
        <div id="file-viewer">
            <Row id="document-area">
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
                                src={props.selectedFile}
                            />
                            : ""
                    }

                </div>
            </Row>
            <Row id="action-area">

            </Row>
        </div>
    );
};

const mapStateToProps = (state) => ({
    Student: state.Student
})

export default connect(mapStateToProps, {
})(FileViewer);