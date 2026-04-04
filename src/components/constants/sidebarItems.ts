export const sideBarItems = [
    {
        title: "Status",
        type: "status",
        filterOptions: [
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

export const SIDEBAR_WIDTH = 280;