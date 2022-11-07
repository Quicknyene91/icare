import { toBase64String } from "@angular/compiler/src/output/source_map";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  base64ToHexa,
  decodeFromBase64,
  encodeToBase64,
  hexaToBase64,
} from "../../helpers/credentials-encode-decode";
import { Field } from "../../modules/form/models/field.model";
import { FormValue } from "../../modules/form/models/form-value.model";
import { Textbox } from "../../modules/form/models/text-box.model";

@Component({
  selector: "app-shared-user-profile-management",
  templateUrl: "./shared-user-profile-management.component.html",
  styleUrls: ["./shared-user-profile-management.component.scss"],
})
export class SharedUserProfileManagementComponent implements OnInit {
  @Input() currentUser: any;
  externalSystemCreadentialsFormFields: Field<string>[];
  @Output() isFormValid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() userPropertiesToSave: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {
    this.externalSystemCreadentialsFormFields = [
      new Textbox({
        id: "username",
        key: "username",
        label: "PimaCOVID username",
        type: "text",
        value: this.decodedUserProperties?.username,
        required: true,
      }),
      new Textbox({
        id: "password",
        key: "password",
        label: "Password",
        type: "pasword",
        value: this.decodedUserProperties?.password,
        required: true,
      }),
    ];
  }

  get convertFromHexaToBase64() {
    const base64UserProperties = {
      base64Username: hexaToBase64(
        this.currentUser?.userProperties?.pimaCOVIDUsername
      ),
      base64Password: hexaToBase64(
        this.currentUser?.userProperties?.pimaCOVIDPassword
      ),,
    };
    return base64UserProperties;
  }

  get decodedUserProperties() {
    const userProperties = {
      username: decodeFromBase64(
        this.convertFromHexaToBase64.base64Username
      ),
      password: decodeFromBase64(
        this.convertFromHexaToBase64.base64Password
      ),
    };
    return userProperties;
  }

  onFormUpdate(formValue: FormValue): void {
    const values = formValue.getValues();

    const base64UserName = encodeToBase64(values?.username?.value);
    const hexaUserName = base64ToHexa(base64UserName);
    const base64Password = encodeToBase64(values?.password?.value);
    const hexaPassword = base64ToHexa(base64Password);

    this.isFormValid.emit(formValue.isValid);
    this.userPropertiesToSave.emit({
      username: hexaUserName,
      password: hexaPassword,
    });
  }
}
