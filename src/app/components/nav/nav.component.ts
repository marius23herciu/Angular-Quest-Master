
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'] 
})
export class NavComponent {
  userName: string = ""


  constructor(public auth: AuthService) {}


  ngOnInit(): void {
    this.auth.getName().subscribe({
      next: (response) => {
        this.userName = response
        console.log(response)
      }
    })}
}
