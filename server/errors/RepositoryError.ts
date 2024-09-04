export class RepositoryError extends Error {

    message : string ;

    constructor(message: string) {
        super(message) ;
        this.name = this.constructor.name;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}