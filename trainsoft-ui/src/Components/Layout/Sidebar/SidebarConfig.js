import { Children } from 'react'
import {ICN_HOME,ICN_CALENDER,ICN_SETTING,ICN_ORG_MGT, ICN_SUPPORT, ICN_REPORT, ICN_PARTICIPANT, ICN_BATCHES, ICN_BOOK, ICN_STORE, ICN_SUPPORT_HOME, ICN_COURSE, ICN_DASHBOARD, ICN_COMPILER, ICN_LAB_STORE, ICN_VSCODE} from '../../Common/Icon'
export const AdminConfig = [
    {
        icon: ICN_HOME,
        title: "HOME",
        pathname: "home",
        disabled: false,
        role:['user']
    },
    {
        icon: ICN_DASHBOARD,
        title: "DASHBOARD",
        pathname: "dashboard",
        disabled: false,
        role:['admin','trainer']
    },
    {
        icon: ICN_ORG_MGT,
        title: "ORG MGMT",
        pathname: "org-mgmt",
        disabled: true,
        role:['admin']
    },
    {
        icon: ICN_PARTICIPANT,
        title: "TRAINING",
        pathname: "training",
        disabled: false,
        role:['admin','user','trainer']
    },
    {
        icon: ICN_BATCHES,
        title: "BATCHES",
        pathname: "batches",
        disabled: false,
        role:['admin','trainer']

    },
    {
        icon: ICN_BATCHES,
        title: "USER",
        pathname: "user",
        disabled: false,
        role:['admin']

    },
    {
        icon: ICN_COURSE,
        title: "COURSE",
        pathname: "course",
        disabled: true,
        role:['admin']
    },

    {
        icon: ICN_LAB_STORE,
        title: "LAB STORE",
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
        title: "REPORT",
        pathname: "report",
        disabled: true,
        role:['admin','trainer','user']
    },
    {
        icon: ICN_CALENDER,
        title: "CALENDER",
        pathname: "calender",
        disabled: true,
        role:['admin','trainer','user']
    },

    {
        icon: ICN_COMPILER,
        title: "COMPILER",
        pathname: "compiler",
        disabled: true,
        role: ['user', 'trainer']

    },
    {
        icon: ICN_VSCODE,
        title: "VS CODE",
        pathname: "vscode",
        disabled: true,
        role: ['user', 'trainer']

    },

    {
        icon: ICN_SUPPORT_HOME,
        title: "SUPPORT",
        pathname: "support",
        disabled: true,
        role: ['user', 'trainer', 'admin']
    },

 
]

export const userConfig = [
  
    
    
   
    
    
]





