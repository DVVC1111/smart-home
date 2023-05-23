import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.html',
  styleUrls: ['otp.scss'],
})


export class OtpPage implements OnInit {
  otpForm: FormGroup;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    ) {}

    ngOnInit() {
        this.otpForm = this.formBuilder.group({
          otp: ['']
       });
      }

  async verifyOTP() {
    // TODO: Connect to OTP verification API using this.otpCode
    const otp = this.otpForm.value.otp;

    // Create a new LoadingController instance
    const loading = await this.loadingCtrl.create();

    // Present the loading indicator
    await loading.present();

    // Send the email to the backend server
    const fetchResponse = await fetch(`http://localhost/FG_user/user.php`);
    const response = await fetchResponse.json();

    // Dismiss the loading indicator
    await loading.dismiss();

    // Check if the email exists in the database
    if (otp === response.otp) {
      // Redirect to the dashboard
      this.navCtrl.navigateRoot('/dashboard');
    } else {
      // Show an error message
      const alert = await this.alertCtrl.create({
        message: 'Incorrect OTP, Try again',
        buttons: ['OK']
      });
      await alert.present();
    }

    // If OTP is valid, navigate to home page
    // this.router.navigate(['/dashboard']);
  }
}
