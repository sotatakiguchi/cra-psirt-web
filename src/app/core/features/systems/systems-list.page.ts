import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { System } from '../../../shared/models';
import { StoreService } from '../../services/store.service';
import { SystemDrawerFormComponent } from './system-drawer-form.component';

@Component({
  selector: 'app-systems-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatCardModule,
    FormsModule,
    RouterLink,
    SystemDrawerFormComponent,
  ],
  templateUrl: './systems-list.page.html',
  styleUrls: ['./systems-list.page.scss'],
})
export class SystemsListPageComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  
  systems: System[] = [];
  dataSource = new MatTableDataSource<System>();
  displayedColumns: string[] = ['id', 'name', 'criticality', 'lastUpdated', 'actions'];
  filterValue = '';
  selectedSystem: System | null = null;

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.store.getSystems$().subscribe(systems => {
      this.systems = systems;
      this.dataSource.data = systems;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filteredData = this.systems.filter(s =>
      s.name.toLowerCase().includes(filterValue) ||
      s.id.toLowerCase().includes(filterValue)
    );
  }

  openDrawer(system?: System): void {
    this.selectedSystem = system || null;
    this.drawer.open();
  }

  closeDrawer(): void {
    this.drawer.close();
    this.selectedSystem = null;
  }

  deleteSystem(id: string): void {
    if (confirm('Are you sure you want to delete this system?')) {
      this.store.deleteSystem(id);
    }
  }
}
