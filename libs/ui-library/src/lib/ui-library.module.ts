import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WildComponent } from './wild/wild.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '@mindfill/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  declarations: [WildComponent, ToolbarComponent],
  exports: [ToolbarComponent],
})
export class UiLibraryModule {}
