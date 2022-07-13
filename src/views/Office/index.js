import React, { Component } from "react";
import { connect } from 'react-redux';

// reactstrap components
import {
   SET_OFFICES,
   SET_SEARCHED_OFFICES,
} from "./redux/types";

import {
   GetList,
   CheckFields,
} from "store/actions/helpers/displayAction";
import {
   AddOffice,
   UpdateOffice,
} from "./redux/actions";

// core components
import OfficeMainTable from "./components/OfficeMainTable.js";
import OfficeHeader from "./components/OfficeHeader.js";
import OfficeForm from "./components/OfficeForm.js";
import InfoModal from "components/Helpers/InfoModal.js";

class Office extends Component {

   constructor(props) {
      super(props);

      this.state = {
         modal: false,
         modalType: "",
      }

      this.toggleModal = this.toggleModal.bind(this);

      props.GetList("office/get", SET_OFFICES, 1, 10, undefined, { officeID: 1 });


   }

   toggleModal(type) {
      this.setState({
         modal: !this.state.modal,
         modalType: type,
      })
   }

   render() {

      var condition = !this.props.CheckFields(this.props.Office.values, ["officeID", "createdAt", "_id", "code"]);

      return (
         <div className="custom-content">
            <InfoModal
               size={"40%"}
               modal={this.state.modal}
               toggle={this.toggleModal}
               title={"Office"}
               form={<OfficeForm/>}
               buttons={[(this.state.modalType == "add")?{
                  type: "Add",
                  callback: () => { this.props.AddOffice(this.toggleModal) },
                  disable: condition,
                  size: 3,
               }:{
                  type: "Update",
                  callback: this.props.UpdateOffice,
                  disable: condition,
                  size: 3,
               }]}
            />

            <OfficeHeader />

            <OfficeMainTable
               title={"Offices"}
               filter={{}}
               reducers={{ get: SET_OFFICES, search: SET_SEARCHED_OFFICES }}
               toggle={(type) => {
                  this.toggleModal(type)
               }}
            />
         </div>
      );

   }
}

const mapStateToProps = (state) => ({
   Office: state.Office,
})

export default connect(mapStateToProps, {
   GetList,
   AddOffice,
   UpdateOffice,
   CheckFields,
})(Office);
