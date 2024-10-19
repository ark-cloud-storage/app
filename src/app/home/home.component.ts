import { Component } from "@angular/core";
import { environment } from "../../environments/environment";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent {
    protected documentation = environment.documentation;
}
