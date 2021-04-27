import { Formik } from "formik";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { BsModal } from "../../../Common/BsUtils";
import CardHeader from "../../../Common/CardHeader";
import DynamicTable from "../../../Common/DynamicTable/DynamicTable";
import { TextInput } from "../../../Common/InputField/InputField";
import { Link } from "../../../Common/Router";

const TopicsTable = ({ location }) => {
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
export default TopicsTable;
