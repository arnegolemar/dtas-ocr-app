
import React, { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { SERVER_URI, PRE } from 'config';
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

var ps;

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  const [navCollapseOpen, setNavCollapseOpen] = useState(false);
  const [activeMainNav, setActiveMainNav] = useState("Dashboard");

  var ls = JSON.parse(localStorage.getItem(PRE + "-info"));
  var role = ls.role.name;
  var userRoutes = ls.role.routes.map((r) => {
    return JSON.parse(r).path;
  })

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };

  const toggleNavCollapse = () => {
    setNavCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  const hasActiveSub = (subRoutes = []) => {
    var bool = false;
    subRoutes.map(sub => {
      if (sub.path == props.location.pathname)
        bool = true;
    })

    return bool;
  }

  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (prop.display && (role == "Master" || userRoutes.indexOf(prop.path) != -1)) ? (
        <NavItem key={"nlk-" + key} ariaExpanded="true">
          <NavLink
            to={prop.path}
            tag={NavLinkRRD}
            className={(hasActiveSub(prop.subroutes)) ? "active" : ""}
            onClick={(e) => {
              if (prop.hasOwnProperty("subroutes")) {
                setActiveMainNav((prop.name == activeMainNav) ? "" : prop.name);
                e.preventDefault();
              }
            }}
          >
            <i className={prop.icon} />
            {prop.name}

            {
              (prop.hasOwnProperty("subroutes"))
                ? <FaCaretRight className={(prop.name == activeMainNav) ? "active" : ""} />
                : ""
            }

          </NavLink>

          <Collapse isOpen={(prop.name == activeMainNav)}>
            {
              (prop.hasOwnProperty("subroutes"))
                ? (
                  prop.subroutes.map((sub) => {
                    return (role == "Master" || userRoutes.indexOf(sub.path) != -1) ? (
                      <NavItem key={"nlsk-" + sub.path + "-" + key}>
                        <NavLink
                          to={sub.path}
                          tag={NavLinkRRD}
                          className="sub-route"
                        >
                          <i className={sub.icon} />
                          {sub.name}
                        </NavLink>
                      </NavItem>
                    ) : null
                  })
                )
                : ""
            }
          </Collapse>

          {/* <NavLink
            to={prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink> */}
          {/* 
          <UncontrolledCollapse toggler="#toggler">
            
          </UncontrolledCollapse> */}

          {/* <li className="nav-item">
            <a href="#pablo" data-toggle="collapse" className="active nav-link" aria-expanded="true"
              onClick={() => {
                this.set
              }}
            >
              <i className="ni ni-shop text-primary"></i><span className="nav-link-text">Dashboards</span>
            </a>
            <div className="collapse show">
              <ul className="nav-sm flex-column nav">
                <li className="active nav-item">
                  <a aria-current="page" className="nav-link" href="#/admin/dashboard">
                    <span className="sidenav-normal"> Dashboard </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#/admin/alternative-dashboard">
                    <span className="sidenav-normal"> Alternative </span>
                  </a>
                </li>
              </ul>

            </div>
          </li> */}

        </NavItem>
      ) : "";
    });
  };

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

  var profilePic = localStorage.getItem(PRE + "-pp");

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container>
        <div className="navbar-header">
          <div className="nh-toggler">

            {/* Toggler */}
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleCollapse}
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>

          <div className="nh-logo">

            {/* Brand */}
            {logo ? (
              <NavbarBrand className="pt-0 pb-0" {...navbarBrandProps}>
                <img
                  alt={logo.imgAlt}
                  className="navbar-brand-img"
                  src={logo.imgSrc}
                />
              </NavbarBrand>
            ) : null}
          </div>

          <div className="nh-user">

            {/* User */}
            <Nav className="align-items-center d-md-none">
              <UncontrolledDropdown nav>

                <DropdownMenu
                  aria-labelledby="navbar-default_dropdown_1"
                  className="dropdown-menu-arrow"
                  right
                >
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Something else here</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

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
                  <DropdownItem href="#pablo" onClick={(e) => {
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
          </div>
        </div>

        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          {/* <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form> */}
          {/* Navigation */}
          <Nav className="pt-3" navbar>{createLinks(routes)}</Nav>
          {/* Divider */}

        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
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

export default Sidebar;
