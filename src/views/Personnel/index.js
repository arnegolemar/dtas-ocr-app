import React, { Component } from "react";
import { connect } from 'react-redux';

// reactstrap components
import {
   SET_PERSONNELS,
   SET_SEARCHED_PERSONNELS,
   SET_PERSONNEL_OFFICES,
   SET_PERSONNEL_ROLES,
   SET_PERSONNEL_POSITIONS,
} from "./redux/types";

import {
   GetList,
   CheckFields,
} from "store/actions/helpers/displayAction";

import {
   AddPersonnel,
   UpdatePersonnel,
} from './redux/actions';

// core components
import PersonnelMainTable from "./components/PersonnelMainTable.js";
import PersonnelHeader from "./components/PersonnelHeader.js";
import PersonnelForm from "./components/PersonnelForm.js";
import InfoModal from "components/Helpers/InfoModal.js";
import ProfilePicture from './components/ProfilePicture';

class Personnel extends Component {

   constructor(props) {
      super(props);

      this.state = {
         modal: false,
         modalPic: false,
      }

      this.toggleModal = this.toggleModal.bind(this);
      this.toggleProfilePic = this.toggleProfilePic.bind(this);

      props.GetList("user/get", SET_PERSONNELS, 1, 10, { userType: "0" });
      if (props.Personnel.offices.length == 0)
         props.GetList("office/get", SET_PERSONNEL_OFFICES, 1, 10000, undefined, { division: 1 });
      if (props.Personnel.roles.length == 0)
         props.GetList("role/get", SET_PERSONNEL_ROLES, 1, 10000, undefined, { name: 1 });
      if (props.Personnel.positions.length == 0)
         props.GetList("position/get", SET_PERSONNEL_POSITIONS, 1, 10000, undefined, { name: 1 });

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

   render() {
      console.log(this.props.Personnel.values);
      var condition = !this.props.CheckFields(this.props.Personnel.values, ["files", "designation", "mid", "ext", "password", "userID", "status", "username", "block", "street", "village", "_id"]);
      console.log(condition);
      return (
         <div className="custom-content">
            <InfoModal
               size={"40%"}
               modal={this.state.modalPic}
               toggle={this.toggleProfilePic}
               title={"Profile Picture"}
               form={<ProfilePicture toggleProfilePic={this.toggleProfilePic} />}
               buttons={[]}
            />
            <InfoModal
               size={"80%"}
               modal={this.state.modal}
               toggle={this.toggleModal}
               title={"User"}
               form={<PersonnelForm toggleProfilePic={this.toggleProfilePic} />}
               buttons={[(this.state.modalType == "add") ? {
                  type: "Add",
                  callback: () => { this.props.AddPersonnel(this.toggleModal) },
                  disable: condition,
               } : {
                  type: "Update",
                  callback: this.props.UpdatePersonnel,
                  disable: condition,
                  size: 3,
               }]}
            />

            <PersonnelHeader />

            <PersonnelMainTable
               toggleModal={this.toggleModal}
               title={"Users"}
               filter={{ userType: "0" }}
               reducers={{ get: SET_PERSONNELS, search: SET_SEARCHED_PERSONNELS }}
               toggle={() => {
                  this.toggleModal("update")
               }}
            />
         </div>
      );

   }
}

const mapStateToProps = (state) => ({
   Personnel: state.Personnel,
})

export default connect(mapStateToProps, {
   GetList,
   CheckFields,
   AddPersonnel,
   UpdatePersonnel,
})(Personnel);
