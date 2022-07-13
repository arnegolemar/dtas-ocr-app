import React from "react";
import { NavLink as NavLinkRRD, Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Col,
    Row,
} from "reactstrap";

class NotificationArea extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }

    }

    render() {
        return (
            <UncontrolledDropdown nav>
                <DropdownToggle nav className="nav-link-icon">
                    <i className="ni ni-bell-55" />
                </DropdownToggle>
                <DropdownMenu
                    aria-labelledby="navbar-default_dropdown_1"
                    className="dropdown-menu-arrow"
                    right
                    style={{ borderTop: "1px solid #80808026" }}
                >
                    <div id="notif-dd-setting">
                        <span>Unread Only</span>
                        <input type="checkbox" />
                    </div>
                    <DropdownItem>
                        <div className="notif-div">
                            <div className="notif-status"></div>
                            <div className="notif-img-div" >
                                <div className="notif-img">

                                </div>
                            </div>
                            <div className="notif-content-div" >
                                <div className="notif-content">
                                    Job Applied New Status
                                </div>
                                <span className="notif-date">
                                    5 Hours ago
                                </span>
                            </div>
                        </div>
                    </DropdownItem>
                    <DropdownItem>
                        <div className="notif-div">
                            <div className="notif-status"></div>
                            <div className="notif-img-div" >
                                <div className="notif-img">

                                </div>
                            </div>
                            <div className="notif-content-div" >
                                <div className="notif-content">
                                    Job Applied New Status <br/>
                                    asd qwda sdasd qwd asd
                                </div>
                                <span className="notif-date">
                                    5 Hours ago
                                </span>
                            </div>
                        </div>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Show More</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }

}

const mapStateToProps = (state) => ({
})

export default withRouter(connect(mapStateToProps, {
})(NotificationArea));