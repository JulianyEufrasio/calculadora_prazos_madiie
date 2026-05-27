# Calculadora de Prazo de Estágio - MADIIÊ

Sistema simples desenvolvido em **HTML, CSS e JavaScript** para auxiliar vendedoras na análise de viabilidade de prazos de estágio.

A ferramenta permite informar a **data da venda**, o **prazo final de conclusão do estágio** e a **carga horária total**, calculando se há tempo suficiente para cumprir o estágio dentro do período informado.

---

## Objetivo

O objetivo do sistema é evitar fechamentos inviáveis, permitindo que a equipe comercial verifique, antes da confirmação com o cliente, se o estágio pode ser cumprido considerando:

- prazo interno para abertura do TCE;
- prazo de análise e validação da faculdade;
- início seguro para contagem das horas de estágio;
- carga horária obrigatória;
- limite de 6 horas de estágio por dia útil.

---

## Regras de cálculo

O sistema considera as seguintes regras operacionais:

1. A vendedora informa a **data do fechamento/venda**.
2. A abertura ou agendamento do TCE no Monday pode ocorrer em até **10 dias corridos após o fechamento**.
3. A faculdade pode levar até **7 dias para validar ou não o TCE**.
4. Por segurança operacional, o sistema considera uma margem mínima de **10 dias após o envio do TCE**.
5. Assim, a contagem das horas de estágio deve iniciar entre **20 e 25 dias corridos após o fechamento**.
6. Cada dia de estágio equivale a **6 horas**.
7. A contagem das horas considera apenas **dias úteis**, desconsiderando sábados, domingos e feriados nacionais cadastrados.

---

## Exemplo prático

Considerando:

- fechamento da venda: **10/05**;
- abertura/agendamento do TCE: **20/05**;
- liberação da faculdade: **27/05**;

A contagem das horas de estágio deve começar, preferencialmente, entre **20 e 25 dias após o fechamento**, garantindo tempo para abertura do TCE, análise da faculdade e eventuais ajustes.

---

## Resultado esperado

Após o preenchimento dos dados, o sistema pode retornar três tipos de análise:

### Viável

Indica que o estágio pode ser cumprido com segurança dentro do prazo informado.

### Viável com atenção

Indica que o estágio ainda pode ser cumprido, mas apenas considerando o início mínimo de 20 dias após o fechamento. Nesse caso, o prazo é mais apertado e deve verificar com a equipe de pós venda.

### Não possível

Indica que não há tempo suficiente para cumprir a carga horária exigida dentro do prazo informado.

---

## Campos do sistema

O formulário possui os seguintes campos:

- **Data da venda:** data em que o cliente fechou o serviço com a vendedora.
- **Prazo de finalização:** data limite para conclusão do estágio.
- **Carga horária total:** quantidade total de horas exigidas no estágio.

---

## Estrutura do projeto

```text
calculadora-estagio/
│
├── index.html
├── calculadora.js
└── README.md
```

### `index.html`

Arquivo principal da interface do sistema. Contém os campos de preenchimento e a área de exibição do resultado.

### `calculadora.js`

Arquivo responsável pelas regras de cálculo, manipulação de datas, verificação de dias úteis, feriados e renderização do resultado.

### `README.md`

Arquivo de documentação do projeto.

---

## Como usar

1. Abra o arquivo `index.html` em qualquer navegador ou acesse <>
2. Informe a data da venda.
3. Informe o prazo final de conclusão do estágio.
4. Informe a carga horária total do estágio.
5. Clique em **Calcular prazo**.
6. Verifique se o sistema indicará que o estágio é viável ou não.

---

## Tecnologias utilizadas

- HTML5;
- CSS3;
- JavaScript puro.

O projeto não depende de bibliotecas externas para executar os cálculos principais.

---

## Observação importante

Esta calculadora serve como ferramenta de apoio comercial. A análise final ainda deve considerar regras específicas da instituição de ensino, exigências documentais, feriados locais, eventuais atrasos da faculdade e particularidades do estágio contratado.

---

## Autoria

Projeto desenvolvido por mim, Juliany Eufrásio, para apoio interno da **MADIIÊ Soluções Acadêmicas**.
