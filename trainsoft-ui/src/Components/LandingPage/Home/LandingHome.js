import { Formik } from 'formik'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Navbar, Nav, FormControl } from 'react-bootstrap'
import { Button } from '../../Common/Buttons/Buttons'
import { TextArea, TextInput } from '../../Common/InputField/InputField'
import Header from '../Layout/Header'
import { ICN_CALL, ICN_EMAIL } from '../../Common/Icon'
import PG from "../image/pg.png";
import EDU from "../image/edu.png";
import './landingPage.css'
import { navigate } from '../../Common/Router'
const LandingHome = () => {
    const [active, setActive] = useState('home')

    const scrollView = (id) => {
        try {
            setActive(id)
            var element = document.getElementById(id);
            element && element.scrollIntoView({ behavior: "smooth" });
        } catch (err) {
            console.error("error occur on scrollView()", err)
        }
    }

    return (<div onScroll={(e) => console.log(e)}>
        <div className="pg-header">
            <div className="main-title pointer" onClick={() => scrollView('home')}>TrainSoft</div>
            <div>
                <div className="flx">
                    <Nav.Link className={`${active === "home" ? 'nav-active' : ''}`} onClick={() => scrollView('home')}>Home</Nav.Link>
                    <Nav.Link className={`${active === "features" ? 'nav-active' : ''}`} onClick={() => scrollView('features')}>Features</Nav.Link>
                    <Nav.Link className={`${active === "about" ? 'nav-active' : ''}`} onClick={() => scrollView('about')}>About Us</Nav.Link>
                    <Nav.Link className={`${active === "contact" ? 'nav-active' : ''}`} onClick={() => scrollView('contact')}>Contact</Nav.Link>
                </div>
            </div>

        </div>
        <div className="mt-0 pt-0 section" id="home">
            <div className="row aic">
                <div className="col-sm-5">
                    <div className="pg-title-sm">We Provided</div>
                    <div className="pg-title">
                        One Stop <br /> Online Learning Solution
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
                        <img className="img-fluid" src={PG} />
                    </div>
                </div>
            </div>
        </div>
        <div className="section-dk section" id="about">
            <div className="row jcc text-center my-4">
                <div className="col-md-6">
                    <div className="pg-title2 mb-2"> About TrainSoft </div>
                    <div className="pg-desc1">
                        Trainsoft empowers instructors, education service providers and corporates to deliver and manage live and self-paced learning with easy-to-use, scalable and cost-effective technology.
                    </div>
                </div>

            </div>
            <div className="jcc">
                <div className="page-card-container">
                    <div className="page-card">
                        <div className="page-card-title" onClick={() => navigate('/login')}>e-Training</div>
                        <div className="page-card-subTitle">Online Training Management</div>
                        <div className="page-card-body">
                            Deploy Trainsoft to take your tutoring operations online and expand into new markets with minimum investment.<br />
                     Create branded learning portal with Trainsoft  to train your customers on new software via online tutorials or live classes

                    </div>
                    </div>
                    <div className="page-card">
                        <div className="page-card-title" onClick={() => window.open("https://test-engine.trainsoft.io")}>e-Assessment</div>
                        <div className="page-card-subTitle">Online Assessment / Screening</div>
                        <div className="page-card-body">
                            Trainsoft lets you create an online test to assess the progress of your class. With our online test generator tool, educators and corporate trainers can create, publish and conduct online tests<br />

                        </div>
                    </div>
                    <div className="page-card">
                        <div className="page-card-title" onClick={() => window.open("https://cloud-labs.trainsoft.io")}>e-Lab</div>
                        <div className="page-card-subTitle">On Demand Cloud Labs</div>
                        <div className="page-card-body">
                            The best way to learn a thing is by doing the thing. That’s why our learning library is loaded with innovative hands-on technology. Our unique, experiential approach lets people safely experiment, make happy little accidents, and develop skills faster.
                    </div>
                    </div>
                    <div className="page-card">
                        <div className="page-card-title">e-Learning</div>
                        <div className="page-card-subTitle">Self Paced Online Learning</div>
                        <div className="page-card-body">
                            Start growing your teams immediately with access to a growing library of ready-made courses covering all the soft and technical skills they need for success at work
                    </div>
                    </div>
                    <div className="page-card">
                        <div className="page-card-title">e-Curator</div>
                        <div className="page-card-subTitle">Online Content Curation</div>
                        <div className="page-card-body">
                            Our content curation tool organizes information relevant to a particular topic. Curating is often done manually, but Trainsoft e-content curation makes it possible to do it automatically via recommendation engines, semantic analysis or social rating
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="features" className="section">
            <div className="row aic">
                <div className="col-md-5 px-5">
                    <div className="edu-img">
                        <img className="img-fluid" src={EDU} />
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="pg-title text-primary">
                        WHO WE ARE
                    </div>
                    <div className="pg-title2">
                        We envision the world where,<br /> The Knowledge is Power
                    </div>
                    <div className="pg-desc">
                        Trainsoft is an easy way to teach and train online. It’s a cloud-based learning delivery platform with a suite of integrated features – including virtual classroom, course management, content authoring, video streaming, tests and assessments, insights and analytics and mobile learning.
                        <br />
                        <br />
                        Trainsoft empowers instructors, education service providers and corporates to deliver and manage live and self-paced learning with easy-to-use, scalable and cost-effective technology.
                        <br />
                        <br />
                        Trainsoft started with a small group of people who wanted to bring about change. Ever since its launch in 2021, the company has grown leaps & bounds with hundreds of thousands of downloads, a huge following and representatives around the world. As we grow each day, we help our community be better every day
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
                                        <TextInput label="" placeholder="Name" name="name" />
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