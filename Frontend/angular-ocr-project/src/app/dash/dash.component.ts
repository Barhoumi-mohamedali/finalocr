import { Component, OnInit , Input} from '@angular/core';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { DashService } from './dash.service';
import { User } from 'src/app/auth/auth.model';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  @Input() docscounts : any;
  user : User; 
  constructor(private dashService: DashService ,private dash: DashboardComponent) { }
 
  ngOnInit(): void {
    this.user = this.dash.user
    this.dashService.CountExtract(this.user.user_id).subscribe((data)=>{
      this.docscounts=data
      console.log("data "+data);
  })
}
}
