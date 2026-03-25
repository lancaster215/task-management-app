import { createSlice } from '@reduxjs/toolkit'

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    task: {
      title: '',
      description: '',
      status: '',
      priority: '',
      dueDate: '',
      createdAt: '',
      updatedAt: '',
      tags: '',
      assigneeId: '',
    },
    tasks: [],
    assignee: {
      name: '',
      id: '',
    },
    assignees: [],
    filter: {
      status: '',
      priority: '',
      tags: '',
      startDate: '',
      endDate: '',
    },
  },
  reducers: {
    setTask: (state, action) => {
      state.task = action.payload
    },
    setTasks: (state, action) => {
      state.tasks = action.payload
    },
    setAssignee: (state, action) => {
      state.assignee = action.payload
    },
    setAssignees: (state, action) => {
      state.assignees = action.payload
    },
    setFilter: (state, action) => {
      console.log('redux', action.payload.type, action.payload.value)
      switch (action.payload.type) {
        case 'status':
          state.filter.status = action.payload.value
          break;
        case 'priority':
          state.filter.priority = action.payload.value
          break;
        case 'tags':
          state.filter.tags = action.payload.value
          break;
        case 'startDate':
          state.filter.startDate = action.payload.value
          break;
        case 'endDate':
          state.filter.endDate = action.payload.value
          break;
        default:
          break;
      }
    },
    clearFilter: (state) => {
      state.filter = {
        status: '',
        priority: '',
        tags: '',
        startDate: '',
        endDate: '',
      }
    }
  }
})

export const { setTask, setTasks, setAssignee, setFilter, clearFilter, setAssignees } = taskSlice.actions
export default taskSlice.reducer;