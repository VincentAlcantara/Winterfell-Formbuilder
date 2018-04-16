import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Winterfell from 'winterfell';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { updateQuestionAnswers } from '../actions/winterfellFormBuilderActions';
import { DateInputType, AddressInputType } from '../components/InputTypes';

const onRenderDefault = () => {
  console.log('Great news! Winterfell rendered successfully');
};

const onSwitchPanelDefault = (panel) => {
  console.log(`Moving on to the panel that is identified as ${panel.panelId}`);
};

const onSubmitDefault = (questionAndAnswers, target) => {
  console.log('Form submitted!', questionAndAnswers);
  console.log('-----');
  console.log('For this example, we disabled normal form submission functionality. ');
  console.log('-----');
  console.log('Target: ', target);
  console.log('-----');
  alert('Submitted. Check the console to see the answers!');
};

class Previewer extends Component {
  static propTypes = {
    currentPanelId: PropTypes.string,
    schema: PropTypes.object.isRequired,
    onRender: PropTypes.func,
    updateQuestionAnswers: PropTypes.func,
    onSubmit: PropTypes.func,
    onSwitchPanel: PropTypes.func,
    questionAnswers: PropTypes.object,
  };

  static defaultProps = {
    currentPanelId: null,
    schema: {},
    onRender: onRenderDefault,
    onSubmit: onSubmitDefault,
    onSwitchPanel: onSwitchPanelDefault,
    questionAnswers: {},
    onUpdate: () => {},
    updateQuestionAnswers: () => {},
  };

  constructor(props) {
    super(props);
    this.onUpdateQuestionAnswers = this.onUpdateQuestionAnswers.bind(this);
  }

  onUpdateQuestionAnswers = (questionAndAnswers) => {
    console.log('Question Updated! The current set of answers is: ', questionAndAnswers);
    this.props.updateQuestionAnswers(questionAndAnswers);
  };

  render() {
    const {
      schema,
      currentPanelId,
      onRender,
      onSwitchPanel,
      onSubmit,
      questionAnswers,
    } = this.props;

    Winterfell.addInputTypes({ DateInputType, AddressInputType });
    const displayWinterFellForm = () => (
      schema.formPanels.map((formPanel, index) => (
        (formPanel.panelId === currentPanelId &&
          <Winterfell
            schema={schema}
            disableSubmit
            onRender={onRender}
            onUpdate={this.onUpdateQuestionAnswers}
            onSwitchPanel={onSwitchPanel}
            onSubmit={onSubmit}
            questionAnswers={questionAnswers}
            panelId={currentPanelId}
            key={index}
          />)
          ||
        (currentPanelId === 'Select Page' &&
          <Winterfell
            schema={schema}
            disableSubmit
            onRender={onRender}
            onUpdate={this.onUpdate}
            onSwitchPanel={onSwitchPanel}
            onSubmit={onSubmit}
            questionAnswers={questionAnswers}
          />)
      ))
    );

    return (
      <Row className="winterfell-form-builer-previewer" >
        <Col xs={12}>
          {(schema &&
            schema.formPanels &&
            schema.formPanels.length > 0) &&
            currentPanelId &&
            currentPanelId !== 'Select Page' &&
            displayWinterFellForm()
          }
        </Col>
      </Row>
    );
  }
}

export default connect(null, { updateQuestionAnswers })(Previewer);

