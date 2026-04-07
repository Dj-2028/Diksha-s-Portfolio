export const success = (res, data, message = "Success", statusCode = 200) => {
    const response = { success: true };
    if (message) response.message = message;
    if (Array.isArray(data)) {
        response.count = data.length;
        response.data = data;
    } else if (data !== undefined) {
        response.data = data;
    }
    return res.status(statusCode).json(response);
};

export const error = (res, message = "Internal Server Error", statusCode = 500) => {
    return res.status(statusCode).json({ success: false, message });
};
