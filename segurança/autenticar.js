export default function autenticar(requisicao, resposta){
    const usuario = requisicao.body.nome;
    const senha   = requisicao.body.senha;
    if (usuario == 'nuno' && senha == '12345'){
        requisicao.session.autenticado = true;
        resposta.redirect('/pagInicial.html');
    }
    else{
        resposta.write('<html>');
        resposta.write('<head>');
        resposta.write('<title>Login inválido</title>');
        resposta.write('<meta charset="utf-8">');
        resposta.write('</head>');
        resposta.write('<body>')
        resposta.write('<p> Usuáro ou senha inválidos. Tente novamente.</p>');
        resposta.write('<a href="/login.html">Voltar para a tela de login');
        resposta.write('</body>')
        resposta.write('</html>')
        resposta.end();
    }
        
}

export function verificarautenticacao(requisicao, resposta, executar){
    if(requisicao.session.autenticado != undefined && requisicao.session.autenticado) {
        executar();
    }
    else
    {
        resposta.redirect('/login.html');
    }
}
