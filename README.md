# SimplemdeNgLib

***Note***: The code of this project originates from https://github.com/doxiaodong/ng2-simplemde. The reason of creating a separate repo is to build and package a healthy angular library and npm package. Therefore the source structure changed reasonably.

Github: https://github.com/Cha-OS/simplemde-ng-lib

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Creating / Reproduction

```sh
# generate environment with library environment app
ng new simplemde-ng-env-for-lib
# generating library
ng generate library simplemde-ng-lib
# building
ng build simplemde-ng-lib
```

Add dependencise in the lib's `package.json`:

```json
  "dependencies": {
    "@types/simplemde": "^1.11.7",
    "simplemde": "^1.11.2"
  },
```

Run `yarn` to install packages:

```sh
cd projects/simplemde-ng-lib/
yarn
```

### Error whitelisted - Distributing npm packages with 'dependencies' is not recommended

```txt
Distributing npm packages with 'dependencies' is not recommended. Please consider adding @types/simplemde to 'peerDependencies' or remove it from 'dependencies'.

BUILD ERROR
Dependency @types/simplemde must be explicitly whitelisted.
Error: Dependency @types/simplemde must be explicitly whitelisted.
```

+ https://github.com/ng-packagr/ng-packagr/issues/716
+ 

In the `ng-package.prod.json` and `ng-package.json` files after the `lib` section add a `whitelistedNonPeerDependencies` section with the list of dependencies you want to have:

```json
  "lib": {
    "entryFile": "src/public_api.ts"
  },
  "whitelistedNonPeerDependencies": [
    "@types/simplemde",
    "simplemde"
  ]
```

### Error: Cannot read property 'isSkipSelf' of null

+ https://github.com/ng-packagr/ng-packagr/issues/513
+ https://github.com/ng-packagr/ng-packagr/issues/195
    + Yes. There are some issue with barrels in the Angular compiler afaik. I don't know how and when exactly the issue occurs. However, I can say that it's better to use the full-path imports (pointing to a *.ts file) instead of the barrel imports.
+ https://github.com/angular/angular/issues/21082
+ https://github.com/ng-packagr/ng-packagr/issues/382
+ https://github.com/angular/angular/issues/20931
+ https://github.com/angular/angular/issues/8704
+ https://github.com/angular/angular/issues/20523

It is a very criptic error, and coming mostly as a side effect of some other error. To unreveal the real error you should avoid using TypeScript barrelsa and `*` exports (in `simplemde-ng-lib/projects/simplemde-ng-lib/src/public_api.ts`)

Instead of:

```ts
export * from './lib/simplemde-ng-lib-config';
export * from './lib/simplemde-ng-lib-component';
```

write:

```ts
export {SIMPLEMDE_CONFIG} from './lib/simplemde-ng-lib-config';
export {SimplemdeModule} from './lib/simplemde-ng-lib-component';
```

Additionally, if you do not see the proper error, you might want to integrate the library in the demo app, and run `ng serve` and see error reports. To do this please check the section ***Running demo app***. You might need to restart `ng serve` now and then to get the latest problems. This finally revealed us the error in one of deeper TS files.

## Build production:

```sh
ng build simplemde-ng-lib --prod
```

## Publishing

```sh
# build
ng build simplemde-ng-lib --prod
# get to the build folder
cd dist/simplemde-ng-lib/
# publish
npm publish
```

## Running demo app

### Explicitly

Before the library is built you can import it explicitly:

```ts
import { SimplemdeModule, SIMPLEMDE_CONFIG } from '../../projects/simplemde-ng-lib/src/public_api';
```

### From built dist

```ts
import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'simplemde-ng-lib';
```

It will load the library from the designated output build path (in our case `simplemde-ng-lib/dist/simplemde-ng-lib`). This is currently directed by the `path` property inside the `simplemde-ng-lib/tsconfig.json`:

```json
    "paths": {
      "simplemde-ng-lib": [
        "dist/simplemde-ng-lib"
      ],
      "simplemde-ng-lib/*": [
        "dist/simplemde-ng-lib/*"
      ]
    }
```

```txt
ERROR in dist/simplemde-ng-lib/lib/simplemde-ng-lib-component.d.ts(3,28): error TS2307: Cannot find module 'simplemde'.
```

This is the problem, because on the output build path there is no `simplemde`. The solution was to put the original `node_modules` (from the `simplemde-ng-lib/projects/simplemde-ng-lib`) to the output build path.

***TODO***: Check if it will be provided in the npm package, or at least it will be built when the library is imported later for use.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
