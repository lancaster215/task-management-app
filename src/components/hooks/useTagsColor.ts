import { theme } from "@/styles/theme";
export const useTagsColor = (statusText: string) => {
    let color
    switch (statusText) {
        case 'FEATURE':
            color = theme.palette.background.purple;
            break;
        case 'ENHANCEMENT':
            color = theme.palette.background.teal;
            break;
        case 'BUG':
            color = theme.palette.background.red;
            break;
        default:
            color = theme.palette.text.primary;
    }
    return color
}