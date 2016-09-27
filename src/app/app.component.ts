import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  constructor() {}
  ngOnInit() {
    const socket = io('ws://', {
      reconnection: true,
      reconnectionDelay: 500,
      forceNew: false,
      transports: ['websocket']
    });
  }
}
