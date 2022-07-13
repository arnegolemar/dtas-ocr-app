
import React, { Component } from "react";
import { connect } from 'react-redux';
import { FaFileAlt, FaQrcode } from "react-icons/fa";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import { NavLink as NavLinkRRD, Link } from "react-router-dom";

import InfoModal from "components/Helpers/InfoModal";
import DocumentForm from '../../Document/components/DocumentForm';

import { SetDocumentDetail } from '../../Document/redux/actions';

import { UpdateDocument } from '../Dashboard/redux/actions';

import { DOCUMENT_TYPES } from 'config';

import {
    Card,
    CardBody,
    Container,
} from "reactstrap";
import {
} from "store/actions/helpers/displayAction";
import { PRE_STU } from 'config';


class MyDocuments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            documentModal: false,
        }

        this.toggleDocumentModal = this.toggleDocumentModal.bind(this);

    }

    toggleDocumentModal() {
        this.setState({
            documentModal: !this.state.documentModal
        })
    }

    render() {

        var docTypes = {};
        DOCUMENT_TYPES.map(dt => {
            docTypes[dt.value] = dt.text;
        })

        console.log(this.props.StudentWebView.rows);
        return (
            <>
                <InfoModal
                    size={"100%"}
                    modal={this.state.documentModal}
                    toggle={this.toggleDocumentModal}
                    title={"Document"}
                    form={<>
                        <DocumentForm type={""} openAction={(val) => {
                            var { actions, _id } = val;

                            actions = actions.map(act => {
                                return {
                                    ...act,
                                    seen: true
                                }
                            });

                            this.props.UpdateDocument({
                                ...val,
                                actions: actions,
                            });

                        }} />
                    </>}
                    buttons={[]}
                />

                <div className="mt-6" style={{ width: "100%" }}>
                    {
                        this.props.StudentWebView.rows.map(doc => {
                            var notif = 0;
                            doc.actions.map((act) => {
                                if (!act.seen || !act.hasOwnProperty("seen")) {
                                    notif++;
                                }
                            });

                            return (
                                <Container id="student-document" className="pl-5 pr-5" fluid
                                    onClick={async () => {
                                        await this.props.SetDocumentDetail(doc);

                                        this.toggleDocumentModal();
                                    }}
                                >
                                    <Card className="card-stats mb-4 mb-xl-0">
                                        {
                                            (notif > 0)
                                                ? <div className="notif-count-area">
                                                    <div className="notif">
                                                        <span>{notif}</span>
                                                    </div>
                                                </div>
                                                : ""
                                        }

                                        <CardBody>
                                            {docTypes[doc.type]}
                                        </CardBody>
                                    </Card>
                                </Container>
                            )
                        })
                    }


                </div>

            </>
        );
    };
};

const mapStateToProps = (state) => ({
    StudentWebView: state.StudentWebView
})

export default connect(mapStateToProps, {
    SetDocumentDetail,
    UpdateDocument,
})(MyDocuments);