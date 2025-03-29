type ErrorName =
    | 'DATE_SIZE_ERROR';

export class DateError extends Error {
    name: ErrorName;
    message: string;
    cause: any;

    public constructor ({
        name,
        message,
        cause
    }:{
        name: ErrorName;
        message: string;
        cause?: any;
    }) {
        super();
        this.name = name;
        this.message = message;
        this.cause = cause;
    }
}