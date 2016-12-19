import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string = 'app works!';
  public listItems: Array<string> = ["Baseball", "Basketball", "Cricket",
    "Field Hockey", "Football", "Table Tennis", "Tennis", "Volleyball"];

  constructor() {}
  ngOnInit() {
    const socket = io('ws://', {
      reconnection: true,
      reconnectionDelay: 500,
      forceNew: false,
      transports: ['websocket']
    });
  }

  public onButtonClick() {
    console.log('click');
  }
}
