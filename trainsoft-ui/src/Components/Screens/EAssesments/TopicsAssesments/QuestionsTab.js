import { useState } from "react";
import DynamicTable from "../../../Common/DynamicTable/DynamicTable";

const QuestionsTab = () => {
  const [count, setCount] = useState(0);
  const [questions, setQuestions] = useState([
    {
      name: "Question here?",
      type: "Multiple Choise",
      difficulty: "Hard",
      sid: "1",
    },
  ]);
  const [configuration, setConfiguration] = useState({
    columns: {
      name: {
        title: "QUESTION",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (data) => (
          <div style={{ display: "flex", alginItems: "center" }}>
            <div className="dt-name">{data.name}</div>
          </div>
        ),
      },
      type: {
        title: "TYPE",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
      },
      difficulty: {
        title: "DIFFICULTY",
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
    actionCustomClass: "no-chev esc-btn-dropdown", // user can pass their own custom className name to add/remove some css style on action button
    actionVariant: "", // user can pass action button variant like primary, dark, light,
    actionAlignment: true, // user can pass alignment property of dropdown menu by default it is alignLeft
    // call this callback function onSearch method in input field on onChange handler eg: <input type="text" onChange={(e) => onSearch(e.target.value)}/>
    // this search is working for search enable fields(column) eg. isSearchEnabled: true, in tale column configuration
    searchQuery: "",
    tableCustomClass: "ng-table sort-enabled", // table custom class

    clearSelection: false,
  });
  return (
    <>
      <div className="table-shadow" style={{ marginTop: "20px" }}>
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

export default QuestionsTab;
