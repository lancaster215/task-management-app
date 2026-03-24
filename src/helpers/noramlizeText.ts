export default function normalizeText(text: string) {
    return text.split('_').join(' ').charAt(0).toUpperCase() + text.slice(1).split('_').join(' ').toLocaleLowerCase()
}