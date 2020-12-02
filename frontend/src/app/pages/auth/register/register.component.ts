import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { equalValidator } from '../../../shared/validator';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const firstName = this.form.value.firstName;
    const lastName = this.form.value.lastName;
    const email = this.form.value.email;
    const password = this.form.value.password;
    const confirmPassword = this.form.value.confirmPassword;

    this.register(firstName, lastName, email, password, confirmPassword);
    this.form.reset();
    this.modalCtrl.dismiss();
  }

  register(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Registrovanje...' })
      .then(loadingEl => {
        loadingEl.present();
        this.authService.signup(firstName, lastName, email, password, confirmPassword)
          .subscribe(
            () => {
              loadingEl.dismiss();
              this.alertCtrl
                .create({
                  header: 'Uspešno ste se registrovali.',
                  buttons: ['Ok']
                })
                .then(alertEl => alertEl.present());
            },
            error => {
              console.log(error);
              loadingEl.dismiss();

              const status = error.error.status;
              let message = 'Greška prilikom registrovanja, pokušajte ponovo.';
              if (status === 'EMAIL_EXISTS') {
                message = 'Korisnik već postoji sa zadatom email adresom.';
              }
              this.showAlert(message);
            });
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

  createForm() {
    this.form = new FormGroup({
      firstName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      lastName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-\.]).{6,}$/)]
      }),
      confirmPassword: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, equalValidator('password')]
      })
    });
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }
}
