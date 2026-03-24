import { theme } from "@/styles/theme";
export const usePriorityColor = (statusText: string) => {
    let color
    switch (statusText) {
        case 'LOW':
            color = theme.palette.background.green;
            break;
        case 'MEDIUM':
            color = theme.palette.background.orange;
            break;
        case 'HIGH':
            color = theme.palette.background.red;
            break;
        default:
            color = theme.palette.text.primary;
    }
    return color
}