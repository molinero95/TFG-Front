export class RequestException extends Error{
    constructor(msg: string){
        super(msg);
    }
}