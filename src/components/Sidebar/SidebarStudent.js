
import React, { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { SERVER_URI, PRE_STU } from 'config';
import { FaCaretRight } from "react-icons/fa";
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

import NotificationArea from 'components/Headers/NotificationArea';

const SidebarStudent = (props) => {

  var ls = JSON.parse(localStorage.getItem(PRE_STU + "-info"));
  var profilePic = (ls.hasOwnProperty("profilePic"))?ls.profilePic.path:null;

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      style={{ display: "flex", justifyContent: "end", padding: "10px 1rem" }}
      expand="md"
      id="student-sidenav-main"
    >
        <div className="navbar-header">
          <div className="nh-user" style={{display:"flex"}}>
            <div className="nh-logo">

              {/* Brand */}
              {logo ? (
                <NavbarBrand className="pt-2" {...navbarBrandProps}>
                  <img
                    alt={logo.imgAlt}
                    className="navbar-brand-img"
                    src={logo.imgSrc}
                  />
                </NavbarBrand>
              ) : null}
            </div>

            {/* User */}
            <Nav className="align-items-center d-md-none">

              <UncontrolledDropdown nav>
                <DropdownToggle nav>
                  <Media className="align-items-center">
                    <div className="avatar-thumbnail rounded-circle"
                      style={{
                        backgroundImage: `url(${(profilePic != null)
                          ? SERVER_URI + "images/users/" + profilePic
                          : SERVER_URI + "images/users/male-temp.png"
                          })`,
                      }}
                    >
                    </div>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/student/my-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="#pablo" onClick={(e) => {
                    localStorage.removeItem(PRE_STU + '-tkn');
                    localStorage.removeItem(PRE_STU + '-info');

                    props.history.push("/student-auth/login");
                    window.location.reload();
                  }}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </div>
        </div>
    </Navbar>
  );
};

SidebarStudent.defaultProps = {
  routes: [{}],
};

SidebarStudent.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default SidebarStudent;
