import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

// reactstrap components
import {
   SET_STUDENTS,
   SET_SEARCHED_STUDENTS,
} from "./redux/types";

import {
   GetList,
   CheckFields,
} from "store/actions/helpers/displayAction";

import {
   GetSemester,
} from "store/actions/helpers/dateAction";

import {
   AddStudent,
   UpdateStudent,
} from "./redux/actions";

// core components
import StudentMainTable from "./components/StudentMainTable.js";
import StudentHeader from "./components/StudentHeader.js";
import StudentForm from "./components/StudentForm.js";
import StudentProfilePicture from "./components/StudentProfilePicture.js";
import StudentFileUpload from "./components/StudentFileUpload.js";
import InfoModal from "components/Helpers/InfoModal.js";
import FileViewer from "./components/FileViewer.js";

class Student extends Component {

   constructor(props) {
      super(props);

      this.state = {
         modal: false,
         modalType: "",
         modalPic: false,
         modalFileUpload: false,
         modalFile: false,

         selectedFile: null,
         semester: props.GetSemester(),
      }

      this.toggleModal = this.toggleModal.bind(this);
      this.toggleProfilePic = this.toggleProfilePic.bind(this);
      this.toggleModalFileUpload = this.toggleModalFileUpload.bind(this);
      this.toggleFile = this.toggleFile.bind(this);
      props.GetList("student/get", SET_STUDENTS, 1, 10, undefined, { name: 1 });


   }

   toggleFile(file) {
      this.setState({
         modalFile: !this.state.modalFile,
         selectedFile: file,
      })
   }

   toggleModal(type) {
      this.setState({
         modal: !this.state.modal,
         modalType: type,
      })
   }

   toggleProfilePic() {
      this.setState({
         modalPic: !this.state.modalPic
      })
   }

   toggleModalFileUpload() {
      this.setState({
         modalFileUpload: !this.state.modalFileUpload
      })
   }

   render() {

      console.log(this.props.Student.values);
      var condition = !this.props.CheckFields(this.props.Student.values, ["createdAt", "_id", "studentID", "mid", "ext", "files", "documents", "__v"]);

      return (
         <div className="custom-content">
            <InfoModal
               size={"70%"}
               modal={this.state.modal}
               toggle={this.toggleModal}
               title={"Student"}
               form={<StudentForm semester={this.state.semester} toggleProfilePic={this.toggleProfilePic} toggleUpload={this.toggleModalFileUpload} toggleFile={this.toggleFile} />}
               buttons={[(this.state.modalType == "add") ? {
                  type: "Add",
                  callback: () => { this.props.AddStudent() },
                  disable: condition,
               } : {
                  type: "Update",
                  callback: this.props.UpdateStudent,
                  disable: condition,
                  size: 3,
               }]}
            />

            <InfoModal
               size={"40%"}
               modal={this.state.modalPic}
               toggle={this.toggleProfilePic}
               title={"Profile Picture"}
               form={<StudentProfilePicture toggleProfilePic={this.toggleProfilePic} />}
               buttons={[]}
            />

            <InfoModal
               size={"50%"}
               modal={this.state.modalFileUpload}
               toggle={this.toggleModalFileUpload}
               title={"File Upload"}
               form={<StudentFileUpload toggleModalFileUpload={this.toggleModalFileUpload} />}
               buttons={[]}
            />

            <InfoModal
               size={"60%"}
               modal={this.state.modalFile}
               toggle={this.toggleFile}
               title={"File"}
               form={<Fragment>
                  <FileViewer selectedFile={this.state.selectedFile}/>
               </Fragment>}
               buttons={[]}
            />

            <StudentHeader />

            <StudentMainTable
               title={"Students"}
               filter={{}}
               reducers={{ get: SET_STUDENTS, search: SET_SEARCHED_STUDENTS }}
               toggle={(type) => {
                  this.toggleModal(type)
               }}
            />
         </div>
      );

   }
}

const mapStateToProps = (state) => ({
   Student: state.Student,
})

export default connect(mapStateToProps, {
   GetList,
   AddStudent,
   UpdateStudent,
   CheckFields,
   GetSemester,
})(Student);
