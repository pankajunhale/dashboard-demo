import { Component } from '@angular/core';
import { ApiDemoService } from './services/api-demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-dashboard-app';

  constructor(private service:ApiDemoService){
    
  }
}
