import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TokenRequest {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    //console.log(`-> ${request.input('token')}: ${request.url()}`)
    
    const token = request.input('token');
    
    // Validate token
    if (token !== process.env.APP_KEY) {
        // res.status(400)
        // res.json({message:"Empty or invalid token"});
        // return cb();
        return response.status(401).send({message: "Empty or invalid token"})
    }

    await next()
  }
}
