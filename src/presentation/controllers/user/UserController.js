import userService from "../../../business/services/user/UserService.js";

class UserController {
    async addEmail(request, response) {
        try {
            const id = request.user.id;
            const {email} = request.body;
            await userService.addEmail(id, email);

            return response.status(200).json({
                success: true,
                message: "mail added successfully"
            });
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async about(request, response) {
        try {
            const id = request.user.id;
            console.log(request.body);
            let result = await userService.about(id, request.body)
        } catch (error) {
            return response.status(500).jsonp({
                success: false,
                message: error.message
            })
        }
    }
}

export default new UserController();
