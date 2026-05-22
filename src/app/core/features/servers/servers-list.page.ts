import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-servers-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `<mat-card><mat-card-content><p>Servers List (Coming soon)</p></mat-card-content></mat-card>`,
})
export class ServersListPageComponent {}
