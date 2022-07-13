import React from "react";
import { NavLink as NavLinkRRD, Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

class PageNotFound404 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }

    }

    render() {
        return (
            <div className="row" id="nf404">
                <span class="mask bg-gradient-default opacity-8"></span>
                <div className="col-md-12">

                    <img
                        alt="..."
                        src={
                            require("../assets/img/404.png")
                                .default
                        }
                    />
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => ({
})

export default withRouter(connect(mapStateToProps, {
})(PageNotFound404));