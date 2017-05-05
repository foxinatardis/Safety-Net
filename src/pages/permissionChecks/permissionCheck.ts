import { Component } from "@angular/core";

@Component({
    selector: "permission-check",
    template: `
        <ion-popover-view>
            <ion-content>
                <p>This app needs permission to access your contacts as well as sms and location services.</p>
            </ion-content>
        </ion-popover-view>
    `,
})
export class PermissionCheckPopover {
    constructor() {  }

}
