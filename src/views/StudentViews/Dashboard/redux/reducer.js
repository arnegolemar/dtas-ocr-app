import {
  SET_MY_DOCUMENTS,
  SET_DOCUMENT_ROWS,
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

  },
};

var temp = "";

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_MY_DOCUMENTS:

      return {
        ...state,
        rows: (action.data) ? action.data.documents : state.rows,
        toDisplay: (action.data) ? action.data.documents : state.rows,
        gCount: (action.data) ? action.data.count : state.gCount,
        count: (action.data) ? action.data.count : state.gCount,
        page: (action.page) ? action.page : 1
      }

    case SET_DOCUMENT_ROWS:

      return {
        ...state,
        rows: action.rows,
        toDisplay: action.rows,

      }

    default:
      return state

  }
}
