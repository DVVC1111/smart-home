import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.html',
})

export class LoginPage implements OnInit {
  loginForm: FormGroup;
  otpForm: FormGroup;

  showOTP = false; // Initialize showOTP to false
  showEmail = true;
  responseotp = null;


  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      otp: [''] // Add form control for OTP
   });
  }


  async submitOTP() {
    const backendotp = this.responseotp; // Assuming you have saved the responseotp value in the class
    const inputotp = this.loginForm.value.otp.toString();
    console.log('Backend OTP in submitOTP:' + backendotp);
    console.log('input OTP in Submit OTP: ' + inputotp);
    if(inputotp === backendotp){
      if (backendotp === inputotp) {
        console.log('login complete');
        this.navCtrl.navigateRoot('/dashboard');
      } else {
        // If OTP is incorrect, show error message
        const alert = await this.alertCtrl.create({
          message: 'Invalid OTP. Try again.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }

  async verifyEmail() {
    const email = this.loginForm.value.email;

    // Create a new LoadingController instance
    const loading = await this.loadingCtrl.create();

    // Present the loading indicator
    await loading.present();

    // Send the email to the backend server
    const fetchResponse = await fetch(`http://localhost/FG_user/user.php?email=${email}`);
    const response = await fetchResponse.json();

    // Dismiss the loading indicator
    await loading.dismiss();

    // Check if the email exists in the database
    if (response.exists) {
      // Redirect to the dashboard
      this.showOTP = true;
      this.showEmail = false;
      this.responseotp = response.otp.toString(); // Save the responseotp value in the class
      console.log('Backend_OTP: ' + this.responseotp);
      const responseotp = response.otp;
      console.log('Backend_OTP: '+ responseotp);

      this.submitOTP();
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
