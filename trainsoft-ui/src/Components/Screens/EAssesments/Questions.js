import CardHeader from "../../Common/CardHeader";
import { Link, navigate, Router } from "../../Common/Router";
import CreateQuestion from "./CreateQuestion";
import { Button } from "../../Common/Buttons/Buttons";
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import { useState } from "react";
import { Toggle } from "../../Common/BsUtils";
import QuestionDetails from "./QuestionDetails";

const Questions = ({ location }) => {
  const [count, setCount] = useState(0);
  const [questions, setQuestions] = useState([
    {
      name: "What is a correct syntax to output “Hello World” in Java?",
      type: "Multiple Choice",
      tags: "Java",
      difficulty: "Beginner",
      sid: "1",
    },
  ]);
  const [configuration, setConfiguration] = useState({
    columns: {
      name: {
        title: "Question",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (data) => (
          <div style={{ display: "flex", alginItems: "center" }}>
            <Toggle />
            <Link
              to={"question-details"}
              state={{
                title: "Questions",
                subTitle: data.name,
                path: "question",
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
      type: {
        title: "Type",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
      },
      tags: {
        title: "Tags",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (data) => (
          <div
            style={{
              background: "#B1FFFF",
              width: "79px",
              height: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "25px",
            }}
          >
            {data.tags}
          </div>
        ),
      },
      difficulty: {
        title: "Tags",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (data) => (
          <div
            style={{
              background: "#E8E8E8",
              width: "79px",
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
          state: {
            title: "Questions",
          },
        }}
      >
        <Button
          className=" ml-2"
          onClick={() => {
            navigate("/questions/create", {
              state: { title: "Questions", subTitle: "New Question" },
            });
          }}
        >
          + New Question
        </Button>
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

const Question = () => {
  return (
    <Router>
      <Questions path="/" />
      <CreateQuestion path="create" />
      <QuestionDetails path="question-details" />
    </Router>
  );
};
export default Question;
