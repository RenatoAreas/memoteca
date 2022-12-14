import { Pensamento } from './pensamento';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos';

  constructor(private httpCliente: HttpClient) {}

  listar(pagina: number, filtro: string, favoritos: boolean): Observable<Pensamento[]> {
    const itensPorPagina = 6;

    let params = new HttpParams()
      .set('_page', pagina)
      .set('_limit', itensPorPagina);

    if (filtro.trim().length > 2) {
      params = params.set('q', filtro);
    }

    if(favoritos){
      params = params.set('favorito', true)
    }

    return this.httpCliente.get<Pensamento[]>(this.API, { params: params });
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.httpCliente.post<Pensamento>(this.API, pensamento);
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    return this.editar(pensamento);
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito;
    const url = `${this.API}/${pensamento.id}`;
    return this.httpCliente.put<Pensamento>(url, pensamento);
  }

  excluir(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.httpCliente.delete<Pensamento>(url);
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.httpCliente.get<Pensamento>(url);
  }
}
