import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from 'store/actions/helpers/displayAction';

import {
  SetPersonnelDetail,
  SetPersonneDefault,
} from '../redux/actions';

import DataTable from "components/Helpers/DataTable.js";

const PersonnelMainTable = (props) =>  {
    return (

      <Fragment>

        <DataTable
          addData={() => {
            props.SetPersonneDefault();
            props.toggleModal("add");
          }}
          title = {props.title}
          filter = {props.filter}
          api = {{ get: "user/get", search: "user/get" }}
          dataBank = { props.Personnel }
          reducers = {props.reducers}
          search = {{
            options: [ {value: "name", text: "Name"}, {value: "userID", text: "Personnel ID"} ],
            select: [], suggest: false,
          }}
          table = {{
            head: () => {
              return (
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Personnel ID</th>
                  <th scope="col">Personnel</th>
                  {/* <th scope="col">Office</th> */}
                </tr>
              )
            },
            body: (personnel, i) => {
              return (
                <tr className="clickable" data-id={personnel._id} onClick={ async (e) => {

                  await props.SetPersonnelDetail(personnel._id);

                  props.toggle();

                  // props.GetDetail("role/detail", SET_ROLE_DETAIL, role._id)
                  //   .then(data => {
                  //     // props.toggle();
                  //   });
                }}>
                  <td scope="col">{ i + 1 }</td>
                  <td scope="col">{ personnel.userID }</td>
                  <td scope="col">{ props.ArrangeName(personnel.name) }</td>
                  {/* <td scope="col">{ personnel.office.division + " - " + personnel.office.section }</td> */}
                </tr>
              )
            }
          }}
        />



      </Fragment>
    );
}


const mapStateToProps = (state) => ({
  Personnel: state.Personnel
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetPersonnelDetail,
  SetPersonneDefault,
})(PersonnelMainTable);
