import React, { Component } from "react";
import moment from "moment";

//Materials UI imports
import {
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Link,
    Typography,
    Box
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
    card: {
        margin: "auto",
        transition: "0.3s",
        width: "100%",
        "&:hover": {
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"
        }
    },
    content: {
        textAlign: "left",
        padding: theme.spacing(3)
    },
    divider: {
        marginTop: theme.spacing(2)
        // marginBottom: theme.spacing(2)
    },
    heading: {
        fontWeight: "bold"
    },
    subheading: {
        color: "#ff9933",
        fontWeight: "bold",
        lineHeight: 1.8
    },
    caption: {
        color: "#585858"
    },
    buttons: {
        paddingTop: theme.spacing(2)
    },
    button: {
        fontSize: 20,
        paddingTop: 0,
        paddingBottom: 0,
        marginBotton: 0
    }
});

class AnswerView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid
                className="AnswerView"
                key={this.props.id}
                style={{ height: "100%", width: "100%" }}
            >
                <Card className={classes.card}>
                    {this.props.showQuestion && (
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
                                    <Link
                                        color="inherit"
                                        onClick={this.props.clickQuestion}
                                    >
                                        {this.props.content} in{" "}
                                        {this.props.place_name}?
                                    </Link>
                                </Typography>
                            }
                        ></CardHeader>
                    )}
                    <CardContent className={classes.content}>
                        <Typography
                            className={classes.subheading}
                            id="question-author"
                            variant="subtitle1"
                        >
                            <Link onClick={this.props.clickAuthor}>
                                {this.props.author}
                            </Link>
                        </Typography>
                        <Typography
                            id="question-publish-date-time"
                            className={classes.caption}
                            variant="caption"
                            gutterBottom
                        >
                            {moment(
                                this.props.publish_date_time,
                                "MMMM Do YYYY, h:mm:ss a"
                            ).fromNow()}{" "}
                            &mdash; {this.props.publish_date_time}
                        </Typography>
                        <Box pt={2} />
                        <Link color="inherit" onClick={this.props.clickAnswer}>
                            <Typography
                                className={classes.heading}
                                variant="h6"
                            >
                                {this.props.answer_content} in{" "}
                                {this.props.place_name}
                            </Typography>
                        </Link>
                        {/* prop to hide divider in Profile page view */}
                        {!this.props.hideDivider && (
                            <Divider className={classes.divider} />
                        )}
                        <Grid align="center" className="Ratings">
                            <ButtonGroup className={classes.buttons}>
                                <Button
                                    className={classes.button}
                                    id="thumb_up-button"
                                    color="primary"
                                    onClick={this.props.rateUp}
                                    disabled={
                                        !this.props.auth ||
                                        this.props.disableLike
                                    }
                                >
                                    &#129321;
                                    {"  "}
                                    {this.props.rateUpCount}
                                </Button>
                                <Button
                                    className={classes.button}
                                    id="thumb_down-button"
                                    color="primary"
                                    onClick={this.props.rateDown}
                                    disabled={
                                        !this.props.auth ||
                                        this.props.disableDislike
                                    }
                                >
                                    &#129317;
                                    {"  "}
                                    {this.props.rateDownCount}
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(useStyles)(AnswerView);
