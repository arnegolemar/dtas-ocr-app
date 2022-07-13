import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col } from 'reactstrap';
import ReactToPrint from "react-to-print";

// import { 
//   togglePasswordRequire,
// } from './../../actions/helpers/confirmAction.js';

class InfoModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }

  }


  render() {

    const headerButton = <div>
      {this.props.modalHeaderAddOns}
      <button className="close" onClick={this.props.toggle}>&times;</button>
    </div>;

    var title = this.props.title.toLowerCase().split(" ").join("-");

    var isWebView = localStorage.getItem("webview");

    return (
      <Modal
        className='info-modal'
        style={{ maxWidth: (!isWebView) ? this.props.size : "100%" }}
        isOpen={this.props.modal}
        toggle={this.props.toggle}
        fade={this.props.fade || false}
        modalTransition={{ timeout: 100 }}
        backdropTransition={{ timeout: 100 }}
        backdrop={this.props.hasOwnProperty("backdrop") ? this.props.backdrop : undefined}
        id={(this.props.hasOwnProperty("id") && this.props.id != "") ? this.props.id : title + "-info-modal"}
      >
        <ModalHeader style={{
          borderBottom: 'none'
        }}
          close={headerButton}
        >
          {/* <ModalHeader style={{
          borderBottom: 'none'
        }} toggle={this.props.toggle}> */}
          {this.props.title}

        </ModalHeader>

        <ModalBody>

          <div id={(this.props.id) ? this.props.id : ""} ref={elem => { this.toPrint = elem }}>
            {this.props.form}
          </div>

        </ModalBody>
        <ModalFooter style={{
          borderTop: 'none'
        }}>

          {
            this.props.buttons.map(({ type, callback, disable = false, size = 2, requirePassword = false }, i) => {
              return (type != 'PRINT') ? (
                <Col sm={{ size: size }} key={"im-" + i}>
                  <Button size="md" disabled={disable} className="button-orange-gradient" color="primary" onClick={
                    () => {
                      // console.log("::::::::::::::::::----------------------");
                      // console.log(this.props.user);
                      // console.log(requirePassword);
                      // console.log(callback);

                      if (!requirePassword) {
                        callback();
                      } else if (requirePassword && this.props.user.passwordChecked) {
                        callback();
                      } else if (requirePassword && !this.props.user.passwordChecked) {
                        this.props.togglePasswordRequire(true);
                      }

                    }
                  }>{type}</Button>
                </Col>
              ) : (
                <ReactToPrint
                  trigger={() => (
                    <Col sm={{ size: size }}>
                      <Button size="md" className="button-orange-gradient" color="primary" onClick={callback}>
                        {type}
                      </Button>
                    </Col>
                  )}
                  content={() => this.toPrint}
                />
              )
            })
          }
        </ModalFooter>
      </Modal>
    );

  }
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps, {
  // togglePasswordRequire,
})(InfoModal);
