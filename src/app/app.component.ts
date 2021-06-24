import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public iphoneX = false;
  constructor(
    private platform: Platform,
    //private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      SplashScreen.hide();
      this.checarDarkMode();
      if (this.platform.height() > 736) {
        this.iphoneX = true;
        console.log("iphoneXComp",this.iphoneX, this.platform.height(), this.platform.width());
      } else {
        console.log("iphoneXComp",this.iphoneX, this.platform.height(), this.platform.width());
      }
      
    });
  }

  checarDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    // console.log("darky", prefersDark);
    if (prefersDark.matches) {
      document.body.classList.toggle('dark')
    }
    
  }
}
