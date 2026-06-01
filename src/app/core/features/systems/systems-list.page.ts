import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { System } from '../../../shared/models';
import { StoreService } from '../../services/store.service';
import { IdService } from '../../services/id.service';
import { SystemEditDialogComponent } from './system-edit-dialog.component';

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
    MatDialogModule,
    MatTooltipModule,
    MatChipsModule,
    MatCardModule,
    FormsModule,
  ],
  templateUrl: './systems-list.page.html',
  styleUrls: ['./systems-list.page.scss'],
})
export class SystemsListPageComponent implements OnInit {
  systems: System[] = [];
  dataSource = new MatTableDataSource<System>();
  displayedColumns: string[] = ['detail', 'id', 'name', 'department', 'vendor', 'operationsVendor', 'criticality', 'lastUpdated', 'actions'];
  filterValue = '';

  constructor(
    private store: StoreService,
    private dialog: MatDialog,
    private idService: IdService,
    private router: Router
  ) {}

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
    const dialogData: System = system ?? {
      id: this.idService.generateId('SYS'),
      name: '',
      description: '',
      department: '',
      owner: '',
      criticality: 'Medium',
      tags: [],
    };

    const dialogRef = this.dialog.open<SystemEditDialogComponent, System, System>(
      SystemEditDialogComponent,
      {
        width: '760px',
        data: dialogData,
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      const existing = this.systems.some(s => s.id === result.id);
      if (!existing) {
        this.store.createSystem(result);
      } else {
        this.store.updateSystem(result);
      }
    });
  }

  deleteSystem(id: string): void {
    if (confirm('Are you sure you want to delete this system?')) {
      this.store.deleteSystem(id);
    }
  }

  viewDetail(system: System): void {
    this.router.navigate(['/systems', system.id]);
  }
}
