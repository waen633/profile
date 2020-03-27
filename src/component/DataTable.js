import React, { Component } from "react";
import { get, ip, post } from "../service/service";
import swal from "sweetalert2";
import moment from "moment";
import {
  Button,
  Modal,
  Row,
  Col,
  Card,
  ButtonGroup
} from "react-bootstrap";
import "../App.css";
import { NavLink } from 'react-router-dom'

class ThemeSwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item_get_all: [],
      item_image: null,
      theme: null,
      showModal: false,
      showedit: false,
      item_get_type: [],
      modelIndex: 0,
      get_data: [],
    };
  }

  resetTheme = evt => {
    evt.preventDefault();
    this.setState({ theme: null });
  };

  chooseTheme = (theme, evt) => {
    evt.preventDefault();
    this.setState({ theme });
  };

  componentWillMount() {
    this.get_item_all();
    this.get_location();
    
  }

  get_item_all = async () => {
    try {
      await get("item/get_item_all").then(result => {
        if (result.success) {
          this.setState({
            item_get_all: result.result
          });
        } else {
          swal.fire("", result.error_message, "warning");
        }
      });
    } catch (error) {
      alert("get_item_all" + error);
    }
  };

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
        console.log(result);
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

 

  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      [e.target.id]: e.target.value
    });
    console.log(e.target.value);
  };

  
  status_item = data => {
    let return_data;
    switch (data) {
      case 1:
        return_data = <div className="text-success">ติดตั้ง</div>;
        break;
      case 2:
        return_data = <div className="text-warning">พร้อมใช้งาน</div>;
        break;
      case 3:
        return_data = <div className="text-danger">ส่งซ่อม</div>;
    }
    return return_data;
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

  handleClose = () => {
    this.setState({
      showModal: false
    })
  }
  
  render() {
    console.log("status_props",this.state.status_props)
    const {
      theme,
      item_get_all,
      showModal
    } = this.state;
    const themeClass = theme ? theme.toLowerCase() : "secondary";
    const itemModel = item_get_all[this.state.modelIndex];
    console.log(itemModel);
    const { item_image } = this.state;
    return (
      <div >
        <div className="">
          {/* <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              DataTables Example
            </h6>
          </div> */}
          {/* <div className="card-body"> */}
          <div className="table-responsive">
            <table
              className="table table-bordered table-striped"
              id="dataTable"
              width="100%"
            >
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>ชื่อ</th>
                  <th>series number</th>
                  <th>ประเภท</th>
                  <th>สถานะ</th>
                  <th>สถานที่ติดตั้ง</th>
                    <th>ตัวเลือก</th>
                </tr>
              </thead>
              <tbody>
                {item_get_all.map((element, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>

                      <td>{element.item_name}</td>
                      <td>{element.item_series_number}</td>
                      <td>{element.TN_name}</td>
                      <td>{element.item_airport}</td>
                      <td>{this.status_item(element.item_status)}</td>
                      <td>
                        <div className="btn-toolbar">
                          <link
                            href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
                            rel="stylesheet"
                          ></link>
                          <ButtonGroup>
                            <button
                              onClick={() =>
                                this.setState({
                                  showModal: true,
                                  modelIndex: index
                                })
                              }
                              className=" btn btn-primary 	fa fa-search"
                            />
                            <button
                              onClick={() => this.delete_item(element)}
                              className=" btn btn-danger btn-sm	fas fa-trash-alt "
                            />
                            {/* <button className=" btn btn-primary  fa fa-pencil"> */}
                            <NavLink to={"/editdata/item?item_id="+element.item_id} className=" btn btn-primary  fa fa-pencil"/>
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
            {/* </div> */}
          </div>
        </div>

        <Modal
          show={showModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              รายละเอียดอุปกรณ์

            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <div className="img-resize">
                  <img src={itemModel ? ip + itemModel.item_image : ""} />
                </div>
              </Col>

              <table>
                <td>
                  <tr>ชื่อ </tr>
                  <tr>ยี่ห้อ </tr>
                  <tr>รุ่น </tr>
                  <tr>ซีเรียล </tr>
                  <tr>ประเภท </tr>
                  <tr>สถานที่ติดตั้ง </tr>
                  <tr>วันที่ติดตั้ง </tr>
                  <tr>วันที่นำเข้า </tr>
                  <tr>นำเข้ามาจาก </tr>
                  <tr>สถานะ </tr>
                </td>
                <td>
                  {console.log(itemModel)}
                  <tr>{itemModel ? itemModel.item_name : ""}</tr>
                  <tr>{itemModel ? itemModel.item_brand : ""}</tr>
                  <tr>{itemModel ? itemModel.item_gen : ""}</tr>
                  <tr>{itemModel ? itemModel.item_series_number : ""}</tr>
                  <tr>{itemModel ? itemModel.item_type : ""}</tr>
                  <tr>{itemModel ? itemModel.item_airport : ""}</tr>
                  <tr>{itemModel ? itemModel.item_airport_date : ""}</tr>
                  <tr>
                    {itemModel
                      ? moment(itemModel.item_date_of_birth).format(
                        "DD/MM/YYYY"
                      )
                      : ""}
                  </tr>
                  <tr>{itemModel ? itemModel.item_place_of_birth : ""}</tr>
                  <tr>{itemModel ? itemModel.item_status : ""}</tr>
                </td>
              </table>


            </Row>
            <br />
            <Card>
              <p>  หมายเหตุ...</p>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ showModal: false })}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

export default ThemeSwitcher;
