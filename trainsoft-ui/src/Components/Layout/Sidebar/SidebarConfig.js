import { Children } from 'react'
import {ICN_HOME,ICN_CALENDER,ICN_SETTING,ICN_ORG_MGT, ICN_SUPPORT, ICN_REPORT, ICN_PARTICIPANT, ICN_BATCHES, ICN_BOOK, ICN_STORE, ICN_SUPPORT_HOME, ICN_COURSE, ICN_DASHBOARD, ICN_COMPILER, ICN_LAB_STORE, ICN_VSCODE} from '../../Common/Icon'
export const AdminConfig = [
    {
        icon: ICN_HOME,
        title: "Home",
        pathname: "home",
        disabled: false,
        role:['USER']
    },
    {
        icon: ICN_DASHBOARD,
        title: "Dashboard",
        pathname: "dashboard",
        disabled: false,
        role:['ADMIN','TRAINER']
    },
    {
        icon: ICN_ORG_MGT,
        title: "Org. Mgmt",
        pathname: "org-mgmt",
        disabled: true,
        role:['ADMIN']
    },
    {
        icon: ICN_PARTICIPANT,
        title: "Training",
        pathname: "training",
        disabled: false,
        role:['ADMIN','USER','TRAINER']
    },
    {
        icon: ICN_BATCHES,
        title: "Batches",
        pathname: "batches",
        disabled: false,
        role:['ADMIN','TRAINER']

    },
    {
        icon: ICN_BATCHES,
        title: "USER",
        pathname: "user",
        disabled: false,
        role:['ADMIN']

    },
    {
        icon: ICN_COURSE,
        title: "Course",
        pathname: "course",
        disabled: true,
        role:['ADMIN']
    },

    {
        icon: ICN_LAB_STORE,
        title: "Lab Store",
        pathname: "labstore",
        subPath:'labstore',
        disabled: false,
        role:['ADMIN','TRAINER','USER'],
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
        role:['ADMIN','TRAINER','USER']
    },
    {
        icon: ICN_CALENDER,
        title: "Calendar",
        pathname: "calender",
        disabled: true,
        role:['ADMIN','TRAINER','USER']
    },

    {
        icon: ICN_COMPILER,
        title: "Compiler",
        pathname: "compiler",
        disabled: true,
        role: ['USER', 'TRAINER']

    },
    {
        icon: ICN_VSCODE,
        title: "VS Code",
        pathname: "vscode",
        disabled: true,
        role: ['USER', 'TRAINER']

    },

    {
        icon: ICN_SUPPORT_HOME,
        title: "Support",
        pathname: "support",
        disabled: true,
        role: ['USER', 'TRAINER', 'ADMIN']
    },
    {
        icon: ICN_VSCODE,
        title: "Class",
        pathname: "class",
        disabled: true,
        role: ['USER', 'TRAINER', 'ADMIN']
    },

 
]

export const userConfig = [
  
    
    
   
    
    
]





