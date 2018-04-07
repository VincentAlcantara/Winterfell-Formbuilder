import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Modal, FormGroup } from 'react-bootstrap';
import { addConditionalQuestion } from '../../actions/winterfellFormBuilderActions';
import FieldGroup from '../InputTypes/FieldGroup';

class AddConditionalQuestionButton extends Component {
  static propTypes = {
    addConditionalQuestion: PropTypes.func.isRequired,
    currentQuestionSetIndex: PropTypes.number.isRequired,
    currentQuestionIndex: PropTypes.number.isRequired,
    questionOptionIndex: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      questionId: '',
      question: '',
      questionText: '',
      questionType: '',
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
    const { currentQuestionSetIndex, currentQuestionIndex, questionOptionIndex } = this.props;
    const { questionId, question, questionText, questionType } = this.state;
    this.props.addConditionalQuestion(
      currentQuestionSetIndex,
      currentQuestionIndex,
      questionOptionIndex,
      questionId,
      question,
      questionText,
      questionType,
    );
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Button
        className="btn btn-primary btn-block"
        onClick={() => {
          this.setState({ showModal: true });
        }}
      >add conditional question
        <Modal show={this.state.showModal}>
          <Modal.Header>
            <Modal.Title>Add a new conditional question to this question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup>
                <FieldGroup
                  id="questionId"
                  name="questionId"
                  label="Question ID"
                  onChange={this.onChange}
                  placeholder="(optional)"
                  value={this.state.questionId}
                />
              </FormGroup>
              <FormGroup>
                <FieldGroup
                  id="question"
                  name="question"
                  label="Enter Question"
                  onChange={this.onChange}
                  placeholder=""
                  value={this.state.question}
                />
              </FormGroup>
              <FormGroup>
                <FieldGroup
                  id="questionText"
                  name="questionText"
                  label="Enter Question Text"
                  onChange={this.onChange}
                  placeholder=""
                  value={this.state.questionText}
                />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              bsStyle="danger"
              onClick={() => { this.setState({ showModal: false }); }}
            >Cancel</Button>
            <Button
              bsStyle="primary"
              onClick={this.onFormUpdate}
            >Save changes</Button>
          </Modal.Footer>
        </Modal>
      </Button>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    currentQuestionSetIndex: state.getIn(['form', 'currentQuestionSetIndex']),
    currentQuestionIndex: state.getIn(['form', 'currentQuestionIndex']),
    questionOptionIndex: ownProps.questionOptionIndex,
  };
}
export default connect(mapStateToProps, { addConditionalQuestion })(AddConditionalQuestionButton);

