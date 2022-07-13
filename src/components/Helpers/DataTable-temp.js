import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
   Collapse,
   Button,
   Card,
   CardHeader,
   CardBody,
   FormGroup,
   Form,
   Input,
   Container,
   Row,
   Col,
   Badge,
   Media,
   Table,
   DropdownItem,
   DropdownToggle,
   Progress,
   UncontrolledTooltip,
   CardFooter,
   DropdownMenu,
   UncontrolledDropdown,
   Pagination,
   PaginationItem,
   PaginationLink,
} from 'reactstrap';
import { FaSearch, FaTimesCircle, FaPlus, FaDownload, FaUpload, FaChartBar, FaAngleDown, FaAngleUp, FaTrash, FaQrcode } from 'react-icons/fa';

import PaginationComponent from './PaginationComponent';
import Search from './Search';
import ReactToExcel from 'react-html-table-to-excel';

import {
   GetList, TypeOf
} from 'store/actions/helpers/displayAction';

import {
   SearchData
} from 'store/actions/helpers/searchAction';

import {
   GetLastDay
} from 'store/actions/helpers/dateAction';
import Label from 'reactstrap/lib/Label';

class DataTable extends Component {
   constructor(props) {
      super();
      this.state = {
         header: (props.hasOwnProperty("table")) ? ((typeof props.table.head == "function") ? null : [...props.table.head]) : null,

         search: {
            keyword: "",
            type: (props.search) ? props.search.options[0].value : null,
         },

         date: {
            from: "",
            to: ""
         },

         page: 1,
         limit: 10,

         sort: (props.sort) ? { ...props.sort } : null,

         filters: [],

         isOpen: false,
      }

      this.searchOnChange = this.searchOnChange.bind(this);
      this.paginationOnChange = this.paginationOnChange.bind(this);
      this.changeDate = this.changeDate.bind(this);
      this.addFilter = this.addFilter.bind(this);
      this.removeFilter = this.removeFilter.bind(this);
   }

   searchOnChange(value, type) {
      this.setState({
         search: {
            ...this.state.search,
            [type]: value
         }
      })
   }

   paginationOnChange(value, type) {
      this.setState({
         ...this.state,
         [type]: value
      })

      if (this.props.hasOwnProperty("paginationOnChange")) {
         if (type == "limit" || type == "page") {
            this.props.paginationOnChange(value, type);
         }
      }

   }

   changeDate(e) {
      var tar = e.target;
      var type = tar.getAttribute("data-type");

      if (type == "from" && !this.state.date.to) {
         var toDate = tar.value.split("-");
         toDate[2] = this.props.GetLastDay(new Date(tar.value))
         toDate = toDate.join("-");
         this.setState({
            date: {
               to: toDate,
               [type]: tar.value
            }
         })

         return;
      }

      this.setState({
         date: {
            ...this.state.date,
            [type]: tar.value
         }
      })

   }

   addFilter(type, value, typeText, keywordText) {

      this.setState({
         isOpen: true
      })

      this.setState({
         filters: [
            ...this.state.filters,
            {
               value: value,
               type: type,
               typeText: typeText,
               keywordText: keywordText,
            }
         ]
      })
   }

   removeFilter(i, type, value) {

      const filters = this.state.filters.filter((filter, ind) => ind != i);

      if (filters.length == 0) {
         this.setState({
            isOpen: false
         })
      }

      this.setState({
         filters: [...filters],
      });
   }


