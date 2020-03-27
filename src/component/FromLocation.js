import React, { Component } from "react";
import { get, post } from "../service/service";
import swal from "sweetalert2";
import {
  Modal,
  Card,
  Row,
  Col,
  Container,
  CardGroup,
  CardDeck,
  FormControl,
  Button,
  OverlayTrigger,
  Popover,
  ButtonToolbar,
  Table
} from "react-bootstrap";
import "../App.css";

export default class FromLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      get_data: []
    };
  }
  componentWillMount() {
    this.get_location();
  }

  get_location = async () => {
    try {
      await get("airport/get_airport").then(result => {
        if (result.success) {
          this.setState({
            get_data: result.result
          });
          console.log("getdatais" + this.state.get_data);
        } else {
          swal("", "", "error");
        }
      });
    } catch (error) {
      alert("get_location: " + error);
    }
  };


  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      airport: e.target.value
    });
    // console.log(this.state.airport);
  };


  add_airport = () => {
    swal
      .fire({
        title: "Are you sure?",
        text: "ต้องการเพิ่ม " + this.state.airport + " หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add it!"
      })
      .then(result => {
        console.log(result);
        if (result.value) {
          this.add_ariport_location();
        }
      });
  };

  add_ariport_location = async () => {
    const obj = {
      ap_name: this.state.airport
    };
    console.log(obj);
    try {
      await post(obj, "airport/add_airport").then(result => {
        if (result.success) {
          swal
            .fire({
              icon: "success",
              title: "เพิ่มสถานที่สำเร็จ",
              showConfirmButton: false,
              timer: 1500
            })
            .then(() => {
              window.location.reload();
            });
        } else {
          swal.fire("", result.error_message, "error");
        }
      });
    } catch (error) {
      alert("add_ariport_location" + error);
    }
  };


  delete_item = data => {
    swal
      .fire({
        title: "Are you sure?",
        text: "ต้องการลบ " + data.ap_name + " หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
      .then(result => {
        console.log(result);
        if (result.value) {
          this.delete_item_post(data);
        }
      });
  };

  delete_item_post = async data => {
    try {
      const obj = {
        ap_id: data.ap_id
      };

      await post(obj, "airport/delete_airport").then(result => {
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



  updateloca = (data) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "ต้องการอัพเดท " + data.ap_name + " เป็น" + this.state.airport,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add it!"
      })
      .then(result => {
        console.log("DATAis");
        if (result.value) {
          this.update_airport();
        }
      });
  };


  update_airport = async (data) => {

    const obj = {
      ap_id: data.ap_id,
      ap_name: this.state.airport,


    };
    console.log("gg", obj)
    try {
      await post(obj, "airport/update_airport").then(result => {
        if (result.success) {
          window.location.reload();
        } else {
          swal.fire("", result.error_message, "error");
        }
      });
    } catch (error) {
      alert("update_airport" + error);

    }
  }
  render() {
    const { get_data } = this.state;

    const background = localStorage.getItem('background')
    return (
      <Container className={background === 'true' ? "bg-local" : ""} fluid={1}>
        <br />
        <Row>
          <Col className="text-center">
            <Card>
              <Card.Header className={background === 'true' ? "bg-warning" : ""}  >
                <h3 className="m-0 font-weight-bold text-dark ">
                  ตารางแสดงประเภทของอุปกรณ์ทั้งหมด
                </h3>
              </Card.Header>

              <Card.Body>
                <Table striped bordered hover variant={background === 'true' ? "warning" : ""}>
                  <thead>
                    <tr>
                      <th>ลำดับ</th>
                      <th>ชื่อสถานที่</th>
                      <th>จำนวนกล้องที่อยู่</th>
                      <th>เครื่องมือ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {get_data.map((element, index) => {
                      return (
                        <tr>
                          <td> {index + 1}</td>
                          <td> {element.ap_name}</td>

                          <td> {element.count_item}</td>
                          <td>
                            <div className="btn-toolbar ">
                              <link
                                href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
                                rel="stylesheet"
                              ></link>

                              <Button
                                size="sm"
                                onClick={() => this.delete_item(element)}
                                className=" btn btn-danger btn-lg	fas fa-trash-alt "
                              />
                              <ButtonToolbar>
                                {["top"].map(placement => (
                                  <OverlayTrigger
                                    trigger="click"
                                    key={placement}
                                    placement={placement}
                                    rootClose="false"
                                    overlay={
                                      <Popover
                                        id={`popover-positioned-${placement}`}
                                      >
                                        <Popover.Title as="h3" className=" bg-warning " >
                                          เเก้ไขชื่่อประเภท
                                        </Popover.Title>
                                        <Popover.Content>
                                          <input
                                            type="textare"
                                            onChange={this.handleChange}
                                            id="TN_name"
                                            defaultValue={element.ap_name}
                                           
                                          ></input>
                                          <Button

                                            variant="primary "
                                            className=" fa fa-plus bg-warning"
                                            id="TN_id"
                                            onClick={() =>
                                              this.updateloca(element)
                                            }
                                            size="20"
                                          ></Button>
                                        </Popover.Content>
                                      </Popover>
                                    }
                                  >
                                    <Button size="sm" className=" btn btn-primary btn-lg fa fa-pencil "></Button>
                                  </OverlayTrigger>
                                ))}
                              </ButtonToolbar>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="3">
            <Card>
              <div className={background === 'true' ? "card-header bg-warning" : "card-header"}>
                <div className="col">
                  <h3 className="m-0 font-weight-bold text-dark ">
                    เพิ่มประเภทของอุปกรณ์
                  </h3>
                </div>
                {/* <button className="btn btn-primary">เพิ่ม</button> */}
              </div>
              <Card.Body>
                <FormControl
                  type="test"
                  id="item_type"
                  onChange={this.handleChange}
                ></FormControl>
                <br />
                <link
                  href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
                  rel="stylesheet"
                ></link>
                <Button
                  variant="primary "
                  className={background === 'true' ? "fa fa-plus bg-warning" : "fa fa-plus"}
                  onClick={() => this.add_airport()}
                  size="lg"
                ></Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className={background === 'true' ? "wave" : ""}></div>
      </Container>
    );
  }
}
