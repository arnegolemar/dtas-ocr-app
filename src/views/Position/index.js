import React, { Component } from "react";
import { connect } from 'react-redux';

// reactstrap components
import {
   SET_POSITIONS,
   SET_SEARCHED_POSITIONS,
} from "./redux/types";

import {
   GetList,
   CheckFields,
} from "store/actions/helpers/displayAction";
import {
   AddPosition,
   UpdatePosition,
} from "./redux/actions";

// core components
import PositionMainTable from "./components/PositionMainTable.js";
import PositionHeader from "./components/PositionHeader.js";
import PositionForm from "./components/PositionForm.js";
import InfoModal from "components/Helpers/InfoModal.js";

class Position extends Component {

   constructor(props) {
      super(props);

      this.state = {
         modal: false,
         modalType: "",
      }

      this.toggleModal = this.toggleModal.bind(this);

      props.GetList("position/get", SET_POSITIONS, 1, 10, undefined, { name: 1 });


   }

   toggleModal(type) {
      this.setState({
         modal: !this.state.modal,
         modalType: type,
      })
   }

   render() {
      console.log(this.props.Position.values);
      var condition = !this.props.CheckFields(this.props.Position.values, ["createdAt", "positionID", "_id"]);

      return (
         <div className="custom-content">
            <InfoModal
               size={"40%"}
               modal={this.state.modal}
               toggle={this.toggleModal}
               title={"Position"}
               form={<PositionForm/>}
               buttons={[(this.state.modalType == "add")?{
                  type: "Add",
                  callback: () => { this.props.AddPosition(this.toggleModal) },
                  disable: condition,
               }:{
                  type: "Update",
                  callback: this.props.UpdatePosition,
                  disable: condition,
                  size: 3,
               }]}
            />

            <PositionHeader />

            <PositionMainTable
               title={"Positions"}
               filter={{}}
               reducers={{ get: SET_POSITIONS, search: SET_SEARCHED_POSITIONS }}
               toggle={(type) => {
                  this.toggleModal(type)
               }}
            />
         </div>
      );

   }
}

const mapStateToProps = (state) => ({
   Position: state.Position,
})

export default connect(mapStateToProps, {
   GetList,
   AddPosition,
   UpdatePosition,
   CheckFields,
})(Position);
