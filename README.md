# ProntoStackAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.5 and has been updated to version 8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

docker build -t parkinsoncare/pc-sales-web-angular:latest -f Dockerfile.prod .
docker push parkinsoncare/pc-sales-web-angular:latest

ng build --prod && docker build -t parkinsoncare/pc-sales-web-angular:latest -f Dockerfile.prod . && docker push parkinsoncare/pc-sales-web-angular:latest && say done
---
docker run -it --rm --name web -p 80:80 -p 443:443 opinionatedstack/web-angular

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Stripe

Steps based on: https://alligator.io/angular/stripe-elements/

Include in index.html: 

  <!-- Stripe -->
  <script src="https://js.stripe.com/v3/"></script>
  
Create src/typings.d.ts file with:

declare var stripe: any;

## Translations: @ngx-translate/core

https://github.com/ngx-translate/core

npm install @ngx-translate/core --save
npm install @ngx-translate/http-loader


## Source Guides

Auth0:
https://github.com/auth0-samples/auth0-angular-samples

## SETUP Framework

I think this was the article:
https://www.viget.com/articles/keeping-the-framework-for-your-application-up-to-date-with-git/


