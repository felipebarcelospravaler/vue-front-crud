<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Amar Assist - Contatos</a>
      </div>
    </nav>

    <div class="container">


      <ul>
        <li v-for="(erro, index) of erros" :key="index">
          <b>{{ erro[0] }}</b>
        </li>
      </ul>

      <form @submit.prevent="salvar">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="contato.nome">
          <label>E-mail</label>
          <input type="text" placeholder="E-mail" v-model="contato.email">
          <label>Telefone</label>
          <input type="number" placeholder="Telefone" v-model="contato.telefone">

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th>TELEFONE</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="contato of contatos" :key="contato.id">

            <td>{{ contato.nome }}</td>
            <td>{{ contato.email }}</td>
            <td>{{ contato.telefone }}</td>
            <td>
              <button @click="editar(contato)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(contato)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

 import Contatos from './services/contatos'

export default {
    data(){
      return {
        contato: {
          id: '',
          nome: '',
          telefone: '',
          email: ''
        },
        contatos: [],
        erros: []
      }
    },

    mounted(){
      this.listar()  
    },

    methods: {
      listar(){
        Contatos.listar().then(resposta => {
          this.contatos = resposta.data.data
        })
      },

      salvar(){

        if(!this.contato.id){
          Contatos.salvar(this.contato).then(resposta => {
            this.contato = {}
            this.erros = {}
            alert(resposta.data.message)
            this.listar()
          }).catch(e => {
            this.erros = e.response.data.data
          })
        }else{
          Contatos.atualizar(this.contato).then(resposta => {
            this.contato = {}
            this.erros = {}
            alert(resposta.data.message)
            this.listar()
          }).catch(e => {
            this.erros = e.response.data.data
          })
        }
        
      },

      editar(contato){
        this.contato = contato
      },

      remover(contato){
        if(confirm('Deseja exluir o contato?')){
          Contatos.deletar(contato).then(resposta => {
            this.contato = {}
            this.erros = {}
            alert(resposta.data.message)
            this.listar()
          }).catch(e => {
            this.erros = e.response.data.data
          })
        }
      }
    }
 }

</script>

<style>

</style>
