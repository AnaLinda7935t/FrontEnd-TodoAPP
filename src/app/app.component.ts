 import { Component } from '@angular/core';
import { Tarefa } from "./tarefa";
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TODOapp';

  arrayDeTarefas: Tarefa[] = [];
  apiURL : string;

  constructor(private http: HttpClient) {
    this.apiURL = 'https://back-todoapp-bxaw.onrender.com';
    this.READ_tarefas();
  }

  ngOnInit() {
    this.READ_tarefas();
    console.log("ngOnInit chamado, carregando tarefas...");
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa).subscribe(
    resultado => { console.log(resultado); this.READ_tarefas(); });
     
  }   

  READ_tarefas() {

    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`, { headers }).subscribe(
    resultado => this.arrayDeTarefas=resultado);
  }

  DELETE_tarefa(tarefaAserRemovida: Tarefa)
  {
    var indice = this.arrayDeTarefas.indexOf(tarefaAserRemovida);
    var id = this.arrayDeTarefas[indice]._id;
    this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`).subscribe(
    resultado => { console.log(resultado); this.READ_tarefas(); });

  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    var indice = this.arrayDeTarefas.indexOf(tarefaAserModificada);
    var id = this.arrayDeTarefas[indice]._id;
    this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`,
    tarefaAserModificada).subscribe(
    resultado => { console.log(resultado); this.READ_tarefas(); });
   }

   onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'F5') {
      event.preventDefault();
      this.READ_tarefas();
      console.log("Chamado keyup chamado, carregando tarefas...");
    }
  }
   
}


