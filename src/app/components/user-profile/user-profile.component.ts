import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { GithubApiService } from '../../core/services/github-api.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { FollowerListComponent } from '../followerslist/followers.component';
import { RepoListComponent } from '../repo-list/repo-list.component';



@Component({
  selector: 'app-user-profile',
  standalone: true,  // Angular 18 standalone component
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    FollowerListComponent,
    RepoListComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  gradientStyle: string = '';
  username!:string;

  private gradients = [
    'linear-gradient(135deg, #4e54c8, #8f94fb)',
    'linear-gradient(135deg, #ff758c, #ff7eb3)',
    'linear-gradient(135deg, #42e695, #3bb2b8)',
    'linear-gradient(135deg, #f6d365, #fda085)',
    'linear-gradient(135deg, #84fab0, #8fd3f4)'
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: any,
    private dialogRef: MatDialogRef<UserProfileComponent>,
    private githubApiService: GithubApiService,
  ) {
  }

  ngOnInit(): void {
    this.setRandomGradient();
    this.githubApiService.setUsername(this.user.login);
  }



  setRandomGradient() {
    const randomIndex = Math.floor(Math.random() * this.gradients.length);
    this.gradientStyle = this.gradients[randomIndex];
  }

  openUserProfile(username:any){
    window.open(username, '_blank'); // Open profile in a new tab
  }

  closeDialog() {
    this.dialogRef.close();
  }
}