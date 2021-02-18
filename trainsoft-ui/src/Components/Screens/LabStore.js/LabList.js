import { useState } from "react";
import { BsModal } from "../../Common/BsUtils";
import { BtnPrimary } from "../../Common/Buttons/Buttons";
import SearchBox from "../../Common/SearchBox/SearchBox"
import { ICN_ON_GOING, ICN_STAR } from "../../Common/Icon"
import AddLab from "./AddLab";
import "./Styles.css";

const LabList = ({ list = [], myLab = false }) => {
    const [show, setShow] = useState(false)

    const wordShort = (str, maxLen, separator = ' ') => {
        try {
            if (str.length <= maxLen) {
                return str;
            } else {
                return `${str.substr(0, str.lastIndexOf(separator, maxLen))} ...Learn More`
            }
        } catch (err) {
            console.error("error occur on wordShort()", err)
        }
    }

    return (<>
        <div className="catalog-container">
            {list.map(res => <div className="labList">
                <div className="aic flx1 jcc">{res.icon}</div>
                <div className="labList-info flx5">
                    <div>
                        <div className="title-md text-white">{res.label}</div>
                        <div className=" text-white">{myLab ? wordShort(res.desc, 80) : res.desc}</div>
                    </div>
                    <div className="text-md text-white">
                        <div className="flx">
                            <div className="mr-3">
                                2 hours
                                </div>
                            <div className="mr-3">
                                Intermediate
                                </div>
                            <div className="mr-3 elps">
                                on Demand
                                </div>
                            <div className="mr-3">
                                0.2$
                                </div>
                        </div>
                    </div>
                </div>
                <div className="text-center jcb-c">
                    <div>
                        {myLab ? <div>
                            <BtnPrimary className="">Select Training</BtnPrimary>
                        </div> : <BtnPrimary onClick={() => setShow(true)}>+ Import Now</BtnPrimary>}
                    </div>
                    <div className="">
                        {myLab ? <BtnPrimary className="my-2">Assign Now</BtnPrimary> : <div className="title-sm text-white">500 + active imports</div>}


                        <div className="star-icon">
                            <div>
                                {ICN_STAR}
                            </div>
                            <div>
                                {ICN_STAR}
                            </div>
                            <div>
                                {ICN_STAR}
                            </div>
                            <div>
                                {ICN_STAR}
                            </div>
                            <div>
                                {ICN_STAR}
                            </div>

                        </div>
                    </div>
                </div>
            </div>)}

        </div>
        {<BsModal {...{ show, setShow, headerTitle: "Add This Lab", size: "xl" }}>
            {show && <AddLab />}
        </BsModal>}
    </>)
}

export default LabList