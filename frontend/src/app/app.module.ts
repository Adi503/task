import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AddProfileComponent } from "./add-profile/add-profile.component";
import { ShowProfileComponent } from "./show-profile/show-profile.component";
import { AllProfileComponent } from "./all-profile/all-profile.component";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "./service/user.service";

@NgModule({
  declarations: [
    AppComponent,
    AddProfileComponent,
    ShowProfileComponent,
    AllProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
