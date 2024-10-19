import { Component } from "@angular/core";
import {
    MatFormField,
    MatLabel,
    MatSuffix,
} from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import {
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
} from "@angular/material/card";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatDivider } from "@angular/material/divider";
import { NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiService } from "../api.service";
import { environment } from "../../environments/environment";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";

@Component({
    selector: "app-register",
    standalone: true,
    imports: [
        MatIcon,
        MatFormField,
        MatInput,
        MatLabel,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatCardSubtitle,
        MatButton,
        MatDivider,
        MatSuffix,
        NgIf,
        FormsModule,
        CdkTextareaAutosize,
    ],
    templateUrl: "./register.component.html",
    styleUrl: "./register.component.scss",
})
export class RegisterComponent {
    protected registered: boolean = false;
    protected clusterId: string = "";
    protected config: string = "";

    public constructor(
        private readonly apiService: ApiService,
        private readonly matSnackBar: MatSnackBar,
    ) {}

    protected canRegister(): boolean {
        return !this.registered && this.clusterId.length > 0;
    }

    protected async register(): Promise<void> {
        try {
            const cluster = await this.apiService.register({
                id: this.clusterId,
            });
            this.generateConfig(
                cluster.id,
                cluster.secret,
                environment.api.replace("http", "ws"),
            );
            this.registered = true;
            this.matSnackBar.open("Cluster successfully Registered", "Close", {
                duration: 1000,
            });
        } catch (error) {
            const errorData = error as {
                statusText?: string;
                error?: { message: string };
            };
            const message =
                errorData.error?.message ||
                errorData.statusText ||
                "Unknown error";
            this.matSnackBar.open(
                `Failed to register cluster: ${message}`,
                "Close",
                {
                    duration: 5000,
                },
            );
        }
    }

    protected async copyConfig(): Promise<void> {
        await navigator.clipboard.writeText(this.config);
        this.matSnackBar.open("Configuration copied to clipboard", "Close", {
            duration: 1000,
        });
    }

    private generateConfig(
        clusterId: string,
        clusterSecret: string,
        apiUrl: string,
    ): void {
        this.config = [
            "[CloudStorage]",
            `ID="${clusterId}"`,
            `Secret="${clusterSecret}"`,
            `URL="${apiUrl}"`,
        ].join("\n");
    }
}
