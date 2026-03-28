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
    setFilter: (state, action) => {
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

export const { setTask, setFilter, clearFilter } = taskSlice.actions
export default taskSlice.reducer;