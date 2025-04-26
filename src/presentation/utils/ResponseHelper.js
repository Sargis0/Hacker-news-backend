export class ResponseHelper {
    static createResponse({success = true, message = "", data = null}) {
        return {success, message, data};
    }
}
