import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  fieldLength,
  formSelector,
  resetForm,
  addHistory,
  formHistoryLength,
  ratingSelector,
  setVote
} from "../reducers/selectedForm";
import { withRouter } from "react-router-dom";
import getFormAction from "../action/getForm";
import putFormAction from "../action/putForm";
import { isLoaded, resetLoading } from "../reducers/loading";
import { LOADING_FORM } from "../constants/loading";
import TextPure from "../components/elements/Text";
import NumberPure from "../components/elements/Number";
import DropdownPure from "../components/elements/Dropdown";
import CheckMarkPure from "../components/elements/Checkmark";
import { FIELD_TYPES } from "../constants/selectedForm";
import { Container, Button } from "@material-ui/core";
import { Save as SaveIcon } from "@material-ui/icons";
import CustomizedDialogs from "../components/ModalHistory";
import { FormattedMessage } from "react-intl";
import StarRating from "../components/StarRating";
import { withAuth } from "../services";
import Tooltip from "../components/ToolTip";

class FormFill extends Component {
  state = {};

  fillState = () => {
    const {
      form: { fields }
    } = this.props;

    if (Array.isArray(fields)) {
      fields.forEach(field => {
        if (field.type === FIELD_TYPES.DROPDOWN) {
          if (!this.state[field.name])
            this.setState({ [field.name]: field.items[field.default].name });
        } else if (field.type === FIELD_TYPES.CHECKMARK) {
          if (!this.state[field.name]) this.setState({ [field.name]: false });
        }
      });
    }
  };

  componentDidMount() {
    const { formId } = this.props.match.params;

    if (!this.props.isFormLoaded) {
      this.props.getForm(formId);
    }

    this.fillState();
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value }, () =>
      console.log("this.state", this.state)
    );
  };

  render() {
    const {
      form,
      match,
      close,
      history,
      fieldsLength,
      putForm,
      resetLoading,
      addStateToHistory,
      historyLength,
      rating,
      vote
    } = this.props;
    if (!form) return null;
    const {
      params: { formId }
    } = match;

    const isFilled = Object.keys(this.state).length;
    return (
      <React.Fragment>
        <Container
          maxWidth="sm"
          style={{
            background: "#eaeaea",
            padding: 20,
            borderRadius: 5,
            textAlign: "center",
            marginTop: 50
          }}
        >
          <h1>Form #{formId}</h1>
          <Tooltip text="Simple tooltip: Header H2">
            <h2>{form.name}</h2>
          </Tooltip>
          <StarRating rating={rating || 0} vote={vote || 0} />
          {form.fields.map((field, key) => {
            const props = {
              field,
              key,
              fieldsLength
            };
            switch (field.type) {
              case FIELD_TYPES.TEXT:
                return (
                  <TextPure
                    {...props}
                    handleChange={this.handleChange}
                    value={this.state[field.name] ? this.state[field.name] : ""}
                  />
                );
              case FIELD_TYPES.NUMBER:
                return (
                  <NumberPure
                    {...props}
                    handleChange={this.handleChange}
                    value={this.state[field.name] ? this.state[field.name] : ""}
                  />
                );
              case FIELD_TYPES.DROPDOWN:
                return (
                  <React.Fragment key={key}>
                    {field.items && field.items.length && (
                      <DropdownPure
                        {...props}
                        handleChange={this.handleChange}
                        value={
                          this.state[field.name]
                            ? this.state[field.name]
                            : field.items[field.default].name
                        }
                      />
                    )}
                  </React.Fragment>
                );
              case FIELD_TYPES.CHECKMARK:
                return (
                  <CheckMarkPure
                    {...props}
                    handleChange={this.handleChange}
                    checked={
                      this.state[field.name] ? !!this.state[field.name] : false
                    }
                  />
                );
              default:
                return <div key={key}>{`Unhandled type: ${field.type}`}</div>;
            }
          })}
          <div style={{ margin: "50px 0 30px" }}>
            <Button
              variant="outlined"
              size="medium"
              color="primary"
              style={{ marginRight: 10 }}
              onClick={() => {
                resetLoading(LOADING_FORM);
                close();
                history.push("/");
              }}
            >
              <FormattedMessage id="cancel" defaultMessage="Cancel" />
            </Button>

            <CustomizedDialogs
              history={form.history ? form.history : []}
              disabled={historyLength <= 0}
            >
              <FormattedMessage id="historyTables" defaultMessage="History" />
            </CustomizedDialogs>

            <Button
              disabled={fieldsLength > isFilled}
              variant="contained"
              size="medium"
              color="primary"
              onClick={() => {
                addStateToHistory({ ...this.state, id: Date.now() });
                putForm(formId, form);
                history.push("/");
              }}
            >
              <SaveIcon />
              &nbsp;
              <FormattedMessage id="save" defaultMessage="Save" />
            </Button>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

FormFill.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  putForm: PropTypes.func,
  resetLoading: PropTypes.func,
  addStateToHistory: PropTypes.func,
  historyLength: PropTypes.number,
  rating: PropTypes.number,
  vote: PropTypes.func,
  form: PropTypes.object,
  close: PropTypes.func
};

const mapStateToProps = state => ({
  form: formSelector(state),
  isFormLoaded: isLoaded(state, LOADING_FORM),
  fieldsLength: fieldLength(state),
  historyLength: formHistoryLength(state),
  rating: ratingSelector(state)
});

const mapDispatchToProps = {
  close: resetForm,
  resetLoading,
  getForm: getFormAction,
  putForm: putFormAction,
  addStateToHistory: addHistory,
  vote: setVote
};

export default withAuth(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(FormFill)
  )
);
