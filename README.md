# Chronos - Projeto

## Sumário
1. Membro do Grupo 3 
2. Definição do Projeto  
3. Requisitos Técnicos 
4. Requisitos Funcionais 
5. Fluxograma  
6. Prova de conceito
7. Configuração de ambiente
8. Estrutura da aplicação 
9. Processo de Desenvolvimento  
10. Relatos dos Desafios Superados  
11. Entregas  
12. Bônus
13. Conclusão

## Membro do Grupo 3
- Gustavo Rocha - RM365401

## Definição do Projeto
O projeto *Chronos* consiste em uma plataforma de postagem de conteúdo voltada para docentes e alunos, permitindo centralizar informações acadêmicas através possibilitando criar, editar, visualizar e buscar postagens.

## Requisitos Técnicos

- *Desenvolvimento em React Native*  
  - Utilizar React Native para desenvolver a interface gráfica do aplicativo 
  - Utilização de hooks e componentes funcionais

- *Estilização*  
  - Estilizar o projeto de acordo com layout definido pelo grupo

- *Integração com Back-End*  
  - Realizar chamadas aos endpoints REST para obter, criar, editar e excluir posts.
  - Realizar chamadas aos endpoints REST para obter, criar, editar e excluir alunos.
  - Realizar chamadas aos endpoints REST para obter, criar, editar e excluir professores.
  - Realizar chamadas aos endpoints REST para autenticação.
  - Validar permissão para professores e alunos, onde professores podem modificar/criar um post e os alunos podem apenas visualizar
  - Gerenciar o estado da aplicação com ferramentas como Context API ou Redux (opcional).

- *Documentação*  
  - Documentação técnica detalhada do projeto mobile no README do repositório, incluindo setup inicial, arquitetura da aplicação e guia de uso. 

## Requisitos Funcionais
1. *Página principal (Lista de posts)*:
    - Exibir uma lista de todos os posts disponíveis.
    - Cada item da lista deve mostrar o título, autor e uma breve descrição do post.
    - Incluir um campo de busca para filtrar posts por palavras-chave.

2. *Página de leitura de post*:
    - Exibir o conteúdo completo de um post selecionado.
    - Permitir comentários nos posts (opcional).

3. *Página de criação de postagens*:
    - Formulário para que docentes possam criar postagens.
    - Campos para título, conteúdo e autor.
    - Botão para enviar o post ao servidor.

4. *Página de edição de postagens*:
    - Formulário para que os(as) professores(as) possam editar postagens existentes.
    - Carregar os dados atuais do post para edição.
    - Botão para salvar as alterações.

5. *Página de criação de professores*:
    - Formulário para que professores possam cadastrar outros professores.
    - Botão para enviar o post ao servidor.

6. *Página de edição de professores*:
    - Formulário para que professores possam editar docentes já cadastrados.
    - Botão para salvar as alterações

7. *Página de listagem de professores*:
    - Página para listagem paginada dos professores e, nas tabelas para
    cada professor, teremos um botão de editar que leva para a página
    de edição e um botão de excluir que vai deletar o docente do sistema.

8. *Replique os requisitos 5, 6 e 7 para estudantes*:
    - Seguindo o padrão de páginas administrativas feitas para professores, faça o mesmo para alunos.

9. *Página administrativa*:
    - Exibir uma lista de todas as postagens, com opções para editar e excluir cada post.
    - Botões para editar e excluir postagens específicas.

10. *Autenticação e autorização*:
    - Implementar login para professores.
    - Garantir que apenas usuários autenticados possam acessar as páginas de criação, edição e administração de postagens.

## Fluxograma Chronos

### Fluxo da aplicação - Chronos.
Esse diagrama detalha o funcionamento interno da aplicação Chronos, demonstrando estruturação da aplicação e fluxo de informação.

