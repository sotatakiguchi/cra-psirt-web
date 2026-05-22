import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { System, Server } from '../../../shared/models';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-system-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './system-detail.page.html',
  styleUrls: ['./system-detail.page.scss'],
})
export class SystemDetailPageComponent implements OnInit {
  system: System | null = null;
  relatedServers: Server[] = [];
  selectedTabIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: StoreService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const systems = this.store.getSystems();
      this.system = systems.find(s => s.id === id) || null;

      if (!this.system) {
        this.router.navigate(['/systems']);
        return;
      }

      this.loadRelatedServers();
    }
  }

  private loadRelatedServers(): void {
    if (!this.system) return;

    const links = this.store.getSystemServerLinks();
    const servers = this.store.getServers();

    const serverIds = links
      .filter(l => l.systemId === this.system?.id)
      .map(l => l.serverId);

    this.relatedServers = servers.filter(s => serverIds.includes(s.id));
  }

  goBack(): void {
    this.router.navigate(['/systems']);
  }
}
