export const createPersistRecord = (data, options) => {
    const now = Date.now();
    const createdAt = options.createdAt ?? now;
    return {
        version: options.version,
        createdAt,
        updatedAt: now,
        expiresAt: options.ttl != null ? now + options.ttl : undefined,
        data,
    };
};
export const isRecordExpired = (record) => {
    if (record.expiresAt == null) {
        return false;
    }
    return Date.now() >= record.expiresAt;
};
export const touchPersistRecord = (record, data, options) => {
    const now = Date.now();
    return {
        version: options.version,
        createdAt: record.createdAt,
        updatedAt: now,
        expiresAt: options.ttl != null ? now + options.ttl : record.expiresAt,
        data,
    };
};
//# sourceMappingURL=record.js.map