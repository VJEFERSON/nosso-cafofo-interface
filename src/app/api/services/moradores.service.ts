/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { NovoMorador } from '../models/novo-morador';
import { AtualizaMorador } from '../models/atualiza-morador';
@Injectable({
  providedIn: 'root',
})
class MoradoresService extends __BaseService {
  static readonly postMoradorPath = '/morador';
  static readonly getMoradorPath = '/morador';
  static readonly getMoradorIdPath = '/morador/{id}';
  static readonly putMoradorIdPath = '/morador/{id}';
  static readonly putMoradorAtivarIdPath = '/morador/ativar/{id}';
  static readonly putMoradorDesativarIdPath = '/morador/desativar/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Cadastro de Morador
   *
   * Rota para criação de moradores no sistema.
   * @param body Informações do novo morador
   */
  postMoradorResponse(body: NovoMorador): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/morador`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Cadastro de Morador
   *
   * Rota para criação de moradores no sistema.
   * @param body Informações do novo morador
   */
  postMorador(body: NovoMorador): __Observable<null> {
    return this.postMoradorResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Moradores
   *
   * Rota para consulta de moradores.
   * @param params The `MoradoresService.GetMoradorParams` containing the following parameters:
   *
   * - `offset`: Offset da consulta (para paginação)
   *
   * - `limit`: Limit da consulta (para paginação: máximo de 50 registros por consulta)
   *
   * - `nome`: Nome do morador
   *
   * - `ativo`: Situação do morador. Morador esta ativo?
   *
   * - `apenasMoradoresNaoVinculadosEmUsuario`: Verificar vinculação de Morador a algum Usuário. Morador já está vinculado a algum usuário?
   *
   * - `anoEntrada`: Ano de entrada do morador
   */
  getMoradorResponse(params: MoradoresService.GetMoradorParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.nome != null) __params = __params.set('nome', params.nome.toString());
    if (params.ativo != null) __params = __params.set('ativo', params.ativo.toString());
    if (params.apenasMoradoresNaoVinculadosEmUsuario != null) __params = __params.set('apenasMoradoresNaoVinculadosEmUsuario', params.apenasMoradoresNaoVinculadosEmUsuario.toString());
    if (params.anoEntrada != null) __params = __params.set('anoEntrada', params.anoEntrada.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/morador`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Consulta Moradores
   *
   * Rota para consulta de moradores.
   * @param params The `MoradoresService.GetMoradorParams` containing the following parameters:
   *
   * - `offset`: Offset da consulta (para paginação)
   *
   * - `limit`: Limit da consulta (para paginação: máximo de 50 registros por consulta)
   *
   * - `nome`: Nome do morador
   *
   * - `ativo`: Situação do morador. Morador esta ativo?
   *
   * - `apenasMoradoresNaoVinculadosEmUsuario`: Verificar vinculação de Morador a algum Usuário. Morador já está vinculado a algum usuário?
   *
   * - `anoEntrada`: Ano de entrada do morador
   */
  getMorador(params: MoradoresService.GetMoradorParams): __Observable<null> {
    return this.getMoradorResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Morador Específico
   *
   * Rota para consulta de morador específico pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getMoradorIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/morador/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Consulta Morador Específico
   *
   * Rota para consulta de morador específico pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getMoradorId(id: number): __Observable<null> {
    return this.getMoradorIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Alterar Morador
   *
   * Rota para alteração de morador.
   * @param id Identificador do registro
   * @param body Novas informações do Morador
   */
  putMoradorIdResponse(id: number,
    body: AtualizaMorador): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/morador/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Alterar Morador
   *
   * Rota para alteração de morador.
   * @param id Identificador do registro
   * @param body Novas informações do Morador
   */
  putMoradorId(id: number,
    body: AtualizaMorador): __Observable<null> {
    return this.putMoradorIdResponse(id, body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Ativar Morador
   *
   * Rota para ativação de morador.
   * @param id Identificador do registro
   */
  putMoradorAtivarIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/morador/ativar/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Ativar Morador
   *
   * Rota para ativação de morador.
   * @param id Identificador do registro
   */
  putMoradorAtivarId(id: number): __Observable<null> {
    return this.putMoradorAtivarIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Desativar Morador
   *
   * Rota para desativação de morador.
   * @param id Identificador do registro
   */
  putMoradorDesativarIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/morador/desativar/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Desativar Morador
   *
   * Rota para desativação de morador.
   * @param id Identificador do registro
   */
  putMoradorDesativarId(id: number): __Observable<null> {
    return this.putMoradorDesativarIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module MoradoresService {

  /**
   * Parameters for getMorador
   */
  export interface GetMoradorParams {

    /**
     * Offset da consulta (para paginação)
     */
    offset: number;

    /**
     * Limit da consulta (para paginação: máximo de 50 registros por consulta)
     */
    limit: number;

    /**
     * Nome do morador
     */
    nome?: string;

    /**
     * Situação do morador. Morador esta ativo?
     */
    ativo?: boolean;

    /**
     * Verificar vinculação de Morador a algum Usuário. Morador já está vinculado a algum usuário?
     */
    apenasMoradoresNaoVinculadosEmUsuario?: boolean;

    /**
     * Ano de entrada do morador
     */
    anoEntrada?: number;
  }
}

export { MoradoresService }
