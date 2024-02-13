import React from 'react'
import styled from 'styled-components'

const AboutusContainer = styled.div`


body {
    font-family: 'Raleway', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #777;
}

h1 {
    font-size: 36px;
    color: #555;
    font-weight: bold;
}

h3 {
    font-size: 24px;
    color: #333;
    font-weight: bold;
}



#team i {
    font-size: 26px;
    color: #555;
}

#team p {
    font-weight: 500;
}

#team .card {
    border-radius: 0;
    box-shadow: 5px 5px 15px #8ce256;
    transition: all 0.3s ease-in;
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
}

#team .card:hover {
    background: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
    color: #fff;
    border-radius: 5px;
    border: none;
    box-shadow: 5px 5px 10px #9e9e9e;
}

#team .card:hover h3,
#team .card:hover i {
    color: #fff;
}
`

const Aboutus = () => {
  return (
    <AboutusContainer>
        <body>
        <section id="team">
        <div className="container my-3 py-5 text-center">
            <div className="row mb-5">
                <div className="col">
                    <h1>Our Team</h1>
                   
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-6 pt-1">
                    <div className="card h-100">
                        <div className="card-body">
                            <img className="img-fouild rounded w-75 mb-3"
                                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1705229366~exp=1705229966~hmac=f443fcf12e8dc04f0a61a814d4920b2ef7e812a8161eaa8240aa6d56bf9f7409"
                                alt="Sophie"/>
                            <h3>Jayesh Chaudhari</h3>
                            <h5>Full Stack/ AIML Developer</h5>
                            <p>Vice President @CSI FCRIT | ML ENTHUSIAST | FULL STACK WEB DEVELOPER | EX AGNELS ROBOTICS TEAM MEMBER | FCRIT VASHI</p>
                            <div className="d-flex flex-row justify-content-center">
                                <div className="p-4">
                                    <a href="#">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                </div>
                                <div className="p-4">
                                    <a href="#">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </div>
                                <div className="p-4">
                                    <a href="#">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 pt-1">
                    <div className="card h-100">
                        <div className="card-body">
                            <img className="img-fouild rounded w-75 mb-3"
                                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1705229366~exp=1705229966~hmac=f443fcf12e8dc04f0a61a814d4920b2ef7e812a8161eaa8240aa6d56bf9f7409"
                                alt="lucy"/>
                            <h3>Tejashree Bhangale</h3>
                            <h5>FrontEnd/AIML Developer</h5>
                            <p>Managment Head @GDSC FCRIT | FRONT END DEVELOPER | AIML ENTHUSIAST | FCRIT VASHI.</p>
                            <div className="d-flex flex-row justify-content-center">
                                <div className="p-4">
                                    <a href="#">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                </div>
                                <div className="p-4">
                                    <a href="#">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </div>
                                <div className="p-4">
                                    <a href="#">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 pt-1">
                    <div className="card h-100">
                        <div className="card-body">
                            <img className="img-fouild rounded w-75 mb-3"
                                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1705229366~exp=1705229966~hmac=f443fcf12e8dc04f0a61a814d4920b2ef7e812a8161eaa8240aa6d56bf9f7409"
                                alt="Brad"/>
                            <h3>Savio Dias</h3>
                            <h5>Full Stackl/ AIML Developer</h5>
                            <p>GSoC'23 Mentee @asyncapi under @postman | Technical Head @CSI-FCRIT | Open Source Lead @GDSC-FCRIT | Community Member @Layer5 | Top 5 contributor @woc-3.0 | 3⭐ @CodeChef (max. 1602) | FCRIT Vashi.</p>
                            <div className="d-flex flex-row justify-content-center">
                                <div className="p-4">
                                    <a href="#">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                </div>
                                <div className="p-4">
                                    <a href="#">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </div>
                                <div className="p-4">
                                    <a href="#">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 pt-1">
                    <div className="card h-100">
                        <div className="card-body">
                            <img className="img-fouild rounded w-75 mb-3"
                                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1705229366~exp=1705229966~hmac=f443fcf12e8dc04f0a61a814d4920b2ef7e812a8161eaa8240aa6d56bf9f7409"
                                alt="andres"/>
                            <h3>Devashish Jawale</h3>
                            <h5>Front End Developer</h5>
                            <p>Technical Head @IEEE FCRIT | FRONT | AIML ENTHUSIAST | FCRIT VASHI.</p>
                            <div className="d-flex flex-row justify-content-center">
                                <div className="p-4">
                                    <a href="#">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                </div>
                                <div className="p-4">
                                    <a href="#">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </div>
                                <div className="p-4">
                                    <a href="#">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        

        </body>

    </AboutusContainer>
  )
}

export default Aboutus
