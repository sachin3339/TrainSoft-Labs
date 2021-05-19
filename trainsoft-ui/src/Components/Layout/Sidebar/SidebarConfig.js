import GLOBELCONSTANT from '../../../Constant/GlobleConstant'
import {ICN_HOME,ICN_CALENDER,ICN_ORG_MGT,ICN_ASSESSMENT,  ICN_REPORT, ICN_PARTICIPANT, ICN_BATCHES,  ICN_SUPPORT_HOME, ICN_COURSE, ICN_DASHBOARD, ICN_COMPILER, ICN_LAB_STORE, ICN_VSCODE, ICN_SETTINGS, ICN_MYASSESSMENT, ICN_CATALOG} from '../../Common/Icon'
export const AdminConfig = [
    {
        icon: ICN_HOME,
        title: "Home",
        pathname: "home",
        disabled: false,
        role:[GLOBELCONSTANT.ROLE.LEARNER]
    },
    {
        icon: ICN_DASHBOARD,
        title: "Dashboard",
        pathname: "assessment",
        disabled: true,
        role: [GLOBELCONSTANT.ROLE.ASSESS_USER]
    },
    
    {
        icon: ICN_CATALOG,
        title: "Catalogue",
        pathname: "catalogue",
        disabled: true,
        role: [GLOBELCONSTANT.ROLE.ASSESS_USER]
    },
    {
        icon: ICN_MYASSESSMENT,
        title: "My Assessment",
        pathname: "myAssessment",
        disabled: true,
        role: [GLOBELCONSTANT.ROLE.ASSESS_USER]
    },
    {
        icon: ICN_DASHBOARD,
        title: "Dashboard",
        pathname: "dashboard",
        disabled: false,
        role:[GLOBELCONSTANT.ROLE.SUPERVISOR,GLOBELCONSTANT.ROLE.INSTRUCTOR]
    },
    {
        icon: ICN_ORG_MGT,
        title: "Org. Mgmt",
        pathname: "org-mgmt",
        disabled: true,
        role:[GLOBELCONSTANT.ROLE.SUPERVISOR]
    },
    {
        icon: ICN_PARTICIPANT,
        title: "Training",
        pathname: "training",
        disabled: false,
        role:[GLOBELCONSTANT.ROLE.SUPERVISOR,GLOBELCONSTANT.ROLE.LEARNER,GLOBELCONSTANT.ROLE.INSTRUCTOR]
    },
    {
        icon: ICN_BATCHES,
        title: "Batches",
        pathname: "batches",
        disabled: false,
        role:[GLOBELCONSTANT.ROLE.SUPERVISOR]
    },
    {
        icon: ICN_BATCHES,
        title: "User",
        pathname: "user",
        disabled: false,
        role:[GLOBELCONSTANT.ROLE.SUPERVISOR]

    },
    {
        icon: ICN_COURSE,
        title: "Course",
        pathname: "course",
        disabled: true,
        role:[GLOBELCONSTANT.ROLE.SUPERVISOR]
    },
    {
        icon: ICN_ASSESSMENT,
        title: "Topics",
        pathname: "topicAssesments",
        disabled: true,
        role: [ GLOBELCONSTANT.ROLE.INSTRUCTOR, GLOBELCONSTANT.ROLE.SUPERVISOR]
    },
    {
        icon: ICN_SUPPORT_HOME,
        title: "Questions",
        pathname: "questions",
        disabled: true,
        role: [ GLOBELCONSTANT.ROLE.INSTRUCTOR, GLOBELCONSTANT.ROLE.SUPERVISOR]
    },
    {
        icon: ICN_LAB_STORE,
        title: "Lab Store",
        pathname: "labstore",
        subPath:'labstore',
        disabled: false,
        role:[GLOBELCONSTANT.ROLE.SUPERVISOR,GLOBELCONSTANT.ROLE.INSTRUCTOR,GLOBELCONSTANT.ROLE.LEARNER],
        Children: [
            {
                title: "Catalog",
                pathName:'labstore',
                disabled: false,
            },
            {
                title: "My Lab",
                pathName:'mylab',
                disabled: false,
            }
        ]
    },
    {
        icon: ICN_REPORT,
        title: "Report",
        pathname: "report",
        disabled: true,
        role:[GLOBELCONSTANT.ROLE.SUPERVISOR,GLOBELCONSTANT.ROLE.INSTRUCTOR,GLOBELCONSTANT.ROLE.LEARNER]
    },
    {
        icon: ICN_CALENDER,
        title: "Calendar",
        pathname: "calender",
        disabled: true,
        role:[GLOBELCONSTANT.ROLE.SUPERVISOR,GLOBELCONSTANT.ROLE.INSTRUCTOR,GLOBELCONSTANT.ROLE.LEARNER]
    },
    {
        icon: ICN_COMPILER,
        title: "Compiler",
        pathname: "compiler",
        disabled: true,
        role: [GLOBELCONSTANT.ROLE.LEARNER, GLOBELCONSTANT.ROLE.INSTRUCTOR]
    },
    {
        icon: ICN_VSCODE,
        title: "VS Code",
        pathname: "vs-code",
        disabled: true,
        role: [GLOBELCONSTANT.ROLE.LEARNER, GLOBELCONSTANT.ROLE.INSTRUCTOR]
    },
    {
        icon: ICN_SUPPORT_HOME,
        title: "Support",
        pathname: "support",
        disabled: true,
        role: [GLOBELCONSTANT.ROLE.LEARNER, GLOBELCONSTANT.ROLE.INSTRUCTOR, GLOBELCONSTANT.ROLE.SUPERVISOR]
    },
   
    {
        icon: ICN_SETTINGS,
        title: "Setting",
        pathname: "setting",
        disabled: true,
        role: [GLOBELCONSTANT.ROLE.ASSESS_USER]
    },
   
    // {
    //     icon: ICN_VSCODE,
    //     title: "Class",
    //     pathname: "class",
    //     disabled: true,
    //     role: [GLOBELCONSTANT.ROLE.LEARNER]
    // },
]

export const userConfig = []





