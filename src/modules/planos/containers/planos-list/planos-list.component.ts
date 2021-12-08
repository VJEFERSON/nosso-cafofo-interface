import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { PlanosService } from '@app/api/services';
import { IFiltroPlanos } from '@app/models/search-planos';
import { mapTiposPlanos } from '@app/utils/consts';
import { FiltrosPlanosNgbdModal } from '@modules/planos/components';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Country } from '@modules/tables/models';
import { Observable } from 'rxjs';
import { PlanoTableService } from './plano-table.service';

@Component({
    selector: 'sb-planos',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './planos-list.component.html',
    styleUrls: ['./planos-list.component.scss'],
})
export class PlanosComponent implements OnInit {
    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;
    @ViewChild('modalFiltros', { static: true }) modalFiltros: FiltrosPlanosNgbdModal | any;

    private routeCadastroPlanos: string = '/planos/cadastro';
    private routeEdicaoPlanos: string = '/planos/edicao';
    public mapTiposPlanos = mapTiposPlanos;
    public pageSize = 2;
    public registros$!: Observable<Country[]>;
    public total$!: Observable<number>;
    public sortedColumn!: string;
    public sortedDirection!: string;
    public filtros!: IFiltroPlanos;

    constructor(
        public serviceTable: PlanoTableService,
        private readonly _planosService: PlanosService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router
    ) { }

    ngOnInit() {
        this.serviceTable.pageSize = this.pageSize;
        this.registros$ = this.serviceTable.registros$;
        this.total$ = this.serviceTable.count$;
        this.filtros = this.serviceTable.state;
    }

    onSort({ column, direction }: SortEvent) {
        this.sortedColumn = column;
        this.sortedDirection = direction;
        this.serviceTable.sortColumn = column;
        this.serviceTable.sortDirection = direction;
        this.changeDetectorRef.detectChanges();
    }

    abrirModalFiltrar() {
        this.modalFiltros.open();
    }

    filtrar() {
        this.serviceTable._set(this.filtros);
    }

    editar(idRegistro: number) {
        this.router.navigate([this.routeEdicaoPlanos, { id: idRegistro }]);
    }

}