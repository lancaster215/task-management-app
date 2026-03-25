import { User } from "@/components";
import { BASE_URL } from "@/components/constants/baseURL";
import { AssigneeFormData } from "@/components/modal/addNewAssignee";
import { TaskFormData } from "@/components/modal/addTaskModal";
import { formattedDate } from "@/helpers/dateFormatter";
import { getComparator } from "@/helpers/getComparator";
import { Assignee, Task } from "@/pages/dashboard";
import { RootState } from "@/store";
import { setTasks, setAssignee } from "@/store/taskSlice";
import { Data, Order } from "@/types/tableTypes";
import React, { createContext, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export interface TablePanelContextType {
    tasks: Task[],
    assignee: Assignee,
    setEditingId: React.Dispatch<React.SetStateAction<number | null>>,
    editingId: number | null,
    // setEditingTask: React.Dispatch<React.SetStateAction<Task | null>>,
    // editingTask: Task | null,
    setOpenAddTaskModal: React.Dispatch<React.SetStateAction<boolean>>,
    openAddTaskModal: boolean,
    setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>,
    selected: readonly number[],
    handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void,
    // setOrder: React.Dispatch<React.SetStateAction<Order>>,
    order: Order,
    handleRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data | 'action') => void,
    // setOrderBy: React.Dispatch<React.SetStateAction<keyof Data | 'action'>>,
    orderBy: keyof Data | 'action',
    // setRowsPerPage: React.Dispatch<React.SetStateAction<number>>,
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void,
    rowsPerPage: number,
    // setPage: React.Dispatch<React.SetStateAction<number>>,
    page: number,
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void,
    setSearchText: React.Dispatch<React.SetStateAction<string>>,
    searchText: string,
    setSearchTextArr: React.Dispatch<React.SetStateAction<string[]>>,
    searchTextArr: string[],
    setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    openDeleteModal: boolean,
    setOpenAddNewAccountModal: React.Dispatch<React.SetStateAction<boolean>>,
    openAddNewAccountModal: boolean,
    handleOnSubmit: (data: AssigneeFormData) => Promise<void>,
    setNewUser: React.Dispatch<React.SetStateAction<User>>,
    newUser: User,
    handleEdit: (id: number) => void;
    filteredTasks: Task[];
    // Functions
    handleSubmitToAPI: (data: TaskFormData) => Promise<void>;
    handleSaveEdit: (data: TaskFormData) => Promise<void>;
    handleDelete: () => Promise<void>;
}

export const TablePanelContext = createContext<TablePanelContextType | undefined>(undefined);

interface TablePanelProviderProps {
    children: React.ReactNode,
}

