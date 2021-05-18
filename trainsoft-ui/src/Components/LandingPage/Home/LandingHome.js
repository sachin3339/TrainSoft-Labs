import { Formik } from 'formik'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { BtnWarning, Cancel,BtnInfo } from '../../Common/Buttons/Buttons'
import { TextArea, TextInput } from '../../Common/InputField/InputField'
import Header from '../Layout/Header'
import { ICN_CALL, ICN_EMAIL, ICN_NAV_NEXT, ICN_PLAY_CIRCLE, ICN_TRAINSOFT } from '../../Common/Icon'
import PG from "../image/pg.png";
import EDU from "../image/edu.png";
import TRAINING from "../image/training.png";
import ASSESSMENT from "../image/assessment.png";
import CURATOR from "../image/e-curator.png";
import LAB from "../image/lab.png";
import LEARNING from "../image/learning.png";
import './landingPage.css'
import { navigate } from '../../Common/Router'
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import * as Yup from 'yup';
import GLOBELCONSTANT from '../../../Constant/GlobleConstant'


const LandingHome = () => {
    const [open, setOpen] = useState(false);
    const [contact,setContact] = useState({})
    const [submited,setSubmited] = useState(false)

    // field validation
    const schema = Yup.object().shape({
        name: Yup.string().min(2, 'Too Short!').required("Required!"),
        phoneNo: Yup.string().min(2, 'Too Short!').required("Required!"),
    });

    const onSubmit =(value)=> {
        setContact(value)
        setSubmited(true)
    }
    return (<><div>
        <Header />
        <div className="mt-0 pt-0 section landing-bg" id="home">
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
                        {/* <div className="btn-mesR">Register</div> */}
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
                        <div>
                            <div className="card-img">
                                <img src={TRAINING} />
                            </div>
                            <div className="page-card-title" onClick={() => navigate('/login')}>e-Training</div>
                            <div className="page-card-subTitle">Online Training Management</div>
                            <div className="page-card-body">
                            Deploy Trainsoft to take your tutoring operations online and expand into new markets with minimum investment. Create branded learning portal with Trainsoft to train your customers on new software via online tutorials or live classes
                            </div>
                        </div>
                        <div className="card-footer-action">
                            <div className="">
                               <Cancel className=""><span>{ICN_PLAY_CIRCLE}</span>SEE HOW</Cancel>
                            </div>
                            <div className="">
                                <BtnWarning onClick={()=>setOpen(true)}>CONTACT US</BtnWarning>
                            </div>
                        </div>
                    </div>
                    <div className="page-card">
                        <div>
                            <div className="card-img">
                                <img src={ASSESSMENT} />
                            </div>
                            <div className="page-card-title" onClick={() => navigate('/login',{state:{user:GLOBELCONSTANT.ROLE.ASSESS_USER}})}>e-Assessment</div>
                            <div className="page-card-subTitle">Online Assessment / Screening</div>
                            <div className="page-card-body">
                                Trainsoft lets you create an online test to assess the progress of your class. With our online test generator tool, educators and corporate trainers can create, publish and conduct online tests<br />

                            </div>
                        </div>
                        <div className="card-footer-action">
                            <div className="">
                               <Cancel className=""><span>{ICN_PLAY_CIRCLE}</span>SEE HOW</Cancel>
                            </div>
                            <div className="">
                                <BtnWarning onClick={()=>navigate('/assessment/0/0/0')}>TRY NOW</BtnWarning>
                            </div>
                        </div>
                    </div>
                    <div className="page-card">
                        <div>
                            <div className="card-img">
                                <img src={LAB} />
                            </div>
                            <div className="page-card-title" >e-Lab</div>
                            <div className="page-card-subTitle">On Demand Cloud Labs</div>
                            <div className="page-card-body">
                                The best way to learn a thing is by doing the thing. That’s why our learning library is loaded with innovative hands-on technology. Our unique, experiential approach lets people safely experiment, make happy little accidents, and develop skills faster.
                    </div>
                        </div>
                        <div className="card-footer-action">
                            <div className="">
                               <Cancel className=""><span>{ICN_PLAY_CIRCLE}</span>SEE HOW</Cancel>
                            </div>
                            <div className="">
                                <BtnWarning onClick={()=>setOpen(true)}>CONTACT US</BtnWarning>
                            </div>
                        </div>
                    </div>
                    <div className="page-card">
                        <div>
                            <div className="card-img">
                                <img src={LEARNING} />
                            </div>
                            <div className="page-card-title"  onClick={()=> window.open("https://trainsoft.org/?source=trainsoft")}>e-Learning</div>
                            <div className="page-card-subTitle">Self Paced Online Learning</div>
                            <div className="page-card-body">
                                Start growing your teams immediately with access to a growing library of ready-made courses covering all the soft and technical skills they need for success at work
                    </div>
                        </div>
                        <div className="card-footer-action">
                            <div className="">
                                <Cancel className=""><span>{ICN_PLAY_CIRCLE}</span>SEE HOW</Cancel>
                            </div>
                            <div className="">
                                <BtnWarning onClick={()=>setOpen(true)}>CONTACT US</BtnWarning>
                            </div>
                        </div>
                    </div>
                    <div className="page-card">
                        <div>
                            <div className="card-img">
                                <img src={CURATOR} />
                            </div>
                            <div className="page-card-title">e-Curator</div>
                            <div className="page-card-subTitle">Online Content Curation</div>
                            <div className="page-card-body">
                                Our content curation tool organizes information relevant to a particular topic. Curating is often done manually, but Trainsoft e-content curation makes it possible to do it automatically via recommendation engines, semantic analysis or social rating
                    </div>
                        </div>
                        <div className="card-footer-action">
                            <div className="">
                               <Cancel className=""><span>{ICN_PLAY_CIRCLE}</span>SEE HOW</Cancel>
                            </div>
                            <div className="">
                                <BtnWarning onClick={()=>setOpen(true)}>CONTACT US</BtnWarning>
                            </div>
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
                    <div className="title-ss">
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
                            <div className="pg-title3">info@trainsoft.io</div>
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

    </div>
     <Dialog fullScreen open={open} onClose={()=>{setOpen(false);setSubmited(false)}} >
   
       <div className="jcb">
           <div></div>
           <div>
           <IconButton edge="start" color="inherit" onClick={()=>{setOpen(false);setSubmited(false)}} aria-label="close">
           <CloseIcon />
            </IconButton>
           </div>
          </div>
        <div className="container-fluid row jcc dialog-pg">
            <div className="col-6">
                <div className="text-center mb-4">{ICN_TRAINSOFT}</div>
                <div className="pg-title2 text-center mb-2">Thank you for your interest in our e-Training tool</div>
                <div className="text-center">Please tell us about you more. Our sales team will get back to you ASAP</div>
                <div className="context-body">
            {!submited ?<Formik
                            onSubmit={(value) => onSubmit(value)}
                            initialValues={{
                                name: '',
                                phoneNo: '',
                                email: '',
                            }}
                            validationSchema={schema}
                        >
                            {({ handleSubmit, isSubmitting, dirty, setFieldValue }) => <form onSubmit={handleSubmit} className="create-batch" >
                                <div>
                                    <Form.Group >
                                        <TextInput label="Enter your name" placeholder="Name" name="name" />
                                    </Form.Group>
                                    <Form.Group>
                                        <TextInput label="Your Phone Number" placeholder="Phone Number" name="phoneNo" />
                                    </Form.Group>
                                    <Form.Group>
                                        <TextInput label="Your Email" placeholder="Email" name="email" />
                                    </Form.Group>
                                   
                                </div>
                                <footer className="mt-4">
                                    <div> </div>
                                    <div>
                                        <BtnInfo type="submit" className="btn-block btn-block" >LET’S BEGIN! IT’S FREE</BtnInfo>
                                    </div>
                                </footer>
                            </form>
                            }
                        </Formik>: <div>
                              <div className="text-center title-ss text-success">Hi, {contact.name} Our sales team will get back to you ASAP</div>

                            </div>}
                        </div>
            </div>
        </div>
   </Dialog>
    </>)
}

export default LandingHome