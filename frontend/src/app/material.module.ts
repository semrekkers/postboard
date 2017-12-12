import { NgModule } from '@angular/core';

import {MatButtonModule, MatCheckboxModule, MatButton, MatCheckbox} from '@angular/material';

const usedModules = [
    MatButtonModule,
    MatCheckboxModule
];

// @NgModule({
//   imports: [MatButtonModule, MatCheckboxModule],
//   exports: [MatButtonModule, MatCheckboxModule],
// })

@NgModule({
    imports: usedModules,
    exports: usedModules
})

export class MaterialComponentsModule { }