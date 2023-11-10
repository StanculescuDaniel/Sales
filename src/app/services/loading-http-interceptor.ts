import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, finalize, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoadingHttpInterceptor implements HttpInterceptor {
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(httpRequest).pipe(
            tap({
                // Succeeds when there is a response; ignore other events
                next: (event) => { 
                    if(event instanceof HttpResponse) {
                        console.log("arrived") ;
                    }
                },
                // Operation failed; error is an HttpErrorResponse
                error: (_error) => { 

                }
            }));
    }
}