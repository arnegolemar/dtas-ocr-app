
import React, { useState } from "react";
import { connect } from 'react-redux';
import { SERVER_URI } from 'config';

import {
    SetValue,
} from 'store/actions/helpers/displayAction';

import {
    UpdateRouteList,
} from '../redux/actions';

import {
    SET_ROLE_VALUE,
} from '../redux/types';

import {
    Row,
    Col,
    Form,
} from "reactstrap";

import routes from 'routes';

import LabelInput from 'components/Helpers/LabelInput';
import { collapseTextChangeRangesAcrossMultipleVersions, isJSDocNamepathType } from "typescript";


const RoleForm = (props) => {
    console.log(props);
    const { values } = props.Role;
    var availableRoutes = routes.filter((r) => (r.hasOwnProperty("display") && r.display == true));
    var allRoutes = [];

    const isSelected = (value) => {
        let found = false;
        for (let x = 0; x < values.routes.length; x++) {
            if (values.routes[x] == value) {
                found = true;
                break;
            }
        }

        return found;
    }

    for (let x = 0; x < availableRoutes.length; x++) {

        if (availableRoutes[x].hasOwnProperty("subroutes")) {
            for (let y = 0; y < availableRoutes[x].subroutes.length; y++) {
                allRoutes.push({
                    parent: availableRoutes[x].name,
                    name: availableRoutes[x].subroutes[y].name,
                    value: JSON.stringify({ path: availableRoutes[x].subroutes[y].path, name: availableRoutes[x].subroutes[y].name }),
                    icon: availableRoutes[x].subroutes[y].icon,
                })
            }
        } else {
            allRoutes.push({
                parent: availableRoutes[x].name,
                name: availableRoutes[x].name,
                value: JSON.stringify({ path: availableRoutes[x].path, name: availableRoutes[x].name }),
                icon: availableRoutes[x].icon,
            })
        }
    }

    return (
        <>
            <Row className="pt-3 pl-3 pr-3">
                <Col md="12">
                    <Form>
                        <h6 className="heading-small text-muted mb-4">
                            Details
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="12">
                                    <LabelInput
                                        label={"Role"}
                                        prop={"name"}
                                        value={values.name}
                                        type="text"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_ROLE_VALUE);
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                {
                                    [...allRoutes].map((route, i) => {
                                        return (
                                            <Col md="3" className="routes-list" key={"rl-" + i}>
                                                <div className={isSelected(route.value) ? "" : "inactive"} onClick={() => {
                                                    props.UpdateRouteList(route.value);
                                                }}>
                                                    <p><i className={route.icon} /></p>
                                                    <h4>{route.name}</h4>
                                                    <h6>{route.parent}</h6>
                                                </div>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </div>
                    </Form>

                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => ({
    Role: state.Role
})

export default connect(mapStateToProps, {
    SetValue,
    UpdateRouteList,
})(RoleForm);