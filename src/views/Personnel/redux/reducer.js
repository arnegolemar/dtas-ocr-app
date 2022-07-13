import {
  SET_SEARCHED_PERSONNELS,
  SET_PERSONNELS,
  ADD_NEW_PERSONNEL,
  SET_PERSONNEL_DETAIL,
  SET_PERSONNEL_VALUE,
  SET_PERSONNEL_DEFAULT,
  SET_PERSONNEL_OFFICES,
  SET_PERSONNEL_ROLES,
  SET_NEW_PERSONNEL_AVATAR,
  SET_PERSONNEL_POSITIONS,
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
    username: "",
    password: "",

    name: {
      first: "",
      mid: "",
      last: "",
      ext: "",
    },

    designation: "",
    status: "",
    office: null,
    role: null,

    pds: {
      personalInfo: {
        birth: {
          date: null,
        },
        sex: "",
        address: [
          {
            block: "",
            street: "",
            village: "",
            brgy: "",
            cm: "",
            province: "",
            zipcode: "",
          }
        ],
        contact: {
          mobile: "",
          email: "",
        },
      },


    },
    files: [{
      type: "",//profile pic, pds, etc.
      status: "",//current, deleted, previous
      dateUploaded: null,
      name: "",
      path: "",
    }],

    userID: "",
  },
  tempAvatar: {
    file: null,
    base64: "",
  },
  tempFiles: [],
  offices: [],
  roles: [],
  positions: [],
};

var temp = "";
initialState.values = SpreadOps({ ...initialState.default });

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_PERSONNELS:
      return {
        ...state,
        searched: action.data.users,
        toDisplay: action.data.users,
        sCount: action.data.count,
        count: action.data.count,
        page: (action.page) ? action.page : 1
      }

    case SET_PERSONNELS:
      return {
        ...state,
        rows: (action.data) ? action.data.users : state.rows,
        toDisplay: (action.data) ? action.data.users : state.rows,
        gCount: (action.data) ? action.data.count : state.gCount,
        count: (action.data) ? action.data.count : state.gCount,
        page: (action.page) ? action.page : 1,
        tempAvatar: {
          file: null,
          base64: "",
        },
      }

    case ADD_NEW_PERSONNEL:
      return {
        ...state,
        rows: [action.data, ...state.rows],
        toDisplay: [action.data, ...state.rows],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_PERSONNEL_DETAIL:
      return {
        ...state,
        values: { ...action.detail.personnel[0] }
      }

    case SET_PERSONNEL_VALUE:
      temp = { ...state.values };
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        values: { ...temp }
      }


    case SET_PERSONNEL_DEFAULT:
      return {
        ...state,
        values: SpreadOps({ ...state.default }),
      }

    case SET_PERSONNEL_OFFICES:
      return {
        ...state,
        offices: [...action.data.offices],
      }

    case SET_PERSONNEL_ROLES:
      return {
        ...state,
        roles: [...action.data.roles],
      }

    case SET_PERSONNEL_POSITIONS:
      return {
        ...state,
        positions: [...action.data.positions],
      }

    case SET_NEW_PERSONNEL_AVATAR:
      return {
        ...state,
        tempAvatar: {
          file: action.file,
          base64: action.base64,
        }
      }

    default:
      return state

  }
}
