# Visão Geral do Projeto



Uma plataforma web de **descoberta musical com pegada social e gamificada**, construída com **Node.js + TypeScript no backend (inicialmente feito em Bun + Elysia)**  e **React + TypeScript no frontend**.

A ideia central é simples: o usuário descobre músicas interagindo com elas (like / dislike), cria playlists, segue pessoas e artistas e ao mesmo tempo participa de **modos de jogo já implementados**, que transformam a descoberta musical em algo mais envolvente e menos passivo.

Apesar do foco inicial ser simplicidade, o projeto já nasce com uma **arquitetura bem organizada**, pensada para crescer sem virar um código difícil de manter. Tudo aqui foi feito para evoluir, não para ser descartado depois.

---

## Índice

1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [Stack Tecnológica](#stack-tecnológica)
3. [Backend (Node.js + TypeScript)](#backend--nodejs--typescript)
4. [Frontend (React + TypeScript)](#frontend--react--typescript)
5. [Gamificação](#gamificação)
6. [Organização do Código](#organização-do-código)
7. [Design](#design)
8. [Status do Projeto](#status)

---

## Stack Tecnológica

### Backend – Node.js + TypeScript

O backend é construído em **Node.js** utilizando **TypeScript** como linguagem principal.

Principais características:

* **API  com Express**, organizada por módulos
* **Arquitetura baseada em casos de uso**, com controllers finos e regras de negócio isoladas
* **Prisma ORM** para acesso a dados e geração de tipos
* **Injeção de dependências com Tsyringe**, promovendo desacoplamento e testabilidade
* **Validação de dados com Zod**, aplicada em bordas da aplicação
* **Autenticação centralizada**, com middlewares dedicados e uso de Better Auth.
* **Cronjobs** para rotinas automáticas (ex: música do dia)
* **Upload e processamento de arquivos**, com pipeline desacoplado

A estrutura do backend reflete claramente os domínios da aplicação, como usuários, músicas, playlists, artistas, interações sociais e modos de jogo.

---

### Frontend – React + TypeScript

O frontend é desenvolvido com **Vite**, **React** e **TypeScript**, focado em composição de componentes, reutilização de lógica e previsibilidade de estado.

Principais características:

* **Arquitetura baseada em componentes e hooks**
* **Context API** para gerenciamento de estado global 
* **Separação clara entre UI, lógica e efeitos colaterais**
* **Validação de formulários com Zod**, compartilhando contratos conceituais com o backend
* **Animações e transições** para enriquecer a experiência de uso
* **Layouts bem definidos**, permitindo múltiplos fluxos 

A organização do frontend prioriza escalabilidade, com divisão clara entre páginas, componentes reutilizáveis, hooks customizados e camadas de integração.

---

## Organização do Backend

O backend é estruturado por **módulos**, cada um contendo um padrão de:

* Controllers (entrada HTTP)
* Interfaces de repositório
* Implementações de persistência
* Casos de uso (regras de negócio)
* Schemas de validação
* Regras de autorização e domínio

Cada modulo é independente e dependendo de suas necessidades pode apresentar seeds, services etc...

Além disso, há camadas compartilhadas para:

* Autenticação e autorização
* Tratamento de erros
* Normalização de paginação
* Serviços 

Essa abordagem reduz acoplamento entre domínios e facilita a evolução independente de cada módulo.

---

## Organização do Frontend

O frontend segue uma organização orientada à responsabilidade:

* **Pages**: representam rotas e fluxos de navegação
* **Components**: UI reutilizável e específica de domínio
* **Hooks**: encapsulam lógica reutilizável e efeitos colaterais
* **Contexts**: estados globais
* **Actions**: comunicação com o backend
* **Layouts**: definição estrutural das telas

Essa divisão favorece clareza, reuso e manutenção em médio e longo prazo.

---

## Diretrizes Arquiteturais

* Tipagem forte do início ao fim
* Regras de negócio fora da camada de transporte
* Domínios isolados e coesos
* Infraestrutura desacoplada do core
* Facilidade para introdução de novos modos e features

---

## Gamificação

A gamificação **já é parte ativa do projeto**, não apenas uma ideia futura.

Atualmente, o sistema conta com:

* Um modo de jogo independente do fluxo principal da aplicação
* Sessões de jogo persistidas no backend
* Histórico de partidas por usuário
* Score e status de progresso
* Música do dia com controle de repetição e histórico

Esses modos coexistem com a experiência principal sem interferir no core da aplicação, permitindo evoluir a parte de jogos sem quebrar funcionalidades existentes.

---

## Organização do Código

O projeto é dividido por **domínios bem definidos**, tanto no backend quanto no frontend. Cada módulo é responsável por uma parte clara do negócio, evitando acoplamento desnecessário.

Essa organização facilita:

* Evolução incremental
* Testes isolados
* Leitura e entendimento rápido do código
* Inclusão de novas features sem refatorações grandes

---

## Design

🔗 **Figma do projeto:** [https://www.figma.com/design/PuJapnf6vKLD10bG4r4uyJ/Untitled?node-id=0-1&t=5VAWwfZBE7tU5mVW-1](https://www.figma.com/design/PuJapnf6vKLD10bG4r4uyJ/Untitled?node-id=0-1&t=5VAWwfZBE7tU5mVW-1)

> Me considero o dev backend q faz front bonito haha


## Status 

Atualmente o projeto esta em desenvolvimento.




