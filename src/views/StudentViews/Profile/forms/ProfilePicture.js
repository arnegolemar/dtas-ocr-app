import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

import {
    Button,
    Col,
    Row,
} from "reactstrap";

import { SERVER_URI } from 'config';

import { SetUserAvatar, UpdateProfilePic, } from '../redux/actions';

class ProfilePicture extends Component {

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
        console.log(file);
        if (file) {
            reader.onloadend = () => {
                this.props.SetUserAvatar(file, reader.result);
            }
            reader.readAsDataURL(file)
    
        }
    }

    render() {

        var profilePic = null;

        this.props.Profile.values.files.map((file, i) => {
            if (file.type == "avatar" && file.status == "current") {
                profilePic = file.path;
            }    
        })

        return (
            <>
                <div className="pp-header">
                    <Row>
                        <Col lg="12" className="pp-avatar-div">
                            <div className="avatar-thumbnail-profile change rounded-circle"
                                style={{
                                    backgroundImage: `url(${(this.props.Profile.tempAvatar.base64)
                                            ? this.props.Profile.tempAvatar.base64
                                            : (profilePic != null)
                                                ? SERVER_URI + "images/users/" + profilePic
                                                : SERVER_URI + "images/users/male-temp.png"
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
                            <input onChange={this.SetDriverImage} ref={this.imagePick} type="file" data-keys="image" hidden={true} accept="image/png, image/jpeg, image/jpg"/>

                            <Button size="md" className="button-orange-gradient" color="primary" disabled={(this.props.Profile.tempAvatar.base64)?false:true}
                                onClick={() => {
                                    this.props.UpdateProfilePic();
                                }}
                            >
                                Update
                            </Button>
                        </Col>
                    </Row>


                </div>
            </>
        );
    };
};

const mapStateToProps = (state) => ({
    Profile: state.Profile,
    pValues: state.Profile.values
})

export default connect(mapStateToProps, {
    SetUserAvatar,
    UpdateProfilePic,
})(ProfilePicture);
