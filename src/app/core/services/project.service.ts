import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private dataUrl = 'data/projects.json';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.dataUrl);
  }

  getProjectById(id: string): Observable<Project | undefined> {
    return this.getProjects().pipe(
      map(projects => projects.find(project => project.id === id))
    );
  }
}