Para o desenvolvimento da aplicação Chronos no ambiente mobile foi utilizado o design arquitetural MVVM. O Projeto segue a mesma arquitetura do projeto front-end desenvolvido na fase anterior (Fase 03). Mantendo os mesmos processos validados migrando apenas a tecnologia, visando os padrões de mercado e desenvolvimento agil devido a integração das tecnologias. O padrão MVVM (Model–View–ViewModel) surge como uma evolução do tradicional MVC (Model–View–Controller) para atender melhor aplicações modernas com interfaces mais dinâmicas, principalmente no contexto de desenvolvimento front-end.

Enquanto o MVC concentra no Controller a responsabilidade de controlar fluxo, manipular dados e atualizar a interface, essa separação pode se tornar limitada conforme a aplicação cresce e exige maior interação entre camadas. Já no MVVM, essa responsabilidade é distribuída de maneira mais clara: a View somente exibe a interface e interage com o usuário, enquanto o ViewModel centraliza toda a lógica da tela e comunicação com os dados. Isso reduz o acoplamento entre camadas e melhora a testabilidade do código.

Outra diferença marcante está no data binding. No MVC, o fluxo de atualização entre modelo e interface geralmente é manual. No MVVM, a View reflete automaticamente qualquer alteração do ViewModel, mantendo estados sincronizados de forma mais fluida — ideal para frameworks modernos como React, Angular e Vue.

1. Modelo: Classifica entidades de forma computacional através de linguagem de programação.

2. Serviço: Responsável por centralizar as chamadas de serviços externos que são definidos por padrões de entrada e saída de dados com base em seus respectivos modelos etapa de pilar fundamental para o MVVM. Trata-se de uma camada auxiliar ao padrão de design arquitetural.

3. ViewModel: Etapa centralizadora responsável por realizar as tratativas lógicas de fluxo de dados de uma determinada tela (View).
 
4. View: Fluxo de apresentação de recepção de dados após contato com o usuário através de componentes visuais ou UI.

<img width="608" height="250" alt="mvvm-fluxo" src="https://github.com/user-attachments/assets/36d027f8-0318-4e55-a526-1fe508016438" />

## Prova de conceito.
Conforme os requisitos técnicos e funcionais do documento formalizado do Tech Challenge da fase 4 do curso de Full Stack Development denominado "6FSDT - Fase 4 - Tech challenge" disponibilizado na plataforma da FIAP, a entrega final do projeto engloba todos os requisitos solicitados nesta fase foram entregues, sendo eles citados acima no tópico 3 (Requisitos Técnicos) e 4 (Requisitos Funcionais) do súmario. A seguir, são relacionados cada tópico com sua respectiva entrega em forma de evidência.

### Requisitos técnicos
1. *Desenvolvimento em React Native*:
  - Utilizar React Native para desenvolver a interface gráfica.  
  - Utilização de hooks e componentes funcionais.  
    - Requisitos funcionais entregues validação da utilização/criação de hooks e contextos através do Context API pode ser validado via arquivo src/contextos/useAutenticacao.tsx

2. *Estilização e responsividade*:
  - Utilizar Styled Components ou outro método de estilização.  
    - Requisito funcional entregue e validado via dispositivos disponivel no EXPO GO. 

3. *Integração com back-end*:
  - Realizar chamadas aos endpoints REST para obter, criar, editar e excluir posts.
  - Realizar chamadas aos endpoints REST para obter, criar, editar e excluir alunos.
  - Realizar chamadas aos endpoints REST para obter, criar, editar e excluir professores.
  - Realizar chamadas aos endpoints REST para autenticação.
  - Validar permissão para professores e alunos, onde professores podem modificar/criar um post e os alunos podem apenas visualizar
  - Gerenciar o estado da aplicação com ferramentas como Context API ou Redux (opcional).
    - Todos os requisitos solicitados foram entregues conforme API desenvolvida e utilizada já nas fases anteriores e incrementadas.
    - Para validação basta acessar os arquivos de modelos que são responsáveis por fazer as requisições, disponivel em: src/servicos

