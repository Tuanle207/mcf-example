import { ErrorHandler, Injectable, Injector } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GlobalErrorHandler implements ErrorHandler {
    private thrownErrors = new Set<string>();

    constructor(private injector: Injector) {}
  
    handleError(error: any): void {
      const errorMessage = error.message || error.toString();
  
      // Check if this error has already been thrown
      if (this.thrownErrors.has(errorMessage)) {
        return; // Skip this error as it's already been handled
      }
  
      // Add the error to the set so it won't be thrown again
      this.thrownErrors.add(errorMessage);
  
      const isTemplateError = errorMessage.includes('expression');
      
      if (isTemplateError) {
        console.error('Template binding error caught:', error);
      } else {
        console.error('Unhandled error:', error);
        // Handle other types of errors
      }
  
      // Optionally, rethrow the error if necessary
      // throw error;
    }
}
