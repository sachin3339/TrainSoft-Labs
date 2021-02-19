import { Children } from 'react'
import {ICN_HOME,ICN_CALENDER,ICN_SETTING, ICN_SUPPORT, ICN_REPORT, ICN_PARTICIPANT, ICN_BATCHES} from '../../Common/Icon'
export const SidebarConfig = [
    {
        icon: ICN_HOME,
        title: "HOME",
        pathname: "/",
        disabled: false
    },
    {
        icon: ICN_BATCHES,
        title: "ORG MGMT",
        pathname: "org-mgmt",
        disabled: true
    },
    {
        icon: ICN_PARTICIPANT,
        title: "TRAINING",
        pathname: "training",
        disabled: false
    },
    {
        icon: ICN_BATCHES,
        title: "BATCHES",
        pathname: "batches",
        disabled: false
    },
    // {
    //     icon: ICN_BATCHES,
    //     title: "USER",
    //     pathname: "user",
    //     disabled: false
    // },
    {
        icon: ICN_PARTICIPANT,
        title: "COURSE",
        pathname: "course",
        disabled: true
    },
    {
        icon: ICN_PARTICIPANT,
        title: "LAB STORE",
        pathname: "labstore",
        subPath:'labstore',
        disabled: false,
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
        disabled: true
    },
    // {
    //     icon: ICN_CALENDER,
    //     title: "CALENDER",
    //     pathname: "calender",
    //     disabled: true
    // },
    {
        icon: ICN_SUPPORT,
        title: "SUPPORT",
        pathname: "support",
        disabled: true
    },
    // {
    //     icon: ICN_SETTING,
    //     title: "SETTING",
    //     pathname: "setting",
    //     disabled: true
    // },


]