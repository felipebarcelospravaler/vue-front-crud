import { http } from './config'

export default {
    listar:() => {
        return http.get('contatos')
    },

    salvar:(contato) => {
        return http.post('contatos', contato)
    },

    atualizar:(contato) => {
        return http.put('contatos/'+contato.id, contato)
    },

    deletar:(contato) => {
        return http.delete('contatos/'+contato.id, {data: contato})
    }
}