import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RequestDispatcher, BrokerMessage, RequestBuilder} from "../../lib/json_broker";
import {Http} from "@angular/http";

/**
 * Generated class for the TestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


class Proxy {


  dispatcher: RequestDispatcher;
  builder: RequestBuilder;

  constructor( dispatcher: RequestDispatcher ) {

    this.dispatcher = dispatcher;
    this.builder = new RequestBuilder( 'jsonbroker.TestService' );
  }

  async ping(): Promise<void> {

    let request = this.builder.build( 'ping' );

    return this.dispatcher.dispatch( request ).then(
      () => {
        console.log( [this], 'ping' );
      }
    );
  }
}


@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  proxy: Proxy;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http) {

    this.proxy = new Proxy( new RequestDispatcher(http));
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad TestPage');
  }

  async pingOnClick()  {

    await this.proxy.ping();
  }


  public static pushOnTo( navCtrl: NavController ) {

    navCtrl.push(TestPage);
  }



}
