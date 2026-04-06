import { createSlice } from '@reduxjs/toolkit'

const assigneeSlice = createSlice({
    name: 'assignee',
    initialState: {
        assignee: {
            name: '',
            id: '',
        },
    },
    reducers: {
        setAssignee: (state, action) => {
            state.assignee = action.payload
        },
    }
})

export const { setAssignee } = assigneeSlice.actions
export default assigneeSlice.reducer;