   render() {
      const { toDisplay, count, page, listPage } = (this.props.hasOwnProperty("dataBank")) ? this.props.dataBank : { toDisplay: 0, count: 0, listPage: 0 };
      const reducers = (this.props.hasOwnProperty("reducers")) ? this.props.reducers : { get: null, search: null };

      var isViewSearch = (this.props.hasOwnProperty("search")), isViewDate = (this.props.hasOwnProperty("date"));
      var filterS = { ...this.props.filter };
      var filterP = { ...this.props.filter };

      var title = (this.props.hasOwnProperty('title')) ? this.props.title : "Table";

      if (this.state.search.keyword) {
         filterP[this.state.search.type] = this.state.search.keyword;
      }
      if (this.state.date.from) {
         filterP["date"] = this.state.date;
         filterS["date"] = this.state.date;
      };

      if (this.state.filters.length > 0) {
         for (let x = 0, len = this.state.filters.length; x < len; x++) {
            filterS[this.state.filters[x].type] = this.state.filters[x].value;
         }
      }


      var suggest = (this.props.search) ? this.props.search.suggest : [];
      var select = (this.props.search) ? this.props.search.select : {};
      var api = (this.props.hasOwnProperty("api")) ? this.props.api.get : "/trash";
      var searchReducer = (this.props.hasOwnProperty("reducers")) ? reducers.search : null;

      return (
         <div id={(title.toLowerCase().split(" ").join("-")) + "-table-div"} className="list-table">
            <div>
               {//'paste here'
               }

               <div className="custom-container-body table-container">

                  <Container className="mt--7" fluid>
                     <Row>
                        <Col className="mb-5 mb-xl-0" xl="12">
                           <Card className="shadow">
                              <CardHeader style={{display: "flex"}} className="border-0">
                                 <h3 className="mb-0">{this.props.tableTemp.name}</h3>

                                 <FaPlus style={{marginLeft: "1050px", marginRight: "10px", fontSize:"20px"}} className="clickable" onClick={this.props.actions.add}/>
                              </CardHeader>
                              <Table className="align-items-center table-flush" responsive>
                                 <thead className="thead-light">
                                    <tr>
                                       <th scope="col">#</th>

                                       {
                                          this.props.tableTemp.header.map((name, i) => {
                                             return (
                                                <th scope="col">{name}</th>
                                             );
                                          })
                                       }
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {
                                       this.props.tableTemp.data.map((row, i) => {
                                          return (
                                             <tr>
                                                <td>{i + 1}</td>
                                                {
                                                   row.map((data) => {
                                                      return (
                                                         <td>{data}</td>
                                                      )
                                                   })
                                                }
                                                <td className="text-right">
                                                   <UncontrolledDropdown>
                                                      <DropdownToggle
                                                         className="btn-icon-only text-light"
                                                         href="#pablo"
                                                         role="button"
                                                         size="sm"
                                                         color=""
                                                         onClick={(e) => e.preventDefault()}
                                                      >
                                                         <i className="fas fa-ellipsis-v" />
                                                      </DropdownToggle>
                                                      <DropdownMenu className="dropdown-menu-arrow" right>
                                                         {
                                                            this.props.tableTemp.actions.map((action, i2) => {
                                                               return (
                                                                  <DropdownItem
                                                                     href="#pablo"
                                                                     onClick={(e) => {
                                                                        e.preventDefault()
                                                                        action.callback(row, i);
                                                                     }}
                                                                  >
                                                                     {action.name}
                                                                  </DropdownItem>
                                                               )
                                                            })
                                                         }
                                                      </DropdownMenu>
                                                   </UncontrolledDropdown>
                                                </td>
                                             </tr>


                                          );
                                       })
                                    }
                                 </tbody>
                              </Table>

                              <CardFooter className="py-4">
                                 <nav aria-label="...">
                                    <Pagination
                                       className="pagination justify-content-end mb-0"
                                       listClassName="justify-content-end mb-0"
                                    >
                                       <PaginationItem className="disabled">
                                          <PaginationLink
                                             href="#pablo"
                                             onClick={(e) => e.preventDefault()}
                                             tabIndex="-1"
                                          >
                                             <i className="fas fa-angle-left" />
                                             <span className="sr-only">Previous</span>
                                          </PaginationLink>
                                       </PaginationItem>
                                       <PaginationItem className="active">
                                          <PaginationLink
                                             href="#pablo"
                                             onClick={(e) => e.preventDefault()}
                                          >
                                             1
                                          </PaginationLink>
                                       </PaginationItem>
                                       {/* <PaginationItem>
                                          <PaginationLink
                                             href="#pablo"
                                             onClick={(e) => e.preventDefault()}
                                          >
                                             2 <span className="sr-only">(current)</span>
                                          </PaginationLink>
                                       </PaginationItem>
                                       <PaginationItem>
                                          <PaginationLink
                                             href="#pablo"
                                             onClick={(e) => e.preventDefault()}
                                          >
                                             3
                                          </PaginationLink>
                                       </PaginationItem> */}
                                       <PaginationItem>
                                          <PaginationLink
                                             href="#pablo"
                                             onClick={(e) => e.preventDefault()}
                                          >
                                             <i className="fas fa-angle-right" />
                                             <span className="sr-only">Next</span>
                                          </PaginationLink>
                                       </PaginationItem>
                                    </Pagination>
                                 </nav>
                              </CardFooter>
                           </Card>
                        </Col>
                     </Row>
                  </Container>
                 
               </div>
            </div>

         </div>
      );

   }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
   GetList,
   GetLastDay,
   SearchData,
})(DataTable);
