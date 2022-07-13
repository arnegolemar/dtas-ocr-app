import React, { Component } from "react";
import { connect } from 'react-redux';

// reactstrap components
import {
   SET_ROLES,
   SET_SEARCHED_ROLES,
} from "./redux/types";

import {
   GetList,
} from "store/actions/helpers/displayAction";
import {
   AddRole,
   UpdateRole,
} from "./redux/actions";

// core components
import RoleMainTable from "./components/RoleMainTable.js";
import RoleHeader from "./components/RoleHeader.js";
import RoleForm from "./components/RoleForm.js";
import InfoModal from "components/Helpers/InfoModal.js";

class Role extends Component {

   constructor(props) {
      super(props);

      this.state = {
         modal: false,
         modalType: "",
      }

      this.toggleModal = this.toggleModal.bind(this);

      props.GetList("role/get", SET_ROLES, 1, 10, undefined, { name: 1 });


   }

   toggleModal(type) {
      this.setState({
         modal: !this.state.modal,
         modalType: type,
      })
   }

   render() {

      return (
         <div className="custom-content">
            <InfoModal
               size={"40%"}
               modal={this.state.modal}
               toggle={this.toggleModal}
               title={"Role"}
               form={<RoleForm/>}
               buttons={[(this.state.modalType == "add")?{
                  type: "Add",
                  callback: () => { this.props.AddRole(this.toggleModal) },
                  disable: (this.props.Role.values.name == "" || this.props.Role.values.name.length < 3),
                  size: 3,
               }:{
                  type: "Update",
                  callback: this.props.UpdateRole,
                  disable: (this.props.Role.values.name == "" || this.props.Role.values.name.length < 3),
                  size: 3,
               }]}
            />

            <RoleHeader />

            <RoleMainTable
               title={"Roles"}
               filter={{}}
               reducers={{ get: SET_ROLES, search: SET_SEARCHED_ROLES }}
               toggle={(type) => {
                  this.toggleModal(type)
               }}
            />
         </div>
      );

   }
}

const mapStateToProps = (state) => ({
   Role: state.Role,
})

export default connect(mapStateToProps, {
   GetList,
   AddRole,
   UpdateRole,
})(Role);
