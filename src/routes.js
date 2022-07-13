import Index from "views/Index.js";
import Profile from "views/Profile";
import Login from "views/Login";
import Register from "views/Register";
import Personnel from "views/Personnel";
import Role from "views/Role";
import Position from "views/Position";
import Office from "views/Office";
import Student from "views/Student";
import Document from "views/Document";

//================== STUDENT ROUTES
import StudentLogin from "views/StudentViews/Login";
import StudentDashboard from "views/StudentViews/Dashboard";
import StudentMyDocuments from "views/StudentViews/MyDocuments";
import StudentProfile from "views/StudentViews/Profile";

import PageNotFound404 from "views/PageNotFound404";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    display: true,
  },
  // {
  //   path: "/student",
  //   name: "Students",
  //   icon: "ni ni-single-02 text-primary",
  //   component: Student,
  //   layout: "/admin",
  //   display: true,
  // },
  // {
  //   path: "/document",
  //   name: "Documents",
  //   icon: "ni ni-single-02 text-primary",
  //   component: Document,
  //   layout: "/admin",
  //   display: true,
  //   // subroutes: [
  //   //   {
  //   //     path: "/document/all",
  //   //     name: "All",
  //   //     icon: "ni ni-single-02 text-primary",
  //   //     component: Document,
  //   //     layout: "/admin",
  //   //     display: true,
  //   //   },

  //   //   {
  //   //     path: "/document/received",
  //   //     name: "Received",
  //   //     icon: "ni ni-single-02 text-primary",
  //   //     component: Document,
  //   //     layout: "/admin",
  //   //     display: true,
  //   //   },

  //   //   {
  //   //     path: "/document/incoming",
  //   //     name: "Incoming",
  //   //     icon: "ni ni-single-02 text-primary",
  //   //     component: Document,
  //   //     layout: "/admin",
  //   //     display: true,
  //   //   },
  //   // ]
  // },
  {
    path: "/admin/personnel",
    name: "Admin",
    icon: "ni ni-badge text-primary",
    layout: "/admin",
    component: Personnel,
    display: true,
    subroutes: [
      {
        path: "/admin/personnel",
        name: "Personnel",
        icon: "ni ni-circle-08 text-primary",
        component: Personnel,
        layout: "/admin",
        display: true,
      },
      {
        path: "/admin/role",
        name: "Roles",
        icon: "ni ni-key-25 text-primary",
        component: Role,
        layout: "/admin",
        display: true,
      },
      // {
      //   path: "/admin/position",
      //   name: "Positions",
      //   icon: "ni ni-key-25 text-primary",
      //   component: Position,
      //   layout: "/admin",
      //   display: true,
      // },
      // {
      //   path: "/admin/office",
      //   name: "Office",
      //   icon: "ni ni-building text-primary",
      //   component: Office,
      //   layout: "/admin",
      //   display: true,
      // },
    ]
  },
  {
    path: "/my-profile",
    name: "My Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    common: true,
  },
  {
    path: "/404",
    name: "PageNotFound404",
    icon: "ni ni-bullet-list-67 text-red",
    component: PageNotFound404,
    layout: "/admin",
    common: true,
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },

  // ============================= STUDENTS ROUTES
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: StudentLogin,
    layout: "/student-auth",
  },

  {
    path: "/index",
    name: "Main",
    icon: "ni ni-key-25 text-info",
    component: StudentDashboard,
    layout: "/student",
  },

  {
    path: "/my-documents",
    name: "My Documents",
    icon: "ni ni-key-25 text-info",
    component: StudentMyDocuments,
    layout: "/student",
  },

  {
    path: "/my-profile",
    name: "My Profile",
    icon: "ni ni-single-02 text-yellow",
    component: StudentProfile,
    layout: "/student",
  },
];
export default routes;
