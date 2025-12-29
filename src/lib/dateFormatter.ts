/**
 * Format a date to MM/DD/YYYY HH:MM AM/PM
 * @param date - Date string or Date object
 * @returns Formatted date string
 */
export function formatDateWithTime(date: string | Date | null | undefined): string {
    if (!date) return "Not set";
    
    const dt = new Date(date);
    if (isNaN(dt.getTime())) return "Invalid date";
    
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0');
    const year = dt.getFullYear();
    
    let hours = dt.getHours();
    const minutes = String(dt.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
}

/**
 * Format a date to MM/DD/YYYY
 * @param date - Date string or Date object
 * @returns Formatted date string
 */
export function formatDateOnly(date: string | Date | null | undefined): string {
    if (!date) return "Not set";
    
    const dt = new Date(date);
    if (isNaN(dt.getTime())) return "Invalid date";
    
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0');
    const year = dt.getFullYear();
    
    return `${month}/${day}/${year}`;
}

