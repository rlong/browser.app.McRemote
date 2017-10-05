import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TestPage} from "../test/test";
// import {ClipboardPage} from "../clipboard/clipboard";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }


  clipboardOnClick() {

    console.log( [this], "clipboardOpen" );
    this.navCtrl.push( 'ClipboardPage');
    // ClipboardPage.pushOnTo( 'ClipboardPage');
  }


  testOpen() {

    console.log( [this], "playlistOpen" );
    TestPage.pushOnTo( this.navCtrl );
  }



  async ngOnInit() {

    // let status = await this.proxy.status();
    // console.log( [this], "ngOnInit", status );
    // this.navCtrl.push(PlaylistPage);
  }

}
