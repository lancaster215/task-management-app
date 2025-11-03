import * as React from 'react';
import dayjs from 'dayjs';
import { DateCalendar, PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { Tooltip } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Task } from '@/pages';

type Props = {
  task: {
    id: number,
    name: string,
    time: string,
    title: string,
    description: string,
    status: string,
    priority: string,
    dueDate: string,
    tags: string,
    createdAt: string,
    action: (string | number),
    assigneeId: string,
  }[],
  windowWidth: number,
}

export default function TaskCalendar({ task: dataTask, windowWidth }: Props) {
  const { assignee } = useSelector((state: RootState) => state.task)
  const task = dataTask.filter((task: Task) => task.assigneeId === assignee.id)

  const dueDates = task.map(t => dayjs(t.dueDate).format('YYYY-MM-DD'));

  const Day = (dayProps: PickersDayProps) => {
    const { day, ...pickersDayProps } = dayProps;
    const today = dayjs()
    const isDue = day ? dueDates.includes(day.format('YYYY-MM-DD')) : false;
    
    const dueToday = dueDates.find((date) => day.format('YYYY-MM-DD') === date)

    const taskTitles = day
      ? task
          .filter(t => dayjs(t.dueDate).isSame(day, 'day'))
          .map(t => t.title)
          .join(', ')
      : '';


    return (
      <Tooltip title={isDue ? taskTitles : ''} arrow>
        <PickersDay
          {...pickersDayProps}
          day={day}
          sx={{
            bgcolor: today.format("YYYY-MM-DD") === dueToday ? 
                '#e5484d' : //due date today
                (day.format('YYYY-MM-DD') > today.format("YYYY-MM-DD")) && isDue ? 
                '#0ac54c' : //due date coming
                isDue ? 
                '#a0a0a0' : //due date is overdue
                day.format('YYYY-MM-DD') === today.format("YYYY-MM-DD") ?
                '#1565c0' : // today
                undefined,
            color: 'white',
            height: windowWidth <= 375 ? '30px' : undefined,
            width: windowWidth <= 375 ? '30px' : undefined,
            borderRadius: '50%',
          }}
        />
      </Tooltip>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        views={['day']}
        slots={{ day: Day }}
        sx={{
            // Make all text white
            color: 'white',
            width: windowWidth <= 390 ? '150px' : windowWidth <= 450 ? '190px' : '250px',
            '& .MuiTypography-root': {
                color: 'white',
            },
            // Month label (November 2025)
            '& .MuiPickersCalendarHeader-label': {
                color: 'white',
                fontSize: "clamp(10px, 1.5vw, 16px)"
            },
            // Weekday labels (S, M, T, W, T, F, S)
            '& .MuiDayCalendar-weekDayLabel': {
                color: 'white',
                opacity: 0.8,
                fontSize: "clamp(10px, 1.5vw, 16px)"
            },
            // Arrow buttons (chevrons)
            '& .MuiPickersArrowSwitcher-button': {
                color: 'white',
            },
            // Calendar container spacing and layout
            '& .MuiPickersCalendarHeader-root': {
                justifyContent: 'space-between',
            },
            '& .MuiPickersDay-root': {
                fontSize: "clamp(10px, 1.5vw, 16px)"
            }
        }}
      />
    </LocalizationProvider>
  );
}
