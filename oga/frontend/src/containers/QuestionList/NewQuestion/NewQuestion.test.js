import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import thunk from "redux-thunk";
import NewQuestion from "./NewQuestion.js";
import { history } from "../../../store/store";
import Typography from "@material-ui/core/Typography";
import * as actionCreators from "../../../store/actions/questionActions";

const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;
jest.mock("../../Map/GoogleMap.js", () => () => "Map");

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    question: {
        selectedQuestion: null,
        user_name: null,
        targetLocation: null,
        questions: []
    },
    location: {
        targetLocation: { langitude: 1, longitude: 2 }
    },
    router: history
});
const state = { content: "" };

describe("<NewQuestion/>", () => {
    let nq;

    beforeEach(() => {
        nq = (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={NewQuestion} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });

    it("should render without errors", () => {
        const wrapper = mount(nq);
        expect(wrapper.find(".NewQuestion").length).toBe(3);
    });

    it("should render without errors", () => {
        const wrapper = mount(nq);
        expect(wrapper.find(".NewQuestion").length).toBe(3);
    });

    xit(`should call 'clickBack'`, () => {
        const spyHistoryBack = jest
            .spyOn(history, "goBack")
            .mockImplementation(path => {});
        const component = mount(nq);
        const wrapper = component.find("#back-create-question-button");
        wrapper.hostNodes().simulate("click");
        expect(spyHistoryBack).toHaveBeenCalled();
    });

    it(`should not call 'createQuestion' when empty`, () => {
        const spyCreateQuestion = jest
            .spyOn(actionCreators, "createQuestion")
            .mockImplementation(question => {
                return dispatch => {};
            });
        // Should alert when creating a question without question
        const mockAlert = jest
            .spyOn(window, "alert")
            .mockImplementation(() => {});

        const component = mount(nq);
        const instance = component
            .find(NewQuestion.WrappedComponent)
            .instance();
        instance.setState(state);
        const wrapper = component.find("#confirm-create-question-button");
        wrapper.hostNodes().simulate("click");
        expect(spyCreateQuestion).toHaveBeenCalledTimes(0);
        expect(mockAlert).toHaveBeenCalledTimes(1);
    });

    it(`should call 'createQuestion' with content`, () => {
        const spyCreateQuestion = jest
            .spyOn(actionCreators, "createQuestion")
            .mockImplementation(question => {
                return dispatch => {};
            });
        const component = mount(nq);
        const instance = component
            .find(NewQuestion.WrappedComponent)
            .instance();
        instance.setState({ content: "HI" });
        const wrapper = component.find("#confirm-create-question-button");
        wrapper.hostNodes().simulate("click");
        expect(spyCreateQuestion).toHaveBeenCalled();
    });

    it(`should update state upon button click`, () => {
        const component = mount(nq);
        //const instance = component.find(NewQuestion.WrappedComponent).instance();
        //instance.setState({content: "HI"});
        const instance = component
            .find(NewQuestion.WrappedComponent)
            .instance();
        const wrapper = component.find("input");

        wrapper
            .at(0)
            .hostNodes()
            .simulate("change");
        expect(instance.state.content).toBe("Are there LONG LINES");
    });

    xit(`should show target_location when set `, () => {
        const component = mount(nq);
        component.setProps({
            question: { target_location: { name: "school" } }
        });
        const wrapper = component.find("#view").find(Typography);
        //const instance = component.find(NewQuestion.WrappedComponent).instance();
        expect(wrapper.text()).toBe("How is it in school?");
        //instance.setState({content: "HI"});
    });

    it(`should not set location name null`, () => {
        const store = mockStore({
            question: {
                selectedQuestion: null,
                user_name: null,
                targetLocation: null,
                questions: []
            },
            location: {
                targetLocation: null
            },
            router: history
        });
        let nq = (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={NewQuestion} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );

        const component = mount(nq);
        let wrapper = component.find("#view").find(Typography);
        //const instance = component.find(NewQuestion.WrappedComponent).instance();
        expect(wrapper.text()).toBe("How is it in there?");

        // Should alert when creating a question with null location
        const mockAlert = jest
            .spyOn(window, "alert")
            .mockImplementation(() => {});
        wrapper = component.find("#confirm-create-question-button");
        wrapper.hostNodes().simulate("click");
        expect(mockAlert).toHaveBeenCalled();
    });
});
