# Info

***Note***: The code of this project originates from https://github.com/doxiaodong/ng2-simplemde. The reason of creating a separate repo is to build and package a healthy angular library and npm package. Therefore the source structure changed reasonably.

Github: https://github.com/Cha-OS/simplemde-ng-lib

Install:

```sh
yarn add simplemde-ng-lib
```

In your code (best in NgModule file) add:

```ts
import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'simplemde-ng-lib';

// ...

var simpleMdeOptions: any = {};

// ...

@NgModule({
  // ...
  imports: [
      SimplemdeModule.forRoot({
        provide: SIMPLEMDE_CONFIG,
        // config options 1
        useValue: simpleMdeOptions
      })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

In component add:

```ts
export class AppComponent {
  // ...
  public simpleMdeOptionsHtml:any = {};
  public markdownValue = "Hello ***World***!\n# Idea\n*This* is an idea!";
}
```

In your template add:

```html
<simplemde [(ngModel)]="markdownValue" [options]="simpleMdeOptionsHtml"></simplemde>
```

Example of ussage:
+ [module](https://github.com/Cha-OS/simplemde-ng-lib/blob/master/src/app/app.module.ts)
+ [component code](https://github.com/Cha-OS/simplemde-ng-lib/blob/master/src/app/app.component.ts)
+ [component template](https://github.com/Cha-OS/simplemde-ng-lib/blob/master/src/app/app.component.html)
