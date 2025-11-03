import React from 'react';
import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { headCells } from "../constants/headerCells";
import { Data, Order } from "@/types/tableTypes";

interface EnhancedTableProps {
  numSelected?: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data | 'action') => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  header: 'user' | 'task';
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, header } = props;
    const createSortHandler = (property: keyof Data | 'action') => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {header !== 'user' && <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={(numSelected ?? 0) > 0 && (numSelected ?? 0) < rowCount}
                        checked={rowCount > 0 && (numSelected ?? 0) === rowCount}
                        onChange={onSelectAllClick}
                        // inputProps={{
                        //     'aria-label': 'select all desserts',
                        // }}
                    />
                </TableCell>}
                {header === 'user' ? 
                    <TableCell>
                        Assignee Name
                    </TableCell>
                 : headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{fontSize: "clamp(15px, 1.5vw, 16px)"}}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                        {headCell.label}
                        {/* {orderBy === headCell.id ? (
                            <Box component="span" sx={{}}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null} */}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default EnhancedTableHead