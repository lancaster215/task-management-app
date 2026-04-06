import React from 'react';
import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { headerTaskCells } from "../constants/headerTaskCells";
import { Data, Order } from "@/types/tableTypes";
import { headerUserCells } from '../constants/headerUserCells';

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
                    headerUserCells.map((headerUserCell) => (
                        <TableCell
                            key={headerUserCell.id}
                            align={'center'}
                            padding={headerUserCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headerUserCell.id ? order : false}
                            style={{
                                fontSize: "clamp(15px, 1.5vw, 16px)",
                                minWidth: headerUserCell.minWidth
                            }}
                        >
                            {headerUserCell.label}
                        </TableCell>
                    ))
                    : headerTaskCells.map((headerTaskCell) => (
                        <TableCell
                            key={headerTaskCell.id}
                            align={'left'}
                            padding={headerTaskCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headerTaskCell.id ? order : false}
                            style={{
                                fontSize: "clamp(15px, 1.5vw, 16px)",
                                minWidth: headerTaskCell.minWidth
                            }}
                        >
                            <TableSortLabel
                                active={orderBy === headerTaskCell.id}
                                direction={orderBy === headerTaskCell.id ? order : 'asc'}
                                onClick={createSortHandler(headerTaskCell.id)}
                            >
                                {headerTaskCell.label}
                            </TableSortLabel>
                        </TableCell>
                    ))}
            </TableRow>
        </TableHead>
    );
}

export default EnhancedTableHead