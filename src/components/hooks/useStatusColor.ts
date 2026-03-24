import { theme } from "@/styles/theme";
export const useStatusColor = (statusText: string) => {
    let color
    switch (statusText) {
        case 'TODO':
            color = theme.palette.primary.main;
            break;
        case 'IN_PROGRESS':
            color = theme.palette.background.purple;
            break;
        case 'DONE':
            color = theme.palette.background.green;
            break;
        default:
            color = theme.palette.text.primary;
    }
    return color
}