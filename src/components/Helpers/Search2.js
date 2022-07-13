import React, { Component } from 'react';
import { Input, Button, Spinner } from 'reactstrap';
import {FaCheckCircle, FaTimesCircle} from 'react-icons/fa';
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
} from 'store/actions/types.js';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: (props.options[0])?props.options[0].value:null,
      keyword: "",
    };

    // props.SearchData(this.props.suggest, (props.options[0])?props.options[0].value:null, "type");
  }

  async ChangeSearchKey (value, type) {
    await this.setState({
      [type]: value
    })

    if (this.props.hasOwnProperty("onChange")) {
      this.props.onChange(value, type);      
    }

    var minCharr = (this.props.hasOwnProperty("minChar"))?this.props.minChar:2;
    
    if (value.length >= minCharr) {
      this.props.SearchData(this.props.suggest, this.props.api, this.state.type, this.state.keyword, this.props.reducer, this.props.reducer_empty, this.props.select, this.props.filter, this.props.sort);
    }

}

  componentWillMount(){
  }

  render() {

    var displaySelectOptions = (this.props.hasOwnProperty("displaySelectOptions"))?this.props.displaySelectOptions:true;
    return (
      <div id="search">
        <span>{this.props.title}</span>
        <div className="row">
          {
            (displaySelectOptions)
              ?<div className="col-md-4 type">
                <Input type="select" onChange={(inpt) => {
                  this.ChangeSearchKey(inpt.target.value, "type");
                }}>
                  {
                    this.props.options.map(({value, text}, i) => (
                      <option value={value}>{ text }</option>
                    ))
                  }
                </Input>
              </div>
            :""
          }

          <div className={(displaySelectOptions)?"col-md-8":"col-md-12"}>
            <Input className="search-2" placeholder="Search" type="text" onChange={async (inpt) => {
              if (inpt.target.value !== "" && this.props.suggest){
                this.props.SelectSearchOption(this.props.reducer);
              }
              this.ChangeSearchKey(inpt.target.value, "keyword");
              // alert(inpt.nativeEvent.inputType);
              // if naay clearAll
              if (inpt.nativeEvent.inputType == "deleteContentBackward" && this.props.hasOwnProperty("ClearText")) {
                var respone = this.props.ClearText();
                if (respone == undefined || (respone != undefined && respone.clearAll)) {
                  this.setState({
                    keyword: ""
                  });                    
                }
              }

            }} value={(this.props.hasOwnProperty("value") && this.props.value != "")?this.props.value:this.state.keyword}/>
            {
              (this.props.suggest && this.props.searchR.suggestions.length > 0 && this.state.keyword != "")
                ?<div id="suggestions" style={{width:"100%"}}>
                  {
                    this.props.searchR.suggestions.map((data, i) => (
                      <div className="row" id="suggestion" onClick={() => {
                        // this.props.SelectSearchOption(this.props.reducer, data);
                        // this.ChangeSearchKey(this.props.ArrangeName(data.personalDetail.name), "keyword");
                        this.props.GetSearchDetail("customer/getdata", data._id, this.props.reducer, (dispatch) => {
                          dispatch ({
                            type: SET_SEARCH_DATA
                          })
                        });
                      }}>
                        {
                          this.props.suggest.display(data, (text) => {
                            this.setState({
                              keyword: text
                            })
                          })
                        }
                      </div>
                    ))
                  }
                </div>
                :""
            }
          </div>
        </div>
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
