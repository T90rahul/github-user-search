import { Component, Input, OnInit } from '@angular/core';
import { GithubApiService } from '../../core/services/github-api.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-following-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './following-list.component.html',
  styleUrl: './following-list.component.css'
})
export class FollowingListComponent {
  displayedColumns: string[] = ['profilePhoto', 'name', 'followersCount', 'followingCount', 'profileLink'];
  dataSource: any[] = [];
  username!:string
  private subscription: Subscription = new Subscription();

  constructor(private githubApiService: GithubApiService) {
  }

  ngOnInit(): void {
    debugger;
    this.subscription = this.githubApiService.username$.subscribe({
      next: (name) => {
        this.username = name; // Set the username in the component
        if (this.username) {
          this.fetchFollowing(this.username);
        }
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }

  fetchFollowing(name :any){
    debugger;
    this.githubApiService.getUserFollowing(name).subscribe(following => {
      this.dataSource = following;
      console.log('datasource:', this.dataSource);
    });
  }
}