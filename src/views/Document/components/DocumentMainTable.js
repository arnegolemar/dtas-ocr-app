import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { DOCUMENT_TYPES } from 'config';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from 'store/actions/helpers/displayAction';

import {
  SetDocumentDetail,
  SetDocumentDefault,
} from '../redux/actions';

import DataTable from "components/Helpers/DataTable.js";

const DocumentMainTable = (props) => {
  return (

    <Fragment>

      <DataTable
        download={true}
        title={props.title}
        filter={props.filter}
        api={{ get: "document/get", search: "document/get" }}
        dataBank={props.Document}
        reducers={props.reducers}
        search={{
          options: [{ value: "documentID", text: "Document ID" }],
          select: [], suggest: false,
        }}
        table={{
          head: () => {
            return (
              <tr>
                <th scope="col">#</th>
                <th scope="col">Document</th>
                <th scope="col">Document Type</th>
                <th scope="col">Owner</th>
                <th scope="col">Status</th>
                <th scope="col">Location</th>
              </tr>
            )
          },
          body: (document, i) => {
            console.log(document);
            var fileType = document.name.split("~")[1];
            DOCUMENT_TYPES.map(type => {
              if (type.value == fileType) {
                fileType = type.text
              }
            })

            return (
              <tr className="clickable" data-id={document._id} onClick={async (e) => {

                await props.SetDocumentDetail(document._id, "all");

                props.toggle("update");
              }}>
                <td scope="col">{i + 1}</td>
                <td scope="col">{document.documentID}</td>
                <td scope="col">{fileType}</td>
                <td scope="col">{document.owner?props.ArrangeName(document.owner.personalInfo.name):""}</td>
                <td scope="col">{document.currentAction.status}</td>
                <td scope="col">{(document.currentAction && document.currentAction.hasOwnProperty("office") && document.currentAction.office)
                  ? (document.currentAction.office.division + " - " + document.currentAction.office.section)
                  : ""
                }</td>
              </tr>
            )
          }
        }}
      />



    </Fragment>
  );
}


const mapStateToProps = (state) => ({
  Document: state.Document
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetDocumentDetail,
  SetDocumentDefault,
})(DocumentMainTable);
