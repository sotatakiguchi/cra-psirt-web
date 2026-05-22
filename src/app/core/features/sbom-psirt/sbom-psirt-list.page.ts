import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-sbom-psirt-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `<mat-card><mat-card-content><p>SBOM/PSIRT List (Coming soon)</p></mat-card-content></mat-card>`,
})
export class SbomPsirtListPageComponent {}
