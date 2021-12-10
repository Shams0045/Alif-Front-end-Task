import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Blogs, Photos} from '../_models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) {
  }

  getBlogs(): Observable<Blogs[]> {
    return this.http.get<Blogs[]>(`${environment.apiUrl}/posts`);
  }

  getBlogById(id: number): Observable<Blogs> {
    return this.http.get<Blogs>(`${environment.apiUrl}/posts/${id}`);
  }

  getPhotos(): Observable<Photos[]> {
    return this.http.get<Photos[]>(`${environment.apiUrl}/photos`);
  }


}
