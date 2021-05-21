import { Button } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { useState, useContext, useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import GLOBELCONSTANT from "../../../../Constant/GlobleConstant";
import RestService from "../../../../Services/api.service";
import AppContext from "../../../../Store/AppContext";
import useToast from "../../../../Store/ToastHook";
import { BsModal, Toggle } from "../../../Common/BsUtils";
import { Button as Buttons, Cancel } from "../../../Common/Buttons/Buttons";
import CardHeader from "../../../Common/CardHeader";
import DynamicTable from "../../../Common/DynamicTable/DynamicTable";
import { ICN_EDIT, ICN_TRASH, ICN_UPLOAD } from "../../../Common/Icon";
import { Link, navigate } from "../../../Common/Router";
import './question.css';


const QuestionsTable = ({ location }) => {
  const Toast = useToast()
  const { spinner, user } = useContext(AppContext);
  const [count, setCount] = useState(0);
  const [questions, setQuestions] = useState([])
  const [show, setShow] = useState(false)
  const [files,setFiles] = useState()
  const [isSearch,setIsSearch] = useState(false)
  const [searchValue,setSearchValue] = useState('')
  const [configuration, setConfiguration] = useState({
    columns: {
      name: {
        title: "Question",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (data) => (
          <div style={{ display: "flex", alginItems: "center" }}>
            <div className="w45"><Toggle id={data.sid} onChange={() => { changeStatus(data.sid,data.status) }} checked={data.status === 'ENABLED' ? true : false} /></div>
            <Link
          
              to={"question-details"}
              state={{
                title: "Questions",
                subTitle: data.name,
                path: "question",
                rowData: data,
                sid: data.sid,
              }}
              className="dt-name hidden elps"
              style={{ marginLeft: "10px" }}
            >
              <span title={data.name}>{data.name}</span>
            </Link>
          </div>
        ),
      },
      questionType: {
        title: "Type",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
      },
      technologyName: {
        title: "Tags",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (data) => (
          <div className="flexWrap">
            {
              data.technologyName
              && data.technologyName.split(",").map((t, i) => <div key={i} className="q-tag mb5 mr5"><span className="px10">{t}</span></div>)
            }
          </div>
        ),
      },
      difficulty: {
        title: "Difficulty",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (data) => (
          <div
            style={{
              background: "#E8E8E8",
              width: "120px",
              height: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "25px",
            }}
          >
            {data.difficulty}
          </div>
        ),
      },
    },
    headerTextColor: "#454E50", // user can change table header text color
    sortBy: null, // by default sort table by name key
    sortDirection: false, // sort direction by default true
    updateSortBy: (sortKey) => {
      configuration.sortBy = sortKey;
      Object.keys(configuration.columns).map(
        (key) =>
        (configuration.columns[key].sortDirection =
          key === sortKey ? !configuration.columns[key].sortDirection : false)
      );
      configuration.sortDirection =
        configuration.columns[sortKey].sortDirection;
      setConfiguration({ ...configuration });
    },
    actions: [
      {
        title: "Edit",
        icon: ICN_EDIT,
        onClick: (data, i) => { getQuestionById(data.sid) },
      },
      {
        title: "Delete",
        icon: ICN_TRASH,
        onClick: (data) => deleteQuestion(data.sid),
      },
    ],
    actionCustomClass: "no-chev esc-btn-dropdown", // user can pass their own custom className name to add/remove some css style on action button
    actionVariant: "", // user can pass action button variant like primary, dark, light,
    actionAlignment: true, // user can pass alignment property of dropdown menu by default it is alignLeft
    // call this callback function onSearch method in input field on onChange handler eg: <input type="text" onChange={(e) => onSearch(e.target.value)}/>
    // this search is working for search enable fields(column) eg. isSearchEnabled: true, in tale column configuration
    searchQuery: "",
    tableCustomClass: "ng-table sort-enabled", // table custom class
    // showCheckbox: true,
    clearSelection: false,
  });

  // get All question 
  const getQuestionById = async (sid) => {
    spinner.show("Loading... wait...");
    try {
      let { data } = await RestService.getQuestionById(sid);
      navigate("/questions/create", {
        state: { title: "Questions", subTitle: data.name, "isEdit": true, "questionData": {...data, "answer": data.answer.filter(d => d.status != GLOBELCONSTANT.STATUS.DELETED).map(a => ({...a, "operation" : GLOBELCONSTANT.OPERATION.UPDATE})) }},
      });
      spinner.hide();
    } catch (err) {
      spinner.hide();
      console.error("error occur on getQuestionById()", err);
    }
  }

  // get All question 
  const getAllQuestion = async (page = 1) => {
    spinner.show("Loading... wait");
    try {
      let { data } = await RestService.getAllQuestion(GLOBELCONSTANT.PAGE_SIZE, page - 1)
      setQuestions(data);
      setIsSearch(false)
      setSearchValue('')
      spinner.hide();
    } catch (err) {
      setIsSearch(false)
      spinner.hide();
      console.error("error occur on getAllQuestion()", err)
    }
  }

    // change question status
    const changeStatus = async (qSid,status) => {
      spinner.show("Loading... wait");
      try {
        let { data } = await RestService.changeQuestionStatus(qSid,status === "DISABLED" ? "enabled": "disabled")
        getAllQuestion()
        Toast.success({ message: "Status updated successfully" })
        spinner.hide();
      } catch (err) {
        spinner.hide();
        console.error("error occur on getAllQuestion()", err)
      }
    }

  // Delete question
  const deleteQuestion = async (sid) => {
    spinner.show("Loading... wait");
    try {
      let { data } = await RestService.deleteQuestion(sid)
      Toast.success({ message: "Question deleted successfully" })
      getAllQuestion()
      spinner.hide();
    } catch (err) {
      spinner.hide();
      Toast.error({ message: err.response?.data?.message })
      console.error("error occur on deleteQuestion()", err)
    }
  }

  // search topic 
  const searchQuestion = async (value,pageNo=1) => {
    spinner.show("Loading... wait");
    try {
      let { data } = await RestService.searchQuestion(value , user.companySid,GLOBELCONSTANT.PAGE_SIZE,pageNo-1)
      setQuestions(data);
      setIsSearch(true)
      spinner.hide();
    } catch (err) {
      spinner.hide();
      console.error("error occur on searchTopic()", err)
    }
  }

  // upload Question
  const uploadQuestion = async () => {
    try {
      spinner.show("Please wait...");
      let formData = new FormData();
      formData.append('file', files);
      let res = await RestService.uploadQuestion(formData)
      getAllQuestion()
      setShow(false)
      spinner.hide();
      Toast.success({ message: 'Question Upload successfully', time: 2000 });
    } catch (err) {
      Toast.error({ message: err.response?.data?.message });
      setShow(false)
      spinner.hide();
      console.error("error occur on uploadQuestion()", err)
    }
  }

  // get batch count
  const getQuestionCount = async () => {
    try {
      let { data } = await RestService.getEAssessCount("question")
      setCount(data);
    } catch (err) {
      console.error("error occur on getQuestionCount()", err)
    }
  }

  useEffect(() => {
    getQuestionCount()
    getAllQuestion()
  }, [])
  return (
    <>
      <CardHeader
        {...{
          location,
          onChange: (e) => e.length === 0 && getAllQuestion(),
          onEnter: (e) => {setSearchValue(e);searchQuestion(e)},
        }}
      >
        <DropdownButton className="btn-sm f13" title="+ New Question">
          <Dropdown.Item onClick={() => {
            navigate("/questions/create", {
              state: { title: "Questions", subTitle: "New Question" },
            });
          }}>Create Individual</Dropdown.Item>
          <Dropdown.Item onClick={() => { setShow(true); setFiles() }}>Upload in Bulk</Dropdown.Item>
        </DropdownButton>

      </CardHeader>
      <div className="table-shadow">
        <DynamicTable
          {...{
            configuration,
            sourceData: questions,
            onPageChange: (e) => {isSearch ? searchQuestion(searchValue, e) : getAllQuestion(e)},
            count,
          }}
        />
      </div>
      <BsModal {...{ show, setShow, headerTitle: "Upload Questions in Bulk", size: "lg" }}>
        <div className="">
          <div className="bulk-upload mt-2 border-0 ">
            {/* <div className="title-lg">Upload Assessees in Bulk</div> */}
            <div className="file-upload mb-2">
              <div>
                {files?.name ? files.name : "No File Uploaded Yet"}
              </div>
              <div>
                <input accept=".csv" className={""} id="contained-button-file2" onChange={(e) => setFiles(e.target.files[0])} type="file" />
                <label className="mb-0" htmlFor="contained-button-file2">
                  <Button variant="contained" color="primary" component="span">
                    <span className="mr-2">{ICN_UPLOAD}</span> Upload
                              </Button>
                </label>
              </div>
            </div>
            <a href={GLOBELCONSTANT.UPLOAD_QUESTION_TEMPLES} className="mt-3 link">Download Template</a>
          </div>
        </div>
        <div className="jce mt-3">
          <div>
            <Cancel onClick={() => setShow(false)}>Cancel</Cancel>
            <Buttons onClick={() => uploadQuestion()}>Create</Buttons>
          </div>

        </div>
      </BsModal>

    </>
  );
};

export default QuestionsTable;
