export class Respons {

    constructor(req, res, statusCode, scope, error, data) {
        try {
            return res.status(statusCode).json({
                success: statusCode == 200 ? true : false,
                scope: scope,
                data: data ? data : '',
                error: error ? error : ''
            })
        } catch (error) {
            console.log('error occured' , error)
        }
    }

}
