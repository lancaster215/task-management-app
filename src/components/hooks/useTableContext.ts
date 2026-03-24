import { useContext } from "react";
import { TablePanelContext } from "../tab_panel/TablePanel/TablePanelProvider";

export const useTablePanelContext = () => {
    const context = useContext(TablePanelContext);
    if (!context) {
        throw new Error('useTablePanelContext must be used within TablePanelProvider');
    }
    return context;
}
