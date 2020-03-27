import React, { Component } from "react";

import "./profilecss.css";
import {
  Button,
  Modal,
  Row,
  Col,
  Card,
  Container,
  Figure,
  Carousel
} from "react-bootstrap";

class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      data_calernder: [],
      showModal: false,
      showModalAdd: false,
      showModalItem: false,
      dataFilter: []
    };
  }
  render() {
    const background = localStorage.getItem("background");
    return (
      <Container className={background === "true" ? "bg-rias" : ""} fluid={0}>
        <Row>
          <Col xs={9} md={4}>
            <Carousel className="center ">
              <Carousel.Item>
                <img
                  className="d-block w-100 "
                  src="https://i.imgur.com/ak1lSMg.jpg"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>Life so long</h3>
                  <div className="par">
                  Our greatest glory is not in never falling, but in rising every time we fall. 
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 "
                  src="https://i.ibb.co/ph0HnJ2/IMG-20200217-110000.jpg"
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Work is hard but I have Money</h3>
                  <div className="par">
                    I do not want sex i just want a romantic love.
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 "
                  src="https://i.imgur.com/9nijYJ4.jpg "
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>I need Job</h3>
                  <div className="par">
                    Sometime you need those bad days, because it help you truly appreciate the good ones.
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col>
            <div className="cardevo">
              <Card.Body>
                <Card.Title>
                  <div class="contentx">
                    <div class="contentx__container">
                      <p class="contentx__container__text">Hello </p>

                      <ul class="contentx__container__list">
                        <li class="contentx__container__list__item">
                          WELCOME TO
                        </li>
                        <li class="contentx__container__list__item">KOMET</li>
                        <li class="contentx__container__list__item">
                          MY PORTFOLIO
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card.Title>

                <Card.Text>
                  <h4>ABOUT</h4>
                </Card.Text>
                <Card.Text>
                  <div className="ha">my name   Komet thongkaho Birth 11 June 1997</div>
                </Card.Text>
                <Card.Text>
                  <h4>EDUCATION</h4>
                </Card.Text>
                <Card.Text>
                  <div className="ha">
                    University of phayao 2016-present School of infomation and
                    communication technology Computer Engineer GPA of 4 year
                    2.74
                  </div>
                </Card.Text>
              </Card.Body>

              
           </div>


  
           <ul id='timeline'>
           <li class='work'>
    <input class='radio' id='work1' name='works' type='radio' checked></input>
    <div class="relative">
      <label for='work1'>Study Senior High School </label>
      <span class='date'>2013 - 2016</span>
      <span class='circle'></span>
    </div>
    <div class='content'>
       
  
      <p>  
      
      <Row>

     
    <Col>
    <h5>
  
      Mattayomthanbinkampangsaen
      
        </h5>
        <h6>

             major science-math  
        </h6>
     
    </Col>
    <Col xs={6} md={4}>
    <Figure>
  <Figure.Image
  right= {0}
    width={120}
    height={150}
   
    src="https://i.imgur.com/SmrL3Bf.jpg"
  /></Figure>
    </Col>
     </Row>
       
        
        </p>
       
    </div>
    
   
  </li>


  <li class='work'>
    <input class='radio' id='work2' name='works' type='radio' checked></input>
    <div class="relative">
      <label for='work2'>Study Bachelor Degrees</label>
      <span class='date'>2016 - 2020</span>
      <span class='circle'></span>
    </div>
    <div class='content'>
       
  
      <p> <h3>
              UNIVERSITY OF PHAYAO
        </h3>
        Bachelor Degrees. Faculty of Engineering. Computer Engineering. </p>
    </div>
  </li>

  <li class='work'>
    <input class='radio' id='work3' name='works' type='radio' checked></input>
    <div class="relative">
      <label for='work3'>NOW</label>
      <span class='date'>Today</span>
      <span class='circle'></span>
    </div>
    <div class='content'>
      <p>
      Find a job and leraning Frontend CSS,Backend NodeJS
         </p>
    </div>
  </li>
</ul>
          
          </Col>
        </Row>
      </Container>
    );
  }
}

export default profile;
