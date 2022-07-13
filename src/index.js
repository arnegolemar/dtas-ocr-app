import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect, useParams } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/css/custom.css";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import StudentAuth from "layouts/StudentAuth.js";
import Student from "layouts/Student.js";

import store from './store';
import { Provider } from 'react-redux';

import routes from './routes';
import { PRE, PRE_STU } from './config';

ReactDOM.render(
  ((props) => {

    const getRoutes = (layout) => {
      return routes.map((prop, key) => {
        if (prop.layout === "/admin") {
          return (
            <Route
              path={prop.path}
              component={prop.component}
              key={key}
            />
          );
        } else {
          return null;
        }
      });
    };

    const getDeviceType = () => {
      const ua = navigator.userAgent;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
      }
      if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
          ua
        )
      ) {
        return "mobile";
      }
      return "desktop";
    };

    const dvctype = getDeviceType();
    const lsdvctype = localStorage.getItem(PRE + "-dvctype");

    if (!lsdvctype || lsdvctype != dvctype) {
      localStorage.setItem(PRE + "-dvctype", dvctype);
    }

    if (window.location.pathname == "/webview") {
      localStorage.setItem("webview", true);
    }

    const isWebView = localStorage.getItem("webview");
    return (
      <BrowserRouter>
        <Switch>
          {
            !isWebView
              ? (localStorage.getItem(PRE + "-tkn") != null)
                ? <>
                  {/* {getRoutes("/admin")} */}

                  <Route path="/" render={(props) => <Provider store={store}><AdminLayout {...props} /></Provider>} />
                  <Redirect from="/" to="/index" />
                  {/* <Redirect from="/auth/register" to="/admin/index" />
                    <Route render={(props) => <Provider store={store}>404 Not Found</Provider>} /> */}
                </>
                : <>
                  {/* {getRoutes("/auth")} */}

                  <Route path="/auth" render={(props) => <Provider store={store}><AuthLayout {...props} /></Provider>} />
                  <Redirect from="/" to="/auth/login" />
                </>
              : (localStorage.getItem(PRE_STU + "-tkn") != null)
                ? <>
                  <Route path="/student" render={(props) => <Provider store={store}><Student {...props} /></Provider>} />
                  <Redirect from="/" to="/student/index" />
                </>
                : <>
                  <Route path="/student-auth" render={(props) => <Provider store={store}><StudentAuth {...props} /></Provider>} />
                  <Redirect from="/" to="/student-auth/login" />
                </>
          }

          {/* <Redirect from="/" to="/admin/index" /> */}
        </Switch>
      </BrowserRouter>
    )
  })(),
  document.getElementById("root")
);
