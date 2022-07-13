import {
  SET_SEARCHED_DOCUMENTS,
  SET_DOCUMENTS,
  ADD_NEW_DOCUMENT,
  SET_DOCUMENT_DETAIL,
  SET_DOCUMENT_VALUE,
  SET_DOCUMENT_DEFAULT,
  SET_DOCUMENTS_OFFICES,
  SET_DOCUMENTS_INCOMING,
  SET_DOCUMENTS_RECEIVED,
  SET_DOCUMENTS_INCOMING_SEARCHED,
  SET_DOCUMENTS_RECEIVED_SEARCHED,
  SET_DOCUMENTS_SEARCHED_STUD,
  SET_DOCUMENT_TEMP_STUDENT,
} from './types';
import { SetRegValueHelper, SpreadOps } from 'store/reducerHelpers';

const initialState = {
  rows: [],
  searched: [],
  toDisplay: [],
  gCount: 0,
  sCount: 0,
  count: 0,
  page: 1,
  values: {},
  default: {
    documentID: "",
    ownerOffice: "",
    owner: "",
    type: "",//profile pic, pds, etc.
    status: "",//current, deleted, previous
    dateUploaded: { type: Date },
    name: "",
    path: "",

    currentAction: {
      status: "",
      remarks: "",
      office: null,
      receivedBy: null,
      date: "",
    },

    actions: [{
      status: "",
      remarks: "",
      office: null,
      receivedBy: null,
      date: "",
    }],

    tags: "",

    content: "",
    _id: "",
  },

  incoming: {
    rows: [],
    searched: [],
    toDisplay: [],
    gCount: 0,
    sCount: 0,
    count: 0,
    page: 1,
  },

  received: {
    rows: [],
    searched: [],
    toDisplay: [],
    gCount: 0,
    sCount: 0,
    count: 0,
    page: 1,
  },

  offices: [],
  students: [],

  tempStudent: {},
};

var temp = "";
initialState.values = SpreadOps({ ...initialState.default });

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_DOCUMENTS:
      return {
        ...state,
        searched: action.data.documents,
        toDisplay: action.data.documents,
        sCount: action.data.count,
        count: action.data.count,
        page: (action.page) ? action.page : 1
      }

    case SET_DOCUMENTS:
      return {
        ...state,
        rows: (action.data) ? action.data.documents : state.rows,
        toDisplay: (action.data) ? action.data.documents : state.rows,
        gCount: (action.data) ? action.data.count : state.gCount,
        count: (action.data) ? action.data.count : state.gCount,
        page: (action.page) ? action.page : 1
      }

    case ADD_NEW_DOCUMENT:
      return {
        ...state,
        rows: [action.data, ...state.rows],
        toDisplay: [action.data, ...state.rows],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_DOCUMENT_DETAIL:
      console.log({ ...action.detail.document[0] });
      return {
        ...state,
        values: { ...action.detail.document[0] }
      }

    case SET_DOCUMENT_VALUE:
      console.log(action);
      temp = { ...state.values };
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        values: { ...temp }
      }


    case SET_DOCUMENT_DEFAULT:
      return {
        ...state,
        values: SpreadOps({ ...state.default }),
      }

    case SET_DOCUMENTS_OFFICES:
      return {
        ...state,
        offices: action.data.offices
      }


    //======================================== INCOMING
    case SET_DOCUMENTS_INCOMING:
      console.log(action);
      return {
        ...state,
        incoming: {
          ...state.incoming,
          rows: (action.data) ? action.data.documents : state.incoming.rows,
          toDisplay: (action.data) ? action.data.documents : state.incoming.rows,
          gCount: (action.data) ? action.data.count : state.incoming.gCount,
          count: (action.data) ? action.data.count : state.incoming.gCount,
          page: (action.page) ? action.page : 1
        }

      }

    case SET_DOCUMENTS_INCOMING_SEARCHED:
      return {
        ...state,
        incoming: {
          ...state.incoming,
          searched: action.data.documents,
          toDisplay: action.data.documents,
          sCount: action.data.count,
          count: action.data.count,
          page: (action.page) ? action.page : 1
        }
      }
    //======================================== RECEIVED
    case SET_DOCUMENTS_RECEIVED:
      console.log(action);
      return {
        ...state,
        received: {
          ...state.received,
          rows: (action.data) ? action.data.documents : state.received.rows,
          toDisplay: (action.data) ? action.data.documents : state.received.rows,
          gCount: (action.data) ? action.data.count : state.received.gCount,
          count: (action.data) ? action.data.count : state.received.gCount,
          page: (action.page) ? action.page : 1
        }

      }

    case SET_DOCUMENTS_RECEIVED_SEARCHED:
      return {
        ...state,
        received: {
          ...state.received,
          searched: action.data.documents,
          toDisplay: action.data.documents,
          sCount: action.data.count,
          count: action.data.count,
          page: (action.page) ? action.page : 1

        }
      }


    case SET_DOCUMENTS_SEARCHED_STUD:
      return {
        ...state,
        students: action.data.students
      }

    case SET_DOCUMENT_TEMP_STUDENT:
      console.log(action);
      return {
        ...state,
        tempStudent: action.student
      }

    default:
      return state

  }
}
