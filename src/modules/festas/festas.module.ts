/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FestasTableService } from './containers/festas-list/festas-table.service';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { ChartsModule } from '@modules/charts/charts.module';
import { TablesModule } from '@modules/tables/tables.module';

/* Components */
import * as pageComponents from './components';

/* Containers */
import * as pageContainers from './containers';

/* Guards */
import * as guard from './guards';
import { ParticipantesFestasTableService } from './containers/participantes-festas-list/participantes-festas-table.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        ChartsModule,
        TablesModule
    ],
    providers: [
        FestasTableService,
        ParticipantesFestasTableService,
        ...guard.guards
    ],
    declarations: [...pageContainers.containers, ...pageComponents.components],
    exports: [...pageContainers.containers, ...pageComponents.components],
    entryComponents: [...pageComponents.components]
})
export class FestasModule { }