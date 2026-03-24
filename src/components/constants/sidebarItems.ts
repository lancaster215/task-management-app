export const sideBarItems = [
    {
        title: "Status",
        type: "status",
        filterOptions: [
            {
                label: "All Status",
                value: ""
            },
            {
                label: "Todo",
                value: "todo"
            },
            {
                label: "In Progress",
                value: "in_progress"
            },
            {
                label: "Done",
                value: "done"
            },
        ]
    },
    {
        title: "Priority",
        type: "priority",
        filterOptions: [
            {
                label: "All Priority",
                value: ""
            },
            {
                label: "Low",
                value: "low"
            },
            {
                label: "Medium",
                value: "medium"
            },
            {
                label: "High",
                value: "high"
            },
        ]
    },
    {
        title: "Tags",
        type: "tags",
        filterOptions: [
            {
                label: "All Tags",
                value: ""
            },
            {
                label: "Feature",
                value: "feature"
            },
            {
                label: "Enhancement",
                value: "enhancement"
            },
            {
                label: "Bug",
                value: "bug"
            },
        ]
    },
    // {
    //     title: "Start Date",
    //     type: "startDate",
    // },
    {
        title: "End Date",
        type: "endDate",
    }
]