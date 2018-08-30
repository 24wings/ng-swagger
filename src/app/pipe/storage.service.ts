import { Injectable } from "@angular/core";

@Injectable()
export class StorageService {
    get host() {
        return localStorage.getItem('host');
    }
}