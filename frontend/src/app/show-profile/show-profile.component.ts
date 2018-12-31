import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../service/user.service";

@Component({
  selector: "app-show-profile",
  templateUrl: "./show-profile.component.html",
  styleUrls: ["./show-profile.component.scss"]
})
export class ShowProfileComponent implements OnInit {
  name: String;
  profile_pic: String;
  phone_no: Number;
  avtar: {};
  imageData: String;

  public id: String;

  name1: boolean = true;
  phone1: boolean = true;
  image1: boolean = true;
  link: boolean = false;
  arrProfile: any[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      if (this.id) {
        this.getdata();
      }
    });
  }

  mouseEnter() {
    this.link = true;
  }

  mouseLeave() {
    this.link = false;
  }

  onfileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.avtar = {
          filename: file.name,
          filetype: file.type,
          blobdata: reader.result.split(",")[1]
        };
        this.imageData =
          "data:" + this.avtar.filetype + ";base64," + this.avtar.blobdata;
      };
    }
  }

  getdata() {
    this.userService.getData(this.id).subscribe(profile => {
      this.arrProfile = profile;
      this.imageData = this.arrProfile[0].profile_pic;
    });
  }

  edit1(obj) {
    this.name1 = false;
    this.phone1 = true;
    this.name = obj.name;
    // this.id = obj._id;
  }
  nameEditDone() {
    this.userService
      .updateData({ _id: this.id, name: this.name })
      .subscribe(res => {
        console.log(res);
        this.cancel();
        this.getdata();
      });
  }

  edit2(obj) {
    this.name1 = true;
    this.phone1 = false;
    this.phone_no = obj.phone_no;
    // this.id = obj._id;
  }
  phoneEditDone() {
    if (this.phone_no.toString().length >= 10) {
      this.userService
        .updateData({ _id: this.id, phone_no: this.phone_no })
        .subscribe(res => {
          console.log(res);
          this.cancel();
          this.getdata();
        });
    } else {
      alert("Enter valid no");
    }
  }

  edit3(obj) {
    this.name1 = true;
    this.phone1 = true;
    this.image1 = false;
    // this.id = obj._id;
  }
  imageUpdate() {
    this.userService
      .updateData({ _id: this.id, profile_pic: this.imageData })
      .subscribe(res => {
        console.log(res);
        this.cancel();
        this.getdata();
      });
  }

  cancel() {
    this.name1 = true;
    this.phone1 = true;
    this.image1 = true;
    this.name = "";
    this.phone_no = null;
    this.profile_pic = "";
  }

  ngOnInit() {}
}
