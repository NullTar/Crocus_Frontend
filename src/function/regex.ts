

export const isSpecificEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(icloud\.com|qq\.com|gmail\.com|outlook\.com|hotmail\.com|163\.com|126\.com|foxmail\.com)$/;
    return emailRegex.test(value);
};