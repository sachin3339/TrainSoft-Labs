import CardHeader from "../../Common/CardHeader";
import { Link, navigate, Router } from "../../Common/Router";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import CreateQuestion from "./CreateQuestion";
import { Button, BtnLight } from "../../Common/Buttons/Buttons";
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import { useState } from "react";
import { BsModal, Toggle } from "../../Common/BsUtils";
import QuestionDetails from "./QuestionDetails";
import { TextInput } from "../../Common/InputField/InputField";
import { Formik } from "formik";
import { DriveEtaTwoTone } from "@material-ui/icons";

const Topics = ({ location }) => {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const [questions, setQuestions] = useState([
    {
      name: "Java",
      numAssignments: "10",

      sid: "1",
    },
  ]);
  const [configuration, setConfiguration] = useState({
    columns: {
      name: {
        title: "Topic Name",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (data) => (
          <div style={{ display: "flex", alginItems: "center" }}>
            <Link
              to={"topic-details"}
              state={{
                title: "Topics",
                subTitle: "Assesments",
                path: "topicAssesments",
                rowData: data,
                sid: data.sid,
              }}
              className="dt-name"
              style={{ marginLeft: "10px" }}
            >
              {data.name}
            </Link>
          </div>
        ),
      },
      numAssignments: {
        title: "NO. OF ASSIGNMENT",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
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
    // actions: [
    //   {
    //     title: "Edit",
    //     icon: ICN_EDIT,
    //     onClick: (data, i) => {
    //       setIsEdit(true);
    //       setShow(true);
    //       setInitialValues({
    //         name: data.name,
    //         description: data.description,
    //         sid: data.sid,
    //       });
    //     },
    //   },
    //   {
    //     title: "Delete",
    //     icon: ICN_TRASH,
    //     onClick: (data) => deleteCourse(data.sid),
    //   },
    // ],
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
  return (
    <>
      <CardHeader
        location={{
          ...location,
        }}
      >
        <Button
          className=" ml-2"
          onClick={() => {
            setShow(true);
          }}
        >
          + New Topic
        </Button>
      </CardHeader>
      <BsModal {...{ show, setShow, headerTitle: "Add Topic", size: "lg" }}>
        <div className="">
          <div>
            <Formik
            // initialValues={
            //   !isEdit
            //     ? { topicName: "", topicDescription: "" }
            //     : initialValues
            // }
            // validationSchema={schema}
            // onSubmit={(values) => {
            //   !isEdit ? createSession(values) : editSession(values);
            // }}
            >
              {({ handleSubmit }) => (
                <>
                  <form onSubmit={handleSubmit}>
                    <TextInput name="topicName" label="Topic Name" />
                    <div className="text-right mt-2">
                      {/* <Button className=" px-4" onClick={() => setShow(false)}>
                        Cancel
                      </Button> */}
                      <Button onClick={() => setShow(false)} className=" px-4">
                        Create
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </Formik>
          </div>
        </div>
      </BsModal>

      <div className="table-shadow">
        <DynamicTable
          {...{
            configuration,
            sourceData: questions,
            // onPageChange: (e) => getCourse(e),
            count,
          }}
        />
      </div>
    </>
  );
};

const Assesments = ({ location }) => {
  const [count, setCount] = useState(0);
  const [questions, setQuestions] = useState([
    {
      name: "Java Funda Mntals",
      questions: "10",

      sid: "1",
    },
  ]);
  const [configuration, setConfiguration] = useState({
    columns: {
      name: {
        title: "Assesment Name",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (data) => (
          <div style={{ display: "flex", alginItems: "center" }}>
            <Link
              to={"assesment-details"}
              state={{
                title: "Topic",
                subTitle: "Assesment",
                path: "topicAssesment",
                rowData: data,
                sid: data.sid,
              }}
              className="dt-name"
              style={{ marginLeft: "10px" }}
            >
              {data.name}
            </Link>
          </div>
        ),
      },
      questions: {
        title: "Questions",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
      },
      type: {
        title: "Type",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
      },
      category: {
        title: "Category",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
      },
      difficulty: {
        title: "Difficulty",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
      },
      validity: {
        title: "Validity",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
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
  return (
    <>
      <CardHeader
        location={{
          ...location,
        }}
      >
        <Button className=" ml-2">+ New Assesment</Button>
      </CardHeader>

      <div className="table-shadow">
        <DynamicTable
          {...{
            configuration,
            sourceData: questions,
            // onPageChange: (e) => getCourse(e),
            count,
          }}
        />
      </div>
    </>
  );
};

const AssesmentDetails = ({ location }) => {
  const [count, setCount] = useState(0);
  const [questions, setQuestions] = useState([
    {
      name: "JRaymond",
      type: "Submitted",
      sid: "1",
    },
  ]);
  const [configuration, setConfiguration] = useState({
    columns: {
      name: {
        title: "ASSESSEE NAME",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (data) => (
          <div style={{ display: "flex", alginItems: "center" }}>
            <div className="dt-name">{data.name}</div>
          </div>
        ),
      },
      questions: {
        title: "EMAIL",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
      },
      type: {
        title: "SUBMISSION STATUS",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (data) => (
          <div style={{ color: data.type === "submitted" ? "#1C9B60" : "" }}>
            {data.type}{" "}
          </div>
        ),
      },
      category: {
        title: "SUBMITTED ON",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
      },
      difficulty: {
        title: "SUBMITTED ON",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
      },
      validity: {
        title: "Validity",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
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
    // actions: [
    //   {
    //     title: "Edit",
    //     icon: ICN_EDIT,
    //     onClick: (data, i) => {
    //       setIsEdit(true);
    //       setShow(true);
    //       setInitialValues({
    //         name: data.name,
    //         description: data.description,
    //         sid: data.sid,
    //       });
    //     },
    //   },
    //   {
    //     title: "Delete",
    //     icon: ICN_TRASH,
    //     onClick: (data) => deleteCourse(data.sid),
    //   },
    // ],
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
  return (
    <>
      <CardHeader
        location={{
          ...location,
        }}
      ></CardHeader>
      <div style={{ paddingTop: "80px" }}>
        <Headers />
      </div>
      <div className="table-shadow">
        <DynamicTable
          {...{
            configuration,
            sourceData: questions,
            // onPageChange: (e) => getCourse(e),
            count,
          }}
        />
      </div>
    </>
  );
};

const TopicAssesment = () => {
  return (
    <Router>
      <Topics path="/" />
      <Assesments path="topic-details" />
      <AssesmentDetails path="topic-details/assesment-details" />
    </Router>
  );
};

const Headers = () => {
  return (
    <div
      style={{
        display: "flex",
        marginTOp: "70px",

        width: "100%",
        justifyContent: "space-between",
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          width: "190px",
          height: "120px",
          background: "white",
          boxShadow: "0px 0px 5px #0000003E",
          borderRadius: "5px",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>
            Assesment <br />
            Started on
          </div>
          <div>
            <FlagOutlinedIcon style={{ fontSize: "36px" }} />
          </div>
        </div>
        <div
          style={{
            font: "normal normal 600 26px/16px Montserrat",
            color: "#49167E",
          }}
        >
          5 Apr 2021
        </div>
      </div>

      <div
        style={{
          width: "190px",
          height: "120px",
          background: "white",
          boxShadow: "0px 0px 5px #0000003E",
          borderRadius: "5px",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>
            Total <br />
            Submitted
          </div>
          <div>
            <FlagOutlinedIcon style={{ fontSize: "36px" }} />
          </div>
        </div>
        <div
          style={{
            font: "normal normal 600 26px/16px Montserrat",
            color: "#49167E",
          }}
        >
          13{" "}
          <span
            style={{
              font: " normal normal 600 16px/16px Montserrat",
              color: "#333333",
            }}
          >
            {" "}
            / 13
          </span>
        </div>
      </div>

      <div
        style={{
          width: "190px",
          height: "120px",
          background: "white",
          boxShadow: "0px 0px 5px #0000003E",
          borderRadius: "5px",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>
            Assensee <br />
            Attendance
          </div>
          <div>
            <FlagOutlinedIcon style={{ fontSize: "36px" }} />
          </div>
        </div>
        <div
          style={{
            font: "normal normal 600 26px/16px Montserrat",
            color: "#49167E",
          }}
        >
          100%
        </div>
      </div>

      <div
        style={{
          width: "190px",
          height: "120px",
          background: "white",
          boxShadow: "0px 0px 5px #0000003E",
          borderRadius: "5px",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>
            Total <br />
            Questions
          </div>
          <div>
            <FlagOutlinedIcon style={{ fontSize: "36px" }} />
          </div>
        </div>
        <div
          style={{
            font: "normal normal 600 26px/16px Montserrat",
            color: "#49167E",
          }}
        >
          20
        </div>
      </div>

      <div
        style={{
          width: "190px",
          height: "120px",
          background: "white",
          boxShadow: "0px 0px 5px #0000003E",
          borderRadius: "5px",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>
            Batch <br />
            Avg Score
          </div>
          <div>
            <FlagOutlinedIcon style={{ fontSize: "36px" }} />
          </div>
        </div>
        <div
          style={{
            font: "normal normal 600 26px/16px Montserrat",
            color: "#49167E",
          }}
        >
          98%
        </div>
      </div>
    </div>
  );
};

export default TopicAssesment;
