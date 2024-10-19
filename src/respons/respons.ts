export class Respons {

    constructor( req , res , statusCode , scope , error , data){
        return res.status(statusCode).json({
            success : statusCode == 200 ? true : false,
            scope : scope,
            data : data ? data : '',
            error : error ? error : ''
        })

    }

}
