

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Http} from "@angular/http";

export class BrokerMessage {

  messageType:string = "request"; // 'fault'/'oneway'/'request'/'response'/'event'
  metaData:any = {};
  serviceName:string = "__SERVICE_NAME__";
  majorVersion:number = 1;
  minorVersion:number = 0;
  methodName:string = "__METHOD_NAME__";
  associativeParameters:any = {};
  orderedParameters:any[];

  constructor(poja?:any[]) { // poja: plain old javascript array
    if (poja) {
      this.messageType = poja[0];
      this.metaData = poja[1];
      this.serviceName = poja[2];
      this.majorVersion = poja[3];
      this.minorVersion = poja[4];
      this.methodName = poja[5];
      this.associativeParameters = poja[6];
      if( 8 == poja.length ) {
        this.orderedParameters = poja[7];
      }
    }
  }


  public static buildRequest( serviceName: string, methodName: string ): BrokerMessage {

    let answer: BrokerMessage = new BrokerMessage();
    answer.serviceName = serviceName;
    answer.methodName = methodName;
    return answer;
  }

  public static buildRequestWithOrderedParameters( serviceName: string,
                                                   methodName: string,
                                                   orderedParameters:any[] = [] ): BrokerMessage {

    let answer: BrokerMessage = new BrokerMessage();
    answer.serviceName = serviceName;
    answer.methodName = methodName;
    answer.orderedParameters = orderedParameters;

    return answer;

  }

  toArray():any[] {
    var answer = new Array(6);
    answer[0] = this.messageType;
    answer[1] = this.metaData;
    answer[2] = this.serviceName;
    answer[3] = this.majorVersion;
    answer[4] = this.minorVersion;
    answer[5] = this.methodName;
    answer[6] = this.associativeParameters;
    if (this.orderedParameters) {
      answer[7] = this.orderedParameters;
    }
    return answer;
  }

  toData():any {
    return JSON.stringify(this.toArray());
  }

}

export class RequestBuilder {

  constructor( private serviceName: string ) {}

  build( methodName: string ): BrokerMessage {

    let answer: BrokerMessage = new BrokerMessage();
    answer.serviceName = this.serviceName;
    answer.methodName = methodName;
    return answer;
  }
}


export class RequestDispatcher {


  url: string;

  constructor(private http:Http) {

    // localhost development
    if( '10000' === window.location.port ) {
      this.url = 'http://localhost:10000/services';

    } else {

      this.url = '/services';
    }
    console.log( [this], "constructor", this.url );

  }

  dispatch(request: BrokerMessage): Promise<BrokerMessage> {

    return this.http.post( this.url, request.toData() ).take(1).map(
      ( result )=>{
        return new  BrokerMessage( result.json() )
      }
    ).toPromise();
  }
}




