import { Component, ElementRef, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EnumSituacaoConta } from '@app/utils/enums';

@Component({
    selector: 'form-select-situacao-conta',
    templateUrl: './select-situacao-conta.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectSituacaoContaComponent),
            multi: true
        }
    ]
})
export class SelectSituacaoContaComponent implements OnInit, ControlValueAccessor {
    @Input() _readonly: boolean;
    @Input() required: boolean = false;
    _value: any;
    _onChange: any;
    _onTouched: any;

    opcoes = [
        {
            descricao: 'Todos',
            valor: 'todos'
        },
        {
            descricao: 'Em Aberto',
            valor: EnumSituacaoConta.EmAberto
        },
        {
            descricao: 'Pagamento Parcial',
            valor: EnumSituacaoConta.PagamentoParcial
        },
        {
            descricao: 'Pago',
            valor: EnumSituacaoConta.Pago
        }
    ];

    constructor(private injector: Injector, private element: ElementRef) {
        this._onChange = (_: any) => { };
        this._onTouched = (_: any) => { };
        this._readonly = false;
    }

    ngOnInit() { }

    change() { }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    writeValue(obj: any): void {
        this._value = obj;
    }

}
