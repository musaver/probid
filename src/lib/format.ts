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

export const formatPhoneNumber = (value: string | null | undefined): string => {
    if (!value) return "";
    // Limit to 15 digits (standard E.164 size)
    const phoneNumber = value.replace(/[^\d]/g, "").slice(0, 15);
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    if (phoneNumberLength <= 10) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
    }
    // International format: +[country] (XXX) XXX-XXXX
    return `+${phoneNumber.slice(0, phoneNumberLength - 10)} (${phoneNumber.slice(phoneNumberLength - 10, phoneNumberLength - 7)}) ${phoneNumber.slice(phoneNumberLength - 7, phoneNumberLength - 4)}-${phoneNumber.slice(phoneNumberLength - 4)}`;
};

export const formatNumber = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined || value === "") return "";
    const str = String(value).replace(/[^0-9.]/g, "");
    if (!str) return "";
    const parts = str.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};
