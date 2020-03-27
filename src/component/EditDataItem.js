import React, { Component } from 'react'
import { Container, Row, Col, Spinner, Form, Image, Button, Accordion } from 'react-bootstrap'
import queryString from 'query-string'
import { post, ip, get } from '../service/service';
import swal from 'sweetalert2'
import './bg.css'
import dateFns from 'date-fns'

export default class EditDataItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataedit: '',
            spin: false,
            get_airport: [],
            item_get_type: [],
            image_check: false,
            data_calender: [],
            cn_date: dateFns.format(new Date(), "YYYY-MM-DD"),
            cn_time: dateFns.format(new Date(), "HH:mm"),
        }
    }
    componentWillMount() {
        this.get_item()
        this.get_airport()
        this.get_item_type()
        this.get_calender()
    }
    handleChange = (e) => {
        let data = this.state.dataedit
        data[e.target.id] = e.target.value
        this.setState({
            dataedit: data
        })
    }
    handleChangeRadio = (e) => {

        let data = this.state.dataedit
        data[e.target.name] = e.target.value
        this.setState({
            dataedit: data
        })
        console.log(this.state.dataedit)
    }
    notesChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    get_calender = async () => {
        try {
            const url = this.props.location.search;
            const params = queryString.parse(url);
            await post(params, "calender/get_calender_item").then((result) => {
                if (result.success) {
                    this.setState({
                        data_calender: result.result,
                    })
                    console.log(this.state.data_calender)
                }
                else {
                    swal.fire("", result.error_message, "error");
                }
            })
        }
        catch (error) {
            alert("get_canlender: " + error)
        }
    }
    get_item_type = async () => {
        try {
            await get("typeName/get_typeName_select").then(result => {
                if (result.success) {
                    this.setState({
                        item_get_type: result.result
                    });
                    console.log("sdf", this.state.item_get_type);
                } else {
                    swal.fire("", result.error_message, "warning");
                }
            });
        } catch (error) {
            alert("get_item_all" + error);
        }
    };
    get_airport = async () => {
        try {
            await get("airport/get_airport").then(result => {
                if (result.success) {
                    this.setState({
                        get_airport: result.result
                    });
                    console.log(this.state.get_airport);
                } else {
                    swal("", "", "error");
                }
            });
        } catch (error) {
            alert("get_location: " + error);
        }
    };
    get_item = async () => {
        try {

            const url = this.props.location.search;
            const params = queryString.parse(url);
            await post(params, "item/get_item").then((result) => {
                if (result.success) {
                    this.setState({
                        dataedit: result.result,
                        spin: true
                    })
                    console.log(result.result)
                }
                else {
                    swal.fire("", result.error_message, "error");
                }
            })
        }
        catch (error) {
            alert("get_item: " + error)
        }
    }
    submitData = async () => {

        const obj = {
            item_id: this.state.dataedit.item_id,
            item_name: this.state.dataedit.item_name,
            item_brand: this.state.dataedit.item_brand,
            item_gen: this.state.dataedit.item_gen,
            item_type: this.state.dataedit.item_type,
            item_series_number: this.state.dataedit.item_series_number,
            item_date_of_birth: this.state.dataedit.item_date_of_birth,
            item_place_of_birth: this.state.dataedit.item_place_of_birth,
            item_status: this.state.dataedit.item_status,
            item_image: this.state.dataedit.item_image,

            item_airport: this.state.dataedit.item_airport,
            item_airport_date: this.state.dataedit.item_airport_date,
            image_check: this.state.image_check,

            cn_notes: this.state.cn_notes,
            cn_date: this.state.cn_date,
            cn_time: this.state.cn_time,
            cn_head: this.state.dataedit.item_name,
            cn_item_id: this.state.dataedit.item_id,

        };
        console.log("gg", obj)
        try {
            await post(obj, "item/update_item").then(result => {
                if (result.success) {
                    window.location.reload();
                } else {
                    swal.fire("", result.error_message, "error");
                }
            });
        } catch (error) {
            alert("add_data" + error);

        }
    }
    uploadpicture = (e) => {

        let reader = new FileReader();
        let file = e.target.files[0];
        if (!file) {
        } else {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                console.log("img", reader.result)
                let dataedit = this.state.dataedit
                dataedit.item_image = reader.result
                this.setState({
                    dataedit: dataedit,
                    image_check: true
                });
            }
        }


    }
    onrenderimage = (image_url) => {

        let url = image_url
        var index = image_url.indexOf('data:image/');
        if (index === -1) {
            url = ip + image_url
        } else {
        }
        return url
    }

    renderModel() {
        const { data_calender } = this.state

        return (

            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-12">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Toggle className="float-right" as={Button} variant="link" eventKey="1">
                                <Button size="sm" className="float-right">เพิ่ม</Button>
                            </Accordion.Toggle>

                            <h4>บันทึก</h4>
                            <Accordion.Collapse eventKey="1">
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>รายละเอียด</Form.Label>
                                    <Form.Control as="textarea" rows="3" id="cn_notes" onChange={this.notesChange} />
                                </Form.Group>
                            </Accordion.Collapse>
                        </Accordion>


                        {data_calender[0] ?
                            <ul className="timelineSet">
                                {data_calender.map((element, index) => {
                                    return <li key={index}>
                                        <h5 href="#" >{dateFns.format(element.cn_date, "DD/MM/YYYY")}</h5>
                                        <button className="btn btn-danger btn-sm float-right" onClick={() => this.alertDelete(element)}>ลบ</button>
                                        {/* <h5>{element.cn_head}</h5> */}
                                        <p>{element.cn_notes}</p>
                                    </li>

                                })}
                            </ul> :
                            <div>ไม่พบรายการ</div>}
                    </div>
                </div>
            </div>


        )
    }


    render() {
        const { spin, get_airport, item_get_type, data_calender } = this.state
        const background = localStorage.getItem('background')
        return (

            spin ? <Container fluid={1} className={background === "true" ? "bg-rias" : ""}>
                < br />
                <Row>

                    <Col sm={3}>
                        <div className="img-resize">
                            <Image src={this.onrenderimage(this.state.dataedit.item_image)} />
                        </div>
                        <input
                            type='file' onChange={this.uploadpicture}
                        />
                        {this.renderModel()}

                    </Col>
                    <Col sm={9}>

                        <Form>
                            <Form.Group as={Row} >
                                <Form.Label column sm={2} >
                                    ชื่ออุปกรณ์
    </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="text"
                                        id="item_name"
                                        value={this.state.dataedit.item_name}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                <Form.Label column sm={2}>
                                    ยี่ห้อ
    </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="text"
                                        id="item_brand"
                                        value={this.state.dataedit.item_brand}
                                        onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                <Form.Label column sm={2}>
                                    รุ่น
    </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="text"
                                        id="item_gen"
                                        value={this.state.dataedit.item_gen}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm={2}>
                                    ประเภทอุปกรณ์
    </Form.Label>
                                <Col sm={10}>
                                    <Form.Control as="select" id="item_type" onChange={this.handleChange}>
                                        <option value={this.state.dataedit.item_type} selected disabled hidden>{this.state.dataedit.TN_name}</option>
                                        {item_get_type.map((element, index) => {
                                            return <option value={element.TN_id} key={index}>{element.TN_name}</option>
                                        })
                                        }

                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm={2}>
                                    ซีเรียล
    </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="text"
                                        id="item_series_number"
                                        value={this.state.dataedit.item_series_number}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                <Form.Label column sm={2}>
                                    สถานที่นำเข้า

    </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        type="text"
                                        id="item_place_of_birth"
                                        value={this.state.dataedit.item_place_of_birth}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                                <Form.Label column sm={1}>
                                    วันที่

    </Form.Label>
                                <Col sm={4}>
                                    <Form.Control
                                        type="date"
                                        id="item_date_of_birth"
                                        value={dateFns.format(this.state.dataedit.item_date_of_birth, "YYYY-MM-DD")}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                <Form.Label column sm={2}>
                                    สถานที่ติดตั้ง

    </Form.Label>
                                <Col sm={5}>
                                    <Form.Control as="select" id="item_airport" onChange={this.handleChange}>
                                        <option value={this.state.dataedit.item_airport} selected disabled hidden>{this.state.dataedit.ap_name}</option>
                                        {get_airport.map((element, index) => {
                                            return <option value={element.ap_id} key={index}>{element.ap_name}</option>
                                        })}

                                    </Form.Control>

                                </Col>
                                <Form.Label column sm={1}>
                                    วันที่

    </Form.Label>
                                <Col sm={4}>
                                    <Form.Control
                                        type="date"
                                        id="item_airport_date"
                                        value={this.state.dataedit.item_airport_date ? dateFns.format(this.state.dataedit.item_airport_date, "YYYY-MM-DD") : ""}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </Form.Group>


                            {/* <fieldset> */}
                            <Form.Group as={Row}>
                                <Form.Label
                                    // as="legend" 
                                    column sm={2}
                                >
                                    สถานะอุปกรณ์
      </Form.Label>
                                <Col sm={10}>

                                    <Form.Check
                                        custom
                                        type="radio"
                                        label="ติดตั้ง"
                                        id="item_status1"
                                        name="item_status"
                                        value="1"
                                        checked={this.state.dataedit.item_status == 1}
                                        onChange={this.handleChangeRadio}
                                    />
                                    <Form.Check
                                        custom
                                        type="radio"
                                        label="พร้อมใช้งาน"
                                        id="item_status2"
                                        name="item_status"
                                        value="2"
                                        checked={this.state.dataedit.item_status == 2}
                                        onChange={this.handleChangeRadio}
                                    />
                                    <Form.Check
                                        custom
                                        type="radio"
                                        label="ส่งซ่อม"
                                        id="item_status3"
                                        name="item_status"
                                        value="3"
                                        checked={this.state.dataedit.item_status == 3}
                                        onChange={this.handleChangeRadio}
                                    />
                                    <Form.Check
                                        custom
                                        type="radio"
                                        label="เสีย"
                                        id="item_status4"
                                        name="item_status"
                                        value="4"
                                        checked={this.state.dataedit.item_status == 4}
                                        onChange={this.handleChangeRadio}
                                    />
                                </Col>
                            </Form.Group>
                            {/* </fieldset> */}

                            <Form.Group as={Row}>
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button onClick={() => this.submitData()}>อัปเดตข้อมูล</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>

                </Row>


            </Container >
                :
                <div style={{ textAlign: "center", marginTop: "20%" }}>
                    <Spinner animation="border" variant="primary" />
                    <Spinner animation="border" variant="secondary" />
                    <Spinner animation="border" variant="success" />
                    <Spinner animation="border" variant="danger" />
                    <Spinner animation="border" variant="warning" />
                    <Spinner animation="border" variant="info" />
                    <Spinner animation="border" variant="light" />
                    <Spinner animation="border" variant="dark" />
                    <h4>กำลังโหลด...</h4>

                </div>



        )
    }
}
