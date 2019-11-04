import React from 'react';
import {shallow, mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/questionActions';
import thunk from 'redux-thunk';
import Main from './Main.js';
import Question from '../../components/Question/Question';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  question: {
    questions: [{id:1, author:"me", publish_date_time:"2019", content:"rain?", 
                 location:"home", is_answered:false}]
  },
  auth: {
    username: '',
    password: '',
  },
  router: history
});

describe('<Main />', () => {
  let main;

  beforeEach(() => {
    main = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact component={Main} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  })

  it('should render without errors', () => {
    const spySignIn = jest.spyOn(actionCreators, 'getQuestions')
      .mockImplementation(() => { return dispatch => {}; });
    const wrapper = mount(main);
    expect(wrapper.find(".QuestionList").length).toBe(1);
  });

  it('should go to reply page when clickAnswerHandler', () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation(path => {});
    const wrapper = mount(main);
    const instance = wrapper.find(Main.WrappedComponent).instance();
    const m = jest.spyOn(instance, 'clickAnswerHandler');
    let button = wrapper.find('Question');
    wrapper.find('Question').props().clickAnswer();
    //button.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    expect(m).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith("/reply/1");
  });

  it('should go to ask page when clickNewQuestionHandler', () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation(path => {});
    const wrapper = mount(main);
    let button = wrapper.find('#question-create-button');
    button.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith("/ask");
  });

  it('should go to previous page when click back', () => {
    const spyHistoryPush = jest.spyOn(history, 'goBack')
      .mockImplementation(path => {});
    const wrapper = mount(main);
    let button = wrapper.find('#back-button');
    button.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should go to settings page when clickNewQuestionHandler', () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation(path => {});
    const wrapper = mount(main);
    let button = wrapper.find('#settings-button');
    button.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith("/settings");
  });


});