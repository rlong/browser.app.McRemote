import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BrokerMessage, RequestBuilder} from "../../lib/json_broker";
import {RequestDispatcher} from "../../lib/json_broker";
import {Http} from "@angular/http";


class Proxy {


  dispatcher: RequestDispatcher;
  builder: RequestBuilder;

  constructor( dispatcher: RequestDispatcher ) {

    this.dispatcher = dispatcher;
    this.builder = new RequestBuilder( 'remote_gateway.AppleScriptService:clipboard' );
  }

  async ping(): Promise<void> {

    let request = this.builder.build( 'ping' );

    return this.dispatcher.dispatch( request ).then(
      () => {
        console.log( [this], 'ping' );
      }
    );
  }

  async get_clipboard(): Promise<string> {
    let request = this.builder.build( "get_clipboard" );

    return this.dispatcher.dispatch( request ).then(
      (result:BrokerMessage) => {

        console.log( result );
        return result.orderedParameters[0];
      }
    );
  }


  set_clipboard( clipboardValue: string ): Promise<void>  {

    let request = this.builder.build( "set_clipboard" );
    request.orderedParameters = [clipboardValue];
    return this.dispatcher.dispatch( request ).then(()=>{});
  }


}




/**
 * Generated class for the ClipboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  segment: 'clipboard'
})
@Component({
  selector: 'page-clipboard',
  templateUrl: 'clipboard.html',
})
export class ClipboardPage implements OnInit {


  proxy: Proxy;
  clipboardAsText: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http) {

    this.proxy = new Proxy( new RequestDispatcher(http));
  }


  public static pushOnTo( navCtrl: NavController ) {

    // navCtrl.push('ClipboardPage');
    navCtrl.push('ClipboardPage');
  }

  ionViewDidLoad() {

    console.log( [this], 'ionViewDidLoad' );
  }

  async pingOnClick()  {

    await this.proxy.ping();
  }


  async copyButtonOnClick() {

    this.clipboardAsText = await this.proxy.get_clipboard();

  }

  async pasteButtonOnClick() {

    await this.proxy.set_clipboard(this.clipboardAsText);
  }

  ngOnInit(): void {

    console.log( [this], 'ngOnInit' );
    this.copyButtonOnClick();
  }


}
