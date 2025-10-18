import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatButton } from "@angular/material/button";
import { environment } from "../environments/environment";

@Component({
    selector: "app-root",
    imports: [
        RouterOutlet,
        MatToolbar,
        MatIcon,
        RouterLink,
        RouterLinkActive,
        MatButton,
    ],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss"
})
export class AppComponent {
    protected openDocs(): void {
        window.open(environment.documentation, "_blank");
    }

    protected openSource(): void {
        window.open(environment.sourceCode, "_blank");
    }
}
