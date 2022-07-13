
import React, { useState } from "react";
import { connect } from 'react-redux';
import { SERVER_URI } from 'config';

import {
    SetValue,
} from 'store/actions/helpers/displayAction';

import {
    SET_OFFICE_VALUE,
} from '../redux/types';

import {
    Row,
    Col,
    Form,
} from "reactstrap";

import LabelInput from 'components/Helpers/LabelInput';

const OfficeForm = (props) => {
    console.log(props);
    const { values } = props.Office;

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
                                <Col lg="6">
                                    <LabelInput
                                        label={"Office"}
                                        prop={"division"}
                                        value={values.division}
                                        type="text"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_OFFICE_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="6">
                                    <LabelInput
                                        label={"Department"}
                                        prop={"section"}
                                        value={values.section}
                                        type="text"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_OFFICE_VALUE);
                                        }}
                                    />
                                </Col>
                            </Row>

                        </div>
                    </Form>

                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => ({
    Office: state.Office
})

export default connect(mapStateToProps, {
    SetValue,
})(OfficeForm);