

class Log {


  source: any;


  constructor( source: any ) {

    this.source = source;
  }

  debug( methodName: string, ... args: any[] ) {

    console.debug( [this.source], methodName, args );
  }

  info( methodName: string, ... args: any[] ) {

    console.info( [this.source], methodName, args );
  }

  warn( methodName: string, ... args: any[] ) {

    console.warn( [this.source], methodName, args );
  }

  error( methodName: string, ... args: any[] ) {

    console.error( [this.source], methodName, args );
  }

}
