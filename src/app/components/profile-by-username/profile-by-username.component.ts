import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileByUsernameService } from 'src/app/services/profile-by-username.service';

@Component({
  selector: 'app-profile-by-username',
  templateUrl: './profile-by-username.component.html',
  styleUrls: ['./profile-by-username.component.scss']
})
export class ProfileByUsernameComponent implements OnInit {
  username: string = ''
  userData: any

  constructor(private route: ActivatedRoute, private profileByUsernameSerivce: ProfileByUsernameService ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.username = params['username']
        this.loadUserData()
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  private loadUserData(): void {
    this.profileByUsernameSerivce.getUserByUsername(this.username).subscribe({
      next: (data) => {
        this.userData = data
      }
    })
  }
}
