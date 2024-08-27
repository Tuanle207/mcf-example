import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  handleError(error: Error) {
    console.error('Custom error handler', error);
    // do something with the exception
  }
} 