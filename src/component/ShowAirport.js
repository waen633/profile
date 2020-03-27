import React, { Component } from 'react'
import { Container, Row, Col, InputGroup, ButtonGroup, FormControl, Button } from 'react-bootstrap'
import swal from 'sweetalert2'
import { get, post } from '../service/service'
import { NavLink } from 'react-router-dom'
import Pagination from '../const/Pagination'
import { status_item, status_item_color, sortData } from '../const/constance'
import moment from 'moment'

export default class ShowAirport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            airport_all: [],
            airport_all_origin: [],
            item_get_all: [],
            currentPage: 1,
            todosPerPage: 10,
            showTable: false,
            airportName: null,
        }
    }
    componentWillMount() {
        this.get_airport()
    }
    get_airport = async () => {
        try {
            await get("airport/get_airport").then(result => {
                if (result.success) {
                    this.setState({
                        airport_all: result.result,
                        airport_all_origin: result.result
                    });
                    console.log(this.state.airport_all);
                } else {
                    swal.fire("", result.error_message, "error");
                }
            });
        }
        catch (error) {
            alert("get_airport: " + error)
        }
    }

    delete_item = data => {
        swal
            .fire({
                title: "Are you sure?",
                text: "ต้องการลบ " + data.item_name + " หรือไม่?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            })
            .then(result => {
                // console.log(result);
                if (result.value) {
                    this.delete_item_post(data);
                }
            });
    };

    delete_item_post = async data => {
        try {
            const obj = {
                item_id: data.item_id
            };

            await post(obj, "item/delete_item").then(result => {
                if (result.success) {
                    swal
                        .fire({
                            icon: "success",
                            title: "Your file has been deleted.",
                            showConfirmButton: false,
                            timer: 1500
                        })
                        .then(() => {
                            window.location.reload();
                        });
                }
            });
        } catch (error) {
            alert("delete_item: " + error);
        }
    };

    exportToCSV = () => {
        const airportName = this.state.airportName
        let csvRow = []
        let A = [['อุปกรณ์ทั้งหมดของ Secure Work ที่อยู่ใน' + airportName],
        [],
        ['ลำดับ', 'ชื่อ', 'ยี่ห้อ', 'รุ่น', 'ซีเรียล', 'ประเภท', 'สถานที่ติดตั้ง', 'วันที่ติดตั้ง', 'วันที่นำเข้า', 'นำเข้ามาจาก', 'สถานะ']]
        let data = this.state.item_get_all_origin
        data.map((element, index) => {
            A.push([index + 1,
            element.item_name,
            element.item_brand,
            element.item_gen,
            element.item_series_number,
            element.TN_name,
            element.ap_name,
            moment(element.item_airport_date).format("DD/MM/YYYY"),
            moment(element.item_date_of_birth).format("DD/MM/YYYY"),
            element.item_place_of_birth,
            status_item(element.item_status)])
        })
        A.map((eleA) => {
            csvRow.push(eleA.join(','))
        })

        let csvString = csvRow.join('%0A')
        let a = document.createElement("a")
        a.href = 'data:attachment/csv;charset=utf-8,%EF%BB%BF' + csvString
        a.target = "_Blank"
        a.download = 'SW-Item'+airportName+'.csv'
        document.body.appendChild(a)
        a.click()
    }

    filterAirport = async (id, name) => {
        this.setState({
            showTable: true
        })
        try {
            const obj = {
                ap_id: id
            }
            await post(obj, 'item/get_item_airport').then((result) => {
                if (result.success) {
                    this.setState({
                        item_get_all: result.result,
                        item_get_all_origin: result.result,
                        item_filter_status: result.result,
                        airportName: name

                    })
                }
                else {
                    swal.fire("", result.error_message, "error").then(() => {
                        window.location.reload()
                    })
                }
            })
        }
        catch (error) {
            alert('filterAirport: ' + error)
        }

    }

    filteritem = (e) => {
        const dateSearch = e.target.value
        // console.log(dateSearch)

        var updatedList = this.state.item_filter_status;
        // console.log(updatedList)
        updatedList = updatedList.filter((item) => {
            let data = item.item_name.toLowerCase() + item.item_series_number.toLowerCase() + item.TN_name.toLowerCase() + item.item_gen.toLowerCase()
            return data.search(dateSearch) !== -1;
        });
        // console.log(updatedList)
        this.setState({
            item_get_all: updatedList
        });
    }

    sortItem = (type) => {

        sortData(this.state.item_get_all, type, this.state.sort)
        this.setState(({ sort }) => (
            {
                sort: !sort
            }
        ));
    }

    changeCurrentPage = numPage => {
        this.setState({ currentPage: numPage });
        //fetch a data
        //or update a query to get data
    };
    renderItemAirport() {

        let todos = []
        const { currentPage, todosPerPage, item_get_all, airportName } = this.state;
        item_get_all.map((element, index) => {
            todos.push({
                num: index + 1,
                ...element
            })
        })

        // Logic for displaying todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
        return (
            <div >
                <Row>
                    {/* <Col lg={2}> */}
                    <div class="col-auto my-1">
                        <select class="custom-select" >
                            <option selected>10</option>
                            <option value="1">25</option>
                            <option value="2">50</option>
                            <option value="3">100</option>
                        </select>
                    </div>
                    {/* </Col> */}
                    <Col style={{ textAlign: "center" }}> </Col>
                        <h5>{airportName}</h5>
                   
                    <Col lg={3}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="ค้นหา"
                                onChange={this.filteritem}
                            />
                            <InputGroup.Append>
                                <InputGroup.Text ><div className="fas fa-search"></div></InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>

                </Row>


                {/* <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                DataTables Example
              </h6>
            </div> */}
                {/* <div className="card-body"> */}
                <div className="table-responsive">
                    <table
                        className="table table-bordered table-striped"
                        // id="dataTable"
                        width="100%"
                    >
                        <thead>
                            <tr>
                                <th >ลำดับ</th>
                                <th style={{ cursor: "pointer" }} onClick={() => this.sortItem("item_name")}>ชื่อ</th>
                                <th style={{ cursor: "pointer" }} onClick={() => this.sortItem("item_series_number")}>series number</th>
                                <th style={{ cursor: "pointer" }} onClick={() => this.sortItem("TN_name")}>ประเภท</th>
                                <th style={{ cursor: "pointer" }} onClick={() => this.sortItem("item_gen")}>รุ่น</th>
                                <th style={{ cursor: "pointer" }} onClick={() => this.sortItem("item_status")}>สถานะ</th>
                                <th>ตัวเลือก</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTodos.map((element, index) => {

                                return (
                                    <tr key={index}>
                                        <td>{element.num}</td>

                                        <td>{element.item_name}</td>
                                        <td>{element.item_series_number}</td>
                                        <td>{element.item_gen}</td>
                                        <td>{element.TN_name}</td>

                                        <td className={status_item_color(element.item_status)}>{status_item(element.item_status)}</td>
                                        <td>
                                            <div className="btn-toolbar">
                                                <link
                                                    href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
                                                    rel="stylesheet"
                                                ></link>
                                                <ButtonGroup>
                                                    {/* <button
                                                        onClick={() => this.setModel(element.item_id, index)}
                                                        className=" btn btn-primary 	fa fa-search"
                                                    /> */}
                                                    <button
                                                        onClick={() => this.delete_item(element)}
                                                        className=" btn btn-danger btn-sm	fas fa-trash-alt "
                                                    />
                                                    {/* <button className=" btn btn-primary  fa fa-pencil"> */}
                                                    <NavLink to={"/editdata/item?item_id=" + element.item_id} className=" btn btn-primary  fa fa-pencil" />
                                                    {/* </button> */}

                                                </ButtonGroup>
                                            </div>
                                        </td>

                                        {/* <td><Button onClick={() => this.setState({ showModal: true, modelIndex: index })}>ดูรายละเอียด</Button></td> */}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <Row >
                        <Col></Col>
                        <Pagination
                            urrentPage={currentPage}
                            totalPages={Math.ceil(todos.length / todosPerPage)}
                            changeCurrentPage={this.changeCurrentPage}
                            theme="square-fill"
                        />
                        <Col></Col>
                        {/* </div> */}
                    </Row>
                </div>

            </div>
        )
    }

    renderItem() {

    }

    render() {
        const background = localStorage.getItem('background')
        const { airport_all, airport_all_origin, showTable, item_get_all_origin } = this.state
        return (
            <Container fluid={true} className={background === 'true' ? "bg-akeno" : ""}>
                <br />

                {/* small box */}
                <Row>
                    <Col>

                        <h3>{airport_all.length}</h3>
                        <p>สถานที่ติดตั้งทั้งหมด</p>

                    </Col>
                    <Col></Col>
                    <Col >
                        {showTable ?
                            <Button className="float-right" variant="success" onClick={() => this.exportToCSV()}>export to CSV</Button>
                            : ""}

                    </Col>
                </Row>

                <div className="row">

                    {airport_all.map((element, index) => {
                        return <div className="col-lg-3">
                            {/* small box */}
                            <a href='#section1' className="small-box bg-secondary" onClick={() => this.filterAirport(element.ap_id, element.ap_name)}>
                                <div className="inner">
                                    <h3>{element.count_item}</h3>
                                    <p>{element.ap_name}</p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-wine-bottle" />
                                </div>
                                {/* <a href='#section1' className="small-box-footer" onClick={() => this.filterAirport(element.ap_id)}>More info <i className="fas fa-arrow-circle-right" /></a> */}
                            </a>
                        </div>
                    })}


                </div>
                <section id='section1' style={showTable ? { display: "block" } : { display: "none" }}>
                    {this.renderItemAirport()}
                </section>


            </Container >
        )
    }
}
