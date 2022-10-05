import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { of, zip } from 'rxjs';
import { LabTestsService } from 'src/app/modules/laboratory/resources/services/lab-tests.service';
import { SamplesService } from 'src/app/shared/services/samples.service';
import { map } from 'rxjs/operators';

@Component({
  selector: "app-update-sample",
  templateUrl: "./update-sample.component.html",
  styleUrls: ["./update-sample.component.scss"],
})
export class UpdateSampleComponent implements OnInit {
  testParentConcepts$: any;
  testToRetire: any;
  needsToConfirm: boolean = false;
  errors: any[] = [];
  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data,
    private samplesService: SamplesService,
    private labTestsService: LabTestsService
  ) {}

  ngOnInit(): void {}

  onRetiringTest(event: Event, allocation: any){
    if(allocation?.uuid === this.testToRetire?.uuid){
      this.needsToConfirm = !this.needsToConfirm;
    } else {
      this.needsToConfirm = true;
    }
    this.testToRetire = allocation;
  }

  onConfirmRetiringTest(){
    console.log("==> Test to reture", this.testToRetire)
    this.samplesService.retireSampleAllocationTest(this.testToRetire).pipe(
      map((response) => {
        if(response?.error && !response.message){
          this.errors = [
            ...this.errors,
            response.error
          ]
        }
      })
    );
  }
}
