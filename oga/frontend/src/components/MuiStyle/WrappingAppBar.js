import React, { Component } from "react";
import AppBar from "./AppBar";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index"
import { Route,} from "react-router-dom";
import { withRouter } from "react-router";

class WrappingAppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location_subscribe: false
        };
    }

    // clickLocationHandler = (val) => {
    //     var watchID = null;
    //     if (val) {
    //         watchID = navigator.geolocation.watchPosition(position => {
    //             const { latitude, longitude } = position.coords;
    //         });
    //         this.setState({...this.state, location_subscribe: true});
    //     } else {
    //         watchID = navigator.geolocation.clearWatch(watchID)
    //         this.setState({...this.state, location_subscribe: false});
    //     }
    // };


    render() {
        var handler = this.props.log_status ? this.props.logout : () => {
            this.props.history.push("/login")
        };
        return (
            <Route>
                <AppBar
                    position="static"
                    auth={this.props.log_status}
                    func={handler}
                ></AppBar>
            </Route>
        );
    }
}

const mapStateToProps = state => {
    return {
        log_status: state.auth.authenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actionCreators.Logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WrappingAppBar));
