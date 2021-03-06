import { fromJS } from 'immutable';

import winterfellFormBuilderReducer from '../../src/reducers/winterfellFormBuilderReducer';
import * as constants from '../../src/common/constants';

/*
 * The format of the test should be:
 * expect(reducer(initialState, action).toEqual(nextState));
 */

describe('wintefellFormBuilderReducer', () => {
  const classes = constants.BOOTSTRAP_CLASSES;

  const initialState = fromJS({
    title: '',
    schema: {},
    currentPanelId: null,
    currentQuestionPanelIndex: 0,
    questionAnswers: {},
  });

  it('should return the initial state', () => {
    expect(winterfellFormBuilderReducer(undefined, {})).toEqual(initialState);
  });

  it('should add a formPanels array if action is CREATE_FORM_SUCCESS', () => {
    const currentAction = {
      type: constants.CREATE_FORM_SUCCESS,
      payload: { title: 'My Awesome Form' },
    };

    const expectedState = fromJS({
      title: 'My Awesome Form',
      schema: {
        classes,
        formPanels: [{
          index: 1,
          panelId: 'page-1',
        }],
        questionPanels: [{
          panelId: 'page-1',
          panelHeader: 'My Awesome Form - page-1',
          panelText: 'page-1 text',
          questionSets: [],
        }],
        questionSets: [],
      },
      currentPanelId: null,
      currentQuestionPanelIndex: 0,
      questionAnswers: {},
    });

    expect(winterfellFormBuilderReducer(initialState, currentAction)).toEqual(expectedState);
  });

  it('should update the error if action is CREATE_FORM_ERROR', () => {
    const currentAction = {
      type: constants.CREATE_FORM_ERROR,
      payload: { title: 'My Awesome Form' },
    };

    const expectedState = fromJS({
      title: '',
      schema: {},
      currentPanelId: null,
      currentQuestionPanelIndex: 0,
      questionAnswers: {},
    });

    expect(winterfellFormBuilderReducer(initialState, currentAction)).toEqual(expectedState);
  });

  it('should add a new page with default parameters if action is ADD_PAGE_SUCCESS and payload not supplied', () => {
    const currentAction = {
      type: constants.ADD_PAGE_SUCCESS,
      payload: {},
    };

    const beforeState = fromJS({
      title: 'My Awesome Form',
      schema: {
        formPanels: [
          {
            index: 1,
            panelId: 'page-1',
          },
        ],
        questionPanels: [
          {
            panelId: 'page-1',
            panelHeader: 'Survey Page 1',
            panelText: 'Let\'s grab some of your details',
            questionSets: [],
          },
        ],
        questionSets: [],
      },
      questionAnswers: {},
      currentPanelId: null,
    });

    const expectedState = fromJS({
      title: 'My Awesome Form',
      schema: {
        formPanels: [
          {
            index: 1,
            panelId: 'page-1',
          },
          {
            index: 2,
            panelId: 'page-2',
          },
        ],
        questionPanels: [
          {
            panelId: 'page-1',
            panelHeader: 'Survey Page 1',
            panelText: 'Let\'s grab some of your details',
            questionSets: [],
          }, {
            panelId: 'page-2',
            panelHeader: 'Page-Heading-2',
            panelText: 'Page-Text-2',
            questionSets: [],
          },
        ],
        questionSets: [],
      },
      questionAnswers: {},
      currentPanelId: null,
    });

    expect(winterfellFormBuilderReducer(beforeState, currentAction)).toEqual(expectedState);
  });

  it('should add a new page with payload parameters if action is ADD_PAGE_SUCCESS and payload supplied', () => {
    const currentAction = {
      type: constants.ADD_PAGE_SUCCESS,
      payload: {
        panelId: 'page-2',
        panelHeader: 'A New Page 2',
        panelText: 'This is a new page',
      },
    };

    const beforeState = fromJS({
      title: 'My Awesome Form',
      schema: {
        formPanels: [
          {
            index: 1,
            panelId: 'page-1',
          },
        ],
        questionPanels: [
          {
            panelId: 'page-1',
            panelHeader: 'Survey Page 1',
            panelText: 'Let\'s grab some of your details',
            questionSets: [],
          },
        ],
        questionSets: [],
      },
      questionAnswers: {},
      currentPanelId: null,
    });

    const expectedState = fromJS({
      title: 'My Awesome Form',
      schema: {
        formPanels: [
          {
            index: 1,
            panelId: 'page-1',
          },
          {
            index: 2,
            panelId: 'page-2',
          },
        ],
        questionPanels: [
          {
            panelId: 'page-1',
            panelHeader: 'Survey Page 1',
            panelText: 'Let\'s grab some of your details',
            questionSets: [],
          }, {
            panelId: 'page-2',
            panelHeader: 'A New Page 2',
            panelText: 'This is a new page',
            questionSets: [],
          },
        ],
        questionSets: [],
      },
      questionAnswers: {},
      currentPanelId: null,
    });

    expect(winterfellFormBuilderReducer(beforeState, currentAction)).toEqual(expectedState);
  });
});
