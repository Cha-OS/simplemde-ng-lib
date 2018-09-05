import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simplemde-ng-lib';
  public simpleMdeOptionsHtml:any = {};
  public markdownValue = "Hello ***World***!\n# Idea\n*This* is an idea!";
}
