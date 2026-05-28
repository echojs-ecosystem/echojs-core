export const jsonSerializer = {
    serialize(value) {
        return JSON.stringify(value);
    },
    deserialize(value) {
        try {
            return JSON.parse(value);
        }
        catch (error) {
            throw new Error("jsonSerializer.deserialize: invalid JSON", { cause: error });
        }
    },
};
export const createJsonSerializer = () => {
    return jsonSerializer;
};
//# sourceMappingURL=serializer.js.map