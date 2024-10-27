import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { GithubApiService } from '../../core/services/github-api.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
})
export class UserSearchComponent {
  username: string = '';
  searchResults: any[] = [];
  showErrorMessage = false;
  errorMessage = '';
  showLoader = false;

  constructor(
    private router: Router,
    private githubApiService: GithubApiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  validateInput() {
    if (this.username.trim().length === 0) {
      this.showErrorMessage = true;
      this.errorMessage = 'Username cannot be empty';
    } else {
      this.showErrorMessage = false;
    }
  }

  onSearch() {
    if (!this.username.trim()) {
      this.snackBar.open('Please enter a GitHub username to search.', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.fetchData();
  }

  fetchData() {
    this.showLoader = true;
    this.githubApiService.getUser(this.username).subscribe({
      next: (result) => {
        this.searchResults = [result];
        this.showLoader = false;
      },
      error: () => {
        this.showLoader = false;
        this.snackBar.open('User not found or an error occurred', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  viewProfileDetails() {
    const dialogRef = this.dialog.open(UserProfileComponent, {
      width: '80vw',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: this.searchResults[0],
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed');
    });
  }

  clearInput() {
    this.username = ''; // Clear the input model
    this.searchResults = [];
  }
}
