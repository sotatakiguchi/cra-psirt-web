import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-eol-center',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-content>
        <h2>EOL Center</h2>
        <p>Coming soon...</p>
      </mat-card-content>
    </mat-card>
  `,
})
export class EolCenterPageComponent {}
