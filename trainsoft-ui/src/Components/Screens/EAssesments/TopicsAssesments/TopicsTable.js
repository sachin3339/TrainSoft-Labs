import { useState,useContext ,useEffect} from "react";
import { Formik } from "formik";
import GLOBELCONSTANT from "../../../../Constant/GlobleConstant";
import RestService from "../../../../Services/api.service";
import AppContext from "../../../../Store/AppContext";
import { BsModal } from "../../../Common/BsUtils";
import CardHeader from "../../../Common/CardHeader";
import DynamicTable from "../../../Common/DynamicTable/DynamicTable";
import { TextInput } from "../../../Common/InputField/InputField";
import { Link } from "../../../Common/Router";
import { ICN_EDIT, ICN_TRASH } from "../../../Common/Icon";
import useToast from "../../../../Store/ToastHook";
import { Button } from "../../../Common/Buttons/Buttons";

const TopicsTable = ({ location }) => {
  const {spinner} =  useContext(AppContext)
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const [topic,setTopic] = useState([])
  const Toast = useToast()

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
      noOfAssessments: {
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
    actions: [
      {
        title: "Edit",
        icon: ICN_EDIT,
        onClick: (data, i) =>{}
      },
      {
        title: "Delete",
        icon: ICN_TRASH,
        onClick: (data) => {},
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
  

   // get All topic
   const getAllTopic = async (pageNo="1") => {
    spinner.hide("Loading... wait");
    try {
        RestService.getAllTopic(GLOBELCONSTANT.PAGE_SIZE,pageNo).then(
            response => {
              setTopic(response.data);
            },
            err => {
                spinner.hide();
            }
        ).finally(() => {
            spinner.hide();
        });
    } catch (err) {
        console.error("error occur on getAllTopic()", err)
    }
}

 // Create Topic
 const createTopic = async (payload) => {
  spinner.hide("Loading... wait");
  try {
      RestService.createTopic(payload).then(
          response => {
            Toast.success({ message: "Topic added successfully" })
            getAllTopic()
            setShow(false)
          },
          err => {
              spinner.hide();
              setShow(false)
          }
      ).finally(() => {
          spinner.hide();
          setShow(false)
      });
  } catch (err) {
    setShow(false)
      console.error("error occur on createTopic()", err)
  }
}


useEffect(() => {
  getAllTopic()
}, [])

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
            initialValues={{name:''}}
            onSubmit={(values) => createTopic(values)}
            >
              {({ handleSubmit }) => (
                <>
                  <form onSubmit={handleSubmit}>
                     <TextInput name="name" label="Topic Name" />
                    <div className="text-right mt-2">
                    
                      <Button type="submit" className=" px-4">
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
            sourceData: topic,
            onPageChange: (e) => getAllTopic(e),
            count:10,
          }}
        />
      </div>
    </>
  );
};
export default TopicsTable;
