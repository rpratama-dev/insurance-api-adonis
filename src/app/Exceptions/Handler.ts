/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger';
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ErrorHelper from 'Helper/ErrorHelper';

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger);
  }

  public async handle(error: any, ctx: HttpContextContract) {
    /**
     * Self handle the validation exception
     */

    // console.log('Error Stack:', error.stack);

    ctx.request['errorStack'] = error.stack;
    const errorHelper = new ErrorHelper(error);
    const errorResponse = errorHelper.parse();
    if (errorResponse) {
      return ctx.response.status(errorResponse.statusCode).json(errorResponse);
    }

    /**
     * Forward rest of the exceptions to the parent class
     */
    return super.handle(error, ctx);
  }
}
