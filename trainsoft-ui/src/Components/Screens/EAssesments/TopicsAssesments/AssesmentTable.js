import { useState } from "react";
import { Button } from "react-bootstrap";

import CardHeader from "../../../Common/CardHeader";
import DynamicTable from "../../../Common/DynamicTable/DynamicTable";

import { Link } from "../../../Common/Router";

const AssesmentsTable = ({ location }) => {
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

export default AssesmentsTable;
