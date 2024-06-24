
# Sistema de Emblemas Cidade Alta


# Inicializando o projeto

Para iniciar o projeto, deve-se seguir atentamente os passos abaixo:

1. Clone o repositórrio
2. Entre na pasta do projeto
3. Rode o comando "npm install" para instalar as dependências. Atente-se para a versão do nodejs utilizada no projeto

4. Crie um arquivo .env no padrão do arquivo .env.example disponibilizado e altera as conexões com o banco de dados (MySQL2)
5. Crie um banco de dados com o mesmonome definido em DATABASE no arquivo .env criado.
6. Rode a migration do banco com o comando "npm run migration:run"
7. Para subir o servidor, digite "npm run start:dev" ou outro comando definido na seção "scripts" do package.json
8. Acesse a documentação da Api feita com Swagger no endereço http://localhost:3000/api


# Como utilizar a api

1. As rotas possuem autenticação do tipo JWT. Para ser possível chamar as rotas, primeiramente um usuário deverá ser criado. Faça uma requsição através do swagger na rota /users seguindo o body definido na documentação.
2. Faça o login por meio da chamada da rota /auth/login passando como body os dados de email e senha do usuário criado (OBS: após a criação do usuário, sua senha criptografada é retornada propositalmente, a fim de facilitar a validação do sistema de forma mais rápida)
3. Após chamar a rota de login, um token deverá ser retornado pelo servidor. Copie este token, acesse o botão "Authorize" no topo da página do Swagger e cole-o no campo de texto que aparecer e salve.


# Populando o banco com informações cruciais para o uso da api

Para facilitar a correção e validação, disponibilizei uma rota para popular o banco de dados com categorias de emblemas e os emblemas fornecidos no github. Atente-se para a sequência:

1. Chame a rota /badge-categories/populate para carregar automaticamente as categorias.
2. Chame a rota /badges/populate para carregar automaticamente os emblemas.


Todos os passos seguidos, o ambiente está pronto e funcional para ser testado.