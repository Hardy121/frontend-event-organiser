export function formatDateForInput(ms) {
    const date = new Date(ms);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // "YYYY-MM-DD"
}