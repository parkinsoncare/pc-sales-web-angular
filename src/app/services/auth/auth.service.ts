import { environment } from '../../../environments/environment';

import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
//import * as config from '../../../auth_config.json';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { tap, catchError, concatMap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Create an observable of Auth0 instance of client
  auth0Client$ = (from(
    createAuth0Client({
      domain: environment.auth0.domain,
      client_id: environment.auth0.clientID,
      redirect_uri: environment.auth0.callbackUri,
      audience: environment.auth0.apiIdentifier
    })
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1), // Every subscription receives the same shared value
    catchError(err => throwError(err))
  );
  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable
  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap(res => this.loggedIn = res)
  );
  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );
  // Create subject and public observable of user profile data
  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  // Create a local property for login status
  loggedIn: boolean = null;

  constructor(private router: Router) { }

  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => { this.userProfileSubject$.next(user); })
    );
  }

  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#gettokensilently
  getTokenSilently$(options?): Observable<string> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getTokenSilently(options)))
    );
  }

  localAuthSetup() {
    // This should only be called on app initialization
    // Set up local authentication streams
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          // If authenticated, get user and set in app
          // NOTE: you could pass options here if needed
          return this.getUser$();
        }
        // If not authenticated, return stream that emits 'false'
        return of(loggedIn);
      })
    );
    checkAuth$.subscribe((response: { [key: string]: any } | boolean) => {
      // If authenticated, response will be user object
      // If not authenticated, response will be 'false'
      this.loggedIn = !!response;
    });
  }

  login(redirectPath: string = '/') {
    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log in
      client.loginWithRedirect({
        redirect_uri: environment.auth0.callbackUri,
        appState: { target: redirectPath }
      });
    }, e => {
      console.log('Login Error:', e);
    });
  }

  handleAuthCallback() {
    // Only the callback component should call this method
    // Call when app reloads after user logs in with Auth0
    let targetRoute: string; // Path to redirect to after login processsed
    const authComplete$ = this.handleRedirectCallback$.pipe(
      tap(cbRes => {
        // Get and set target redirect route from callback results
        targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
      }),
      concatMap(() => {
        // Redirect callback complete; get user and login status
        return combineLatest(
          this.getUser$(),
          this.isAuthenticated$
        );
      })
    );
    // Subscribe to authentication completion observable
    // Response will be an array of user, token, and login status
    authComplete$.subscribe(([user, loggedIn]) => {
      // Redirect to target route after callback processing
      this.router.navigate([targetRoute]);
    }, e => {
      console.log('Login Error2:', e);
      let errorReasonCode = 'unknown';
      if (e.error_description === 'user is blocked') { errorReasonCode = 'admin_block'; }

      this.router.navigate(['/public/loginerror', errorReasonCode]);
    });
  }

  logout() {
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log out
      client.logout({
        client_id: environment.auth0.clientID,
        returnTo: window.location.origin
      });
    });
  }

  public async getToken(): Promise<string> {
    return ('hello');
    /*
    return new Promise ( (resolve, reject) => {
      return resolve('hello');
    });
    */
    //const accessToken = await this.getTokenSilently$();
    //return accessToken;
  }

  public inRole(targetGroupList: string[]): boolean {
/*
    const profile = JSON.parse(localStorage.getItem(this.profileKey));

    const groups =  profile['https://profile.parkinsoncare.com/claims/roles'];

    for (let i = 0; i < targetGroupList.length; i++) {
      if (groups.includes(targetGroupList[i])) {
        return true;
      }
    }
*/
    return false;

  }

}




