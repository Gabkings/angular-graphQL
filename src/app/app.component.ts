import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {
    title = 'hackernews-angular-apollo';

    @Output() logout: EventEmitter<any> = new EventEmitter();

    logoutHandler(item: any) {
      this.logout.emit(item);
    }
  }