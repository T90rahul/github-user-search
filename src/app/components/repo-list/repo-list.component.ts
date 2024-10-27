import { Component, Input, OnInit } from '@angular/core';
import { GithubApiService } from '../../core/services/github-api.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-repo-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css']
})
export class RepoListComponent {
  username!:string;
  displayedColumns: string[] = ['name', 'description', 'forks', 'watchers', 'updated_at', 'url'];
  dataSource: any[] = []; // Initialize as an empty array
  private subscription: Subscription = new Subscription();

  constructor(private githubApiService: GithubApiService) {
  }

  ngOnInit(): void {
    // Subscribe to username$
    this.subscription = this.githubApiService.username$.subscribe({
      next: (name) => {
        this.username = name; // Set the username in the component
        this.username = name; // Set the username in the component
        if (this.username) {
          this.fetchRepos(this.username);
        }
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }

  fetchRepos(name:any){
    this.githubApiService.getUserRepos(name).subscribe(repos => {
      this.dataSource = repos; // Assign data to the dataSource
    });
  }
}

