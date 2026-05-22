import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-security-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `<mat-card><mat-card-content><p>Security List (Coming soon)</p></mat-card-content></mat-card>`,
})
export class SecurityListPageComponent {}
