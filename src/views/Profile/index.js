import React, { Component } from "react";
import { connect } from 'react-redux';
import { SERVER_URI, PRE } from 'config';

// reactstrap components
import {
   Button,
   Card,
   CardHeader,
   CardBody,
   FormGroup,
   Form,
   Input,
   Container,
   Row,
   Col,
} from "reactstrap";

// reactstrap components
import {
   SET_PERSONNEL_OFFICES,
   SET_PERSONNEL_ROLES,
} from "../Personnel/redux/types";

import {
   GetList,
} from "store/actions/helpers/displayAction";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { ToastContainer } from "react-toastify";
import InfoModal from "components/Helpers/InfoModal.js";

// FORMS
import Form_1_myaccount from "./forms/Form_1_myaccount.js";
import Form_2_personalInfo from "./forms/Form_2_personalInfo.js";
import ProfilePicture from "./forms/ProfilePicture.js";

import { GetMyInfo } from './redux/actions';
import { ArrangeName } from 'store/actions/helpers/displayAction';

class Profile extends Component {

   constructor(props) {
      console.log(props);
      props.GetMyInfo();

      super(props);
      const routes = {
         account: 1,
         personal_info: 2,
      };

      this.state = {
         form: (props.match.params.type) ? routes[props.match.params.type] : 1,
         password: {
            old: {
               val: "",
               view: false,
            },
            new: {
               val: "",
               view: false,
            },
            conf: {
               val: "",
               view: false,
            },
         },
         passwordCollapse: false,
         modalPic: false,
      }

      this.changeForm = this.changeForm.bind(this);
      this.togglePassword = this.togglePassword.bind(this);
      this.toggleCollapse = this.toggleCollapse.bind(this);
      this.toggleProfilePic = this.toggleProfilePic.bind(this);

      // this.props.GetMyInfo();
      if (props.Personnel.offices.length == 0)
         props.GetList("office/get", SET_PERSONNEL_OFFICES, 1, 10000, undefined, { division: 1 });
      if (props.Personnel.roles.length == 0)
         props.GetList("role/get", SET_PERSONNEL_ROLES, 1, 10000, undefined, { name: 1 });

   }

   toggleProfilePic() {
      this.setState({
         modalPic: !this.state.modalPic
      })
   }

   changeForm(no) {
      this.setState({
         form: no
      })
   }

   togglePassword(type, field, val) {
      if (type == 'all') {
         this.setState({
            password: {
               old: {
                  val: "",
                  view: false,
               },
               new: {
                  val: "",
                  view: false,
               },
               conf: {
                  val: "",
                  view: false,
               },
            },
         })

      } else {
         this.setState({
            password: {
               ...this.state.password,
               [type]: {
                  ...this.state.password[type],
                  [field]: val
               }
            }
         })

      }
   }

   toggleCollapse(type, field, val) {
      this.setState({
         passwordCollapse: !this.state.passwordCollapse
      })
   }



