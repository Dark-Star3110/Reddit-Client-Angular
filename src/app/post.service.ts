import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { POSTS } from './MockPosts';
import { Post } from './model/Post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsApiUrl = 'http://localhost:8080/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsApiUrl + 'all-posts').pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<Post[]>('getHeroes', []))
    );
  }

  private log(message: string) {
    console.log(`HeroService: ${message}`);
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
