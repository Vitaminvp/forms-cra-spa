import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { contactsSelector, addFormData, setFormsData } from "../reducers/forms";
import AddForm from "../components/AddForm";
import getFormsAction from "../action/getForms";
import { LOADING_FORMS } from "../constants/loading";
import { isLoaded } from "../reducers/loading";
import { DragDropContext } from "react-beautiful-dnd";
import ShortList from "../components/List";

import { CssBaseline, Container } from "@material-ui/core";
import CircularDeterminate from "../components/CircularDeterminate";
import PrintPDF from "../components/PrintPDF";
import { langSelector } from "../reducers/lang";
import { withAuth } from "../services";
import Tooltip from "../components/ToolTip";
import Pagination from "../components/Pagination";

class FormsList extends Component {
  state = {
    pageOfItems: [],
  };

  onChangePage = pageOfItems => {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  };

  componentDidMount() {
    if (!this.props.isFormsLoaded) {
      this.props.getForms();
    }
  }
  onDragEnd = result => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const { forms } = this.props;
    const newForms = [...forms];
    const item = newForms.splice(source.index, 1);
    newForms.splice(destination.index, 0, item[0]);
    this.props.setFormsData(newForms);
  };
  render() {
    const { forms, value, addForm, isAuthorized } = this.props;

    if (!this.props.isFormsLoaded) {
      return <CircularDeterminate />;
    }
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Tooltip text="Downloading PDF file">
          <PrintPDF />
        </Tooltip>
        <CssBaseline />
        <Container
          maxWidth="sm"
          style={{
            background: "#eaeaea",
            padding: 20,
            borderRadius: 5,
            marginBottom: 20,
          }}
        >
          <ShortList forms={this.state.pageOfItems} isAuthorized={isAuthorized} />

          <Pagination items={forms} onChangePage={this.onChangePage} />

          {isAuthorized && <AddForm onAddForm={addForm} val={value} />}
        </Container>
      </DragDropContext>
    );
  }
}
FormsList.propTypes = {
  forms: PropTypes.array,
  lang: PropTypes.object,
  getForms: PropTypes.func,
  addForm: PropTypes.func,
  isFormsLoaded: PropTypes.bool,
  isAuthorized: PropTypes.bool,
  setFormsData: PropTypes.func,
};

const mapStateToProps = state => ({
  forms: contactsSelector(state),
  isFormsLoaded: isLoaded(state, LOADING_FORMS),
  lang: langSelector(state),
});

const mapDispatchToProps = {
  addForm: addFormData,
  getForms: getFormsAction,
  setFormsData,
};

export default withAuth(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FormsList)
);
