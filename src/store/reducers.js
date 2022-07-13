import { combineReducers } from 'redux';

import AlertReducer from './alertReducer';
import ProfileReducer from '../views/Profile/redux/reducer';
import PersonnelReducer from '../views/Personnel/redux/reducer';
import RoleReducer from '../views/Role/redux/reducer';
import PositionReducer from '../views/Position/redux/reducer';
import OfficeReducer from '../views/Office/redux/reducer';
import StudentReducer from '../views/Student/redux/reducer';
import DocumentReducer from '../views/Document/redux/reducer';

import StudentWebViewReducer from '../views/StudentViews/Dashboard/redux/reducer';
import SWVProfileReducer from '../views/StudentViews/Profile/redux/reducer';

//=================~import reducer file~=================

export default combineReducers({
  Alert: AlertReducer,
  Profile: ProfileReducer,
  Personnel: PersonnelReducer,
  Role: RoleReducer,
  Position: PositionReducer,
  Office: OfficeReducer,
  Student: StudentReducer,
  Document: DocumentReducer,
  StudentWebView: StudentWebViewReducer,
  SWVProfile: SWVProfileReducer,
});

