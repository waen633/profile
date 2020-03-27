import React, { Component } from 'react'
import { Button, Modal, Row, Col, Form } from 'react-bootstrap';
import dateFns from "date-fns";
import { post } from '../../service/service';
import swal from 'sweetalert2'


export default class AddCalender extends Component {
    constructor(props) {
        super(props)
        this.state = {

            cn_date: dateFns.format(new Date(), "YYYY-MM-DD"),
            cn_time: dateFns.format(new Date(), "HH:mm"),
            date: null,
            time: null,
            detail: null,
        }
    }

    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    add_data = async () => {
        const obj = {
            cn_date: this.state.cn_date,
            cn_time: this.state.cn_time,
            cn_notes: this.state.cn_notes,
            cn_head: this.state.cn_head,
            cn_color: 0
        }
        console.log(obj)
        try {
            await post(obj, "calender/add_calender").then((result) => {
                if (result.success) {
                    swal.fire({
                        icon: 'success',
                        title: 'เพิ่มข้อมูลสำเร็จ',
                        showConfirmButton: false,
                        timer: 1200
                    }).then(() => {
                        window.location.reload()
                    })

                }
                else {
                    swal.fire("", result.error_message, "error")
                }
            })
        }
        catch (error) {
            alert("add_data" + error)
        }
    }

    render() {
        const { cn_date, cn_time } = this.state
        let showModal = this.props.showModal

        return (
            <div>
                <Modal
                    show={showModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header >
                        <Modal.Title id="contained-modal-title-vcenter">
                            เพิ่มข้อมูลปฏิทิน
        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Label>วันที่</Form.Label>
                                    <Form.Control type="date" onChange={this.handleChange} id="cn_date" value={cn_date} />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Label>เวลา</Form.Label>
                                    <Form.Control type="time" onChange={this.handleChange} id="cn_time" value={cn_time} />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>ชื่อเรื่อง</Form.Label>
                                <Form.Control onChange={this.handleChange} id="cn_head" />
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>บันทึกรายละเอียด</Form.Label>
                                <Form.Control as="textarea" rows="3" onChange={this.handleChange} id="cn_notes" />
                            </Form.Group>


                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.add_data()} >Submit</Button>
                        <Button variant="danger" onClick={() => this.props.changeshowModalAdd(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
