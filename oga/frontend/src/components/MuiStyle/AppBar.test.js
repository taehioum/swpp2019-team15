import React from "react";
import AppBar from "./AppBar";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import { history } from "../../store/store";
import configureMockStore from "redux-mock-store";
// import * as actionCreators from './store/actions/authActions';
import thunk from "redux-thunk";
import { createMount } from "@material-ui/core/test-utils";

const mockStore = configureMockStore([thunk]);
const store = mockStore({ auth: { authenticated: true }, router: history });

console.error = jest.fn();
//console.log = jest.fn();

describe("<AppBar />", () => {
    let appBar;
    let mount;

    beforeEach(() => {
        mount = createMount();
        appBar = (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={props => <AppBar auth={true} />}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
        mount.cleanUp();
    });

    it("should render", () => {
        const component = mount(appBar);
        expect(component.find(".AppBar").length).toBe(1);
    });

    it("should redirect to settings page ", () => {
        const spyHistoryPush = jest
            .spyOn(history, "push")
            .mockImplementation(path => {});
        const component = mount(appBar);
        var wrapper = component.find("#settings-button");
        wrapper.hostNodes().simulate("click");
        // expect(wrapper.length).toBe(1);
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should redirect to profile page ", () => {
        const spyHistoryPush = jest
            .spyOn(history, "push")
            .mockImplementation(path => {});
        const component = mount(appBar);
        var wrapper = component.find("#profile-button");
        wrapper.hostNodes().simulate("click");
        // expect(wrapper.length).toBe(1);
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should redirect to main page ", () => {
        const spyHistoryPush = jest
            .spyOn(history, "push")
            .mockImplementation(path => {});
        const component = mount(appBar);
        var wrapper = component.find("#home-button");
        wrapper.hostNodes().simulate("click");
        // expect(wrapper.length).toBe(1);
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should redirect to create new question page ", () => {
        const spyHistoryPush = jest
            .spyOn(history, "push")
            .mockImplementation(path => {});
        const component = mount(appBar);
        var wrapper = component.find("#ask-button");
        wrapper.hostNodes().simulate("click");
        // expect(wrapper.length).toBe(1);
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should go to previous page when back button clicked", () => {
        const spyHistoryPush = jest
            .spyOn(history, "goBack")
            .mockImplementation(path => {});
        const wrapper = mount(appBar);
        let button = wrapper.find("#back-button");
        button.hostNodes().simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should handle menu when clicked", () => {
        const component = mount(appBar);
        const instance = component.find(AppBar);
        // const menuHandlerSpy = jest.spyOn(instance.instance(), "handleDrawer");
        var wrapper = component.find("#menu-button");
        wrapper.hostNodes().simulate("click");
        expect(wrapper.length).toBe(5);
        // expect(menuHandlerSpy).toHaveBeenCalledTimes(1);
    });

    xit("should call handleMenu() ", () => {
        const wrapper = shallow(<AppBar />);
        //wrapper.instance().handleMenu = jest.fn();
        //const instance = component.find(AppBar.WrappedComponent).instance();
        //const menuHandlerSpy = jest.spyOn(instance, 'handleMenu');
        var component = wrapper.find("#menu-button");
        wrapper.hostNodes().simulate("click");
        // expect(wrapper.length).toBe(1);
        //expect(wrapper.instance().handleMenu).toHaveBeenCalledTimes(1);
    });
});
