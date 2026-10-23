# Testes de API - Contratos com API Pública (DummyJSON)

Testes de integração e contrato de API pública (https://dummyjson.com/docs), com Playwright e JavaScript, no padrão Page Object aplicado a APIs (Service Object).

![Testes](https://img.shields.io/badge/testes-55%20passando-brightgreen)
![Playwright](https://img.shields.io/badge/Playwright-contract%20testing-2EAD33)
![Page Object](https://img.shields.io/badge/padr%C3%A3o-Page%20Object-blueviolet)
![CI](https://img.shields.io/badge/CI-GitHub%20Actions-blue)

## 🚀 Como Começar

```bash
# 1. Clone o repositório
git clone https://github.com/moiseschiaretto/NOME-DO-REPO.git
cd NOME-DO-REPO

# 2. Instale as dependências
npm install
npx playwright install --with-deps chromium

# 3. Configure o ambiente
cp .env.example .env

# 4. Execute os testes (recomendado)
npm run test:refresh-token  # Atualiza o token + executa os testes

# Ou execute separadamente:
npm run refresh-token  # Só atualiza o token
npm run test           # Só executa os testes
```

Relatório HTML: `npx playwright show-report`

## Relatório Allure

```bash
npm run test:allure   # roda os testes + gera o relatório
npm run allure:open    # sobe um servidor local e abre o relatório no navegador
```

(gera os dados e o relatório final via `allure-commandline`, sem precisar instalar o Allure no sistema)

> ⚠️ **Não abra `allure-report/index.html` direto no navegador** (duplo clique / `file://`). O Allure carrega os dados via requisições JS, que o Chrome/Firefox bloqueiam por segurança quando o arquivo é aberto localmente sem servidor. Use sempre:
> ```bash
> npm run allure:open
> ```
> Isso sobe um servidor local e abre o relatório completo, com todos os dados carregando corretamente.

Comandos individuais, se preferir rodar por etapas:

```bash
npm run allure:clean      # limpa allure-results/ e allure-report/
npm run test               # gera allure-results/
npm run allure:generate   # gera o HTML a partir dos resultados
npm run allure:open        # serve e abre o relatório
```

---

## 📸 Resultados de execução

**Execução via terminal (VSCode) — 55 testes passando:**

![Execução dos testes no terminal](docs/screenshots/execucao-testes-terminal.png)

**Relatório Allure — Visão geral (100% de sucesso):**

![Visão geral do relatório Allure](docs/screenshots/allure-relatorio-visao-geral.png)

**Relatório Allure — Suítes (cenários organizados por endpoint/método/status):**

![Suítes do relatório Allure](docs/screenshots/allure-suites.png)

**Relatório Allure — Pacotes por recurso:**

![Pacotes do relatório Allure](docs/screenshots/allure-pacotes.png)

**Relatório Allure — Gráficos (status, gravidade e duração):**

![Gráficos do relatório Allure](docs/screenshots/allure-graficos.png)

---

## Por que uma API pública?

Este projeto reproduz, com dados públicos, o mesmo padrão de arquitetura usado em projetos reais de automação: separação entre configuração, serviços (Page Object), utilitários genéricos, fixtures de contrato e testes organizados por recurso/método/status.

## Padrão Page Object aplicado a APIs (Service Object)

Os testes não montam as requisições. Cada recurso da API tem uma classe de serviço, que sabe montar as chamadas daquele recurso. O teste só informa o que muda de um cenário para outro: o id, o corpo, o status esperado e a pasta do log.

**`BaseService`** (`src/services/BaseService.js`) concentra o envio das requisições (chamando o `makeRequest`) e os métodos HTTP comuns a todos os recursos, escritos uma única vez:

| Método | HTTP | Endpoint | O que faz |
|---|---|---|---|
| `post` | POST | `/{recurso}/add` | Cria um registro novo |
| `getAll` | GET | `/{recurso}` | Consulta todos os registros |
| `getId` | GET | `/{recurso}/{id}` | Consulta um registro específico |
| `putId` | PUT | `/{recurso}/{id}` | Atualiza um registro específico |
| `patchId` | PATCH | `/{recurso}/{id}` | Atualiza só os campos enviados |
| `deleteId` | DELETE | `/{recurso}/{id}` | Exclui um registro específico |

**Um serviço por recurso**, herdando direto do `BaseService` (um único nível de herança). Cada serviço informa os seus endpoints e escreve só os métodos exclusivos do recurso:

| Serviço | Métodos exclusivos |
|---|---|
| `AuthService` | `postLogin`, `getMe` |
| `ProductService` | `getSearch`, `getCategories`, `getByCategory` |
| `UserService` | `getSearch` |
| `CartService` | `getByUser` |
| `PostService` | `getByUser` |
| `TodoService` | `getRandom` |
| `QuoteService` | `getRandom` (recurso só de consulta) |
| `RecipeService` | `getSearch` (recurso só de consulta) |
| `CommentService` | nenhum, usa só o CRUD do `BaseService` |

**Como o teste usa o serviço:**

```javascript
// Cria o serviço de produtos, que sabe montar as chamadas desse recurso
const productService = new ProductService(request);

// Consulta o produto de id 1 e confere o status 200
const {
    responseData
} = await productService.getId({
    id: 1,
    expectedStatus: 200,
    saveResponseLog: folderPath
});
```

**Manutenção quando a API muda:**

- caminho do endpoint alterado → ajuste somente a constante em `src/config/endpoints.js`;
- método HTTP ou autenticação alterados → ajuste somente o método no serviço;
- dados enviados alterados → ajuste somente o JSON Request na pasta `request`;
- contrato da resposta alterado → ajuste somente o JSON Response em `resources/fixtures`.

Os testes continuam iguais nos quatro casos.

## JSON Request e JSON Response

Os dados enviados e os contratos esperados ficam em arquivos JSON, fora do código dos testes:

| Arquivo | Conteúdo | Exemplo |
|---|---|---|
| JSON Request | Corpo enviado nas requisições de criação (POST) e atualização (PUT) | `resources/fixtures/public-api/products/POST/request/valid.json` |
| JSON Response | Contrato esperado da resposta, por status | `resources/fixtures/public-api/products/POST/201/a.success.json` |

O teste carrega o JSON Request com `loadJsonFixture` e envia o conteúdo como corpo da requisição:

```javascript
// Carrega o corpo da requisição (JSON Request) do arquivo
const body = loadJsonFixture(
    'resources/fixtures/public-api/products/POST/request/valid.json'
);

// Cria um produto novo e confere o status 201
const {
    responseData
} = await productService.post({
    body,
    expectedStatus: 201,
    saveResponseLog: folderPath
});
```

Os testes de login são a exceção: o corpo usa o usuário e a senha definidos no `.env`, por isso é montado no próprio teste.

## Atalhos de importação (sem `../../../../`)

As importações usam atalhos que começam com `#`, em vez de caminhos relativos como `../../../../src/utils/requests`. Assim, o caminho é o mesmo em qualquer nível de pasta:

```javascript
const {
    makeRequest
} = require('#utils/requests');
```

A configuração fica no **`package.json`**, no campo `imports`, e é um recurso nativo do Node.js (não precisa instalar nada):

```json
"imports": {
  "#config/*": "./src/config/*.js",
  "#utils/*": "./src/utils/*.js",
  "#services/*": "./src/services/*.js"
}
```

| Atalho | Pasta |
|---|---|
| `#config/...` | `src/config/` |
| `#utils/...` | `src/utils/` |
| `#services/...` | `src/services/` |

**Navegação no VS Code (Ctrl + clique):** o arquivo **`jsconfig.json`**, na raiz do projeto, faz o VS Code reconhecer os atalhos `#`. Com ele, Ctrl + clique (ou F12) sobre um método, como `getId`, abre o arquivo onde ele está escrito. Alt + ← volta ao arquivo anterior. O `jsconfig.json` só afeta o editor, não a execução dos testes.

```json
{
    "compilerOptions": {
        "module": "nodenext",
        "moduleResolution": "nodenext"
    },
    "include": [
        "src/**/*.js",
        "tests/**/*.js"
    ]
}
```

## Stack

- **Playwright** (`@playwright/test`) para execução das requisições
- **Page Object aplicado a APIs (Service Object)** para organizar as chamadas por recurso
- **Joi** + **to-json-schema** para geração e validação de contrato (schema dinâmico a partir de uma amostra)
- **Allure** para relatórios
- **GitHub Actions** para CI/CD (roda a cada push e diariamente, para detectar quebras de contrato na API pública)

## Estrutura

```
src/
  config/
    environment.js     # variáveis de ambiente (base URL, credenciais, token em cache)
    endpoints.js        # constantes de endpoints
  services/
    BaseService.js       # envio das requisições e CRUD comum (post, getAll, getId, putId, patchId, deleteId)
    AuthService.js       # login e usuário autenticado
    ProductService.js    # um serviço por recurso: Product, User, Cart, Todo,
    ...                  # Post, Quote, Recipe e Comment
  utils/
    requests.js          # makeRequest() — função única para todos os métodos HTTP
    validators.js        # validação de contrato (schema/tipos) e validação exata
    files.js              # salva logs de response em JSON e carrega fixtures
    auth-token.js         # autentica e cacheia o accessToken localmente
tests/
  {recurso}/{METODO}/{status}/*.spec.js
resources/fixtures/
  public-api/{recurso}/{METODO}/request/valid.json  # JSON Request: corpo enviado (POST e PUT)
  public-api/{recurso}/{METODO}/{status}/*.json     # JSON Response: contratos esperados (schema, não valor exato)
jsconfig.json            # faz o VS Code reconhecer os atalhos # (Ctrl + clique)
docs/
  screenshots/          # capturas de tela da execução e dos relatórios
logs/                    # responses reais salvas a cada execução (não versionado)
```

## Por que validação de contrato por SCHEMA (e não por valor exato)?

Como a API é pública e os dados mudam (preços, quantidades, IDs), validar valor por valor quebraria os testes sem motivo real. Por isso a validação (`validateResponseWithJsonSchema`) verifica **estrutura e tipos** — o "contrato" — permitindo que os valores variem livremente. Isso é o padrão usado em testes de contrato no mercado (o objetivo é garantir que a API não mudou o formato da resposta, não que os dados sejam idênticos a ontem).

## Cobertura de cenários

**55 cenários** cobrindo 9 recursos (`auth`, `products`, `users`, `carts`, `todos`, `posts`, `quotes`, `recipes`, `comments`), com múltiplos métodos (GET, POST, PUT, DELETE) e múltiplos status por método (200, 201, 400, 401, 404).

## Credenciais

As credenciais em `.env.example` são o **usuário de demonstração publicado oficialmente pela própria DummyJSON** na documentação (https://dummyjson.com/docs/auth) — não são segredo de ninguém, servem só para gerar um token de teste válido.
