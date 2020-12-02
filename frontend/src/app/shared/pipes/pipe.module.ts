import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeepHtmlPipe } from './keep-html.pipe';
import { ReplaceBrTagPipe } from './replace-br-tag.pipe';



@NgModule({
  declarations: [KeepHtmlPipe, ReplaceBrTagPipe],
  imports: [
    CommonModule
  ],
  exports: [KeepHtmlPipe, ReplaceBrTagPipe]
})
export class PipeModule { }
