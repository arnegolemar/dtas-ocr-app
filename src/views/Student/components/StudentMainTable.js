import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from 'store/actions/helpers/displayAction';

import {
  SetStudentDetail,
  SetStudentDefault,
} from '../redux/actions';

import {
  SET_STUDENTS_DOCUMENTS,
} from '../redux/types';

import DataTable from "components/Helpers/DataTable.js";

const StudentMainTable = (props) =>  {
    return (

      <Fragment>

        <DataTable
          addData={() => {
            props.SetStudentDefault();
            props.toggle("add");
          }}
          title = {props.title}
          filter = {props.filter}
          api = {{ get: "student/get", search: "student/get" }}
          dataBank = { props.Student }
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
                  <th scope="col">Student ID</th>
                  <th scope="col">Student</th>
                </tr>
              )
            },
            body: (student, i) => {
              return (
                <tr className="clickable" data-id={student._id} onClick={ async (e) => {

                  await props.SetStudentDetail(student._id);
                  props.GetList("document/get", SET_STUDENTS_DOCUMENTS, 1, 100000, {owner: student._id}, { dateUploaded: 1 });

                  props.toggle("update");
                }}>
                  <td scope="col">{ i + 1 }</td>
                  <td scope="col">{ student.studentID }</td>
                  <td scope="col">{ props.ArrangeName(student.personalInfo.name) }</td>
                </tr>
              )
            }
          }}
        />



      </Fragment>
    );
}


const mapStateToProps = (state) => ({
  Student: state.Student
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetStudentDetail,
  SetStudentDefault,
})(StudentMainTable);
