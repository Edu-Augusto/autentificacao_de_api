# autentificacao_de_api
<div class="Header">
        <h2>Autentificação de API com JWT</h2>
        <p>Esta é um pequeno projeto de autentificação de API com JWT.O autentificador gera um token para o usuário logado com sucesso que vale por 48 horas.Para testar a ferramenta, utiliza-se o projeto Api_de_games upado nesse perfil com o arquivo user.js adicionado na pasta database e  com os scripts atualizos com as funcionalidades do JWT.Espero que apreciem este projeto e esperem por projetos mais completos e robustos futuramente.
        <p>Atenciosamente <strong>Eduardo Augusto Oliveira</strong>.</p>
        </p>
        <h3>Lembrete</h3>
        <p>Lembrando que é essencial que siga os passos de instalação do projeto Api_de_games antes de seguir estes, pois o projeto é um complemento do outro.</p>
        <h3>Ferramentas utilizadas e necessárias do projeto</h3>
        <p>A seguir estão os scripts necessários para a execução da autentificação API.Para executa-lo com os resultados esperados,primeiramente abra seu CMD na pasta da API e digite o seguinte script :</p>
        <ol>
            <li>JWT => npm install --save jwtwebtoken</li>     
        </ol>
        <h3>Configuração para inicialização</h3>
        <p>Após a instalação da ferramenta, abra o arquivo index.js e siga as instruções a seguir:</p>
        <ul>
            <li>Vá na rota de criação de usuários e remova o middleware no primeiro momento e crie seu usuário 1, para que ele tenha o controle de acesso e criação de novos usuários no futuro, pois as rotas necessitam de tokens que só são gerados quando o usuário já é cadrastrado no sistema.
                <pre>
                    <code>
                        app.post('/usercreate'(remova esta função >>,"auth",<<) (req, res) => {
                    </code>
                </pre>
                    Após isso pode ativar a função novamente e controlar seu projeto.
            </li>
            <li>Após isso, vá na pasta database e entre no arquivo datbase.js e modifique o seguinte script para a senha e login do seu mysql, que deve ser criado anteriormente:
                <pre>
                    <code>
                        const connection=new Sequelize('api', 'usuário aqui', 'senha aqui',{
                    </code>
                </pre>
            </li>
        </ul>
        <p>Como as rotas não tem arquivo .html renderizado, aconcelho que utilize as rotas com o aplicativo Postman, que faz requisições http e é próprio para adicionar os tokens na requisição.</p>
    </div>
    <div class="Body">
        <h3>Contato</h3>
        <p>Para qualquer dúvida em relação ao projeto ou outros assuntos, entre em contato nas redes sociais a seguir:</p>
        <ol>
            <li><a href="https://www.instagram.com/eduu_augusto/">Instagran</a></li>
            <li><a href="https://www.instagram.com/eduu_augusto/">Linkedin</a></li>
            <li>Email: duduaugustooliveira@gmail.com</li>
        </ol>
    </div>
