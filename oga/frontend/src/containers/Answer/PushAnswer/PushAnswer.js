import React, { Component } from "react";

import AnswerView from "../../../components/AnswerView/AnswerView";
import Map from "../../Map/GoogleMap";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../../../store/actions";
import moment from "moment";

// Material UI imports
import {
    Typography,
    Grid,
    Box,
    Card,
    CardContent,
    CardHeader
} from "@material-ui/core";
import { answer_types } from "../../../const/question_type";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";

class PushAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            hasFetched: false
        };
    }

    componentDidMount() {
        this.props.isLoggedIn();
        this.props.onGetAnswer(this.state.id);
    }

    rateUpHandler = id => {
        this.props.rateUp(id);
        window.location.reload();
    };

    rateDownHandler = id => {
        this.props.rateDown(id);
        window.location.reload();
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.hasFetched) {
            return false;
        }
        return true;
    }

    render() {
        var answer = null;
        if (this.props.selectedAnswer) {
            // this.getRecommendationsHandler();
            var recommendations = null;

            answer = this.props.selectedAnswer;
            // Check if answer to question is negative
            if (answer_types[answer.content] == 0) {
                // // get recommendations for answered question
                // this.getRecommendationsHandler();
                if (
                    this.props.recommendations &&
                    this.props.recommendations.length > 0
                ) {
                    recommendations = [];
                    // Store recommended locations in recommendation list
                    for (
                        var i = 0;
                        i < this.props.recommendations.length;
                        i++
                    ) {
                        recommendations.push(
                            <div key={i}>
                                <Typography variant="h6" gutterBottom>
                                    <RoomRoundedIcon />
                                    {"  "}
                                    {this.props.recommendations[i]}
                                </Typography>
                            </div>
                        );
                        this.state.hasFetched = true;
                    }
                }
            }

            answer = (
                <Grid container direction="row">
                    <Grid item md={6} xs={12}>
                        <Map
                            viewOnly={true}
                            targets={[
                                {
                                    lat: this.props.selectedAnswer.place_lat,
                                    lng: this.props.selectedAnswer.place_lng
                                }
                            ]}
                        ></Map>
                    </Grid>
                    <Grid item style={{ padding: 30 }} md={6} xs={12}>
                        <Box pt={5} />
                        <Grid>
                            <AnswerView
                                key={this.props.selectedAnswer.id}
                                id="push-answer"
                                showQuestion={true}
                                clickQuestion={() =>
                                    this.props.history.push(
                                        "/replies/" +
                                            this.props.selectedAnswer
                                                .question_id
                                    )
                                }
                                author={this.props.selectedAnswer.author}
                                auth={this.props.auth}
                                publish_date_time={moment(
                                    this.props.publish_date_time
                                ).format("MMMM Do YYYY, h:mm:ss a")}
                                answer_content={
                                    this.props.selectedAnswer.content
                                }
                                content={
                                    this.props.selectedAnswer.question_type
                                }
                                place_name={this.props.selectedAnswer.location}
                                disableLike={
                                    this.props.selectedAnswer.user_liked
                                }
                                disableDislike={
                                    this.props.selectedAnswer.user_disliked
                                }
                                rateUpCount={this.props.selectedAnswer.upvotes}
                                rateDownCount={
                                    this.props.selectedAnswer.downvotes
                                }
                                clickAuthor={() =>
                                    this.props.history.push(
                                        "/profile/" +
                                            this.props.selectedAnswer.author
                                    )
                                }
                                rateUp={() =>
                                    this.rateUpHandler(
                                        this.props.selectedAnswer.id
                                    )
                                }
                                rateDown={() =>
                                    this.rateDownHandler(
                                        this.props.selectedAnswer.id
                                    )
                                }
                            />
                        </Grid>
                        <Box pt={5} />
                        {recommendations && (
                            <Card>
                                <CardHeader
                                    color="primary"
                                    style={{
                                        backgroundColor: "#cde5f7"
                                    }}
                                    title={
                                        <Typography
                                            variant="h6"
                                            style={{ fontWeight: "bold" }}
                                        >
                                            Why don't you try somewhere else
                                            instead?
                                        </Typography>
                                    }
                                ></CardHeader>
                                <CardContent
                                    style={{
                                        paddingTop: 50,
                                        paddingBottom: 50
                                    }}
                                >
                                    {recommendations}
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            );
        }
        return <div className="PushAnswer">{answer}</div>;
    }
}

const mapStateToProps = state => {
    return {
        selectedAnswer: state.answer.answer,
        recommendations: state.question.recommendations,
        auth: state.auth.authenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        isLoggedIn: () => dispatch(actionCreators.isLoggedIn()),
        onGetAnswer: id => dispatch(actionCreators.getAnswer(id)),
        onGetRecommendations: id =>
            dispatch(actionCreators.getQuestionRecommendation(id)),
        rateUp: id => dispatch(actionCreators.rateUp(id)),
        rateDown: id => dispatch(actionCreators.rateDown(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PushAnswer));
