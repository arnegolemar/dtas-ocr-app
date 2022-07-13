import React, { Component, Fragment, } from "react";
import { connect } from 'react-redux';
import { PRE } from 'config';

// reactstrap components
import {
   SET_DOCUMENTS,
   SET_SEARCHED_DOCUMENTS,
   SET_DOCUMENTS_OFFICES,
   SET_DOCUMENTS_INCOMING,
   SET_DOCUMENTS_RECEIVED,
   SET_DOCUMENTS_INCOMING_SEARCHED,
   SET_DOCUMENTS_RECEIVED_SEARCHED,
} from "./redux/types";

import {
   GetList,
   CheckFields,
} from "store/actions/helpers/displayAction";
import {
   AddDocument,
   UpdateDocument,
   MoveDocumentTo,
} from "./redux/actions";

import {
   Row,
   Col,
} from "reactstrap";

import LabelInput from 'components/Helpers/LabelInput';
// core components
import DocumentMainTable from "./components/DocumentMainTable.js";
import DocumentHeader from "./components/DocumentHeader.js";
import DocumentForm from "./components/DocumentForm.js";
import DocumentIncoming from "./components/DocumentIncoming.js";
import DocumentReceived from "./components/DocumentReceived.js";
import InfoModal from "components/Helpers/InfoModal.js";

class Document extends Component {

   constructor(props) {
      super(props);
      const ls = JSON.parse(localStorage.getItem(PRE + "-info"));

      this.state = {
         modal: false,
         modalOfficeSelect: false,
         modalIncoming: false,
         modalType: "",

         move: {
            to: "",
            remarks: "",
         },

         type: (ls.role.name == "Master") ? "all" : "received"
      }

      this.toggleModal = this.toggleModal.bind(this);
      this.toggleOfficeSelectionModal = this.toggleOfficeSelectionModal.bind(this);
      this.toggleType = this.toggleType.bind(this);
      this.toggleType = this.toggleType.bind(this);

      console.log(ls.office._id);

      props.GetList("document/get", SET_DOCUMENTS_INCOMING, 1, 10, { office: ls.office._id, actStatus: "incoming" }, { name: 1 });
      props.GetList("document/get", SET_DOCUMENTS_RECEIVED, 1, 10, { office: ls.office._id, actStatus: "received" }, { name: 1 });
      props.GetList("document/get", SET_DOCUMENTS, 1, 10, undefined, { name: 1 });
      props.GetList("office/get", SET_DOCUMENTS_OFFICES, 1, 100000, undefined, { division: 1 });


   }

   toggleOfficeSelectionModal() {
      this.setState({
         modalOfficeSelect: !this.state.modalOfficeSelect,
      })
   }

   toggleModal(type) {
      this.setState({
         modal: !this.state.modal,
         modalType: type,
      })
   }

   toggleType(type) {
      this.setState({
         type: type,
      })
   }

