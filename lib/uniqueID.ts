import ShortUniqueID from 'short-unique-id';
const slug = new ShortUniqueID({ length: 7 });
const key = new ShortUniqueID({ length: 32 });

export function generateSlug() {
    return slug();
}

export function generateKey() {
    return key();
}
