import {
  SET_SEARCHED_STUDENTS,
  SET_STUDENTS,
  ADD_NEW_STUDENT,
  SET_STUDENT_DETAIL,
  SET_STUDENT_VALUE,
  SET_STUDENT_DEFAULT,
  SET_STUDENT_AVATAR,
  SET_STUDENTS_DOCUMENTS,
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
    studentID: "",
    personalInfo: {
      name: {
        first: "",
        mid: "",
        last: "",
        ext: "",
      },
      sex: "",
      dob: "",
      pob: "",
      citizenship: "",
      civilStatus: "",
      homeAddress: {
        block: "",
        street: "",
        village: "",
        brgy: "",
        cm: "",
        province: "",
        zipcode: "",
      },

      father: {
        name: {
          first: "",
          mid: "",
          last: "",
        }
      },
      mother: {
        name: {
          first: "",
          mid: "",
          last: "",
        }
      },
    },
    createdAt: "",
    files: [],
    documents: [],
    _id: "",
  },
  tempFiles: [],
  tempAvatar: {
    file: null,
    base64: "",
  },
};

var temp = "";
initialState.values = SpreadOps({ ...initialState.default });

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_STUDENTS:
      return {
        ...state,
        searched: action.data.students,
        toDisplay: action.data.students,
        sCount: action.data.count,
        count: action.data.count,
        page: (action.page) ? action.page : 1
      }

    case SET_STUDENTS:
      return {
        ...state,
        rows: (action.data) ? action.data.students : state.rows,
        toDisplay: (action.data) ? action.data.students : state.rows,
        gCount: (action.data) ? action.data.count : state.gCount,
        count: (action.data) ? action.data.count : state.gCount,
        page: (action.page) ? action.page : 1
      }

    case ADD_NEW_STUDENT:
      return {
        ...state,
        rows: [action.data, ...state.rows],
        toDisplay: [action.data, ...state.rows],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_STUDENT_DETAIL:
      console.log({ ...action.detail.student[0] });
      return {
        ...state,
        values: { 
          ...action.detail.student[0],
          personalInfo: {
            ...state.default.personalInfo,
            ...action.detail.student[0].personalInfo,
          },
        }
      }

    case SET_STUDENT_VALUE:
      console.log(action);
      temp = { ...state.values };
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        values: { ...temp }
      }


    case SET_STUDENT_DEFAULT:
      return {
        ...state,
        values: SpreadOps({ ...state.default }),
      }

    case SET_STUDENT_AVATAR:
      return {
        ...state,
        tempAvatar: {
          file: action.file,
          base64: action.base64,
        }
      }

    case SET_STUDENTS_DOCUMENTS:
      return {
        ...state,
        values: {
          ...state.values,
          documents: action.data.documents,
        }
      }

    default:
      return state

  }
}
