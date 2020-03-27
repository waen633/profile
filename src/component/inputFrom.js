import React, { Component } from "react";
import {
  ProgressBar,
  Button,
  Col,
  Form,
  InputGroup,
  Image,
  Container,
  Row,
  CardDeck,
  Card
} from "react-bootstrap";
import { Formik } from "formik";
import { post, get } from "../service/service";
import swal from "sweetalert2";
import ImageDefault from "../const/image/default.jpg";
import "./bg.css";
class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      item_image: null,
      item_get_type: [],
      get_data: [],
      now: 0
    };
  }

  gogo = () => {
    this.addItem();
  };
  progre = () => {
    this.state.now = this.state.now + 100;
    console.log(this.state.now);
    if (this.state.now >= 100) {
      this.state.now = 100;
    }
    this.setState({
      now: this.state.now
    });
    return;
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,

    });

  };



  componentWillMount() {
    this.get_item_all();
    this.get_item_type();
    this.get_location();
  }

  get_item_all = async () => {
    try {
      await get("item/get_item_all").then(result => {
        if (result.success) {
          this.setState({
            item_get_all: result.result
          });
          console.log(this.state.item_get_all);
        } else {
          swal.fire("", result.error_message, "warning");
        }
      });
    } catch (error) {
      alert("get_item_all" + error);
    }
    this.setState({
      progress: 0
    });
  };

  addItem = async () => {
    const obj = {
      item_name: this.state.item_name,
      item_brand: this.state.item_brand,
      item_gen: this.state.item_gen,
      item_type: this.state.selecttype,
      item_series_number: this.state.item_series_number,
      item_date_of_birth: this.state.item_date_of_birth,
      item_place_of_birth: this.state.item_place_of_birth,
      item_status: this.state.item_status,
      item_image: this.state.item_image,

      item_airport: this.state.selectap,
      item_airport_date: this.state.item_airport_date
    };

    console.log(obj);
    try {
      await post(obj, "item/add_item").then(result => {
        if (result.success) {
          this.progre();
          swal
            .fire({
              icon: "success",
              title: "ลงทะเบียนอุปกรณ์เรียบร้อย",
              showConfirmButton: false,
              timer: 1500
            })
            .then(() => {
              window.location.href = "/";
            });
        } else {
          swal.fire("", result.error_message, "error");
        }
      });
    } catch (error) {
      alert("addItem" + error);
    }
  };

  uploadpicture = e => {
    let reader = new FileReader();
    let file = e.target.files[0];
    if (!file) {
    } else {
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        console.log("img", reader.result);
        this.setState({
          item_image: reader.result
        });
      };
    }
  };

  get_location = async () => {
    try {
      await get("airport/get_airport").then(result => {
        if (result.success) {
          this.setState({
            get_data: result.result
          });
          console.log(this.state.get_data);
        } else {
          swal("", "", "error");
        }
      });
    } catch (error) {
      alert("get_location: " + error);
    }
  };

  select_ap = e => {
    console.log(e.target.value);
    this.setState({
      selectap: e.target.value
    });
    console.log(this.state.selectap);
  };

  select_type = e => {
    console.log(e.target.value);
    this.setState({
      selecttype: e.target.value
    });
    console.log(this.state.selecttype);
  };

  get_item_type = async () => {
    try {
      await get("typeName/get_typeName_select").then(result => {
        if (result.success) {
          this.setState({
            item_get_type: result.result
          });
          console.log(this.state.item_get_type);
        } else {
          swal.fire("", result.error_message, "warning");
        }
      });
    } catch (error) {
      alert("get_item_all" + error);
    }
  };

  render() {
    const background = localStorage.getItem('background')
    const { item_image, item_get_type, get_data } = this.state;
    return (
      <Container className={background === 'true' ? "bg-insert" : ""} fluid={1}>

        <Row>
          <Col
            className=" textlight light float-center "
            style={{ textAlign: "center" }}
          >
            <div className="titlelight">เพิ่มอุปกรณ์</div>
          </Col>
        </Row>
        <Row>

          <Col sm={3}>
            <Form.Group as={Col} >
              <Form.Label className=" collight2"></Form.Label>
              <div className="img-resize" >
                <Image
                  src={item_image ? item_image : ImageDefault}
                  rounded
                />
              </div>

              <Form.Control type="file" onChange={this.uploadpicture} />

              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={9}  >

            {/* <ProgressBar now={this.state.now} label={`${this.state.now}%`}></ProgressBar> */}
            <br />




            <br />
            <Form n>

              <Form.Group as={Row}>
                <Form.Label column sm={2} className=" collight">ชื่ออุปกรณ์</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="item_name"
                    onChange={this.handleChange}
                  />
                </Col>


              </Form.Group>
              <Form.Group as={Row} >
                <Form.Label column sm={2} className=" collight2">ยี่ห้อ</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="item_brand"
                    onChange={this.handleChange}
                  />
                </Col>

              </Form.Group>
              <Form.Group as={Row} >
                <Form.Label column sm={2} className=" collight">รุ่น</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="item_gen"
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} >
                <Form.Label column sm={2} className=" collight2">ประเภท</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="select"
                    id="TN_id"
                    onChange={this.select_type}
                  >
                    <option selected disabled hidden>กรุณาเลือกประเภท</option>

                    {item_get_type.map((element, index) => {
                      return (
                        <option value={element.TN_id} key={index}>
                          {element.TN_name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Col>

              </Form.Group>
              <Form.Group as={Row} >
                <Form.Label column sm={2} className=" collight">Series Number</Form.Label>
                <Col sm={10}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroupPrepend">
                        S/N
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="text"
                      placeholder=""
                      aria-describedby="inputGroupPrepend"
                      name="item_series_number"
                      onChange={this.handleChange}
                    />

                  </InputGroup>
                </Col>
              </Form.Group>



              <Form.Group as={Row} >
                <Form.Label column sm={2} className=" collight">นำเข้าจาก</Form.Label>
                <Col sm={5}>
                  <Form.Control
                    type="text"
                    name="item_place_of_birth"
                    onChange={this.handleChange}
                  />
                </Col>
                <Form.Label column sm={1} className=" collight2">วันที่</Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="date"
                    name="item_date_of_birth"
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} >
                <Form.Label column sm={2} className=" collight2">สถานที่ติดตั้ง</Form.Label>
                <Col sm={5}>
                  <Form.Control
                    as="select"
                    id="ap_name"
                    onChange={this.select_ap}
                  >
                    <option selected disabled hidden>กรุณาเลือกสถานที่ติดตั้ง</option>
                    {get_data.map((element, index) => {
                      return (
                        <option value={element.ap_id} key={index}>
                          {element.ap_name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Col>
                <Form.Label column sm={1} className=" collight">วันที่</Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="date"
                    placeholder="AirportSakon"
                    name="item_airport_date"
                    id="item_airport_date"
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>

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
                    onChange={this.handleChange}
                  />
                  <Form.Check
                    custom
                    type="radio"
                    label="พร้อมใช้งาน"
                    id="item_status2"
                    name="item_status"
                    value="2"
                    onChange={this.handleChange}
                  />
                  <Form.Check
                    custom
                    type="radio"
                    label="ส่งซ่อม"
                    id="item_status3"
                    name="item_status"
                    value="3"
                    onChange={this.handleChange}
                  />
                  <Form.Check
                    custom
                    type="radio"
                    label="เสีย"
                    id="item_status4"
                    name="item_status"
                    value="4"
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>

              <div className="btnregis bte btn-2 float-right text-center" onClick={() => this.gogo()}>
                ลงทะเบียน
              </div>
            </Form>


          </Col>
          <Col>
          </Col>
        </Row>
        <div className={background === 'true' ? "wave" : ""}></div>
      </Container>

    );

  }
}

export default UserProfile;
