import { createSlice } from '@reduxjs/toolkit'

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    task: [],
    assignee: {
      name: '',
      id: '',
    }
  },
  reducers: {
    addTask: (state, action) => {
      state.task = action.payload
    },
    setAssignee: (state, action) => {
      state.assignee = action.payload
    }
  }
})

export const { addTask, setAssignee } = taskSlice.actions
export default taskSlice.reducer;