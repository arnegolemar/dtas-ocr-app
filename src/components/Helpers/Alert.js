import React, { Component } from 'react';
import { Col, Button, Modal, ModalBody, Spinner } from 'reactstrap';
import { FaCheckCircle, FaCircleNotch, FaTimesCircle } from 'react-icons/fa';
import { connect } from 'react-redux';

import {
  ToggleAlert
} from 'store/actions/helpers/alertAction';

const Alert = (props) => {
  var timer = null;
  if (props.Alert.type == "success") {
    timer = setTimeout(() => {
      props.ToggleAlert("", "", false);
      clearTimeout(timer);
    }, 1900);
  } else if (props.Alert.type == "" && timer != null) {
    clearTimeout(timer);
    timer = null;
  }

  var fa;
  if (props.Alert.type == "loading") {
    fa = <span style={{ fontSize: "25px" }}> <FaCircleNotch className="icon rotate" id="file-loading-icon" /> </span>;
  } else if (props.Alert.type == "success") {
    fa = <FaCheckCircle className="fa-success" />;
  } else if (props.Alert.type == "failed") {
    fa = <FaTimesCircle className="fa-failed" />;
  }

  var isOpen = props.Alert.show;
  if (props.Alert.type == "" || props.Alert.type == undefined) {
    isOpen = false;
  }

  return (
    <div>
      <Modal id="modal-alert" isOpen={isOpen} fade={true} centered={true} toggle={props.ToggleAlert.bind(this, props.Alert.type, props.Alert.msg)}>
        <ModalBody>
          <div className="" style={{
            marginTop: 0,
            textAlign: "center"
          }}>
            <div className="item">
              {
                fa
              }
              {' '}
            </div>
            {
              // (props.Alert.type != "loading")
              //   ? <div className="item">
              //     <span className="type">{props.Alert.type}</span>
              //   </div>
              //   : ""
            }

            <div className="item">
              <span>{props.Alert.msg}</span>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  Alert: state.Alert
})

export default connect(mapStateToProps, {
  ToggleAlert
})(Alert);
