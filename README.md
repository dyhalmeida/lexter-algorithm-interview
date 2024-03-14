# Teste Lexter.ai (Full Stack)

## Introdução

O teste consiste em escrever um algoritmo que modifique um lista de objetos do tipo **Input** (definido em `src/input.ts`) para uma lista de objetos do tipo **Output** (definido em `src/output.ts`), usando Typescript e quaisquer outras ferramentas que deseje.

## Detalhes Sobre o Modelo de Dados

- Todos os níveis da lista de output devem estar em ordem crescente por entryId;
- Uma entrada deve ser filha da outra se o inicio do path de ambas for igual, ou seja, a entrada 'root/path' é filha da entrada 'root';
- A estrutura tem profundidade indefinida;
- A chave `fullPath` do Output é uma string com todos os elementos do path separados por `/`;
- A chave `currentPath` é o valor do path atual. Ou seja para a entrada de `fullPath` `roo/path` o seu `currentPath` é `path`;
- Os arquivos `src/input.ts` e `src/output.ts` tem um exemplo de um array de input e um de output.

## Como executar essa aplicação em modo de desenvolvimento

- Utilizando o docker + docker compose, rode o comando abaixo, para subir o container:

```shell
docker compose -f docker-compose.dev.yml up --build -d
```

- Com o container em execução, utilize o CURL da última instrução desse README e alterea a porta da URL de 3000 para 3333: <br >
  `--url http://localhost:3000/tree \` por `--url http://localhost:3333/tree \`

## Testes e Algoritmo

- Com o container em execução, rode o comando abaixo para entrar no container:

```shell
docker compose -f docker-compose.dev.yml exec app-dev /bin/sh
```

- Dentro do container, para rodar os testes, utilize o comando abaixo:

```shell
npm run test
```

- Dentro do container, para rodar apenas o algorítmo, utilize o comando abaixo:

```shell
npm run start:algorithm
```

## Como executar essa aplicação em modo de produção

- Utilizando o docker + docker compose, rode o comando abaixo, para subir o container:

```shell
docker compose -f docker-compose.prod.yml up --build -d
```

- Com o container em execução, utilize o CURL abaixo para executar o algoritmo:

```shell
curl --request POST \
  --url http://localhost:3000/tree \
  --data '[
  {
    "entryId": "1",
    "path": [
      "root1"
    ]
  },
  {
    "entryId": "10",
    "path": [
      "root2",
      "path2"
    ]
  },
  {
    "entryId": "11",
    "path": [
      "root2",
      "path999"
    ]
  },
  {
    "entryId": "12",
    "path": [
      "root3",
      "path1"
    ]
  },
  {
    "entryId": "13",
    "path": [
      "root3",
      "path2"
    ]
  },
  {
    "entryId": "14",
    "path": [
      "root3",
      "path3"
    ]
  },
  {
    "entryId": "2",
    "path": [
      "root2"
    ]
  },
  {
    "entryId": "3",
    "path": [
      "root3"
    ]
  },
  {
    "entryId": "6",
    "path": [
      "root1",
      "path1"
    ]
  },
  {
    "entryId": "7",
    "path": [
      "root1",
      "path2"
    ]
  },
  {
    "entryId": "8",
    "path": [
      "root1",
      "path3"
    ]
  },
  {
    "entryId": "9",
    "path": [
      "root2",
      "path1"
    ]
  },
  {
    "entryId": "17",
    "path": [
      "root1",
      "path1",
      "path1"
    ]
  },
  {
    "entryId": "19",
    "path": [
      "root2",
      "path2",
      "path1"
    ]
  },
  {
    "entryId": "20",
    "path": [
      "root2",
      "path2",
      "path1",
      "path1"
    ]
  },
  {
    "entryId": "21",
    "path": [
      "root2",
      "path2",
      "path2"
    ]
  }
]'
```

- O resultado esperado deve ser:

```json
[
  {
    "entryId": 1,
    "fullPath": "root1",
    "currentPath": "root1",
    "children": [
      {
        "entryId": 6,
        "fullPath": "root1/path1",
        "currentPath": "path1",
        "children": [
          {
            "entryId": 17,
            "fullPath": "root1/path1/path1",
            "currentPath": "path1",
            "children": []
          }
        ]
      },
      {
        "entryId": 7,
        "fullPath": "root1/path2",
        "currentPath": "path2",
        "children": []
      },
      {
        "entryId": 8,
        "fullPath": "root1/path3",
        "currentPath": "path3",
        "children": []
      }
    ]
  },
  {
    "entryId": 2,
    "fullPath": "root2",
    "currentPath": "root2",
    "children": [
      {
        "entryId": 9,
        "fullPath": "root2/path1",
        "currentPath": "path1",
        "children": []
      },
      {
        "entryId": 10,
        "fullPath": "root2/path2",
        "currentPath": "path2",
        "children": [
          {
            "entryId": 19,
            "fullPath": "root2/path2/path1",
            "currentPath": "path1",
            "children": [
              {
                "entryId": 20,
                "fullPath": "root2/path2/path1/path1",
                "currentPath": "path1",
                "children": []
              }
            ]
          },
          {
            "entryId": 21,
            "fullPath": "root2/path2/path2",
            "currentPath": "path2",
            "children": []
          }
        ]
      },
      {
        "entryId": 11,
        "fullPath": "root2/path999",
        "currentPath": "path999",
        "children": []
      }
    ]
  },
  {
    "entryId": 3,
    "fullPath": "root3",
    "currentPath": "root3",
    "children": [
      {
        "entryId": 12,
        "fullPath": "root3/path1",
        "currentPath": "path1",
        "children": []
      },
      {
        "entryId": 13,
        "fullPath": "root3/path2",
        "currentPath": "path2",
        "children": []
      },
      {
        "entryId": 14,
        "fullPath": "root3/path3",
        "currentPath": "path3",
        "children": []
      }
    ]
  }
]
```
