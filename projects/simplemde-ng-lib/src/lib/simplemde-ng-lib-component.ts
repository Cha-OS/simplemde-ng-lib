import {
  Component,
  NgModule,
  forwardRef,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
  OnDestroy,
  ModuleWithProviders,
  Inject,
  ViewEncapsulation
} from '@angular/core'
import {
  NG_VALUE_ACCESSOR
} from '@angular/forms'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgModelBase } from './utils'
import { SIMPLEMDE_CONFIG } from './simplemde-ng-lib-config'
import * as SimpleMDE from 'simplemde'

const SIMPLEMDE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Simplemde),
  multi: true
}

@Component({
  selector: 'simplemde',
  encapsulation: ViewEncapsulation.None,
  template: `
    <textarea #simplemde></textarea>
  `,
  styleUrls: ['./simplemde-ng-lib-component.scss', '../../node_modules/simplemde/dist/simplemde.min.css'],
  providers: [
    SIMPLEMDE_CONTROL_VALUE_ACCESSOR
  ]
})
export class Simplemde extends NgModelBase implements AfterViewInit, OnDestroy {
  @ViewChild('simplemde') textarea: ElementRef
  @Input() options: SimpleMDE.Options = {}

  private simplemde: SimpleMDE
  private tmpValue = null

  writeValue(v: any) {
    if (v !== this._innerValue) {
      this._innerValue = v
      if (this.simplemde && this.value != null) {
        this.simplemde.value(this.value)
      }
      if (!this.simplemde) {
        this.tmpValue = this.value
      }
    }
  }

  ngAfterViewInit() {
    if (typeof this.config !== 'object' || typeof this.options !== 'object') {
      throw 'config is not an object'
    }

    const config = { ...this.config, ...this.options }
    config.element = this.textarea.nativeElement

    this.simplemde = new SimpleMDE(config)

    if (this.tmpValue) {
      this.simplemde.value(this.tmpValue)
      this.tmpValue = null
    }

    this.simplemde.codemirror.on('change', () => {
      this.value = this.simplemde.value()
    })
  }

  ngOnDestroy() {
    this.simplemde = null
  }

  constructor(
    @Inject(SIMPLEMDE_CONFIG) private config
  ) {
    super()
  }

}

@NgModule({
  declarations: [
    Simplemde
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    Simplemde,
    FormsModule,
    CommonModule
  ]
})
export class SimplemdeModule {
  static forRoot(configProvider: any = {
    provide: SIMPLEMDE_CONFIG,
    useValue: {}
  }): ModuleWithProviders {
    return {
      ngModule: SimplemdeModule,
      providers: [
        configProvider
      ]
    }
  }
}
