import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: "app-update-sample",
  templateUrl: "./update-sample.component.html",
  styleUrls: ["./update-sample.component.scss"],
})
export class UpdateSampleComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {}

  onFormUpdateForTest(event) {
    console.log("==> event: ", event);
  }
}
