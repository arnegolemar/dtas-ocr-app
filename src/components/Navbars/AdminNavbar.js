import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { SERVER_URI, PRE } from 'config';
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

import { ArrangeName } from 'store/actions/helpers/displayAction';
import NotificationArea from 'components/Headers/NotificationArea';

const AdminNavbar = (props) => {
  var ls = JSON.parse(localStorage.getItem(PRE + "-info"));
  var profilePic = localStorage.getItem(PRE + "-pp");
  console.log(ls);
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {/* {props.brandText} */}
          </Link>
          {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form> */}
          <Nav className="align-items-center d-none d-md-flex" navbar>

            {/* <NotificationArea /> */}

            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <div className="avatar-thumbnail rounded-circle"
                    style={{
                      backgroundImage: `url(${(profilePic != null)
                        ? SERVER_URI + "images/users/" + profilePic
                        : SERVER_URI + "images/users/male-temp.png"
                        })`,
                      backgroundColor: "white"
                    }}
                  >
                  </div>
                  <Media className="ml-2" style={{ display: "grid" }}>
                    <span className="text-sm font-weight-bold">
                      {props.ArrangeName(ls.name, 3)}
                    </span>
                    <span style={{ fontSize: "12px" }}>
                      {
                        (ls.role.name == "Master")?"Master":(ls.office.division + "-" + ls.office.section)
                      }
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/my-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                {/* <DropdownItem to="/my-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to="/my-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/my-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem> */}
                <DropdownItem divider />
                <DropdownItem onClick={(e) => {

                  localStorage.removeItem(PRE + '-tkn');
                  localStorage.removeItem(PRE + '-pp');
                  localStorage.removeItem(PRE + '-info');

                  props.history.push("/auth/login");
                  window.location.reload();

                }}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

const mapStateToProps = (state) => ({
})

export default withRouter(connect(mapStateToProps, {
  ArrangeName,
})(AdminNavbar));