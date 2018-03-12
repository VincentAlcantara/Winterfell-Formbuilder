import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import { changeCurrentEditingField, editFormTitle } from '../../actions/winterfellFormBuilderActions';
import EditQuestionButton from '../FormMenu/EditQuestionButton';
import { FormPageEditor } from './FormPageEditor';
import { FormQuestionSetEditor } from './FormQuestionSetEditor';
// import {
//   FormPageEditor,
//   FormQuestionSetEditor,
//  } from './index';

class FormEditorContainer extends Component {
  static propTypes = {
    editFormTitle: PropTypes.func.isRequired,
    changeCurrentEditingField: PropTypes.func.isRequired,
    currentPanelIndex: PropTypes.number.isRequired,
    questionSets: PropTypes.array,
    questionPanels: PropTypes.array,
  };

  static defaultProps = {
    currentPanelId: PropTypes.string,
    questionPanels: null,
    questionSets: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      currentPanel: null,
      currentQuestionSets: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onFormUpdate = this.onFormUpdate.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  onClose(e) {
    e.preventDefault();
    this.setState({ showModal: true });
  }

  onFormUpdate(e) {
    e.preventDefault();
    this.props.editFormTitle(this.state.formTitle);
    this.setState({ showModal: false });
  }

  render() {
    const { currentPanelIndex, questionPanels, questionSets } = this.props;
    return (
      <Row>
        <Col xs={12}>
          { typeof currentPanelIndex !== 'undefined' &&
            <FormPageEditor
              questionPanels={questionPanels}
              currentPanelIndex={currentPanelIndex}
              onClick={() => this.props.changeCurrentEditingField('page')}
            />
          }
          { typeof currentPanelIndex !== 'undefined' &&
            questionPanels[currentPanelIndex] &&
            questionPanels[currentPanelIndex].questionSets &&
            <FormQuestionSetEditor
              currentQuestionSets={questionPanels[currentPanelIndex].questionSets}
              questionSets={questionSets}
              onClick={() => this.props.changeCurrentEditingField('questionSet')}
            />
          }
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    title: state.getIn(['form', 'title']),
    currentPanelId: state.getIn(['form', 'currentPanelId']),
    currentPanelIndex: state.getIn(['form', 'currentPanelIndex']),
    questionPanels: state.getIn(['form', 'schema', 'questionPanels']).toJS(),
    questionSets: state.getIn(['form', 'schema', 'questionSets']).toJS(),
    schema: state.getIn(['form', 'schema']),
  };
}

export default connect(
  mapStateToProps,
  { changeCurrentEditingField, editFormTitle },
)(FormEditorContainer);

