import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { PRE } from "config";
import {

} from 'store/actions/helpers/displayAction';

import {
} from '../redux/actions';

import DataTable from "components/Helpers/DataTable.js";

const DocumentHeader = (props) => {

  const { role } = JSON.parse(localStorage.getItem(PRE + "-info"));
  
  return (

    <Fragment>
      <div className="header pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>

              {
                (role.name == "Master")
                  ? <Col lg="6" xl="3" className={'document-badge' + (props.listType == "all" ? " active-badge" : "")}
                    onClick={() => {
                      props.toggleType("all");
                    }}
                  >
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Document
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {props.Document.gCount}
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
                  : ""
              }

              <Col lg="6" xl="3" className={'document-badge' + (props.listType == "received" ? " active-badge" : "")}
                onClick={() => {
                  props.toggleType("received");
                }}
              >
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Received
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {props.Document.received.gCount}
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

              <Col lg="6" xl="3" className={'document-badge' + (props.listType == "incoming" ? " active-badge" : "")}
                onClick={() => {
                  props.toggleType("incoming");
                }}
              >
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Incoming
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {props.Document.incoming.gCount}
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
  Document: state.Document
})

export default connect(mapStateToProps, {

})(DocumentHeader);
