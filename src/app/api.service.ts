import { Injectable } from "@angular/core";
import { RegisterRequestDto } from "./dto/register.request.dto";
import { RegisterResponseDto } from "./dto/register.response.dto";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    constructor(private readonly httpClient: HttpClient) {}

    public async register(
        request: RegisterRequestDto,
    ): Promise<RegisterResponseDto> {
        return firstValueFrom(
            this.httpClient.post<RegisterResponseDto>(
                `${environment.api}/auth/register`,
                request,
            ),
        );
    }
}
