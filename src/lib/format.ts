// For live input formatting
export const formatCurrency = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined || value === "") return "";

    const str = String(value);
    const clean = str.replace(/[^0-9.]/g, "");
    if (!clean) return "";

    const parts = clean.split(".");
    // Format integer part with commas
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // If there is a decimal part, limit to 2 digits but don't force them if typing
    if (parts.length > 1) {
        parts[1] = parts[1].substring(0, 2);
    }

    return "$" + parts.join(parts.length > 1 ? "." : "");
};

// For professional display (always shows .00)
export const formatDisplayCurrency = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined || value === "") return "";
    const num = parseFloat(String(value).replace(/[^0-9.]/g, ""));
    if (isNaN(num)) return "";
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
};

export const parseCurrency = (value: string): string => {
    return value.replace(/[^0-9.]/g, "");
};