/*
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import * as auth0 from 'auth0-js';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authIDKey: string = 'token';
  accessTokenKey: string = 'access_token';
  expiresAtKey: string = 'expires_at';
  profileKey: string = 'profile';
  scopesKey: string = 'scopes';
  authResultSlimmedDown: string = 'authResultSlimmedDown';
  auth0namespace: string = environment.auth0.namespace;

  authResult: any;
  requestedScopes: string = environment.auth0.requestedScopes;

  // Configure Auth0
  auth0 = new auth0.WebAuth({
    domain: environment.auth0.domain,
    clientID: environment.auth0.clientID,
    audience: environment.auth0.apiIdentifier,
    responseType: 'token id_token',
    scope: this.requestedScopes,
    redirectUri: environment.auth0.callbackUri
  });

  constructor(private router: Router,
              private dialog: MatDialog) {}

  private setSession(authResult): void {

    console.log(JSON.stringify(authResult, null, 4));

    this.authResult = authResult;

    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    console.log('authResult.scope', authResult.scope);
    //const scopes = authResult.scope || this.requestedScopes || '';

    //console.log(authResult.accessToken);

    const profile = authResult.idTokenPayload;

    // has to be first identity
    const identity = profile[this.auth0namespace + 'identities'][0];

    if (identity.connection === 'Username-Password-Authentication' || identity.isSocial) {
      if (this.auth0namespace + 'cfsClientKey' in profile) {
        profile.dtxmClientKey = profile[this.auth0namespace + 'cfsClientKey'];
        profile.clientKey = profile[this.auth0namespace + 'cfsClientKey'];
      }
    } else {
      profile.dtxmClientKey = identity.connection;
      profile.clientKey = identity.connection;
    }

    const authResultCopy = JSON.parse(JSON.stringify(authResult));
    delete authResultCopy.idToken;
    delete authResultCopy.accessToken;

    localStorage.setItem(this.profileKey, JSON.stringify(profile));
    localStorage.setItem(this.authIDKey, authResult.idToken);
    localStorage.setItem(this.accessTokenKey, authResult.accessToken);
    localStorage.setItem(this.expiresAtKey, expiresAt);
    localStorage.setItem(this.scopesKey, JSON.stringify(authResult.scope));
    localStorage.setItem(this.authResultSlimmedDown, JSON.stringify(authResultCopy));
  }

  public handleAuthentication(){
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/public/home']);
      } else if (err) {
        //this.router.navigate(['/public/home']);
        this.logout();
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  public loginPopup() {
    this.auth0.authorize({
      redirectUri: environment.auth0.callbackUri,
      logo: 'https://www.complyfs.com/assets/wc-images/chain2.png'
    });
  }

  public signupPopup() {
    alert('Lock reference removed, fix please.');
  }

  public forgotPwdPopup() {
    alert('Lock reference removed, fix please.');
  }

  public authenticated() {

    const expiresAt = JSON.parse(localStorage.getItem(this.expiresAtKey));
    return new Date().getTime() < expiresAt;

    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key === 'token' <= used to look for id_token, changed 0.2.2
    //return tokenNotExpired();
  };

  public logout() {
    // Remove tokens from localStorage
    localStorage.removeItem(this.authIDKey);
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.profileKey);
    localStorage.removeItem(this.expiresAtKey);
    localStorage.removeItem(this.scopesKey);
    localStorage.removeItem(this.authResultSlimmedDown);
    // Go back to the home route
    const returnToEncoded = encodeURIComponent(environment.auth0.callbackUri);
    window.location.href = 'https://complyfs.auth0.com/v2/logout?returnTo=' + returnToEncoded;
  };

  public getProfileFromAuth0() {

    return new Promise ((resolve, reject) => {

      const idToken = localStorage.getItem(this.authIDKey);
      const accessToken = localStorage.getItem(this.accessTokenKey);

      if (!accessToken) {
        throw new Error('Access token must exist to fetch profile');
      }

      this.auth0.client.userInfo(accessToken,  (err, profile) => {
        if(err) {
          console.log("getProfileFromAuth0 err");
          console.log(err);
          reject(err);  // handle error
        }

        localStorage.setItem(this.profileKey, JSON.stringify(profile));
        resolve({result: 'success'});
      });
    });
  }

  public isAdmin() {
    return false;
  }

  public userID() {
    const profile = JSON.parse(localStorage.getItem(this.profileKey)) || {};

    return profile.sub;
  }

  public email() {
    return (JSON.parse(localStorage.getItem(this.profileKey)) || {}).email;
  }

  public nickname(): string {
    const profile = JSON.parse(localStorage.getItem(this.profileKey)) || {};

    return profile[this.auth0namespace + 'user'].nickname || profile[this.auth0namespace + 'user'].email;
  }

  public clientKey(): string {
    return (JSON.parse(localStorage.getItem(this.profileKey)) || {}).clientKey;
  }

  public isSocial() {
    return (JSON.parse(localStorage.getItem(this.profileKey)) || {}).identities[0].isSocial;
  }

  public socialProvider() {
    const profile = JSON.parse(localStorage.getItem(this.profileKey)) || {};

    let provider: string;
    const auth0FirstProvider = profile.identities[0].provider;

    if (auth0FirstProvider === 'google-oauth2') { provider = 'Google'; }
    else { provider = auth0FirstProvider; }

    return provider;
  }

  public getProfileValue(groupKey:string, itemKey:string):any {
    const profile = JSON.parse(localStorage.getItem(this.profileKey)) || {};
    return profile[groupKey][itemKey] || '';
  }

  getBearerAuthHeaders(): HttpHeaders {
    return new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem(this.accessTokenKey) );
  }

  public isTMAdmin(): boolean {
    return this.userID() === 'google-oauth2|107355218495683278045' ?  true : false;
  }

  public getAccessToken(): string {
    return localStorage.getItem(this.accessTokenKey);
  }

  public inGroup(targetGroupList: string[]): boolean {

    const profile = JSON.parse(localStorage.getItem(this.profileKey));

    const groups =  profile['https://complyfs.com/claims/groups'];

    for (let i = 0; i < targetGroupList.length; i++) {
      if (groups.includes(targetGroupList[i])) {
        return true;
      }
    }

    return false;
  }

  public inRole(targetRoleList: string[]): boolean {

    const profile = JSON.parse(localStorage.getItem(this.profileKey));

    const roles =  profile['https://complyfs.com/claims/roles'];

    for (let i = 0; i < targetRoleList.length; i++) {
      if (roles.includes(targetRoleList[i])) {
        return true;
      }
    }

    return false;
  }

  public hasScope(targetScopeList: string[]): boolean {
    const sScopes = JSON.parse(localStorage.getItem(this.scopesKey));
    if (!sScopes) { return false; }

    const scopes = sScopes.split(' ');

    for (let i = 0; i < targetScopeList.length; i++) {
      if (scopes.filter( s => { return s === targetScopeList[i]; }).length > 0) {
        return true;
      }
    }

    return false;
  }

  public inScopes(scopesList) {
    const scopes = JSON.parse(localStorage.getItem(this.scopesKey)) || {};

    let inScope: boolean = false;

    scopesList.forEach (requestedScope => {
      if (scopes.indexOf(requestedScope) > -1) {
        inScope = true;
      }
    });

    console.log('inScope', inScope);
    return inScope;
  }

  public dtxmClientType(): string {
    return 'legal';
  }
}
*/
