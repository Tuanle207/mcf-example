import { Component, Inject, OnInit, inject } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ApiService } from './apis/api.service';
import { WireBreak } from './apis/api.dto';
import { CommonModule } from '@angular/common';
import { MessageSource, MessageType } from './model';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter, take } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Component({
  selector: 'wirebreak-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class WirebreakListComponent implements OnInit {
  title = 'wirebreak-viewer-app';
  selectedItem: WireBreak | null = null;
  wirebreaks: WireBreak[] = [];

  private readonly msalService = inject(MsalService);
  private readonly msalBroadcastService = inject(MsalBroadcastService);

  constructor(
    private readonly apiService: ApiService,
    @Inject('MESSAGE_SERVICE') private readonly messageService: any,
  ) {}

  ngOnInit(): void {
    // Wait for MSAL to finish any in-progress interaction, then check auth
    this.msalBroadcastService.inProgress$.pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      take(1),
    ).subscribe(() => this.ensureAuthenticated());
  }

  private ensureAuthenticated(): void {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.loadData();
      return;
    }
    // Try SSO silent first (B2C → Auth0 federation: if user already logged in shell,
    // Auth0 session exists → B2C silent token acquisition succeeds without any popup)
    this.msalService.ssoSilent({
      scopes: environment.b2c.scopes,
      authority: environment.b2c.authority,
    }).subscribe({
      next: () => this.loadData(),
      error: () => {
        // Silent failed (first time or strict browser): open popup
        // User sees Auth0 login page; if Auth0 session exists, it completes instantly
        this.msalService.loginPopup({
          scopes: environment.b2c.scopes,
          authority: environment.b2c.authority,
        }).subscribe({
          next: () => this.loadData(),
        });
      },
    });
  }

  private loadData(): void {
    this.apiService.getWirebreaks().subscribe(
      (wirebreaksData) => {
        this.wirebreaks = wirebreaksData.items.filter(x => x.typeKey === 'WIRE-c');
      }
    );
  }

  onItemClick(selectedItem: WireBreak): void {
    this.selectedItem = selectedItem;
    this.messageService?.publish({
      messageType: MessageType.SelectAWirebreak,
      payload: selectedItem,
      source: MessageSource.WirebreakViewer
    });
  }
}
