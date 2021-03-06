import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import { editNextButtonText, disableBackButton, editBackButtonText, onSelectNextButtonAction, onSelectNextButtonTarget } from '../../actions/winterfellFormBuilderActions';
import SelectInput from '../InputTypes/SelectInput';

import FieldGroup from '../InputTypes/FieldGroup';

class ButtonBarEditor extends PureComponent {
  constructor(props) {
    super(props);
    const { backButtonText, nextButtonText, defaultGoToAction, defaultGoToTarget } = props;

    this.state = {
      backButtonText,
      nextButtonText,
      defaultGoToAction,
      defaultGoToTarget,
    };

    this.onChangeBackButtonText = this.onChangeBackButtonText.bind(this);
    this.onChangeNextButtonText = this.onChangeNextButtonText.bind(this);
    this.onChangeNextButtonTargetText = this.onChangeNextButtonTargetText.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSelectDefaultAction = this.onSelectDefaultAction.bind(this);
    this.onSelectDefaultTarget = this.onSelectDefaultTarget.bind(this);
    this.onDisableBackButtonClick = this.onDisableBackButtonClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      backButtonText: nextProps.backButtonText,
      nextButtonText: nextProps.nextButtonText,
      defaultGoToAction: nextProps.defaultGoToAction,
      defaultGoToTarget: nextProps.defaultGoToTarget,
    };
  }

  onChangeBackButtonText(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.props.editBackButtonText(this.props.currentQuestionPanelIndex, event.target.value);
  }

  onChangeNextButtonText(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.props.editNextButtonText(this.props.currentQuestionPanelIndex, event.target.value);
  }

  onChangeNextButtonTargetText(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.props.onSelectNextButtonTarget(this.props.currentQuestionPanelIndex, event.target.value);
  }

  onClick(questionSetId) {
    const questionSetIndex = this.props.formPanels.findIndex(questionSet => questionSet.get('questionSetId') === questionSetId);
    this.props.onSelectNextButtonAction('questionSet', questionSetIndex);
  }

  onSelectDefaultAction(action) {
    this.setState({ defaultGoToAction: action });
    this.props.onSelectNextButtonAction(this.props.currentQuestionPanelIndex, action);
  }

  onSelectDefaultTarget(target) {
    this.setState({ defaultGoToTarget: target });
    this.props.onSelectNextButtonTarget(this.props.currentQuestionPanelIndex, target);
  }

  onDisableBackButtonClick() {
    this.props.disableBackButton(this.props.currentQuestionPanelIndex,
      !this.props.backButtonDisabled);
  }

  formPanelIds() {
    const formPanelsArray = this.props.formPanels.toJS();
    return formPanelsArray.map(formPanel => ({
      text: formPanel.panelId,
      value: formPanel.panelId,
    }));
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <FieldGroup
            id="backButtonText"
            name="backButtonText"
            label="Back Button Text"
            onChange={this.onChangeBackButtonText}
            placeholder={this.props.backButtonText}
            value={this.state.backButtonText}
          />
        </div>
        <div className="form-group">
          <span htmlFor="disable-back-button" id="disable-back-button-label">
            <input
              id="disable-back-button"
              type="checkbox"
              onClick={this.onDisableBackButtonClick}
              checked={this.props.backButtonDisabled}
            />
            &nbsp;disable back button
          </span>
        </div>
        <div className="form-group">
          <FieldGroup
            id="nextButtonText"
            name="nextButtonText"
            label="Next Button Text"
            placeholder={this.props.nextButtonText}
            onChange={this.onChangeNextButtonText}
            value={this.state.nextButtonText}
          />
        </div>
        <div className="form-group">
          <label htmlFor="goToAction">
            Default Next Button Option
          </label>
          <SelectInput
            id="goToAction"
            labelId="goToAction"
            options={[{
              text: 'SUBMIT',
              value: 'SUBMIT',
            }, {
              text: 'GOTO',
              value: 'GOTO',
            }]}
            onSelect={this.onSelectDefaultAction}
            displayValue={this.props.defaultGoToAction}
          />
        </div>
        { this.state.defaultGoToAction === 'GOTO' &&
          <div className="form-group">
            <label htmlFor="goToPanel">
              Default Next Button Target
            </label>
            <SelectInput
              id="goToPanel"
              labelId="goToPanel"
              options={this.formPanelIds()}
              onSelect={this.onSelectDefaultTarget}
              displayValue={this.props.defaultGoToTarget}
            />
          </div>
        }
        { this.state.defaultGoToAction === 'SUBMIT' &&
          <FieldGroup
            id="defaultGoToTarget"
            name="defaultGoToTarget"
            label="Submit Target"
            placeholder={this.props.defaultGoToTarget}
            onChange={this.onChangeNextButtonTargetText}
            value={this.state.defaultGoToTarget}
          />
        }
      </div>
    );
  }
}

ButtonBarEditor.propTypes = {
  editNextButtonText: PropTypes.func.isRequired,
  backButtonDisabled: PropTypes.bool,
  editBackButtonText: PropTypes.func.isRequired,
  disableBackButton: PropTypes.func.isRequired,
  onSelectNextButtonAction: PropTypes.func.isRequired,
  onSelectNextButtonTarget: PropTypes.func.isRequired,
  backButtonText: PropTypes.string,
  nextButtonText: PropTypes.string,
  formPanels: PropTypes.object,
  currentQuestionPanelIndex: PropTypes.number.isRequired,
  defaultGoToAction: PropTypes.string,
  defaultGoToTarget: PropTypes.string,
};

ButtonBarEditor.defaultProps = {
  currentQuestionPanelIndex: 0,
  backButtonText: '',
  backButtonDisabled: false,
  nextButtonText: '',
  formPanels: fromJS({}),
  defaultGoToAction: '',
  defaultGoToTarget: '',
};

function mapStateToProps(state, ownProps) {
  return {
    backButtonText: state.getIn(['form', 'schema', 'questionPanels', ownProps.currentQuestionPanelIndex, 'backButton', 'text']),
    backButtonDisabled: state.getIn(['form', 'schema', 'questionPanels', ownProps.currentQuestionPanelIndex, 'backButton', 'disabled']),
    nextButtonText: state.getIn(['form', 'schema', 'questionPanels', ownProps.currentQuestionPanelIndex, 'button', 'text']),
    defaultAction: state.getIn(['form', 'schema', 'questionPanels', ownProps.currentQuestionPanelIndex, 'action', 'default']),
    conditionalActions: state.getIn(['form', 'schema', 'questionPanels', ownProps.currentQuestionPanelIndex, 'action', 'conditions']),
    formPanels: state.getIn(['form', 'schema', 'formPanels']),
    defaultGoToAction: state.getIn(['form', 'schema', 'questionPanels', ownProps.currentQuestionPanelIndex, 'action', 'default', 'action']),
    defaultGoToTarget: state.getIn(['form', 'schema', 'questionPanels', ownProps.currentQuestionPanelIndex, 'action', 'default', 'target']),
  };
}

export default connect(mapStateToProps, {
  editNextButtonText,
  editBackButtonText,
  onSelectNextButtonAction,
  onSelectNextButtonTarget,
  disableBackButton,
})(ButtonBarEditor);

