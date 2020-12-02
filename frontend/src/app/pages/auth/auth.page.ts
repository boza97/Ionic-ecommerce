import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController, ModalController, AlertController } from "@ionic/angular";
import { AuthService } from "../../services/auth.service";
import { RegisterComponent } from './register/register.component';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  @ViewChild('authForm', { static: false }) form: NgForm;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.authService.userIsAuthenticated.subscribe(isAuth => {
      if (isAuth) {
        this.router.navigateByUrl('/home');
      }
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    const email = form.value.email;
    const password = form.value.password;

    this.login(email, password);
    form.reset();
  }

  onShowRegister() {
    this.modalCtrl
      .create({
        component: RegisterComponent
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(() => {
        if (this.form) {
          this.form.reset();
        }
      });
  }

  login(email: string, password: string) {
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Prijavljivanje...' })
      .then(loadingEl => {
        loadingEl.present();
        this.authService.login(email, password).subscribe(
          response => {
            loadingEl.dismiss();
            this.router.navigateByUrl('/home/tabs/featured');
          },
          error => {
            loadingEl.dismiss();

            const status = error.error.status;
            let message = 'Greška prilikom prijavljivanja, pokušajte ponovo.';
            if (status === 'EMAIL_NOT_FOUND') {
              message = 'Korisnik sa zadatom email adresom ne postoji.';
            } else if (status === 'INVALID_PASSWORD') {
              message = 'Pogrešna lozinka.'
            }
            this.showAlert(message);
          }
        )
      })
  }

  showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Greška',
        message: message,
        buttons: ['Ok']
      })
      .then(alertEl => alertEl.present());
  }
}
