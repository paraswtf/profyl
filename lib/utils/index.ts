export function obfuscateMail(email: string) {
    const [first, second] = email.split('@');
    return `${first.slice(0, 2)}...${first.slice(-2)}@${second}`;
}
