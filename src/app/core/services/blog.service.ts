import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Blog } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private dataUrl = 'data/blogs.json';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.dataUrl);
  }

  getBlogById(id: string): Observable<Blog | undefined> {
    return this.getBlogs().pipe(
      map(blogs => blogs.find(blog => blog.id === id))
    );
  }
}
