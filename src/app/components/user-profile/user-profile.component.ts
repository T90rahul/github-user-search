import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubApiService } from '../../core/services/github-api.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NgIf, AsyncPipe, MatCardModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any;
  repos: any[] = [];
  followers: any[] = [];
  username: string = '';

  constructor(
    private route: ActivatedRoute,
    private githubApiService: GithubApiService
  ) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username') || '';
    if (this.username) {
      this.loadUserProfile();
      this.loadUserRepos();
      this.loadUserFollowers();
    }
  }

  loadUserProfile() {
    this.githubApiService.getUser(this.username).subscribe((user) => {
      this.user = user;
    });
  }

  loadUserRepos() {
    this.githubApiService.getUserRepos(this.username).subscribe((repos) => {
      this.repos = repos;
    });
  }

  loadUserFollowers() {
    this.githubApiService.getUserFollowers(this.username).subscribe((followers) => {
      this.followers = followers;
    });
  }
}

