import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {

  constructor() { }

  name2 = new FormControl('');

  updateName2() {
    this.name2.setValue('Nancy');
  }

  ngOnInit() {
  }

}
