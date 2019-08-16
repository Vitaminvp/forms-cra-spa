import React from "react";
import PropTypes from "prop-types";
import { Button, ButtonGroup } from "@material-ui/core";

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentWillMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage(page) {
    const items = this.props.items;
    let pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    pager = this.getPager(items.length, page);

    // get new page of items from items array
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    this.setState({ pager: pager });

    // call change page function in parent component
    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 5
    pageSize = pageSize || 5;

    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = [...Array(endPage + 1 - startPage).keys()].map(
      i => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }

  render() {
    const pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }

    return (
      <ButtonGroup
          style={{marginTop: 15}}
        variant="contained"
        size="small"
        aria-label="small contained button group"
      >
        <Button
          disabled={pager.currentPage === 1 ? true : false}
          onClick={() => this.setPage(1)}
        >
          First
        </Button>
        <Button
          disabled={pager.currentPage === 1 ? true : false}
          onClick={() => this.setPage(pager.currentPage - 1)}
        >
          Previous
        </Button>
        {pager.pages.map((page, index) => (
          <Button
            key={index}
            style={pager.currentPage === page ? {backgroundColor: "#f50057", color: "white"} : {}}
            onClick={() => this.setPage(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          disabled={pager.currentPage === pager.totalPages ? true : false}
          onClick={() => this.setPage(pager.currentPage + 1)}
        >
          Next
        </Button>
        <Button
          disabled={pager.currentPage === pager.totalPages ? true : false}
          onClick={() => this.setPage(pager.totalPages)}
        >
          Last
        </Button>
      </ButtonGroup>
    );
  }
}

Pagination.propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
};

Pagination.defaultProps = {
  initialPage: 1,
};

export default Pagination;
