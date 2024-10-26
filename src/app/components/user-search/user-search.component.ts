import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { GithubApiService } from '../../core/services/github-api.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [NgIf, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatCardModule,CommonModule,MatIconModule],
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent {
  username: string = '';
  searchResults: any[] = [];

  constructor(private router: Router, private githubApiService: GithubApiService) {}

  searchUser() {
    if (this.username.trim()) {
      this.githubApiService.getUser(this.username).subscribe((result) => {
        this.searchResults = [result];  // Wrap result in an array
      });
    }
  }

  viewProfile(username: string) {
    this.router.navigate(['/user', username]);
  }
}
