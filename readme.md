## Visão Geral

Aplicação web de descoberta musical no estilo **Tinder**, onde o usuário interage com músicas por meio de **aprovação (like)** ou **rejeição (dislike)**. A partir dessas interações, o sistema constrói um **perfil de preferências por gênero**, utilizado para recomendações futuras.

Esse Projeto tambem será uma plataforma estilo Spotify com playlist musicas etc... ( gamificada no futuro)

O foco inicial é simplicidade, porém com uma base **bem estruturada e escalável**.

---

## Funcionalidades Principais

### Descoberta de Músicas

- Interface de swipe (aprovar / rejeitar)
- Cada música possui:
  - Gênero
  - Preview de áudio
  - Letra sincronizada com o tempo atual do preview

---

### Sistema de Preferências (Score por Gênero)

- Cada usuário possui um **score por gênero musical**
- Todos os gêneros iniciam com um **valor arbitrário padrão** (definido posteriormente)

**Regras:**

- Aprovação de música → `score[gênero] += 1`
- Rejeição de música → `score[gênero] -= 1`

Esse score será utilizado para:

- Recomendação de músicas
- Ordenação/priorização do feed

---

## Usuários e Perfis

### Roles do Sistema

- `USER`
- `ARTIST`
- `ADMIN`

Cada role possui permissões e visualizações distintas.

---

### Perfil de Usuário (USER)

Exibe:

- Playlists públicas
- Followers
- Following

Funcionalidades:

- Criar playlists vazias
- Criar playlists já com uma música inicial
- Ordenação de playlists
- Definir visibilidade da playlist:

  - Pública
  - Privada

> A visibilidade pode ser alterada tanto na criação quanto posteriormente.

---

### Perfil de Artista (ARTIST)

Exibe:

- Músicas publicadas
- Followers
- Following
- Aba "Sobre"

Possível extensão futura:

- Exibir músicas relacionadas por gênero

---

## Playlists e Categorias

### Playlists

- Podem existir sem músicas
- Podem ser públicas ou privadas
- São exibidas no perfil do usuário

---

### Categorias Criadas por Usuários

- Usuário pode criar categorias personalizadas
- Categoria pode possuir:

  - Nome
  - Foto

**Regra de segurança (inicial):**

- Ao visualizar o perfil de outro usuário, a imagem da categoria será substituída por um **mock padrão**
- Motivo: evitar exibição de imagens impróprias, já que não há moderação ou algoritmo de detecção inicial

---

## Artistas e Músicas

### Artistas

- Músicas fazem referência direta ao `artistId`

### Músicas

- CRUD **não é responsabilidade do artista**
- Apenas usuários com role `ADMIN` podem:

  - Criar
  - Editar
  - Remover músicas

---

## Funcionalidades Futuras (Planejadas)

- Favoritar artista
- Seguir artista
- Notificações quando um artista publicar nova música

---

## Princípios do Projeto

- Começar simples
- Arquitetura preparada para escalar
- Separação clara de responsabilidades (roles)
- Evolução incremental das funcionalidades

---

---

---

## Ideias Adicionais (Podem não ser implementadas agora (apesar de que estou hypado com a gamificação))

### Gamificação (Modo Alternativo)

Modo separado da experiência principal .

Características:

- Nome do artista oculto
- Nome da música oculto
- Cover da música revelado gradualmente conforme o tempo da música

Objetivo:

- Usuário tentar adivinhar a música
- Gera um **score próprio de gamificação**
- Score pode ou não ser exibido no perfil (configurável)

> Esse modo possui identidade visual e fluxo diferentes do modo principal.

---

### Música do Dia (Gamificação)

- Uma música única é selecionada por dia
- Backend executa um **cronjob diário** para definir a música do dia

Regras:

- Uma música só pode ser usada **uma única vez** como música do dia
- Não é permitido repetir músicas em dias consecutivos

- Antes de selecionar a música do dia:
  - Verificar se já foi utilizada
  - Excluir da lista de possibilidades

---

### Backend e Consistência

- Preferências do usuário são **mantidas no backend**
- Garante consistência entre dispositivos
- Front atua apenas como consumidor dessas preferências

---

## Observação Geral

- Todas essas ideias são opcionais
- O projeto pode nascer simples e evoluir sem refatorações destrutivas
- A estrutura deve permitir ativar/desativar modos sem impactar o core do sistema
