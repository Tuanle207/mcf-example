import { Injectable, inject } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly auth0 = inject(Auth0Service);
	readonly isAuthenticated$ = this.auth0.isAuthenticated$;
	readonly user$ = this.auth0.user$;

	login(): void {
		this.auth0.loginWithRedirect();
	}

	logout(): void {
		this.auth0.logout({ logoutParams: { returnTo: globalThis.location.origin } });
	}
}
