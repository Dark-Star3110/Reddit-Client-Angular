import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
// import { POSTS } from './MockPosts';
import { Post } from './model/Post';
import { IResponsePayload } from './payload/ResponsePayload';
import { IPostRequest } from './payload/PostRequest';
import { IPostResponse } from './payload/PostResponse';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsApiUrl = 'http://localhost:8080/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  getPosts(postRequest: IPostRequest): Observable<IPostResponse> {
    return this.http
      .post<IPostResponse>(
        this.postsApiUrl + 'all-posts',
        postRequest,
        this.httpOptions
      )
      .pipe(
        tap((_) => this.log('fetched heroes')),
        catchError(this.handleError<IPostResponse>('getHeroes'))
      );
  }

  addPost(post: Post): Observable<IResponsePayload> {
    return this.http
      .post<IResponsePayload>(
        this.postsApiUrl + 'add-post',
        post,
        this.httpOptions
      )
      .pipe(
        tap((response: IResponsePayload) => this.log(response)),
        catchError(this.handleError<IResponsePayload>('add post'))
      );
  }

  updatePost(id: string, post: Post): Observable<IResponsePayload> {
    return this.http
      .put<IResponsePayload>(
        `${this.postsApiUrl}update-post/?id=${id}`,
        post,
        this.httpOptions
      )
      .pipe(
        tap((response: IResponsePayload) => this.log(response)),
        catchError(this.handleError<IResponsePayload>('update post'))
      );
  }

  deletePost(id: number): Observable<IResponsePayload> {
    return this.http
      .delete<IResponsePayload>(
        `${this.postsApiUrl}delete-post/?id=${id}`,
        this.httpOptions
      )
      .pipe(
        tap((response: IResponsePayload) => this.log(response)),
        catchError(this.handleError<IResponsePayload>('update post'))
      );
  }

  private log(message: any) {
    console.log(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
