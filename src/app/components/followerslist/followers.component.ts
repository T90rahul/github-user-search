import {
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { GithubApiService } from '../../core/services/github-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-followers-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css'],
})
export class FollowerListComponent {
  followers: any = [];
  displayedColumns: string[] = [
    'profilePhoto',
    'name',
    'visitProfile',
  ];
  errorMessage: string | null = null;

  private subscription: Subscription = new Subscription();

  constructor(private githubApiService: GithubApiService) {}

  ngOnInit(): void {
    this.subscription = this.githubApiService.username$.subscribe({
      next: (username) => {
        if (username) {
          this.fetchFollowers(username);
        }
      },
    });
  }

  fetchFollowers(name: any) {
    this.githubApiService.getUserFollowers(name).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.followers = data.map((follower) => ({
            profilePhoto: follower.avatar_url,
            name: follower.login,
            profileUrl: follower.html_url,
          }));
          this.errorMessage = null;
        } else {
          this.errorMessage = 'No data available';
        }
      },
      error: () => {
        this.errorMessage = 'Failed to fetch followers data';
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
