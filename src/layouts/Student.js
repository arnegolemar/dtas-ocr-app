/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";
import { Toaster } from 'react-hot-toast';

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import SidebarStudent from "components/Sidebar/SidebarStudent.js";

import routes from "routes.js";

const Student = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  var getRoutes = routes.map((prop, key) => {
    if (prop.layout === "/student") {
      return (
        <Route
          path={prop.layout + "" + prop.path}
          component={prop.component}
          key={key}
        />
      );
    } else {
      return null;
    }
  });

  getRoutes = getRoutes.filter(r => r != null)

  console.log("&&&&&&&&&&&&&");
  console.log(getRoutes);

  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <SidebarStudent
        {...props}
        routes={routes}
        logo={{
          innerLink: "/student/index",
          // imgSrc: require("../assets/img/nro13-admin-logo.png").default,
          imgSrc: require("../assets/img/dtas-ocr-logo.png").default,
          imgAlt: "...",
        }}
      />
      <div className="student-main-content mt-2 pl-4 pr-4" ref={mainContent}>

        {/* Page content */}
        <Row>
          <Switch>
            {getRoutes}
          </Switch>
        </Row>
      </div>
      <AuthFooter />
    </>
  );
};

export default Student;