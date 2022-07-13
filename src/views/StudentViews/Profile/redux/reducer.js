import {
  SET_PROFILE_DATA_STU,
  SET_USER_INFO_STU,
  SET_PROFILE_FILE_STU,
  UPDATE_FILES_STU,
  SET_USER_AVATAR_STU,
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
    files: [{
      type: "",//profile pic, pds, etc.
      status: "",//current, deleted, previous
      dateUploaded: new Date(),
      name: "",
      path: "",
    }],
  
    studentID: "",
    password: "",
  
    profilePic: {
      path: "",
      name: "",
      dateUploaded: "",
    },
  },
  tempFiles: [],
  tempAvatar: {
    file: "",
    base64: "",
  }
};

var temp;
initialState.values = SpreadOps({ ...initialState.default });

export default function (state = initialState, action) {

  switch (action.type) {
    // ============================================ TRICYCLE ============================================
    case SET_PROFILE_DATA_STU:
      temp = { ...state.values };
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        values: { ...temp },
        submitted: false
      }

    case UPDATE_FILES_STU:

      return {
        ...state,
        values: {
          ...state.values,
          files: [...action.files]
        },
      }

    case SET_PROFILE_FILE_STU:

      return {
        ...state,
        tempFiles: [
          {
            file: action.file,
            type: action.fType
          },
          ...state.tempFiles,
        ],
        submitted: false
      }

    case SET_USER_INFO_STU:
      return {
        ...state,
        values: { ...action.info },
        submitted: false
      }

    case SET_USER_AVATAR_STU:
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
