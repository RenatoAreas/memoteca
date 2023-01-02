import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamentos',
  templateUrl: './criar-pensamentos.component.html',
  styleUrls: ['./criar-pensamentos.component.css']
})
export class CriarPensamentosComponent implements OnInit {

  formulario!: FormGroup

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.formulario = this.formBilder.group({
      conteudo:['Formulário Reativo'],
      autoria:['Angular'],
      modelo:['modelo1']
    })
  }

  criarPensamento(){
    this.service.criar(this.formulario.value).subscribe(() => {
      this.router.navigate(['/listarPensamento'])
    })
  }

  cancelarPensamento(){
    alert("Todos os dados digitador até aqui não serão salvos. Tem certeza que deseja sair ?")
    this.router.navigate(['/listarPensamento'])
  }

}
