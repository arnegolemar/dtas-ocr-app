import React, { Component } from "react";
import { connect } from 'react-redux';

// reactstrap components
import {
   SET_TEMP2S,
   SET_SEARCHED_TEMP2S,
} from "./redux/types";

import {
   GetList,
   CheckFields,
} from "store/actions/helpers/displayAction";
import {
   AddTemp1,
   UpdateTemp1,
} from "./redux/actions";

// core components
import Temp1MainTable from "./components/Temp1MainTable.js";
import Temp1Header from "./components/Temp1Header.js";
import Temp1Form from "./components/Temp1Form.js";
import InfoModal from "components/Helpers/InfoModal.js";

class Temp1 extends Component {

   constructor(props) {
      super(props);

      this.state = {
         modal: false,
         modalType: "",
      }

      this.toggleModal = this.toggleModal.bind(this);

      props.GetList("temp3/get", SET_TEMP2S, 1, 10, undefined, { name: 1 });


   }

   toggleModal(type) {
      this.setState({
         modal: !this.state.modal,
         modalType: type,
      })
   }

   render() {

      var condition = !this.props.CheckFields(this.props.Temp1.values, []);

      return (
         <div className="custom-content">
            <InfoModal
               size={"40%"}
               modal={this.state.modal}
               toggle={this.toggleModal}
               title={"Temp1"}
               form={<Temp1Form/>}
               buttons={[(this.state.modalType == "add")?{
                  type: "Add",
                  callback: () => { this.props.AddTemp1(this.toggleModal) },
                  disable: condition,
               }:{
                  type: "Update",
                  callback: this.props.UpdateTemp1,
                  disable: condition,
                  size: 3,
               }]}
            />

            <Temp1Header />

            <Temp1MainTable
               title={"Temp1s"}
               filter={{}}
               reducers={{ get: SET_TEMP2S, search: SET_SEARCHED_TEMP2S }}
               toggle={(type) => {
                  this.toggleModal(type)
               }}
            />
         </div>
      );

   }
}

const mapStateToProps = (state) => ({
   Temp1: state.Temp1,
})

export default connect(mapStateToProps, {
   GetList,
   AddTemp1,
   UpdateTemp1,
   CheckFields,
})(Temp1);
