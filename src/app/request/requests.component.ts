import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
})
export class RequestsComponent implements OnInit {

  title = 'Список обращений';

  constructor() { }

  ngOnInit() {
    //console.log('requests component loaded');
  }

}
