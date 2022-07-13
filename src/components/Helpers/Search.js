import React, { Component } from 'react';
import { Input, Badge } from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
import { connect } from 'react-redux';
import {
  SearchData,
  GetSearchDetail,
  SelectSearchOption,
} from 'store/actions/helpers/searchAction';

import {
  ArrangeName
} from 'store/actions/helpers/displayAction.js';

import {
  SET_SEARCH_DATA
} from 'store/types.js';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: (props.options[0]) ? props.options[0].value : null,
      keyword: "",
      typeText: (props.options[0]) ? props.options[0].text : null,
      keywordText: "",
    };

    // props.SearchData(this.props.suggest, (props.options[0])?props.options[0].value:null, "type");
  }

  async ChangeSearchKey(value, type) {
    await this.setState({
      [type]: value
    })

    if (this.props.hasOwnProperty("onChange")) {
      this.props.onChange(value, type);
    }

    if (value === "") {
      this.props.SelectSearchOption(this.props.reducer_empty, undefined, this.props.listPage);
    } else {

      // var allFilter = {...this.props.filter};

      // for (let x = 0, len = this.props.searchFilters.length; x < len; x++) {
      //   allFilter = {
      //     ...allFilter,
      //     [this.props.searchFilters.type]: this.props.searchFilters.keyword,
      //   };
      // }


      if (!this.props.hasOwnProperty("triggerSearchOnChange") || this.props.triggerSearchOnChange == true) {
        this.props.SearchData(this.props.suggest, this.props.api, this.state.type, this.state.keyword, this.props.reducer, this.props.reducer_empty, this.props.select, this.props.filter, this.props.sort);
      }

    }

  }

  componentWillMount() {
  }

  render() {
    return (
      <div id="search" style={this.props.style}>

        <div id="select-keyword-div">

          <div class="input-group mb-4">
            <Input type="select" onChange={(inpt) => {
              var label = "";
              for (let x = 0; x < inpt.target.childNodes.length; x++) {
                if (inpt.target.childNodes[x].selected == true) {
                  label = inpt.target.childNodes[x].label;
                }
              }
              this.setState({
                typeText: label
              })

              this.ChangeSearchKey(inpt.target.value, "type");
            }}>
              {
                this.props.options.map(({ value, text }, i) => (
                  <option key={"ssok-" + i} value={value}>{text}</option>
                ))
              }
            </Input>
            {
              (this.props.hasOwnProperty("options2") && this.props.options2 && this.props.options2.hasOwnProperty(this.state.type))
                ? <Input type="select" onChange={(inpt) => {
                  if (inpt.target.value === "" && this.props.suggest) {
                    this.props.SelectSearchOption(this.props.reducer);
                  }
                  this.ChangeSearchKey(inpt.target.value, "keyword");

                  var label = "";
                  for (let x = 0; x < inpt.target.childNodes.length; x++) {
                    if (inpt.target.childNodes[x].selected == true) {
                      label = inpt.target.childNodes[x].label;
                    }
                  }
                  this.setState({
                    keywordText: label
                  })
                }} value={this.state.keyword}>
                  {
                    this.props.options2[this.state.type].map(({ value, text }, i) => (
                      <option key={"sso2k-" + i} value={value}>{text}</option>
                    ))
                  }
                </Input>
                : <input class="form-control" value={this.state.keyword} type="text" placeholder="Search"
                  onChange={(inpt) => {
                    if (inpt.target.value === "" && this.props.suggest) {
                      this.props.SelectSearchOption(this.props.reducer);
                    }

                    this.ChangeSearchKey(inpt.target.value, "keyword");

                    this.setState({
                      keywordText: inpt.target.value
                    })

                  }}
                />
            }

            {
              this.props.hasOwnProperty("addFilter")
                ? <span style={{ borderRadius: "0" }} class="input-group-text clickable" onClick={() => {
                  if (this.state.keywordText != "") {
                    this.props.addFilter(this.state.type, this.state.keyword, this.state.typeText, this.state.keywordText)
                    this.setState({
                      keyword: "",
                      keywordText: "",
                    });
                  }

                }}>
                  <i class="ni ni-fat-add"></i>
                </span>
                : null
            }
            <span style={{ borderLeft: "0", borderRadius: "0", borderTopRightRadius: "00.375rem", borderBottomRightRadius: "00.375rem" }} class="input-group-text clickable" onClick={() => {
              this.props.SearchData(this.props.suggest, this.props.api, this.state.type, this.state.keyword, this.props.reducer, this.props.reducer_empty, this.props.select, this.props.filter, this.props.sort);
            }}>
              <FaSearch className="clickable" />
            </span>

          </div>
     

        </div>

        {
          (this.props.suggest && (this.props.searchR && this.props.searchR.suggestions.length > 0))
            ? <div id="suggestions">
              {
                this.props.searchR.suggestions.map((data, i) => (
                  <div key={"ssk-" + i} className="row" id="suggestion" onClick={() => {
                    this.props.GetSearchDetail("customer/getdata", data._id, this.props.reducer, (dispatch) => {
                      dispatch({
                        type: SET_SEARCH_DATA
                      })
                    });
                  }}>
                    {
                      this.props.suggest.display(data)
                    }
                  </div>
                ))
              }
            </div>
            : null
        }

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchR: state.search
})

export default connect(mapStateToProps, {
  SearchData,
  ArrangeName,
  GetSearchDetail,
  SelectSearchOption
})(Search);
