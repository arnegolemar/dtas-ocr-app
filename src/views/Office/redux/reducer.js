import {
  SET_SEARCHED_OFFICES,
  SET_OFFICES,
  ADD_NEW_OFFICE,
  SET_OFFICE_DETAIL,
  SET_OFFICE_VALUE,
  SET_OFFICE_DEFAULT,
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
    officeID: "",
    division: "",
    section: "",
    code: "",
    createdAt: "",
    _id: "",
  },
};

var temp = "";
initialState.values = SpreadOps({ ...initialState.default });

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_OFFICES:
      return {
        ...state,
        searched: action.data.offices,
        toDisplay: action.data.offices,
        sCount: action.data.count,
        count: action.data.count,
        page: (action.page) ? action.page : 1
      }

    case SET_OFFICES:
      return {
        ...state,
        rows: (action.data) ? action.data.offices : state.rows,
        toDisplay: (action.data) ? action.data.offices : state.rows,
        gCount: (action.data) ? action.data.count : state.gCount,
        count: (action.data) ? action.data.count : state.gCount,
        page: (action.page) ? action.page : 1
      }

    case ADD_NEW_OFFICE:
      return {
        ...state,
        rows: [action.data, ...state.rows],
        toDisplay: [action.data, ...state.rows],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_OFFICE_DETAIL:
      console.log({ ...action.detail.office[0] });
      return {
        ...state,
        values: { ...action.detail.office[0] }
      }

    case SET_OFFICE_VALUE:
      console.log(action);
      temp = { ...state.values };
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        values: { ...temp }
      }


    case SET_OFFICE_DEFAULT:
      return {
        ...state,
        values: SpreadOps({ ...state.default }),
      }


    default:
      return state

  }
}
