import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoParticipanteFesta } from '@app/api/models';
import { AtualizaParticipanteFesta } from '@app/api/models/atualiza-participante-festa';
import { ParticipantesFestaService } from '@app/api/services';
import { IParticipanteFestaResult } from '@app/models/participante-festa-result-interface';
import { EnumLoteFesta, EnumSituacaoPagamentoParticipanteFesta } from '@app/utils/enums';
import { UploadFileService } from '@app/utils/upload-file.service';
import { Utilitarios } from '@app/utils/utils.service';
import { UsuarioLogadoService } from '@common/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'ngbd-modal-form-participantes-festa',
    templateUrl: './form-participantes-modal.component.html',
    styleUrls: ['./form-participantes-modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FormParticipantesFestaNgbdModal implements AfterViewInit {
    public formGroup!: FormGroup;
    public festaId!:number;
    public participanteId!:number;
    public isNew: boolean = true;
    public dadosRegistroFiltrado: any;

    constructor(
        private _modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private _service: ParticipantesFestaService,
        private _toastService: ToastrService
    ) {
        this.formGroup = this._formBuilder.group({
            nome: [null, [Validators.required]],
            valor: [null, [Validators.required]],
            lote: [EnumLoteFesta.Primeiro, [Validators.required]],
            situacao: [EnumSituacaoPagamentoParticipanteFesta.EmAberto, [Validators.required]],
            festaId: [null, [Validators.required]]
        });    
    }

    ngAfterViewInit() {
        this.formGroup.patchValue({festaId: this.festaId});
        if(this.participanteId)   {
            this.loadRegistro(this.participanteId);
        } else {
            this.preparaNovoRegistro();
        }
    }

    private preparaNovoRegistro() {
        this.dadosRegistroFiltrado = {};
        this.isNew = true;
    }

    private loadRegistro(idRegistro: number) {
        this._service.getParticipantesFestaIdFestaFestaId(idRegistro, this.festaId).subscribe((res: any) => {
            if (res) {
                this.isNew = false;
                this.dadosRegistroFiltrado = res;
                this.formGroup.patchValue(this.preparaRegistroParaVisualizacao(this.dadosRegistroFiltrado));
            } else {
                this._toastService.error('Registro para a identifica????o informada n??o foi encontrado!', 'Busca de registro', {
                    timeOut: 3000,
                });
                this.close();
            }
        }, (err: any) => {
            this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inv??lidos!',
                err.error && err.error.error ? err.error.error : 'Cadastro inv??lido', {
                timeOut: 3000,
            });
        });
    }

    private preparaRegistroParaVisualizacao(registro: IParticipanteFestaResult) {
        return {
            nome: registro.nome,
            valor: registro.valor,
            situacao: registro.situacao,
            festaId: registro.festaId,
            lote: registro.lote
        }
    }

    public salvar() {
        if (this.formGroup.valid) {
            if (this.isNew) {
                const body: NovoParticipanteFesta = this.trataDadosParaCadastro();

                this._service.postParticipantesFesta(body).subscribe((res: any) => {
                    if (res) {
                        this._toastService.success('Participante inserido!', 'Cadastro', {
                            timeOut: 3000,
                        });
                    } else {
                        this._toastService.error('Cadastro n??o foi feito!', 'Cadastro', {
                            timeOut: 3000,
                        });
                    }
                    this._modalService.dismissAll('cadastro');
                }, (err: any) => {
                    this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inv??lidos!',
                        err.error && err.error.error ? err.error.error : 'Cadastro inv??lido', {
                        timeOut: 3000,
                    });
                });
            } else {
                const body: AtualizaParticipanteFesta = this.trataDadosParaSalvar();
                this._service.putParticipantesFestaIdFestaFestaId(+this.dadosRegistroFiltrado.id, this.festaId, body).subscribe((res: any) => {
                    if (res) {
                        this._toastService.success('Altera????es salvas!', 'Atualiza????o', {
                            timeOut: 3000,
                        });
                    } else {
                        this._toastService.error('Dados do Participante n??o foram atualizados!', 'Atualiza????o', {
                            timeOut: 3000,
                        });
                    }
                    this._modalService.dismissAll('edicao');
                }, (err: any) => {
                    this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inv??lidos!',
                        err.error && err.error.error ? err.error.error : 'Atualiza????o inv??lida', {
                        timeOut: 3000,
                    });
                });
            }
        } else {
            Utilitarios.validateAllFormFields(this.formGroup);
            this._toastService.error('Por favor preencha corretamente as informa????es', 'Formul??rio inv??lido!', {
                timeOut: 3000
            });
        }
    }

    private trataDadosParaSalvar(): AtualizaParticipanteFesta {
        return {
            nome: this.formGroup.value.nome,
            valor: this.formGroup.value.valor,
            lote: this.formGroup.value.lote && this.formGroup.value.lote.descricao ? 
                this.formGroup.value.lote.valor : this.formGroup.value.lote,
            situacao: this.formGroup.value.situacao && this.formGroup.value.situacao.descricao ?
                this.formGroup.value.situacao.valor : this.formGroup.value.situacao
        }
    }

    private trataDadosParaCadastro(): NovoParticipanteFesta {
        return {
            nome: this.formGroup.value.nome,
            valor: this.formGroup.value.valor,
            lote: this.formGroup.value.lote && this.formGroup.value.lote.descricao ? 
                this.formGroup.value.lote.valor : this.formGroup.value.lote,
            situacao: this.formGroup.value.situacao && this.formGroup.value.situacao.descricao ?
                this.formGroup.value.situacao.valor : this.formGroup.value.situacao,
            festaId: this.formGroup.value.festaId
        }
    }

    close() {
        this._modalService.dismissAll();
    }

}