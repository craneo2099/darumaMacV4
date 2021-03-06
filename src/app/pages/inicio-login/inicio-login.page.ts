import { Component, OnInit, NgZone } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, MenuController, 
  LoadingController } from '@ionic/angular';

import { DarumaService } from 'src/app/providers/daruma-service/daruma.service';
import { Storage } from '@ionic/storage';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import { LoginInt } from 'src/app/interfaces/login';

@Component({
  selector: 'app-inicio-login',
  templateUrl: './inicio-login.page.html',
  styleUrls: ['./inicio-login.page.scss'],
})
export class InicioLoginPage implements OnInit {
  public loginForm: FormGroup;
  private datosLogin: LoginInt;
  public token: string;
  public isKeyboardHide = true;

  minLength = 5;
  public loader: any;

  constructor(public router: Router,
    public ds: DarumaService,
    private ngZone: NgZone,
    public formBuilder: FormBuilder,    
    public alertCtrl: AlertController,
    public storage: Storage,
    public datePipe: DatePipe,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController
    ) {
      
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
        ])
      ],
        password: ['', Validators.compose([
          Validators.required,
          // Validators.minLength(4)
        ])]
      })
      this.storage.remove('tokenS')
      this.menuCtrl.enable(false)

      // console.log("Antes", this.isKeyboardHide);
      


     }

  ngOnInit() {
    // this.keyboard.isVisible
  }

  async logForm(){
    
    this.loader = await this.loadingCtrl.create();
    if (this.loginForm.get('email').hasError('required') || this.loginForm.get('password').hasError('required')) {
      console.log("campo nulo");
      let error="Error!"
      let texto="Escribe tu Usuario (e-mail) y/o Password";
      this.doAlert(error, texto);
    } else {
      //console.log("datos completos");
      if (this.loginForm.get('email').errors &&
      this.loginForm.get('email').dirty &&
      this.loginForm.get('email').hasError('pattern')) {
      //  console.log("No entra");
       this.doAlert("Error!!!","Escribe el correo correctamente")
      } else {
        this.loader.present();
        let z = this.datePipe.transform(new Date(), 'Z')
        console.log("zeeetaa", z);

        let sha256 = CryptoJS.SHA256(this.loginForm.value.password)
        // comentario
        // sha256.toString(CryptoJS.enc.Base64)
        // console.log("crypto",sha256.toString(CryptoJS.enc.Hex));
        //////////
        this.datosLogin = {
          usuario: this.loginForm.value.email,
          pass: sha256.toString(CryptoJS.enc.Hex),
          zona: z
        }
        this.ds.doLogin(this.datosLogin)
        .subscribe(data => {
          console.log("data InLog.ts",data);
          if (data["response"]==false) {
            console.log("datos Incorrectos");
            let error="Error!!!";
            // this.doAlert(error, data["message"])
            this.loader.dismiss();
            this.doAlert(error, "Usuario o contrase\u00F1a incorrecto")
          } else {
            this.storage.set('tokenS', data["result"]);
            this.storage.set('userS', this.loginForm.value.email)
            // this.navCtrl.setRoot(DarumasGralPage);
            // this.router.navigateByUrl('/');
            // this.logGuard.canActivate( , data["response"]);
            this.router.navigate(['darumas-gral']);
            // RouterModule.forRoot([
            //   { path: 'darumas-gral', component: DarumasGralPage } 
            // ])
          }
        }, error => {
          console.log("errooor",error);
          this.loader.dismiss();
          this.doAlert("Error!!","Prueba mas tarde...");
        });
      }
    }
  }

  async doAlert(titulo, texto) {
    let alert = await this.alertCtrl.create({
      // title: titulo,
      header: titulo,
      // subTitle: texto,
      subHeader: texto,
      // enableBackdropDismiss: false,
      backdropDismiss: false,
      buttons: ['Ok']
    });

    await alert.present();
  }

  async goToRegistro() {
    this.loader = await this.loadingCtrl.create();
    await this.loader.present();
    // this.navCtrl.push(RegistroPage);
    this.router.navigate(['registro']);
    // RouterModule.forRoot([{path: 'registro', component: RegistroPage }])
    // console.log('entraa cambio');
    
  }

  async goToRecuperar(){
    this.loader = await this.loadingCtrl.create();
    this.loader.present();
    // this.navCtrl.push(RecuperarPage);
    this.router.navigate(['recuperar'])
    
  }

  async ionViewDidLeave(){
    await this.loader.dismiss();
   }

  ionViewWillEnter() {

    window.addEventListener('keyboardWillHide', () => {
      this.ngZone.run(() => {
        this.isKeyboardHide = true;
      });
    // console.log('keyboard will hide', this.isKeyboardHide);
    });

    window.addEventListener('keyboardWillShow', (e) => {
      this.ngZone.run(() => {
        this.isKeyboardHide = false;
      });
      // console.log('keyboard will show with height', this.isKeyboardHide);
    });
  }
}
