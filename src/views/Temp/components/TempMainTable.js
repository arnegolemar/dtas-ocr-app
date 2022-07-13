import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from 'store/actions/helpers/displayAction';

import {
  SetTemp1Detail,
  SetTemp1Default,
} from '../redux/actions';

import DataTable from "components/Helpers/DataTable.js";

const Temp1MainTable = (props) =>  {
    return (

      <Fragment>

        <DataTable
          addData={() => {
            props.SetTemp1Default();
            props.toggle("add");
          }}
          title = {props.title}
          filter = {props.filter}
          api = {{ get: "temp3/get", search: "temp3/get" }}
          dataBank = { props.Temp1 }
          reducers = {props.reducers}
          search = {{
            options: [ {value: "name", text: "Name"} ],
            select: [], suggest: false,
          }}
          table = {{
            head: () => {
              return (
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Temp1</th>
                </tr>
              )
            },
            body: (temp3, i) => {
              return (
                <tr className="clickable" data-id={temp3._id} onClick={ async (e) => {

                  await props.SetTemp1Detail(temp3._id);

                  props.toggle("update");
                }}>
                  <td scope="col">{ i + 1 }</td>
                  <td scope="col">{ temp3.temp3ID }</td>
                </tr>
              )
            }
          }}
        />



      </Fragment>
    );
}


const mapStateToProps = (state) => ({
  Temp1: state.Temp1
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetTemp1Detail,
  SetTemp1Default,
})(Temp1MainTable);
