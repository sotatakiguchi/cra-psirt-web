import { Component, OnInit } from '@angular/core';
import { DataSourceService } from './core/services/data-source.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CRA PSIRT Web';
  sidenavOpen = true;

  constructor(private dataSource: DataSourceService) {}

  ngOnInit(): void {
    // Load data on app init
    this.dataSource.loadData().subscribe(() => {
      console.log('Data loaded successfully');
    });
  }

  toggleSidenav(): void {
    this.sidenavOpen = !this.sidenavOpen;
  }
}
