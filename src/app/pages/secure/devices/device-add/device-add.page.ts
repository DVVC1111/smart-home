import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-device-add',
  templateUrl: './device-add.page.html',
  styleUrls: ['./device-add.page.scss'],
})
export class DeviceAddPage implements OnInit {

  // Mock data
  devices = [
    {
      type: 'cameras',
      name: 'Cameras',
      icon: 'videocam',
      items: [
        'Blink Mini', 'Nest Cam', 'Ring Video', 'TP-Link Tapo C200'
      ]
    },
    {
      type: 'fridges',
      name: 'Fridges',
      icon: 'restaurant',
      items: [
        'LG Side-by-Side', 'Bosch Series 6',
      ]
    },
    {
      type: 'heaters',
      name: 'Heaters',
      icon: 'flame',
      items: [
        'Bosch Convector 4000-15', 'Klarstein Cosmic Beam',
      ]
    },
    {
      type: 'games-console',
      name: 'Games Console',
      icon: 'game-controller',
      items: [
        'PlayStation 5', 'Nintendo Switch OLED',
      ]
    },
    {
      type: 'light-bulbs',
      name: 'Light Bulbs',
      icon: 'bulb',
      items: [
        'Philips Hue', 'TP-Link Tapo L530E'
      ]
    },
    {
      type: 'speakers',
      name: 'Speakers',
      icon: 'volume-high',
      items: [
        'Apple HomePod mini', 'Bose Portable', 'Echo Dot'
      ]
    }
  ];

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  // Cancel
  cancel() {

    // Dismiss modal
    this.modalController.dismiss();
  }

  // Submit
  submit() {

    // Submit data...

    // Dismiss modal
    this.modalController.dismiss();
  }

}
