import React from 'react'
import styled from 'styled-components'


const CuContainer = styled.div`

body{
    color:#fff
  }
  .right_conatct_social_icon{
       background: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
  }
  .contact_us{
      background-color: #f1f1f1;
      padding: 120px 0px;
  }
  
  .contact_inner{
      background-color: #fff;
      position: relative;
      box-shadow: 20px 22px 44px #cccc;
      border-radius: 25px;
  }
  .contact_field{
      padding: 60px 340px 90px 100px;
  }
  .right_conatct_social_icon{
      height: 100%;
  }
  
  .contact_field h3{
     color: #000;
      font-size: 40px;
      letter-spacing: 1px;
      font-weight: 600;
      margin-bottom: 10px
  }
  .contact_field p{
      color: #000;
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 1px;
      margin-bottom: 35px;
  }
  .contact_field .form-control{
      border-radius: 0px;
      border: none;
      border-bottom: 1px solid #ccc;
  }
  .contact_field .form-control:focus{
      box-shadow: none;
      outline: none;
      border-bottom: 2px solid #1325e8;
  }
  .contact_field .form-control::placeholder{
      font-size: 13px;
      letter-spacing: 1px;
  }
  
  .contact_info_sec {
      position: absolute;
      background-color: #2d2d2d;
      right: 1px;
      top: 18%;
      height: 340px;
      width: 340px;
      padding: 40px;
      border-radius: 25px 0 0 25px;
  }
  .contact_info_sec h4{
      letter-spacing: 1px;
      padding-bottom: 15px;
  }
  
  .info_single{
      margin: 30px 0px;
  }
  .info_single i{
      margin-right: 15px;
  }
  .info_single span{
      font-size: 14px;
      letter-spacing: 1px;
  }
  
  button.contact_form_submit {
      background: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
      border: none;
      color: #fff;
      padding: 10px 15px;
      width: 100%;
      margin-top: 25px;
      border-radius: 35px;
      cursor: pointer;
      font-size: 14px;
      letter-spacing: 2px;
  }
  .socil_item_inner li{
      list-style: none;
  }
  .socil_item_inner li a{
      color: #fff;
      margin: 0px 15px;
      font-size: 14px;
  }
  .socil_item_inner{
      padding-bottom: 10px;
  }
  
  .map_sec{
      padding: 50px 0px;
  }
  .map_inner h4, .map_inner p{
      color: #000;
      text-align: center
  }
  .map_inner p{
      font-size: 13px;
  }
  .map_bind{
     margin-top: 50px;
      border-radius: 30px;
      overflow: hidden;
  }
`

const Contactus = () => {
  return (
    <CuContainer>
     <body>  

     <section className="contact_us">
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <div className="contact_inner">
              <div className="row">
                <div className="col-md-10">
                  <div className="contact_form_inner">
                    <div className="contact_field">
                      <h3>Contact Us</h3>
                      <p>Feel Free to contact us any time. We will get back to you as soon as we can!.</p>
                      <input type="text" className="form-control form-group" placeholder="Name" />
                      <input type="text" className="form-control form-group" placeholder="Email" />
                      <textarea className="form-control form-group" placeholder="Message"></textarea>
                      <button className="contact_form_submit">Send</button>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="right_conatct_social_icon d-flex align-items-end">
                    <div className="socil_item_inner d-flex">
                      <li><a href="#"><i className="fab fa-facebook-square"></i></a></li>
                      <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                      <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contact_info_sec">
                <h4>Contact Info</h4>
                <div className="d-flex info_single align-items-center">
                  <i className="fas fa-headset"></i>
                  <span>+91 800xxxxxxx</span>
                </div>
                <div className="d-flex info_single align-items-center">
                  <i className="fas fa-envelope-open-text"></i>
                  <span>inxxxxxxx@gmail.com</span>
                </div>
                <div className="d-flex info_single align-items-center">
                  <i className="fas fa-map-marked-alt"></i>
                  Collage Name:
                  Fr. Conceicao Rodrigues Institute of Technology
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </body>
    </CuContainer>
  )
}

export default Contactus