export const TablePanelProvider = ({ children }: TablePanelProviderProps) => {
    const dispatch = useDispatch()
    const { assignee, filter: filterStatus, tasks: tasks } = useSelector<RootState, RootState['task']>((state) => state.task);

    const [newTasks, setNewTasks] = useState<Task[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    // const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [openAddTaskModal, setOpenAddTaskModal] = useState<boolean>(false);
    const [selected, setSelected] = useState<readonly number[]>([]);
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data | 'action'>('action');
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [page, setPage] = useState(0);
    const [searchText, setSearchText] = useState<string>('');
    const [searchTextArr, setSearchTextArr] = useState<string[]>([]);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [openAddNewAccountModal, setOpenAddNewAccountModal] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<User>({
        id: '',
        name: '',
    })

    const handleEdit = (id: number) => {
        const taskToEdit = tasks.find((task: Task) => task.id === id);
        if (taskToEdit) {
            setEditingId(id);
            // setEditingTask({ ...taskToEdit });
        }
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = tasks.map((n: Task) => n.id);
            setSelected(newSelected as readonly number[]);
            return;
        }
        setSelected([]);
    };

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data | 'action',
    ) => {
        const noSortHeaders = ['title', 'description', 'tags', 'dueDate']
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');

        if (!noSortHeaders.includes(property)) {
            setOrderBy(property);
        }
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    //This also exist in components/index.tsx which is not scope by the provider
    // This is being used by NoAssigneeDisplay which is scope by the provider
    const handleOnSubmit = async (formData: AssigneeFormData) => {
        try {
            const payload = {
                id: uuidv4(),
                name: formData.name,
            }
            const addUserResponse = await fetch(`${BASE_URL}/api/addUser`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(payload)
            })

            const addUserData = await addUserResponse.json();

            if (addUserData.user) {
                dispatch(setAssignee(addUserData.user));
            }
        } catch (err) {
            console.error(`Error in adding user: ${err}`)
        }
        setOpenAddNewAccountModal(!openAddNewAccountModal)
    }

    //memoize states that have the potential to create expensive rendering
    const visibleRows = useMemo(
        () =>
            [...tasks, ...newTasks]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, tasks, newTasks],
    );

    //If the user search, filter visibleRows by the search text
    const filteredSearchedTasks = searchText ? visibleRows.filter(
        (rows: Task) =>
            rows.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
            rows.description.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    ) : visibleRows

    const filteredTasks = useMemo(() => {
        return filteredSearchedTasks.filter((task: Task) => {
            const matchStatus =
                !filterStatus.status || task.status.toLowerCase() === filterStatus.status;
            const matchPriority =
                !filterStatus.priority || task.priority.toLowerCase() === filterStatus.priority;
            const matchTags =
                !filterStatus.tags || task.tags.toLowerCase() === filterStatus.tags;

            const matchDateRange =
                (!filterStatus.startDate ||
                    formattedDate(task.dueDate) >= filterStatus.startDate) &&
                (!filterStatus.endDate ||
                    formattedDate(task.dueDate) <= filterStatus.endDate);
            return matchStatus && matchPriority && matchTags && matchDateRange;
        });
    }, [filteredSearchedTasks, filterStatus]);

    const handleSubmitToAPI = async (formData: TaskFormData) => {
        try {
            const res = await fetch(`${BASE_URL}/api/addTask`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    assigneeId: assignee.id
                })
            })

            if (res.ok) {
                const newTasks = await fetch(`${BASE_URL}/api/task`).then(r => r.json());
                const initialTasks = newTasks.filter((task: Task) => task.assigneeId === assignee.id)
                dispatch(setTasks(initialTasks))
                setNewTasks(initialTasks) //For displaying the task immediately in screen

            }
        } catch (err) {
            console.error(`Error in adding task: ${err}`)
        }
    }

    const handleSaveEdit = async (formData: TaskFormData) => {
        if (!editingId) return;

        try {
            const res = await fetch(`${BASE_URL}/api/editTask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    assigneeId: assignee.id
                })
            })

            if (res.ok) {
                const newTasks = await fetch(`${BASE_URL}/api/task`).then(r => r.json());
                const filteredTasks = newTasks.filter((task: Task) => task.assigneeId === assignee.id)
                dispatch(setTasks(filteredTasks))
                setNewTasks(filteredTasks)
                setEditingId(null);
                // setEditingTask(null);
            }
        } catch (err) {
            console.error(`Error in updating task: ${err}`)
        }

        setEditingId(null);
        // setEditedTaskName('');
    }

    const handleDelete = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/removeTask`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ selected }) //array
            })

            if (res.ok) {
                const newTasks = await fetch(`${BASE_URL}/api/task`).then(r => r.json());
                const filteredTasks = newTasks.filter((task: Task) => task.assigneeId === assignee.id)
                dispatch(setTasks(filteredTasks))
                setNewTasks(filteredTasks)
            }
        } catch (err) {
            console.error(`Error in removing task: ${err}`)
        }
    }

    const value: TablePanelContextType = {
        tasks,
        assignee,
        setEditingId,
        editingId,
        // setEditingTask,
        // editingTask,
        setOpenAddTaskModal,
        openAddTaskModal,
        setSelected,
        selected,
        handleSelectAllClick,
        // setOrder,
        order,
        handleRequestSort,
        // setOrderBy,
        orderBy,
        // setRowsPerPage,
        handleChangeRowsPerPage,
        rowsPerPage,
        // setPage,
        page,
        handleChangePage,
        setSearchText,
        searchText,
        setSearchTextArr,
        searchTextArr,
        setOpenDeleteModal,
        openDeleteModal,
        setOpenAddNewAccountModal,
        openAddNewAccountModal,
        setNewUser,
        newUser,
        filteredTasks,
        // Functions
        handleEdit,
        handleOnSubmit,
        handleSubmitToAPI,
        handleSaveEdit,
        handleDelete,
    };

    return (
        <TablePanelContext.Provider value={value} >
            {children}
        </TablePanelContext.Provider>
    );
};