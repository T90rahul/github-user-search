import { Component, Input, Output, EventEmitter, OnInit , SimpleChanges} from '@angular/core';
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
  styleUrls: ['./followers.component.scss']
})
export class FollowerListComponent {
  followers :any = [];
  displayedColumns: string[] = ['profilePhoto', 'name', 'followersCount', 'followingCount', 'reposCount', 'visitProfile'];
  errorMessage: string | null = null;

  private subscription: Subscription = new Subscription();

  constructor(private githubApiService: GithubApiService) {

  }

  ngOnInit(): void {
    // Subscribe to username changes
    this.subscription = this.githubApiService.username$.subscribe({
      next: (username) => {
        if (username) {
          this.fetchFollowers(username);
        }
      }
    });
  }


  fetchFollowers(name:any) {
    this.githubApiService.getUserFollowers(name).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.followers = data.map(follower => ({
            profilePhoto: follower.avatar_url,
            name: follower.login,
            // followersCount: this.getFollowersCount(follower.followers_url),
            // followingCount: this.getFollowingCount(follower.following_url),
            // reposCount: this.getReposCount(follower.repos_url),
            followersCount: 10,
            followingCount: 11,
            reposCount: 15,
            profileUrl: follower.html_url
          }));
          this.errorMessage = null;
        } else {
          this.errorMessage = 'No data available';
        }
      },
      error: () => {
        this.errorMessage = 'Failed to fetch followers data';

      }
    });
  }

  // this is the count of follower's follower
  getFollowersCount(url :string){
    this.githubApiService.getCount(url).subscribe(count => {
      return count;
    });
  }


  getFollowingCount(url :string){
    this.githubApiService.getCount(url).subscribe(count => {
      return count;
    });
  }

  getReposCount(url :string){
    this.githubApiService.getCount(url).subscribe(count => {
      return count;
    });
  }








  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Clean up subscription
  }
}
