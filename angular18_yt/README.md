DATA BINDING

    setUp and installation is Done
    Date Binding is Done.
    interpolation {{}}
    property binding [property]="variableName"
    two Way Data Binding. [(ngModel)]="propertyName
    Event binding. ==> (click)="showWelcomeAlert()  ===>  (click)="showMessageAlert('happy Birthday')"

DIRECTIVES 
    TWO TYPES
        STRUCTURAL / ATTRIBUTE

        STRUCTURAL :- directive which is responsible to change the structure of the dom.  ---> ngIf / ngFor 
            *ngIf
                -> For rendering Component based on condition.
            *ngFor
                -> Any element jo bhi humko array of object ki tarah iterate krna hai vo sab.
                -> jaise humare pass array of object hai and humko uss array ko dikhana hai elem mein tab vo use hota hai.
            *ngSwitchCase
            *ngSwitchDefault
            *ngTemplateOutlet
            *ngComponentOutlet
               
        ATTRIBUTE :- A directive which can add extra behaviour to the existing element.   ---> ngClass / ngStyle 


app.config.ts
   With app.config.ts, you can centralize and streamline configurations for:
        Routing
        HTTP clients
        Dependency injection
        Performance optimizations
        Third-party integrations
        Environment-specific settings

Life-cycle-EVENT




For Making API - request
        to make the API call we have to make use of ther http client library.
        so we have to create a instance of http client injector service.

    ROLES.COMPONENT.TS
    <!-- oldWay angular-16 and older version. -->
      // constructor(private http: HttpClient){
            // older way of dependency Injection  
      // }

    <!-- new way -->
         http = inject(HttpClient)

****---------****
jab bhi hum koi component service bnate hai toh class ke upar ek decorator banta hai usi se uska purpose decide hota hai.
