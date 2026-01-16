class ApiError extends Error {
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        stack = "",
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    toJSON() {
        const payload = {
            statusCode: this.statusCode,
            success: false,
            message: this.message,
            data: null
        };

        if (this.errors.length) {
            payload.errors = this.errors;
        }

        return payload;
    }

}

export { ApiError }