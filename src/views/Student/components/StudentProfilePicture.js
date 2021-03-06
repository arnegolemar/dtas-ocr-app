import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

import {
    Button,
    Col,
    Row,
} from "reactstrap";

import { SERVER_URI } from 'config';

import { SetStudentAvatar, } from '../redux/actions';

class StudentProfilePicture extends Component {

    constructor(props) {
        super(props);


        this.state = {

        }

        this.imagePick = React.createRef();
        this.TriggerFilePicker = this.TriggerFilePicker.bind(this);
        this.SetDriverImage = this.SetDriverImage.bind(this);
    }


    TriggerFilePicker(e) {
        this.imagePick.current.click();
    }

    SetDriverImage() {
        let reader = new FileReader();
        let file = this.imagePick.current.files[0];
        // var val = file.name;
        if (file) {
            reader.onloadend = () => {
                this.props.SetStudentAvatar(file, reader.result);
            }
            reader.readAsDataURL(file)

        }
    }

    render() {

        const { values, tempAvatar } = this.props.Student;

        var profilePic = null;

        if (values.hasOwnProperty("files")) {
            values.files.map((file, i) => {
                if (file.type == "students" && file.status == "current") {
                    profilePic = file.path;
                }
            })    
        }

        return (
            <>
                <div className="pp-header">
                    <Row>
                        <Col lg="12" className="pp-avatar-div">
                            <div className="avatar-thumbnail-profile change rounded-circle"
                                style={{
                                    backgroundImage: `url(${(tempAvatar.base64)
                                        ? tempAvatar.base64
                                        : (profilePic != null)
                                            ? SERVER_URI + "images/students/" + profilePic
                                            : SERVER_URI + "images/students/" + (
                                                (values.personalInfo.sex != "")
                                                    ? values.personalInfo.sex.toLowerCase()
                                                    : "male") + "-temp.png"

                                        })`,
                                }}
                            >
                            </div>
                        </Col>
                        <Col lg="12" className="pp-button-div">
                            <Button size="md" className="button-orange-gradient" color="primary"
                                onClick={this.TriggerFilePicker}
                            >
                                Change
                            </Button>
                            <input onChange={this.SetDriverImage} ref={this.imagePick} type="file" data-keys="image" hidden={true} accept="image/png, image/jpeg, image/jpg" />

                            <Button size="md" className="button-orange-gradient" color="primary" disabled={(tempAvatar.base64) ? false : true}
                                onClick={() => {
                                    if (values.hasOwnProperty("_id") && values._id != "") {
                                        // this.props.UpdateStudentPic();
                                        this.props.SetStudentAvatar(null, "");
                                    } else {
                                        this.props.toggleProfilePic();
                                    }
                                }}
                            >
                                {
                                    (values.hasOwnProperty("_id") && values._id != "")
                                    ? "Revert"
                                    : "Set"
                                }
                            </Button>
                        </Col>
                    </Row>


                </div>
            </>
        );
    };
};

const mapStateToProps = (state) => ({
    Student: state.Student,
})

export default connect(mapStateToProps, {
    SetStudentAvatar,
})(StudentProfilePicture);
