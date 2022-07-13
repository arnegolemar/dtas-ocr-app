import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from 'store/actions/helpers/displayAction';

import {
  SetRoleDetail,
  SetRoleDefault,
} from '../redux/actions';

import DataTable from "components/Helpers/DataTable.js";

const RoleMainTable = (props) =>  {
    return (

      <Fragment>

        <DataTable
          addData={() => {
            props.SetRoleDefault();
            props.toggle("add");
          }}
          title = {props.title}
          filter = {props.filter}
          api = {{ get: "role/get", search: "role/get" }}
          dataBank = { props.Role }
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
                  <th scope="col">Role</th>
                </tr>
              )
            },
            body: (role, i) => {
              return (
                <tr className="clickable" data-id={role._id} onClick={ async (e) => {

                  await props.SetRoleDetail(role._id);

                  props.toggle("update");
                }}>
                  <td scope="col">{ i + 1 }</td>
                  <td scope="col">{ role.name }</td>
                </tr>
              )
            }
          }}
        />



      </Fragment>
    );
}


const mapStateToProps = (state) => ({
  Role: state.Role
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetRoleDetail,
  SetRoleDefault,
})(RoleMainTable);
