import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

import {

} from 'store/actions/helpers/displayAction';

import {
} from '../redux/actions';

import DataTable from "components/Helpers/DataTable.js";

const StudentHeader = (props) => {
  return (

    <Fragment>
      <div className="header pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Student
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          { props.Student.gCount }
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                      </span>{" "}
                      <span className="text-nowrap"></span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </Fragment>
  );
}


const mapStateToProps = (state) => ({
  Student: state.Student
})

export default connect(mapStateToProps, {

})(StudentHeader);
