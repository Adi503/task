import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../service/user.service";

@Component({
  selector: "app-add-profile",
  templateUrl: "./add-profile.component.html",
  styleUrls: ["./add-profile.component.scss"]
})
export class AddProfileComponent implements OnInit {
  inputForm: FormGroup;
  submitted = false;
  imageData1 = "";
  show: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  onfileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.inputForm.get("avtar").setValue({
          filename: file.name,
          filetype: file.type,
          blobdata: reader.result.split(",")[1]
        });

        this.imageData1 =
          "data:" +
          this.inputForm.get("avtar").value.filetype +
          ";base64," +
          this.inputForm.get("avtar").value.blobdata;
        this.show = true;
        console.log(this.imageData1);
      };
    }
  }
  ngOnInit() {
    this.inputForm = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      avtar: null,
      filename: [""],
      imageData: [""],
      phone_no: ["", Validators.required]
    });
  }
  get f() {
    return this.inputForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.inputForm.invalid) {
      return;
    }
    this.inputForm.value.imageData = this.imageData1;
    this.userService.saveProfile(this.inputForm.value).subscribe(data => {
      console.log(data);
      this.router.navigate(["/all-profile"]);
    });
  }
}
