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
import SearchIcon from "@material-ui/icons/Search";
import {
  CssBaseline,
  Container,
  InputBase,
  Paper,
  IconButton
} from "@material-ui/core";
import CircularDeterminate from "../components/CircularDeterminate";
import PrintPDF from "../components/PrintPDF";
import { langSelector } from "../reducers/lang";
import { withAuth } from "../services";
import Tooltip from "../components/ToolTip";
import Pagination from "../components/Pagination";
import { FORMS_PER_PAGE } from "../constants/common";
import { loadState, saveState } from "../localStorage";
import {setEdit} from "../reducers/edit";

class FormsList extends Component {
  constructor(props) {
    super(props);

    const preLoadedState = loadState("pagination");
    if (!preLoadedState) {
      this.state = {
        allForms: [],
        currentForms: [],
        currentPage: null,
        totalPages: null
      };
    } else {
      this.state = { ...preLoadedState };
    }
  }

  onPageChanged = data => {
    const { allForms } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentForms = allForms.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentForms, totalPages });
  };

  static getDerivedStateFromProps(props, state) {
    if (!state.allForms.length) {
      return {
        allForms: props.forms
      };
    }
    return null;
  }

  componentDidMount() {
    if (!this.props.isFormsLoaded) {
      this.props.getForms();
    }
    this.setState({ allForms: this.props.forms });
  }

  onDragEnd = result => {
    const { destination, source } = result;
    console.log({ result });

    const { currentPage, currentForms } = this.state;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const { forms } = this.props;
    const { allForms } = this.state;
    const newForms = [...forms];
    const newCurrentForms = [...currentForms];

    if (allForms.length === forms.length) {
      const src =
        currentPage <= 1
          ? source.index
          : source.index + FORMS_PER_PAGE * (currentPage - 1);
      const dest =
        currentPage <= 1
          ? destination.index
          : destination.index + FORMS_PER_PAGE * (currentPage - 1);

      const item = newForms.splice(src, 1);
      newForms.splice(dest, 0, item[0]);
      this.props.setFormsData(newForms);
    }

    const currentItem = newCurrentForms.splice(source.index, 1);
    newCurrentForms.splice(destination.index, 0, currentItem[0]);

    this.setState({ currentForms: newCurrentForms });
  };

  handleSearch = e => {
    const { forms } = this.props;

    const newForms = forms.filter(item =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    const currentForms =
      newForms.length > FORMS_PER_PAGE
        ? newForms.slice(0, FORMS_PER_PAGE)
        : [...newForms];

    this.setState({
      allForms: newForms,
      currentPage: 1,
      currentForms
    });
  };

  componentWillUnmount() {
    saveState(this.state, "pagination");
  }

  render() {
    const { value, addForm, isAuthorized, setEdit } = this.props;
    const { allForms, currentForms, currentPage } = this.state;
    const totalForms = allForms.length;

    if (!this.props.isFormsLoaded) {
      return <CircularDeterminate />;
    }
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Tooltip text="Downloading PDF file">
          <PrintPDF />
        </Tooltip>

        <Paper style={{ maxWidth: 250, margin: "10px auto" }}>
          <InputBase
            placeholder="Search forms"
            inputProps={{ "aria-label": "search forms" }}
            onChange={this.handleSearch}
          />
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

        <CssBaseline />
        <Container
          maxWidth="sm"
          style={{
            background: "#eaeaea",
            padding: 20,
            borderRadius: 5,
            marginBottom: 20
          }}
        >
          <ShortList forms={currentForms} isAuthorized={isAuthorized} setEdit={setEdit} />
          {currentForms.length > 0 ? (
            <Pagination
              currentPage={currentPage}
              totalRecords={totalForms}
              pageLimit={FORMS_PER_PAGE}
              pageNeighbours={1}
              onPageChanged={this.onPageChanged}
            />
          ) : null}

          {isAuthorized && (
            <div>
              <Tooltip text="Add new form">
                <AddForm onAddForm={addForm} val={value} />
              </Tooltip>
            </div>
          )}
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
  setFormsData: PropTypes.func
};

const mapStateToProps = state => ({
  forms: contactsSelector(state),
  isFormsLoaded: isLoaded(state, LOADING_FORMS),
  lang: langSelector(state)
});

const mapDispatchToProps = {
  addForm: addFormData,
  getForms: getFormsAction,
  setFormsData,
  setEdit
};

export default withAuth(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FormsList)
);