4. *Documentação*:
  - Documentação técnica detalhada do projeto mobile no README do repositório, incluindo setup inicial, arquitetura da aplicação e guia de uso. 
    - Documentação entregue via repositório que pode ser acessado via link: https://github.com/MyNameIsGustavo/TechChallengeFase4

### Requisitos funcionais

#### Seeds.
Para padronizar e facilitar a execução dos testes desenvolvidos, foram criados seeds no banco de dados — ou seja, informações pré-inseridas utilizadas para acelerar o processo de validação. Esses seeds incluem os seguintes usuários e papéis de usuário:

Usuários cadastrados:

- Email: gustavo.professor@fiap.com.br | Senha: docente123

- Email: gustavo.aluno@fiap.com.br | Senha: estudante123

Papéis de usuário disponíveis:

- DOCENTE

- USUARIO

- SUPORTE

1. *Página principal (Lista de posts)*:
    - Exibir uma lista de todos os posts disponíveis.
    - Cada item da lista deve mostrar o título, autor e uma breve descrição do post.
    - Incluir um campo de busca para filtrar posts por palavras-chave.

![feed](https://github.com/user-attachments/assets/6204e8e0-bc43-4e21-9f1b-98c89f8795a6)

2. *Página de leitura de post*:
    - Exibir o conteúdo completo de um post selecionado.
    - Permitir comentários nos posts (opcional).

![listarUnicoAluno](https://github.com/user-attachments/assets/d5f5f517-14e2-4761-bd10-33a93afbc8d8)

3. *Página de criação de postagens*:
    - Formulário para que docentes possam criar postagens.
    - Campos para título, conteúdo e autor.
    - Botão para enviar o post ao servidor.
    - 
![formularioPostagem](https://github.com/user-attachments/assets/d62e5f6d-10ae-42a9-a589-563f7199d2da)

4. *Página de edição de postagens*:
    - Formulário para que os(as) professores(as) possam editar postagens existentes.
    - Carregar os dados atuais do post para edição.
    - Botão para salvar as alterações.

![edicaoPostagem](https://github.com/user-attachments/assets/57568966-76c7-47e6-bf8d-79135da280aa)

5. *Página de criação de professores*:
    - Formulário para que professores possam cadastrar outros professores.
    - Botão para enviar o post ao servidor.

![FormularioCadastroPostagem](https://github.com/user-attachments/assets/4549e71f-81ea-445d-b94a-ae446c2992f1)

6. *Página de edição de professores*:
    - Formulário para que professores possam editar docentes já cadastrados.
    - Botão para salvar as alterações

![editarUsuario](https://github.com/user-attachments/assets/c9963889-923f-45f7-95eb-989c472265fc)

7. *Página de listagem de professores*:
    - Página para listagem paginada dos professores e, nas tabelas para
    cada professor, teremos um botão de editar que leva para a página
    de edição e um botão de excluir que vai deletar o docente do sistema. 

![usuariosGerenciar](https://github.com/user-attachments/assets/8d9a4d02-f8d0-404c-b305-b9bb49f4c9c1)

8. *Replique os requisitos 5, 6 e 7 para estudantes*:
    - Seguindo o padrão de páginas administrativas feitas para professores, faça o mesmo para alunos.

![usuariosGerenciar](https://github.com/user-attachments/assets/fc6a5b24-268a-4ec6-9985-bf4af38a856b)

9. *Página administrativa*:
    - Exibir uma lista de todas as postagens, com opções para editar e excluir cada post.
    - Botões para editar e excluir postagens específicas.

![listagemDePostagemADM](https://github.com/user-attachments/assets/fb038616-6e39-4001-8132-3711a1f3b11e)

Bônus adicionados.


![dash1](https://github.com/user-attachments/assets/f46a44ec-c26a-436f-9364-aa3885be9a49)

Bônus adicionados.


![Dash2](https://github.com/user-attachments/assets/1266554f-2214-4b25-8de5-755a4e6af3af)

10. *Autenticação e autorização*:
    - Implementar login para professores.
    - Garantir que apenas usuários autenticados possam acessar as páginas de criação, edição e administração de postagens.

![login](https://github.com/user-attachments/assets/92fa11d3-0fea-4bf6-b9fe-82d058efa9b7)

## Configuração de ambiente.
Recomenda-se que os pré-requisitos de instalação de tecnologia em seu ambiente de execução sejam os seguintes, listados abaixo. Após verificar as tecnologicas instaladas, siga o procedimento em seguida para inicializar o projeto.

 - NodeJS: 20.19.5
 - Git: 2.43.0

1. Clonar o repositório disponível no GitHub através do link: https://github.com/MyNameIsGustavo/TechChallengeFase4.git

2. Clonar o repositório da fase 2 anterior que se refere ao back-end disponível no GitHub através do link: https://github.com/MyNameIsGustavo?tab=repositories

3. Verificar as instruções de setup inicial disponível no arquivo README.md conforme avaliado e validado na fase anterior.

4. Instalar o Expo Go na playstore para emulação da aplicação em seu dispositivo. Em meu caso, utilizei o OS Android.

5. Criar o arquivo .env com as respectivas informações disponíveis no .env para replicação em ambiente local.

7. Subir o projeto com o comando npx expo start --tunnel, após isso, escanear com o celular no aplicativo do Expo Go para visualizar o projeto desenvolvido.

## Estrutura da aplicação

1. .expo
- Caminho: .expo/
- Responsabilidade: Agrupar as dependências do Expo Go.

2. node_modules
- Caminho: node_modules/
- Responsabilidade: Armazenar o código fonte das bibliotecas instaladas modularmente através do NPM;

3. public
- Caminho: public/
- Responsabilidade: Armazenar arquivos públicos que serão expostos em um projeto de front-end, como por exemplo: imagens e icones.   

4. app/
- Caminho: src/app
- Responsabilidade: Armazenar o códigos-fonte das telas através de nomes mnemônicos.    

5. componentes
- Caminho: src/componentes
- Responsabilidade: Armazenar o códigos-fonte de componentes React do projeto.

6. conexoes
- Caminho: src/conexoes
- Responsabilidade: Define a URL base de requisição da API desenvolvida na fase 02 da pós-tech da FIAP.

7. contexto
- Caminho: src/contexto
- Responsabilidade: Armazenar os contextos do projeto React de front-end através da Context API nativo.

8. enums
- Caminho: src/enums
- Responsabilidade: Define as enums utilizadas para categorizar os papéis do sistema.

9. interfaces
- Caminho: src/interfaces
- Responsabilidade: Armazenar as interfaces do projeto mobile.

10. modelos
- Caminho: src/modelos
- Responsabilidade: Caracterizar de forma computacional e padronizada as entidades do sistema mobile através de solicitações para o back-end.

11. rotas
- Caminho: src/rotas
- Responsabilidade: Gerenciar o roteamento das telas da aplicação mobile do projeto.

12. servicos
- Caminho: src/servicos
- Responsabilidade: Realizar de forma modular a conexão com o serviço back-end do projeto.

13. schemas
- Caminho: src/schemas
- Responsabilidade: Declarar de módulo explicito o módulo de estilização do Bootstap.

14. app.tsx
- Caminho: src/app.tsx
- Responsabilidade: Centralizar os arquivos de entrada do projeto mobile.

15. index.tsx
- Caminho: src/index.tsx
- Responsabilidade: Centralizar os módulos da aplicação do projeto mobile.

16. .env
- Caminho: .env
- Responsabilidade: Variáveis de ambiente de produção do projeto mobile.

17. .gitignore
- Caminho: .gitignore
- Responsabilidade: Arquivo do git para remover arquivos do versionamento de código do projeto mobile.

18. package.json
- Arquivo: package.json
- Responsabilidade: Gerenciamento de dependências e scripts

19. package-lock.json
- Caminho: package-lock.json
- Responsabilidade: Registro das versões instaladas

20. README.md
- Caminho: README.md
- Responsabilidade: Documentação do projeto mobile.

21. tsconfig.json
- Caminho: tsconfig.json
- Responsabilidade: Configuração do TypeScript.

## Processo de Desenvolvimento

### Planejamento das funcionalidades 
O processo de desenvolvimento da Fase 04 da pós-tech em full-stack development na FIAP, focado no desenvolvido mobile, foi orientado pelos aprendizados e eventos das fases anteriores, considerando os pilares já construídos ao longo do curso. O planejamento organizado inicialmente contemplava a entregas solicitadas via requisitos técnicos e funcionais no prazo informado. A experiências da fase anterior, nesta fase, foram relevantes já que o ambiente, tanto back-end quanto front-end já parcialmente desenvolvidos.

Utilizando o back-end desenvolvido previamente, esta etapa concentrou-se na criação de interfaces gráficas no ambiente mobile. Outro aspecto importante considerado durante o desenvolvimento do projeto foi a padronização das cores e da identidade visual da central de ensino fictícia criada, o Chronos.

As tarefas foram organizadas com base nas experiências adquiridas nos projetos das Fases 01, 02 e 03, iniciando pela estruturação da documentação, definição da arquitetura, construção da aplicação e, somente depois, pelo desenvolvimento do código-fonte.

O projeto foi construído tanto para execução de testes e validações de novas features através do Expo Go para a disponibilização da aplicação para usuários. Destaco ainda que o Render possui planos de serviços gratuitos por curtos períodos de tempo e foi considerado para este projeto que a aplicação suprisse esta linha de serviços. Este sem dúvida, foi o ponto crucial da etapa de tempo de desenvolvimento do projeto. O banco de dados PostgreSQL utilizado, por exemplo, ficará disponível em produção até o dia 19/03/2026 conforme alerta exibido na plataforma e anexado neste documento como evidência.

<img width="1915" height="940" alt="bancoDataFinal" src="https://github.com/user-attachments/assets/169656af-eb32-41b7-9a37-7208a81619b7" />

A frequência de esforço empregado para o desenvolvimento das features foram diárias e contínuas para que fosse honrado, primeiramente, os requisitos técnicos e funcionais e posteriormente adicionado novas tecnologias considerando ainda as questões do prazo de desenvolvimento citado acima. 

### Tecnologias e ferramentas 
Todas as tecnologias, ferramentas e padrões de arquitetura utilizados neste projeto foram selecionados com base no conteúdo abordado durante a Fase 04 do curso de Full Stack Development – Pós-Tech. O objetivo foi garantir coerência com os aprendizados teóricos, além de possibilitar a absorção prática e a consolidação do conhecimento adquirido ao longo da fase.

- Node.js – Plataforma de execução JavaScript no servidor.

- Expo Go – Aplicativo para visualização o projeto desenvolvido através do React Native.

- React: Biblioteca principal para construção da interface do usuário por meio de componentes reutilizáveis.

- TypeScript: Adotado para garantir tipagem estática, aumentando a segurança, manutenção e previsibilidade do código.

- React Hook Form: Gerenciar formulários com performance, validação simplificada e mínimo re-render.

- Axios: Realizar requisições HTTP à API, facilitando autenticação, interceptação e tratamento de erros.

- Git: Controlar versões, organizar o histórico de alterações e permitir trabalho colaborativo.

- Render: Plataforma escolhida para hospedagem e deploy automatizado da aplicação em ambiente de produção.

## Relatos dos Desafios Superados
*Gustavo Rocha - RM365401*: Particularmente, já havia desenvolvido o projeto de graduação da faculdade (TCC) em React Native utilizando as mesmas stacks. Portanto, esta fase não apresentou complexidade relevante devido as experiências profissionais e estudantis anteriores. Ainda sim, houve a necessidade de desenvolver o projeto considerando os requisitos técnicos e funcionais especificos da fase. Logo, neste sentido, esta experiência foi bastante enriquecedora para minha trajetória de desenvolvimento na área de Full Stack atuando na migração de tecnologias similares para diferentes ambientes de execução. 

## Entregas

- *Apresentação em vídeo gravado*  
    - Conforme procedimento validado na fase 01, 02, 03 e 04 da pós-tech, o vídeo de apresentação gravado foi disponibilizado na plataforma Youtube para acesso irrestrito dos professores e avaliadores. O vídeo foi gravado com o intuito de apresentar apenas o essencial do projeto para que não ficasse uma apresentação muita longa, sendo complementar com a documentação do projeto. O vídeo pode ser acessado através da seguinte URL: https://youtu.be/aAyrQvyOUPU

- *Código-fonte do projeto*  
    - O código-fonte e a documentação está disponibilizado na plataforma GitHub no repositório do projeto e pode ser acessado através da URL: https://github.com/MyNameIsGustavo/TechChallengeFase4

- *Arquivos utilizados na apresentação*  
    - Todos os arquivos utilizados na apresentação do vídeo serão entregues em forma de evidência neste documento "README.md" do projeto. Durante o processo da apresentação foi criado slides de exemplicação do conteúdo e, está evidência, também será entregue e disponibilizada através da seguinte URL: https://gamma.app/docs/Chronos-Fase-04-qua1xhjydv4w8rn
  
## Bônus

O Tech Challenge desta fase foi identilizado, primeiramente, para entrega dos requisitos obrigatórios da fase. Posteriormente, foi incrementado uma nova etapa para além de entregar todas os requisitos técnicos e funcionais solicitados na quarta etapa da pós-tech da FIAP, também foi entregue features adicionais que já haviam sido complementadas nas fases anteriores.

  - Método HTTP (GET): https://chronos-latest.onrender.com/dashboard/usuarioPorPapel
    - Seleção de usuário com base em suas roles no sistema.
  - Método HTTP (GET): https://chronos-latest.onrender.com/dashboard/usuarioPorPostagem
    - Seleção de relação de usuário por criação de postagem.
  - Método HTTP (GET): https://chronos-latest.onrender.com/dashboard/curtidaPorPostagem
    - Seleção de relação de curtidas por postagem.
  - Método HTTP (GET): https://chronos-latest.onrender.com/dashboard/postagemPorMes
    - Seleção de relação de postagem por mês.

## Conclusão
A fase 04 da pós-tech em Desenvolvimento Mobile representou um desafio significativo, principalmente pela complexidade de lidar com o ecossistema do React Native, assimilar novos conceitos apresentados nas aulas e, ao mesmo tempo, cumprir o prazo de desenvolvimento do projeto. A aplicação foi planejada com foco em boas práticas de arquitetura e organização de código, garantindo uma separação clara de responsabilidades entre componentes, hooks, contextos e camadas de lógica, promovendo maior legibilidade, reutilização e facilidade de manutenção. Conceitos comprovados através deste projeto, já que, existem trechos desenvolvidos em React da fase anterior que foram completamente utilizados neste projeto sem a minima alteração.

Durante o desenvolvimento, utilizei tecnologias e bibliotecas fundamentais do ambiente mobile, como Expo Go, React Native, React Navigation, Context API, além de boas práticas no gerenciamento de estado, tratamento de erros e padronização de componentes visuais. A integração com APIs externas, controle de autenticação e navegação entre telas reforçou conceitos essenciais para a construção de aplicações móveis robustas, performáticas e escaláveis — pilares abordados ao longo desta fase.

Além da funcionalidade principal, tive a preocupação de entregar uma aplicação com boa experiência do usuário, atenção ao design, fluidez na navegação e organização consistente do projeto. Apesar dos desafios enfrentados ao longo do processo, todos os requisitos técnicos foram atendidos com sucesso.


Encerrar esta etapa com uma aplicação mobile funcional, bem estruturada e alinhada às boas práticas do mercado representa um avanço importante na minha evolução como desenvolvedor, trazendo satisfação profissional e maior confiança para os próximos desafios da pós-tech.


