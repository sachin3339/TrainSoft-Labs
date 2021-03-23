import { Children } from 'react'
import {ICN_HOME,ICN_CALENDER,ICN_SETTING,ICN_ORG_MGT, ICN_SUPPORT, ICN_REPORT, ICN_PARTICIPANT, ICN_BATCHES, ICN_BOOK, ICN_STORE, ICN_SUPPORT_HOME, ICN_COURSE, ICN_DASHBOARD, ICN_COMPILER, ICN_LAB_STORE, ICN_VSCODE} from '../../Common/Icon'
export const AdminConfig = [
    {
        icon: ICN_HOME,
        title: "Home",
        pathname: "home",
        disabled: false,
        role:['user']
    },
    {
        icon: ICN_DASHBOARD,
        title: "Dashboard",
        pathname: "dashboard",
        disabled: false,
        role:['admin','trainer']
    },
    {
        icon: ICN_ORG_MGT,
        title: "Org. Mgmt",
        pathname: "org-mgmt",
        disabled: true,
        role:['admin']
    },
    {
        icon: ICN_PARTICIPANT,
        title: "Training",
        pathname: "training",
        disabled: false,
        role:['admin','user','trainer']
    },
    {
        icon: ICN_BATCHES,
        title: "Batches",
        pathname: "batches",
        disabled: false,
        role:['admin','trainer']

    },
    {
        icon: ICN_BATCHES,
        title: "User",
        pathname: "user",
        disabled: false,
        role:['admin']

    },
    {
        icon: ICN_COURSE,
        title: "Course",
        pathname: "course",
        disabled: true,
        role:['admin']
    },

    {
        icon: ICN_LAB_STORE,
        title: "Lab Store",
        pathname: "labstore",
        subPath:'labstore',
        disabled: false,
        role:['admin','trainer','user'],
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
        role:['admin','trainer','user']
    },
    {
        icon: ICN_CALENDER,
        title: "Calendar",
        pathname: "calender",
        disabled: true,
        role:['admin','trainer','user']
    },

    {
        icon: ICN_COMPILER,
        title: "Compiler",
        pathname: "compiler",
        disabled: true,
        role: ['user', 'trainer']

    },
    {
        icon: ICN_VSCODE,
        title: "VS Code",
        pathname: "vscode",
        disabled: true,
        role: ['user', 'trainer']

    },

    {
        icon: ICN_SUPPORT_HOME,
        title: "Support",
        pathname: "support",
        disabled: true,
        role: ['user', 'trainer', 'admin']
    },

 
]

export const userConfig = [
  
    
    
   
    
    
]





