import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Plugins, Capacitor, AppState } from "@capacitor/core";
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { User } from './common/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  private userSub: Subscription;
  private previousAuthState = false;
  public isUserLoaded = false;
  public user: User;

  constructor(
    private platform: Platform,
    private authService: AuthService,
    private router: Router) {
    this.initializeApp();
  }

  ngOnInit(): void {
    this.authSub = this.authService.userIsAuthenticated.subscribe(isAuth => {
      if (!isAuth && this.previousAuthState !== isAuth) {
        this.router.navigateByUrl('/auth');
      }
      this.previousAuthState = isAuth;
      Plugins.App.addListener('appStateChange', this.checkAuthOnResume.bind(this));
    });

    this.userSub = this.authService.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.isUserLoaded = true;
      } else {
        this.isUserLoaded = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSub)
      this.authSub.unsubscribe();
    if (this.userSub)
      this.userSub.unsubscribe();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });
  }

  onLogout() {
    this.authService.logout().subscribe();
  }

  private checkAuthOnResume(state: AppState) {
    if (state.isActive) {
      this.authService
        .autoLogin()
        .pipe(take(1))
        .subscribe(success => {
          if (!success) {
            this.onLogout();
          }
        });
    }
  }
}
