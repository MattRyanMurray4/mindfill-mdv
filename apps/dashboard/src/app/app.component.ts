import { Component } from '@angular/core';

@Component({
  selector: 'mindfill-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MindFill';
  links = [
    { path: '/', icon: 'home', title: 'Home' },
    { path: 'ideas', icon: 'view_list', title: 'Ideas' },
    { path: 'referrals', icon: 'view_list', title: 'Referrals' },
    { path: 'adventures', icon: 'view_list', title: 'Adventures' },
  ];
}