   render() {
      var ls = JSON.parse(localStorage.getItem(PRE + "-info"));

      var profilePic = localStorage.getItem(PRE + "-pp");

      const forms = ["",
         <Form_1_myaccount togglePassword={this.togglePassword} passwords={this.state.password} passwordCollapse={this.state.passwordCollapse} toggleCollapse={this.toggleCollapse} />, <Form_2_personalInfo />,
         ""];


      return (
         <>
            <UserHeader />
            {/* Page content */}
            {/* <InfoModal
               size={"50%"}
               modal={this.state.passModal}
               toggle={this.togglePass}
               title={"Change Password"}
               form={<div>ss</div>}
               buttons={[
                  {
                     type: "Save", disable: false, callback: () => {
                     }
                  }
               ]}
            /> */}
            <InfoModal
               size={"40%"}
               modal={this.state.modalPic}
               toggle={this.toggleProfilePic}
               title={"Profile Picture"}
               form={<ProfilePicture />}
               buttons={[]}
            />
            <Container id="profile-container" className="mt--7" fluid>
               <Row>
                  <Col className="mb-5 mb-xl-0" xl="4">
                     <Card className="card-profile shadow">
                        <Row className="justify-content-center">
                           <Col className="order-lg-2" lg="3">
                              <div className="card-profile-image">
                                 {/* <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                    <img
                                       alt="..."
                                       className="rounded-circle"
                                       src={
                                          require("../../assets/img/theme/lemar.jpg")
                                             .default
                                       }
                                    />
                                 </a> */}
                                 <div className="avatar-thumbnail-profile rounded-circle clickable"
                                    style={{
                                       backgroundImage: `url(${(profilePic != null)
                                          ? SERVER_URI + "images/users/" + profilePic
                                          : SERVER_URI + "images/users/male-temp.png"
                                          })`,

                                    }}
                                    onClick={() => {
                                       this.toggleProfilePic()
                                    }}
                                 >
                                 </div>
                              </div>
                           </Col>
                        </Row>
                        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                           <div className="d-flex justify-content-between">
                              {/* <Button
                                 className="mr-4"
                                 color="info"
                                 href="#pablo"
                                 onClick={(e) => e.preventDefault()}
                                 size="sm"
                              >
                                 Connect
                              </Button>
                              <Button
                                 className="float-right"
                                 color="default"
                                 href="#pablo"
                                 onClick={(e) => e.preventDefault()}
                                 size="sm"
                              >
                                 Message
                              </Button> */}
                           </div>
                        </CardHeader>
                        <CardBody className="pt-0 pt-md-4">
                           <Row>
                              <div className="col">
                                 <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                    {/* <div>
                                       <span className="heading">22</span>
                                       <span className="description">Friends</span>
                                    </div>
                                    <div>
                                       <span className="heading">10</span>
                                       <span className="description">Photos</span>
                                    </div>
                                    <div>
                                       <span className="heading">89</span>
                                       <span className="description">Comments</span>
                                    </div> */}
                                 </div>
                              </div>
                           </Row>
                           <div className="text-center">
                              <h3>
                                 {this.props.ArrangeName(ls.name, 3)}
                                 <span className="font-weight-light"></span>
                              </h3>
                              {/* <div className="h5 mt-4">
                                 <i className="ni business_briefcase-24 mr-2" />
                                 Information Systems Analyst
                              </div>
                              <div>
                                 <i className="ni education_hat mr-2" />
                                 Caraga State University
                              </div> */}
                              <hr className="my-4" />
                              {/* <p>
                                 Ryan — the name taken by Melbourne-raised, Brooklyn-based
                                 Nick Murphy — writes, performs and records all of his own
                                 music.
                              </p>
                              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                 Show more
                              </a> */}
                           </div>
                        </CardBody>
                     </Card>

                     <Card className="card-profile card-profile-btns shadow">
                        <CardBody className="pt-0 pt-md-4">
                           <Row>
                              <div className="col">
                                 <Button className={"profile-btn" + ((this.state.form == 1) ? " active" : "")} color={(this.state.form == 1) ? "primary" : ""}
                                    onClick={(e) => this.changeForm(1)}
                                 >
                                    My Account
                                 </Button>

                                 <Button className={"profile-btn" + ((this.state.form == 2) ? " active" : "")} color={(this.state.form == 2) ? "primary" : ""}
                                    onClick={(e) => this.changeForm(2)}
                                 >
                                    Personal Information
                                 </Button>
                              </div>
                           </Row>

                        </CardBody>
                     </Card>

                  </Col>

                  {
                     forms[this.state.form]
                  }

               </Row>
            </Container>
         </>
      );

   }
}

const mapStateToProps = (state) => ({
   Profile: state.Profile,
   Personnel: state.Personnel,
})

export default connect(mapStateToProps, {
   GetMyInfo,
   ArrangeName,
   GetList,
})(Profile);
