
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components


import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import { GetMyInfo, } from "views/Profile/redux/actions";
import { GetList, } from "store/actions/helpers/displayAction";

import {
  SET_STUDENTS_DASH,
  SET_PERSONNEL_DASH,
  SET_OFFICES_DASH,
  SET_DOCUMENTS_DASH,
} from "views/Profile/redux/types";

const Index = (props) => {

  useEffect(() => {
    props.GetList("student/get", SET_STUDENTS_DASH, 1, 10000000, undefined, { studentID: 1 }, ["createdAt", "studentID", "-_id"]);
    props.GetList("user/get", SET_PERSONNEL_DASH, 1, 10000000, undefined, { userID: 1 }, ["userID", "createdAt", "userType", "-_id", "-office", "-role"]);
    props.GetList("office/get", SET_OFFICES_DASH, 1, 10000000, undefined, { officeID: 1 }, ["officeID", "createdAt", "-_id"]);
    props.GetList("document/get", SET_DOCUMENTS_DASH, 1, 10000000, undefined, { documentID: 1 }, ["documentID", "createdAt", "type", "-_id", "-owner", "-currentAction.office", "-currentAction.officeFrom"]);
    props.GetMyInfo();
  }, []);

  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };


  // const getRoutesAdmin = (routes) => {
  //   return routes.map((prop, key) => {
  //     if (prop.layout === "/admin") {
  //       return (
  //         <Route
  //           path={prop.path}
  //           component={prop.component}
  //           key={key}
  //         />
  //       );
  //     } else {
  //       return null;
  //     }
  //   });
  // };
  // const getRoutesAdmin = (routes) => {
  //   return routes.map((prop, key) => {
  //     if (prop.layout === "/auth") {
  //       return (
  //         <Route
  //           path={prop.path}
  //           component={prop.component}
  //           key={key}
  //         />
  //       );
  //     } else {
  //       return null;
  //     }
  //   });
  // };
  console.log(props.Profile.dashboard);
  console.log(chartExample2.data);
  return (
    <>
      <Header data={props.Profile.dashboard} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 pb-4 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="mb-0">Students</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>

                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    // data={chartExample1[chartExample1Data]}
                    data={props.Profile.dashboard.studentChart}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="12" >
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Archive
                    </h6>
                    <h2 className="mb-0">Documents</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    // data={chartExample2.data}
                    data={props.Profile.dashboard.documentChart}
                    options={{
                      scales: {
                        xAxes: [{
                          stacked: true
                        }],
                        yAxes: [{
                          stacked: true
                        }]
                      }
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  Profile: state.Profile
})

export default connect(mapStateToProps, {
  GetMyInfo,
  GetList,
})(Index);