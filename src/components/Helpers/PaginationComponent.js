import React, { Component } from 'react';
import {
  Input, Button, Spinner,
  Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import { connect } from 'react-redux';

import {
} from 'store/actions/helpers/displayAction';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

const Page = (props) => {
  return (
    <PaginationItem active={props.isActive} onClick={props.onClick}>
      <PaginationLink>
        {props.display}
      </PaginationLink>
    </PaginationItem>
  )
}

class PaginationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      previousPage: 0,
      limit: 10,
    };

    this.SelectPage = this.SelectPage.bind(this);
    this.setDataLimit = this.setDataLimit.bind(this);
  }

  SetPage(page, prev) {
    if (this.state.currentPage != page) {

      if (this.props.hasOwnProperty("onChange")) {
        this.props.onChange(page, "page");
      }

      this.props.callback(page, this.state.limit);
      this.setState({
        currentPage: page,
        previousPage: prev,
      });
    }

  }

  SelectPage(e) {
    var page = e.target.innerText;
    var pageCount = Math.ceil(this.props.pageCount);
    var current = this.state.currentPage * 1;
    if (e.target.nodeName == "I") {
      page = e.target.className.split(" ").pop();
    }

    if (page == "Next") {
      page = current + (((pageCount == current) ? 0 : 1) * 1);
    } else if (page == "Previous") {
      page = current - (((pageCount == 1) ? 0 : 1) * 1);
    }
    this.SetPage(page, this.state.currentPage * 1);

  }


  CreatePaginations(page) {
    let pages = [];
    var pageCount = Math.ceil(this.props.pageCount);
    var diff = 0;

    if (pageCount <= 5) {
      for (var x = 0; x < pageCount; x++) {

        pages.push(
          <Page
            isActive={(page == x + 1) ? "active" : ""}
            display={x + 1}
            onClick={this.SelectPage}
          />
        );

      }
    } else {
      if (page > 3) {
        pages.push(
          <Page
            isActive={(page == 1) ? "active" : ""}
            display={1}
            onClick={this.SelectPage}
          />
        );
        pages.push(
          <Page
            display={"..."}
          />
        );
      }

      if (page <= 3) {
        for (var x = 0; x < 5; x++) {
          pages.push(
            <Page
              isActive={(page == x + 1) ? "active" : ""}
              display={x + 1}
              onClick={this.SelectPage}
            />
          );
        }
      } else {
        diff = pageCount - page;

        if (diff < 5) {

          for (var x = ((page * 1) - (5 - (diff * 1))); x < ((page * 1) + (diff * 1)); x++) {
            pages.push(
              <Page
                isActive={(page == x + 1) ? "active" : ""}
                display={x + 1}
                onClick={this.SelectPage}
              />
            );
          }


        } else {

          for (let x = -2; x < 3; x++) {
            pages.push(
              <Page
                isActive={(page == ((page * 1) + x)) ? "active" : ""}
                display={(page * 1) + x}
                onClick={this.SelectPage}
              />
            );

          }


          // for (var x = (page - 3); x < (page + 2); x++) {
          //   pages.push(
          //     <Page
          //       isActive={(page == x + 1) ? "active" : ""}
          //       display={x + 1}
          //       onClick={this.SelectPage}
          //     />
          //   );
          // }
        }
      }

      if (page < pageCount - 4) {
        pages.push(
          <Page
            display={"..."}
          />
        );
        pages.push(
          <Page
            isActive={(pageCount == page) ? "active" : ""}
            display={pageCount}
            onClick={this.SelectPage}
          />
        );
      }

    }


    return pages;
  }

  setDataLimit(e) {
    var val = e.target.value * 1;
    this.setState({
      limit: val
    })
    this.props.onChange(val, "limit");
  }

  render() {

    if (this.props.page) {
      if (this.state.currentPage != this.props.page) {
        this.setState({
          currentPage: this.props.page
        })
      }
    }

    return (
      <div id="user-act-pagination">
        <Pagination
          className="pagination justify-content-end mb-0"
          listClassName="justify-content-end mb-0"
          size="md" aria-label="Page navigation example"
        >
          <input type="text" id="page-limit-input" value={this.state.limit} onChange={this.setDataLimit} />
          <PaginationItem onClick={this.SelectPage}>
            <PaginationLink
              onClick={this.SelectPage}
              tabIndex="-1"
            >
              <i className="fas fa-angle-left Previous" />
              <span className="sr-only">Previous</span>
            </PaginationLink>
          </PaginationItem>

          {this.CreatePaginations(this.state.currentPage)}

          <PaginationItem onClick={this.SelectPage}>
            <PaginationLink
              onClick={this.SelectPage}
            >
              <i className="fas fa-angle-right Next" />
              <span className="sr-only">Next</span>
            </PaginationLink>
          </PaginationItem>
          <span className="count" onClick={() => {
            this.setDataLimit({ target: { value: this.props.count } })
            this.props.callback(1, this.props.count)
          }}>
            Total: {this.props.count}
          </span>
        </Pagination>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
})(PaginationComponent);
