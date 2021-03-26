import { Formik } from 'formik'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import {Navbar,Nav,FormControl} from 'react-bootstrap'
import { Button } from '../../Common/Buttons/Buttons'
import { TextArea, TextInput } from '../../Common/InputField/InputField'
import Header from '../Layout/Header'
import { ICN_CALL, ICN_EMAIL } from '../../Common/Icon'
import PG from "../image/pg.png";
import EDU from "../image/edu.png";
import './landingPage.css'
import { navigate } from '../../Common/Router'
const LandingHome = () => {
    const [active,setActive] = useState('home')

    const scrollView = (id)=> {
        try{
        setActive(id)
          var element = document.getElementById(id);
           element && element.scrollIntoView({behavior: "smooth"});
        }catch(err){
            console.error("error occur on scrollView()",err)
        }
      }

    return (<div onScroll={(e)=>console.log(e)}>
          <div  className="pg-header">
        <div className="main-title pointer" onClick={()=>scrollView('home')}>TrainSoft</div>
           <div>
                <div className="flx">
                  <Nav.Link className={`${active === "home"? 'nav-active':''}`} onClick={()=>scrollView('home')}>Home</Nav.Link>
                 <Nav.Link className={`${active === "features"? 'nav-active':''}`} onClick={()=> scrollView('features')}>Features</Nav.Link>
                 <Nav.Link className={`${active === "about"? 'nav-active':''}`} onClick={()=> scrollView('about')}>About Us</Nav.Link>
                 <Nav.Link className={`${active === "contact"? 'nav-active':''}`} onClick={()=> scrollView('contact')}>Contact</Nav.Link>
            </div>
        </div>
     
        </div>
        <div className="mt-0 pt-0 section" id="home">
            <div className="row aic">
                <div className="col-sm-5">
                    <div className="pg-title-sm">We Provided</div>
                    <div className="pg-title">
                        One Stop <br/> Online Learning Solution
                    </div>
                    <div className="pg-desc">
                        TrainSoft provides the complete online learning solutions for ever
                        changing training demands for Corporate companies, Schools, Universities and Individual learners.
                    </div>
                    <div className="mt-3">
                        <div className="btn-mesR">Register</div>
                    </div>
                </div>
                <div className="col-md-7">
                <div className="pg-img ">
                    <img className="img-fluid" src={PG}/>
                </div>
                </div>
            </div>
        </div>
        <div className="section-dk section" id="about">
            <div className="row jcc text-center my-5">
                <div className="col-md-6">
                  <div className="pg-title2"> About TrainSoft </div>
                  <div className="pg-desc1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                    </div>
                </div>
               
            </div>
            <div className="jcc">
            <div className="page-card-container">
                <div className="page-card">
                    <div className="page-card-title" onClick={()=> navigate('/login')}>e-Training</div>
                    <div className="page-card-subTitle">Online Training Management</div>
                    <div className="page-card-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                    </div>
                </div>
                <div className="page-card">
                    <div className="page-card-title"  onClick={()=> window.open("https://test-engine.trainsoft.io")}>e-Assessment</div>
                    <div className="page-card-subTitle">Online Assessment / Screening</div>
                    <div className="page-card-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                    </div>
                </div>
                <div className="page-card">
                    <div className="page-card-title"  onClick={()=> window.open("https://cloud-labs.trainsoft.io")}>e-Lab</div>
                    <div className="page-card-subTitle">On Demand Cloud Labs</div>
                    <div className="page-card-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                    </div>
                </div>
                <div className="page-card">
                    <div className="page-card-title">e-Learning</div>
                    <div className="page-card-subTitle">Self Paced Online Learning</div>
                    <div className="page-card-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                    </div>
                </div>
                <div className="page-card">
                    <div className="page-card-title">e-Curator</div>
                    <div className="page-card-subTitle">Online Content Curation</div>
                    <div className="page-card-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                    </div>
                </div>
            </div>
        </div>
        </div>

        <div id="features" className="section">
            <div className="row aic">
                <div className="col-md-5 px-5">
                    <div className="edu-img">
                        <img className="img-fluid" src={EDU}/>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="pg-title text-primary">
                        WHO WE ARE
                    </div>
                    <div className="pg-title2">
                       We envision the world where,<br/> The Knowledge is Power
                    </div>
                    <div className="pg-desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                        ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                        eu fugiat nulla pariatur.
                        <br/>
                        <br/>
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                    </div>
                </div>
            </div>
        </div>

        <div className="section-dk section" id="contact">
            <div className="row">
                <div className="col-sm-6">
                    <div className="pg-title">Contact Us</div>
                    <div className="flx contact-info">
                        <div className="mr-2">{ICN_CALL}</div>
                        <div>
                            <div>Phone Number</div>
                            <div className="pg-title3">+91 97311 49585</div>
                        </div>
                    </div>

                    <div className="flx mt-3 contact-info">
                        <div className="mr-2">{ICN_EMAIL}</div>
                        <div>
                            <div>Email</div>
                            <div className="pg-title3">niranjan.pandey@alchemyinfotech.com</div>
                        </div>
                    </div>

                </div>
                <div className="col-sm-6">
                    <div className="pg-title">
                        Write Us
                    </div>
                    <div className="">
                        <Formik
                            onSubmit={(value) => console.log(value)}
                            initialValues={{
                                name: '',
                                phoneNo: '',
                                email: '',
                                message: ''
                            }}
                        >
                            {({ handleSubmit, isSubmitting, dirty, setFieldValue }) => <form onSubmit={handleSubmit} className="create-batch" >
                                <div>
                                    <Form.Group className=" page-input">
                                        <TextInput label="" placeholder="Name"  name="name" />
                                    </Form.Group>
                                    <Form.Group className=" page-input">
                                        <TextInput label="" placeholder="Phone Number" name="phoneNo" />
                                    </Form.Group>
                                    <Form.Group className=" page-input">
                                        <TextInput label="" placeholder="Email" name="email" />
                                    </Form.Group>
                                    <Form.Group className=" page-input">
                                        <TextArea label="" placeholder="message" name="message" />
                                    </Form.Group>
                                </div>
                                <footer className="jcb mt-4">
                                    <div> </div>
                                    <div>
                                        <div className="pointer btn-mes" >Send Message</div>
                                    </div>
                                </footer>
                            </form>
                            }
                        </Formik>
                    </div>

                </div>
            </div>
        </div>
        <div className="pg-footer">
            <div>
                 Terms & Conditions Privacy Policy
            </div>
            <div>
            © All Rights Reserved. TrainSoft 2021.
            </div>
        </div>

    </div>)
}

export default LandingHome