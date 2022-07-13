import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from 'store/actions/helpers/displayAction';

import {
  SetPositionDetail,
  SetPositionDefault,
} from '../redux/actions';

import DataTable from "components/Helpers/DataTable.js";

const PositionMainTable = (props) =>  {
    return (

      <Fragment>

        <DataTable
          addData={() => {
            props.SetPositionDefault();
            props.toggle("add");
          }}
          title = {props.title}
          filter = {props.filter}
          api = {{ get: "position/get", search: "position/get" }}
          dataBank = { props.Position }
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
                  <th scope="col">Position</th>
                </tr>
              )
            },
            body: (position, i) => {
              return (
                <tr className="clickable" data-id={position._id} onClick={ async (e) => {

                  await props.SetPositionDetail(position._id);

                  props.toggle("update");
                }}>
                  <td scope="col">{ i + 1 }</td>
                  <td scope="col">{ position.name }</td>
                </tr>
              )
            }
          }}
        />



      </Fragment>
    );
}


const mapStateToProps = (state) => ({
  Position: state.Position
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetPositionDetail,
  SetPositionDefault,
})(PositionMainTable);
