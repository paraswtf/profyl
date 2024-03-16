export function obfuscateMail(email: string) {
    const [first, second] = email.split('@');
    return `${first.slice(0, 2)}...${first.slice(-2)}@${second}`;
}

export function truncateString(str: string, length: number) {
    if (!str || !str.length) return '';
    return str.length > length ? str.slice(0, length) + '...' : str;
}
