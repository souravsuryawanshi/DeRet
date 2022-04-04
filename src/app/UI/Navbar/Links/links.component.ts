import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent {
  @Output() out = new EventEmitter();

  onClickHandler() {
    this.out.emit(true);
  }
}
