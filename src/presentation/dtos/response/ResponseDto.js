export class ResponseDto {
    constructor({success = true, message = "", result = null}) {
        this.success = success;
        this.message = message;
        this._id = result.id;
        this.username = result.username;
    }
}
