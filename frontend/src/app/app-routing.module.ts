import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddProfileComponent } from "./add-profile/add-profile.component";
import { ShowProfileComponent } from "./show-profile/show-profile.component";
import { AllProfileComponent } from "./all-profile/all-profile.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: AddProfileComponent },
  { path: "show-profile", component: ShowProfileComponent },
  { path: "show-profile/:id", component: ShowProfileComponent },
  { path: "all-profile", component: AllProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
