import { Component, OnInit } from "@angular/core";
import { UserService } from "../service/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-all-profile",
  templateUrl: "./all-profile.component.html",
  styleUrls: ["./all-profile.component.scss"]
})
export class AllProfileComponent implements OnInit {
  arrTable: any[] = [];
  constructor(private userService: UserService, private router: Router) {
    this.getData();
  }

  getData() {
    this.userService.getProfile().subscribe(data => {
      console.log(data);
      this.arrTable = data;
      console.log("arrtable");
      console.log(this.arrTable);
    });
  }
  ngOnInit() {}
}
