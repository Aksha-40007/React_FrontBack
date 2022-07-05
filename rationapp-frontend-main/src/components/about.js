import React from 'react';
import { PureComponent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from "react-bootstrap";
import {Link} from "react-router-dom";
import { FaInstagram, FaLinkedin , FaGithub, FaGlobe, FaGoMail, FaEnvelope} from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import Navbar from '../components/navbar';
class About extends PureComponent {
    render(){
        
        return ( 
            <>
            <Navbar />
            <div className="about m-3 text-center">
            <h2><strong>About Us</strong></h2>
            <div className="hr" />
                <p className="vertical-center">
                In April, 1966 Statutory Rationing was introduced in Greater Mumbai and the Industrial complex of Thana which included the Thana Town, Kalyan, Belapur, Ulhasnagar and Ambernath. All these areas are operating the Rationing Scheme under provisions of the Maharashtra food grain (second) Ration Order of 1966.
                <br/> <br />The Rationing Organization is headed by the Controller of Rationing.The team comprises of 2 Deputy Controllers who assist The Controller in supervising Indent, Shops, Establishments, Administration, Accounts, General, Enforcement, Kerosene etc. There are other five Deputy Controller of Rationing that are incharge of each region, 04 in Mumbai and 01 in Thane.
                Genral control is managed by Food and Civil Supplies department & they also issue directives in policy & other realted matters. Mumbai & Thane area is serviced by 46 Rationing offices. In each Rationing office the day to day functioning is supervised by 1 to 2 Assistant Rationing Officers & is supervised by a Rationing. Each Rationing Office works as Nodal Agency for issue / cancellation /changes in Ration Cards.</p>
                <h2><strong>Aim of the system</strong></h2>
                <div className="hr" />
                <p>Our focus is to reduce the corruption in the ration distribution system. we all want a trasparent system so no one can cheat with ration system</p>
            </div>
            <h3><strong>Developer</strong></h3>
            <div className="hr" />
            <div className="card-container">
             <Card border="dark" style={{width:"18rem", height:"18rem",borderRadius:"50%" }} className="m-2 overflow-hidden">
                <Card.Header className="bg-dark text-white"><b>Developer</b></Card.Header>
                    {/* <Card.Img style={{height:'10rem'}} src="saffron-photo.jpg" /> */}
                    <Card.Body>
                    <Card.Title><b>Akshata Desai</b> </Card.Title>
                    <Card.Text className="about-icons">
                     M.Sc. Computer Science <br />
                        Shivajinagar Pune.
                        <div className="icons">
                        <a data-tip="akshatadesai9799@gmail.com" style={{color: "black"}} target="blank" href="mailto:akshatadesai9799@gmail.com"><FaEnvelope /></a>
                        <a data-tip="/Aksha-40007" style={{color: "black"}} target="blank" href="https://github.com/Aksha-40007"><FaGithub /></a>
                        <a data-tip="/Aksha_40007" style={{color: "black"}} target="blank" href="https://www.instagram.com/Aksha_40007/"><FaInstagram /></a>
                        <a data-tip="/akshata-desai-651737199" style={{color: "black"}} target="blank" href="https://www.linkedin.com/in/akshata-desai-651737199/"><FaLinkedin /></a>
                        <a data-tip="Personal website" style={{color: "black"}} target="blank" href="#"><FaGlobe /></a>
                        </div>
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-dark text-white"><b>Github Linkedin</b></Card.Footer>
                </Card>
                <ReactTooltip />
            </div>
            
            </>
        );
    }
}
 
export default About;