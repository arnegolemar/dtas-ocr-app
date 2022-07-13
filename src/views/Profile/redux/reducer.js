import {
  SET_PROFILE_DATA,
  SET_USER_INFO,
  SET_PROFILE_FILE,
  UPDATE_FILES,
  SET_USER_AVATAR,
  SET_STUDENTS_DASH,
  SET_PERSONNEL_DASH,
  SET_OFFICES_DASH,
  SET_DOCUMENTS_DASH,
} from './types';

import { DOCUMENT_TYPES2 } from 'config';
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
        sex: null,
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
  tempFiles: [],
  tempAvatar: {
    file: "",
    base64: "",
  },


  dashboard: {
    students: [],
    personnel: [],
    documents: [],
    offices: [],

    studentChart: {},
    documentChart: {},
  }
};

var temp;
initialState.values = SpreadOps({ ...initialState.default });

export default function (state = initialState, action) {

  switch (action.type) {
    // ============================================ TRICYCLE ============================================
    case SET_PROFILE_DATA:
      temp = { ...state.values };
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        values: { ...temp },
        submitted: false
      }

    case UPDATE_FILES:

      return {
        ...state,
        values: {
          ...state.values,
          files: [...action.files]
        },
      }

    case SET_PROFILE_FILE:

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

    case SET_USER_INFO:
      return {
        ...state,
        values: { ...action.info },
        submitted: false
      }

    case SET_USER_AVATAR:
      return {
        ...state,
        tempAvatar: {
          file: action.file,
          base64: action.base64,
        }
      }


    case SET_STUDENTS_DASH:
      const { students } = action.data;
      var stats = {};
      for (let x = 0; x < students.length; x++) {
        var date = new Date(students[x].createdAt);
        var ym = date.getFullYear() + "-" + (date.getMonth() + 1);

        if (stats.hasOwnProperty(ym)) {
          stats[ym] = stats[ym] + 1
        } else {
          stats[ym] = 1
        }

        // console.log("------------------------");
        // console.log(date);
        // console.log(date.getMonth() + 1);
        // console.log(date.getFullYear());
      }
      // console.log(stats);
      

      var labels = Object.keys(stats).sort();
      var values = [];
      for (let x = 0; x < labels.length; x++) {
        values[x] = stats[labels[x]];
      }

      console.log(values);

      var chartData = {
        labels: labels,
        datasets: [
          {
            label: "Enrolled",
            data: [...values],
          },
        ],
      };
      console.log(chartData);

      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          students: students,
          studentChart: chartData
        }
      }

    case SET_PERSONNEL_DASH:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          personnel: action.data.users
        }
      }

    case SET_OFFICES_DASH:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          offices: action.data.offices
        }
      }

    case SET_DOCUMENTS_DASH:
      const { documents } = action.data;
      var stats = {};

      for (let x = 0; x < documents.length; x++) {
        if (stats.hasOwnProperty(documents[x].type)) {
          stats[documents[x].type] = stats[documents[x].type] + 1;
        } else {
          stats[documents[x].type] = 1;
        }
      }

      var labels = Object.keys(stats).map((k) => {
        return DOCUMENT_TYPES2[k]
      });

      

      var chart = {
        labels: labels,
        datasets: [
          {
            label: "Archived",
            data: Object.values(stats),
            maxBarThickness: 10,
          },
        ],

      }
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          documents: action.data.documents,
          documentChart: chart,
        }
      }


    default:
      return state

  }
}
