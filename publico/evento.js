const formBanda = document.getElementById('formBanda');
formBanda.onsubmit = validarCampos;
const enderecoAPI = 'http://localhost:4000/eventos';
buscarAsBandas();

var motivoAcao = "CADASTRAR";

function gravarBanda(){
    const objetoBanda={
    nome:         document.getElementById('nome').value,
    data:         document.getElementById('data').value,
    local:        document.getElementById('local').value,
    horario:      document.getElementById('horario').value,
    preco:        document.getElementById('preco').value,
    descricao:    document.getElementById('descricao').value,
    ingressosdisponiveis:  document.getElementById('ingressosdisponiveis').value,
    }
    fetch(enderecoAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoBanda)
    }).then((resposta) => {
        return resposta.json();
    }).then((resultadoAPI) =>{
        if (resultadoAPI.status == true){
            exibirMensagem(resultadoAPI.mensagem, 'blue');
        }
        else {
            exibirMensagem(resultadoAPI.mensagem, 'red');
        }

    }).catch((erro) => {
        exibirMensagem(erro, 'orange');
    });

}

function selecionarEvento(nome, data, local, horario, preco, descricao, ingressosdisponiveis, motivo) {
    document.getElementById('nome').value = nome;                     
    document.getElementById('data').value = data;
    document.getElementById('local').value = local;
    document.getElementById('horario').value = horario;
    document.getElementById('preco').value = preco;
    document.getElementById('descricao').value = descricao;
    document.getElementById('ingressosdisponiveis').value = ingressosdisponiveis;

    motivoAcao = motivo;
    const botaoConfirmacao = document.getElementById('botaoConfirmacao');
    if (motivoAcao == 'EDITAR') {
        botaoConfirmacao.innerHTML = 'EDITAR';
    } else if (motivoAcao == 'EXCLUIR') {
        botaoConfirmacao.innerHTML = 'EXCLUIR';
    }
}

function excluirBanda() {
    fetch(enderecoAPI, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome: document.getElementById('nome').value})
    }).then((resposta) => {
        return resposta.json();
    }).then((resultadoAPI) => {
        if (resultadoAPI.status === true) {
            exibirMensagem(resultadoAPI.mensagem, 'blue');
        } else {
            exibirMensagem(resultadoAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, 'orange');
    });
}

function atualizarBanda() {
    const objetoBanda = {
        nome: document.getElementById('nome').value,      
        data: document.getElementById('data').value,      
        local: document.getElementById('local').value,       
        horario: document.getElementById('horario').value,       
        preco: document.getElementById('preco').value,
        descricao: document.getElementById('descricao').value,
        ingressosdisponiveis: document.getElementById('ingressosdisponiveis').value
    };

    fetch(enderecoAPI, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoBanda)
    }).then((resposta) => {
        return resposta.json();
    }).then((resultadoAPI) => {
        if (resultadoAPI.status == true) {
            exibirMensagem(resultadoAPI.mensagem, 'blue');
        } else {
            exibirMensagem(resultadoAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, 'orange');
    });
}


function buscarAsBandas(){fetch(enderecoAPI, {method:'GET'})
    .then((resposta) => {
    return resposta.json();
})
    .then((respostaAPI) => {
      if (respostaAPI.status == true) {
        exibirtabelaBandas(respostaAPI.listaEventos);
    }
      else{
        exibirMensagem(respostaAPI.mensagem, 'red');
    }
   
    }).catch((erro) => {
       exibirMensagem(erro, 'orange');
    });

}
    

function validarCampos(evento) {
    const nome = document.getElementById('nome').value;                     
    const data = document.getElementById('data').value;
    const local = document.getElementById('local').value;
    const horario = document.getElementById('horario').value;
    const preco = document.getElementById('preco').value;
    const descricao = document.getElementById('descricao').value;
    const ingressosdisponiveis = document.getElementById('ingressosdisponiveis').value;

    evento.stopPropagation();
    evento.preventDefault();    
    
    // Verifica se todos os campos obrigatórios foram preenchidos
    if (nome && data && local && horario && preco && descricao && ingressosdisponiveis) {
        if (motivoAcao == "CADASTRAR") {
            gravarBanda();
        } else if (motivoAcao == "EDITAR") {
            atualizarBanda();
            motivoAcao = "CADASTRAR";
        } else if (motivoAcao == "EXCLUIR") {
            excluirBanda();
            motivoAcao = "CADASTRAR";
        }

        formBanda.reset();
        buscarAsBandas();  
        return true;
    } else {
        exibirMensagem('Por favor, preencha todos os campos do cadastro do evento.');
        return false;
    }
}

function exibirMensagem(mensagem, cor = 'black') {
    const divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = "<p style='color:" + cor + ";'>" + mensagem + "</p>";
    setTimeout(() => {
        divMensagem.innerHTML = "";
    }, 5000);
}

function exibirtabelaBandas(listaEventos) {
    if (listaEventos.length > 0) {
        const espacoTabela = document.getElementById('containerTabela');
        const tabela = document.createElement('table');
        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
            <tr>
                <th>NOME</th>
                <th>DATA</th>
                <th>LOCAL</th>
                <th>HORARIO</th>
                <th>PRECO</th>
                <th>DESCRICAO</th>
                <th>INGRESSOS DISPONIVEIS</th>
                <th>AÇÕES</th>
            </tr>          
        `;
        const corpo = document.createElement('tbody');
        for (const evento of listaEventos) {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${evento.nome}</td>
                <td>${evento.data}</td>
                <td>${evento.local}</td>
                <td>${evento.horario}</td>
                <td>${evento.preco}</td>
                <td>${evento.descricao}</td>
                <td>${evento.ingressosdisponiveis}</td>
                <td>
                    <button onclick="selecionarEvento('${evento.nome}','${evento.data}','${evento.local}','${evento.horario}','${evento.preco}','${evento.descricao}','${evento.ingressosdisponiveis}','EDITAR')">Alterar</button>
                    <button onclick="selecionarEvento('${evento.nome}','${evento.data}','${evento.local}','${evento.horario}','${evento.preco}','${evento.descricao}','${evento.ingressosdisponiveis}','EXCLUIR')">Excluir</button>
                </td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(cabecalho);
        tabela.appendChild(corpo);
        espacoTabela.innerHTML = "";
        espacoTabela.appendChild(tabela);
    } else {
        exibirMensagem('Nenhum evento foi encontrado.');
    }
}
