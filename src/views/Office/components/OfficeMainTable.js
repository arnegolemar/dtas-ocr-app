import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from 'store/actions/helpers/displayAction';

import {
  SetOfficeDetail,
  SetOfficeDefault,
} from '../redux/actions';

import DataTable from "components/Helpers/DataTable.js";

const OfficeMainTable = (props) =>  {
    return (

      <Fragment>

        <DataTable
          addData={() => {
            props.SetOfficeDefault();
            props.toggle("add");
          }}
          title = {props.title}
          filter = {props.filter}
          api = {{ get: "office/get", search: "office/get" }}
          dataBank = { props.Office }
          reducers = {props.reducers}
          search = {{
            options: [ {value: "division", text: "Office"}, {value: "section", text: "Department"} ],
            select: [], suggest: false,
          }}
          table = {{
            head: () => {
              return (
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Office ID</th>
                  <th scope="col">Office</th>
                  <th scope="col">Department</th>
                  <th scope="col">Employee/s</th>
                </tr>
              )
            },
            body: (office, i) => {
              return (
                <tr className="clickable" data-id={office._id} onClick={ async (e) => {

                  await props.SetOfficeDetail(office._id);

                  props.toggle("update");
                }}>
                  <td scope="col">{ i + 1 }</td>
                  <td scope="col">{ office.officeID }</td>
                  <td scope="col">{ office.division }</td>
                  <td scope="col">{ office.section }</td>
                  <td scope="col">{ 1 }</td>
                </tr>
              )
            }
          }}
        />



      </Fragment>
    );
}


const mapStateToProps = (state) => ({
  Office: state.Office
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetOfficeDetail,
  SetOfficeDefault,
})(OfficeMainTable);