   render() {
      console.log(this.props);

      var ls = JSON.parse(localStorage.getItem(PRE + "-info"));
      var offices = [{ text: "--- Select Office ---", value: "" }];
      this.props.Document.offices.map((office) => {
         var cond = (ls.office._id != office._id);

         if (cond) {
            offices.push({
               text: office.division + " - " + office.section,
               value: office._id
            });
         }

      });

      var buttons = [];

      if (this.state.type == "received" || this.state.type == "all") {
         if (this.state.modalType != "add") {
            buttons = [{
               type: "Move",
               callback: this.toggleOfficeSelectionModal,
               size: 3,
            }]
         }
      } else if (this.state.type == "incoming") {
         buttons = [{
            type: "Receive",
            callback: this.toggleOfficeSelectionModal,
            size: 3,
         }]
      }

      // var condition = !this.props.CheckFields(this.props.Document.values, []);

      return (
         <div className="custom-content">
            {/* <InfoModal
               size={"90%"}
               modal={this.state.modalIncoming}
               toggle={this.toggleModalIncoming}
               title={"Incoming"}
               form={<DocumentIncoming
                  title={""}
                  filter={{}}
                  reducers={{ get: SET_DOCUMENTS, search: SET_SEARCHED_DOCUMENTS }}
                  toggle={(type) => {
                     this.toggleModalIncoming(type)
                  }}
               />}
               buttons={[]}
            /> */}

            <InfoModal
               size={"60%"}
               modal={this.state.modal}
               toggle={this.toggleModal}
               title={"Document"}
               form={<DocumentForm type={this.state.type} />}
               buttons={buttons}
            />

            <InfoModal
               size={"30%"}
               modal={this.state.modalOfficeSelect}
               toggle={this.toggleOfficeSelectionModal}
               title={""}
               form={<Fragment>
                  <Row className="pl-3 pr-3">
                     <Col md="12">
                        <LabelInput
                           label={"Document ID"}
                           value={this.props.Document.values.documentID}
                           type="text"
                           placeholder=""
                        />
                     </Col>
                     <Col md="12">
                        <LabelInput
                           label={"Office"}
                           value={this.state.move.to}
                           type="select"
                           options={offices}
                           placeholder=""
                           onChange={(e) => {
                              this.setState({
                                 move: {
                                    ...this.state.move,
                                    to: e.target.value
                                 }
                              })
                           }}
                        />
                     </Col>
                     <Col md="12">
                        <LabelInput
                           label={"Remarks"}
                           value={this.state.move.remarks}
                           type="textarea"
                           placeholder=""
                           style={{ height: "130px" }}
                           onChange={(e) => {
                              this.setState({
                                 move: {
                                    ...this.state.move,
                                    remarks: e.target.value
                                 }
                              })
                           }}
                        />
                     </Col>
                  </Row>
               </Fragment>}
               buttons={[{
                  type: "Move",
                  disable: (this.state.move.to == ""),
                  callback: () => {
                     this.props.MoveDocumentTo(this.state.move.to, this.state.move.remarks, this.state.type, () => {
                        this.toggleOfficeSelectionModal();
                     })
                  },
                  size: 3,
               }]}
            />

            <DocumentHeader toggleType={this.toggleType} listType={this.state.type} />

            {
               (this.state.type == "all" && (true))
                  ? <DocumentMainTable
                     title={"All Documents"}
                     filter={{}}
                     reducers={{ get: SET_DOCUMENTS, search: SET_SEARCHED_DOCUMENTS }}
                     toggle={(type) => {
                        this.toggleModal(type)
                     }}
                  />
                  : ""
            }

            {
               this.state.type == "incoming"
                  ? <DocumentIncoming
                     title={"Incoming"}
                     filter={{ office: ls.office._id, actStatus: "incoming" }}
                     reducers={{ get: SET_DOCUMENTS, search: SET_DOCUMENTS_INCOMING_SEARCHED }}
                     toggle={(type) => {
                        // this.toggleModalIncoming(type)
                        this.toggleModal(type)
                     }}
                     toggleOfficeSelectionModal={() => {
                        this.toggleOfficeSelectionModal();
                     }}
                  />
                  : ""
            }

            {
               this.state.type == "received"
                  ? <DocumentReceived
                     title={"Received"}
                     filter={{ office: ls.office._id, actStatus: "received" }}
                     reducers={{ get: SET_DOCUMENTS_RECEIVED, search: SET_DOCUMENTS_RECEIVED_SEARCHED }}
                     toggle={(type) => {
                        // this.toggleModalReceived(type)
                        this.toggleModal(type)
                     }}
                     toggleOfficeSelectionModal={() => {
                        this.toggleOfficeSelectionModal();
                     }}
                  />
                  : ""
            }
         </div>
      );

   }
}

const mapStateToProps = (state) => ({
   Document: state.Document,
})

export default connect(mapStateToProps, {
   GetList,
   AddDocument,
   UpdateDocument,
   MoveDocumentTo,
   CheckFields,
})(Document);
