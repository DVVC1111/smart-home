import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
})

export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['']
   });
  }

  async verifyEmail() {
    const email = this.loginForm.value.email;

    // Create a new LoadingController instance
    const loading = await this.loadingCtrl.create();

    // Present the loading indicator
    await loading.present();

    // Send the email to the backend server
    const fetchResponse = await fetch(`http://localhost/FG_user/verify_email.php?email=${email}`);
    const response = await fetchResponse.json();

    // Dismiss the loading indicator
    await loading.dismiss();

    // Check if the email exists in the database
    if (response.exists) {
      // Redirect to the dashboard
      this.navCtrl.navigateRoot('/dashboard');
    } else {
      // Show an error message
      const alert = await this.alertCtrl.create({
        message: 'Invalid email. Try another email',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
