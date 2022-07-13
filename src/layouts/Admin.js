import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

import { Container } from "reactstrap";
import { ToastContainer } from "react-toastify";
import { Toaster } from 'react-hot-toast';

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import Alert from "components/Helpers/Alert";

import routes from "routes.js";

import { PRE } from '../config';


const Admin = (props) => {
   var ls = JSON.parse(localStorage.getItem(PRE + "-info"));
   var role = ls.role.name;
   var userRoutes = ls.role.routes.map((r) => {
      return JSON.parse(r).path;
   })

   const mainContent = React.useRef(null);
   const location = useLocation();

   React.useEffect(() => {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainContent.current.scrollTop = 0;
   }, [location]);

   const getRoutes = (routes) => {
      console.log(routes);
      console.log(userRoutes);
      return routes.map((prop, key) => {
         if ((prop.layout === "/admin" && (role == "Master" || userRoutes.indexOf(prop.path) != -1)) || prop.common) {
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

   const getSubRoutes = (routes) => {
      console.log(routes);
      console.log(userRoutes);

      return routes.map((prop, key) => {
         if ((prop.layout === "/admin" && prop.hasOwnProperty("subroutes"))) {
            console.log("_____________");
            return prop.subroutes.map((sub, key2) => {
               return ((role == "Master" || userRoutes.indexOf(sub.path) != -1) || sub.common)?(
                  <Route
                     path={sub.path}
                     component={sub.component}
                     key={key2 + 100}
                  />
               ):null;
            })
         } else {
            return null;
         }
      });
   };

   const getBrandText = (path) => {
      for (let i = 0; i < routes.length; i++) {
         if (
            props.location.pathname.indexOf(routes[i].path) !==
            -1
         ) {
            return routes[i].name;
         }
      }
      return "Brand";
   };

   var subroutesTemp = getSubRoutes(routes), subroutes = [];
   var mainRoutes = getRoutes(routes);

   for (let x = 0; x < subroutesTemp.length; x++) {
      if (subroutesTemp[x] != null) {
         for (let y = 0; y < subroutesTemp[x].length; y++) {
            subroutes.push(subroutesTemp[x][y]);
         }
      }
   }

   console.log(subroutes);
   console.log(mainRoutes);

   return (
      <>
      <Alert/>
         <Sidebar
            {...props}
            routes={routes}
            logo={{
               innerLink: "/index",
               // imgSrc: require("../assets/img/nro13-admin-logo.png").default,
               imgSrc: require("../assets/img/dtas-ocr-logo.png").default,
               imgAlt: "...",
            }}
         />
         <div className="main-content" ref={mainContent}>
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

            <AdminNavbar
               {...props}
               brandText={getBrandText(props.location.pathname)}
            />
            <Switch>
               {mainRoutes}
               {subroutes}
               <Redirect from="*" to="/404" />
               {/* <Route render={(props) => <div>Page Not Fouond</div>} /> */}
            </Switch>
            <Container fluid>
               <AdminFooter />
            </Container>
         </div>
      </>
   );
};

export default Admin;
