
import React, { Component } from "react";
import { connect } from 'react-redux';
import { FaFileAlt, FaQrcode, FaCircleNotch } from "react-icons/fa";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import { NavLink as NavLinkRRD, Link } from "react-router-dom";


import {
    Card,
    CardBody,
    Container,
} from "reactstrap";
import {
    GetList,
} from "store/actions/helpers/displayAction";
import {
    SET_MY_DOCUMENTS,
} from "./redux/types";

import DocumentForm from '../../Document/components/DocumentForm';

import QRCodeScanner from 'components/Helpers/QRCodeScanner';
import InfoModal from "components/Helpers/InfoModal.js";
import { SetDocumentDetail } from '../../Document/redux/actions';
import { UpdateDocument } from './redux/actions';

import { GetMyInfo } from '../Profile/redux/actions';

import { PRE_STU } from 'config';


class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scan: false,
            scanned: false,
            scanModal: false,
            fetching: false,
        }

        this.QRScanToggle = this.QRScanToggle.bind(this);
        this.GetFetchData = this.GetFetchData.bind(this);
        this.toggleScanModal = this.toggleScanModal.bind(this);

        var ls = JSON.parse(localStorage.getItem(PRE_STU + "-info"));
        props.GetList("document/get", SET_MY_DOCUMENTS, 1, 10000, { owner: ls.id }, { name: 1 });
        props.GetMyInfo();
    }

    toggleDocumentModal() {
        this.setState({
            documentModal: !this.state.documentModal
        })
    }

    toggleScanModal() {
        this.setState({
            scanModal: !this.state.scanModal,
            scanned: (this.state.scanModal) ? false : this.state.scanned,
            scan: (this.state.scanModal) ? false : this.state.scan,
        })
    }

    QRScanToggle() {

        this.setState({
            scan: !this.state.scanModal
        })
    }

    GetFetchData(data) {
        console.log("::::::::_!!!!!!!!!!!!!!!");
        console.log(data);
        this.setState({
            scanned: true,
            fetching: true
        });

        this.props.GetList("document/get", null, 1, 1, { _id: data }, undefined, undefined, async (data) => {
            console.log(data.data.documents[0]);
            await this.props.SetDocumentDetail(data.data.documents[0]);
            this.setState({
                fetching: false
            });
        });
    }

    render() {

        var notif = 0;

        this.props.StudentWebView.rows.map(r => {
            r.actions.map(act => {
                if (!act.seen || !act.hasOwnProperty("seen")) {
                    notif++;
                }
            })
        });
        console.log(this.state);
        return (
            <>

                <InfoModal
                    size={"100%"}
                    modal={this.state.scanModal}
                    toggle={this.toggleScanModal}
                    title={"Scan QR"}
                    form={<>
                        {
                            (this.state.scan && !this.state.scanned)
                                ? <div className="qr-scan-feed w100">
                                    <QRCodeScanner dataFetch={this.GetFetchData} />
                                </div>
                                : (this.state.fetching)
                                    ? <div style={{ width: "100%", textAlign: "center" }}>
                                        <span style={{ fontSize: "25px" }}>

                                            <FaCircleNotch className="icon rotate" id="file-loading-icon" />
                                        </span><br /><br />
                                        <span>Retrieving Data</span>
                                    </div>
                                    : ((!this.state.scan && !this.state.scanned && !this.state.fetching))
                                        ? ""
                                        : <DocumentForm type={""} autoOpenActivty={true} openAction={(val) => {
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
                        }
                    </>}
                    buttons={[]}
                />




                <Container id="student-dashboard" className="pl-5 pr-5 mt-4" fluid>
                    <Link to="/student/my-documents">
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
                                <FaFileAlt />
                            </CardBody>
                        </Card>
                    </Link>
                    <Card className="card-stats mt-5 mb-4 mb-xl-0">
                        <CardBody onClick={() => {
                            console.log("SSS");
                            this.setState({
                                scan: true,
                                scanModal: true,
                            })
                        }}>
                            <FaQrcode />
                        </CardBody>
                    </Card>
                </Container>

            </>
        );
    };
};

const mapStateToProps = (state) => ({
    StudentWebView: state.StudentWebView
})

export default connect(mapStateToProps, {
    GetList,
    GetMyInfo,
    UpdateDocument,
    SetDocumentDetail,
})(Dashboard);