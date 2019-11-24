import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { ConnectedRouter } from "connected-react-router";
import { Route, Redirect, Switch } from "react-router-dom";
import { history } from "../../store/store";
import * as actionCreators from "../../store/actions/questionActions";
import thunk from "redux-thunk";
import Profile from "./Profile.js";

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    auth: {
        profile: [
            {
                id: 1,
                username: "",
                location: "",
                latitude: 0,
                longitude: 1
            }
        ]
    },
    question: {
        questions: [
            {
                id: 1,
                author: "firstUser",
                publish_date_time: "2019",
                content: "test",
                location: "home",
                is_answered: false
            }
        ]
    },
    answer: {
        answers: [
            {
                id: 1,
                author: "secondUser",
                question_type: "MANY SEATS",
                publish_date_time: "2019",
                place_name: "home"
            }
        ]
    },
    router: history
});

describe("<Profile />", () => {
    let profile;

    beforeEach(() => {
        profile = (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={Profile} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render without errors", () => {
        const wrapper = mount(profile);
        expect(wrapper.find(".Profile").length).toBe(1);
    });

    it("should go to previous page when BACK clicked", () => {
        const spyHistoryPush = jest
            .spyOn(history, "goBack")
            .mockImplementation(path => {});
        const wrapper = mount(profile);
        let button = wrapper.find("#back-button");
        button.hostNodes().simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should go to detail page when question clicked", () => {
        const spyHistoryPush = jest
            .spyOn(history, "push")
            .mockImplementation(path => {});
        const wrapper = mount(profile);
        let button = wrapper.find("#detail-button");
        button.hostNodes().simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should go to settings page when settings button clicked", () => {
        const spyHistoryPush = jest
            .spyOn(history, "push")
            .mockImplementation(path => {});
        const wrapper = mount(profile);
        let button = wrapper.find("#settings-button");
        button.hostNodes().simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
});
