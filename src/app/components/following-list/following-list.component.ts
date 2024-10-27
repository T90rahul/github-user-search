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
  styleUrl: './following-list.component.css',
})
export class FollowingListComponent {
  displayedColumns: string[] = [
    'profilePhoto',
    'name',
    'profileLink',
  ];
  dataSource: any[] = [];
  username!: string;

  errorMessage: string | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private githubApiService: GithubApiService) {}

  ngOnInit(): void {
    this.subscription = this.githubApiService.username$.subscribe({
      next: (name) => {
        this.username = name;
        if (this.username) {
          this.fetchFollowing(this.username);
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchFollowing(name: any) {
    this.githubApiService.getUserFollowing(name).subscribe({
      next: (following) => {
        if (following && following.length > 0) {
          this.dataSource = following;
          this.errorMessage = null;
        } else {
          this.errorMessage = 'No data available';
          this.dataSource = []; 
        }
      },
      error: () => {
        this.errorMessage = 'Failed to fetch following data';
        this.dataSource = [];
      },
    });
  }
}
