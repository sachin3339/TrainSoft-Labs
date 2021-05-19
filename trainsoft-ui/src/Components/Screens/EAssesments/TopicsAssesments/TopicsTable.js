import { useState, useContext, useEffect } from "react";
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
import AssessmentContext from "../../../../Store/AssessmentContext";
import * as Yup from 'yup';


const TopicsTable = ({ location }) => {
  const { spinner, user } = useContext(AppContext)
  const { setTopicSid, setCategory } = useContext(AssessmentContext)
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const [topic, setTopic] = useState([]);
  const [initialValue, setInitialValue] = useState({ name: "" })
  const [isEdit, setIsEdit] = useState(false)
  const Toast = useToast()


  //validation
  const schema = Yup.object().shape({
    name: Yup.string().required('Required!'),
  });

  const [configuration, setConfiguration] = useState({
    columns: {
      name: {
        title: "Topic Name",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (data) => (
          <div onClick={() => setTopicSid(data.sid)} style={{ display: "flex", alginItems: "center" }}>
            <Link
              to={"topic-details"}
              state={{
                title: "Topics",
                subTitle: "Assessments",
                path: "topicAssesments",
                count: data.noOfAssessments,
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
        title: "No. Of Assessment",
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
        onClick: (data, i) => { setIsEdit(true); setShow(true); setInitialValue(data) }
      },
      {
        title: "Delete",
        icon: ICN_TRASH,
        onClick: (data) => deleteTopic(data.sid),
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
  const getAllTopic = async (pageNo = "1") => {
    spinner.show("Loading... wait");
    try {
      let { data } = await RestService.getAllTopic(GLOBELCONSTANT.PAGE_SIZE, pageNo - 1)
      setTopic(data);
      spinner.hide();
    } catch (err) {
      spinner.hide();
      console.error("error occur on getAllTopic()", err)
    }
  }

  // delete Topic
  const deleteTopic = async (sid) => {
    spinner.show("Loading... wait");
    try {
      let response = await RestService.deleteTopic(sid)
      getAllTopic()
      Toast.success({ message: "Topic deleted successfully" })
      spinner.hide();
    } catch (err) {
      spinner.hide();
      console.error("error occur on getAllTopic()", err)
    }
  }

  // Create Topic
  const createTopic = async (payload) => {
    spinner.hide("Loading... wait");
    try {
      let data = !isEdit ? await RestService.createTopic(payload) : await RestService.updateTopic(payload)
      Toast.success({ message: `Topic ${isEdit ? "updated" : 'added'} successfully` })
      getAllTopic()
      getTopicCount()
      setShow(false)
      setIsEdit(false)
    } catch (err) {
      Toast.error({ message: err.response.data?.message })
      setShow(false)
      console.error("error occur on createTopic()", err)
    }
  }


  // search topic 
  const searchTopic = async (value) => {
    spinner.show("Loading... wait");
    try {
      let { data } = await RestService.searchTopic(value, user.companySid)
      setTopic(data);
      spinner.hide();
    } catch (err) {
      spinner.hide();
      console.error("error occur on searchTopic()", err)
    }
  }

  // get batch count
  const getTopicCount = async () => {
    try {
      let { data } = await RestService.getEAssessCount("quiz")
      setCount(data);
    } catch (err) {
      console.error("error occur on getTopicCount()", err)
    }
  }

  useEffect(() => {
    getTopicCount()
    getAllTopic()
  }, [])

  return (
    <>
      <CardHeader
        {...{
          location,
          onChange: (e) => e.length === 0 && getAllTopic(),
          onEnter: (e) => searchTopic(e),
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
      <BsModal {...{ show, setShow, headerTitle: `${isEdit ? "Update Topic" : "Add Topic"}`, size: "lg" }}>
        <div className="">
          <div>
            <Formik
              initialValues={initialValue}
              onSubmit={(values) => createTopic(values)}
              validationSchema={schema}
            >
              {({ handleSubmit }) => (
                <>
                  <form onSubmit={handleSubmit}>
                    <TextInput name="name" label="Topic Name" />
                    <div className="text-right mt-2">
                      <Button type="submit" className=" px-4">
                        {isEdit ? "Update" : "Create"}
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
            count
          }}
        />
      </div>
    </>
  );
};
export default TopicsTable;
