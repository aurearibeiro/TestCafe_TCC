/* eslint-disable no-undef */
import { Selector } from "testcafe";
import { PortalElements } from "./elements/portal.elements";
import { regularUser } from "./roles/roles";

fixture`Testes usando testcafe`.beforeEach(async (t) => {
  await t.useRole(regularUser);
});

const req = Selector(PortalElements.requirements.requirementOption);
const reqOption = req.find("option");

test(`1- Histórico acadêmico: Verificar a exibição da tabela`, async (t) => {
  await t
    .click(PortalElements.historic)
    .expect(Selector("th").nth(0).innerText)
    .eql("Sigla")
    .expect(Selector("th").nth(1).innerText)
    .eql("Descrição da Disciplina")
    .expect(Selector("th").nth(2).innerText)
    .eql("Nota")
    .expect(Selector("th").nth(3).innerText)
    .eql("Ano/Semestre");
});

test(`2- Atividades complementares: Verificar exibição da mensagem`, async (t) => {
  await t
    .click(PortalElements.complementaryActivity.access)

    .expect(Selector(PortalElements.complementaryActivity.message).innerText)
    .eql(
      "Você não está matriculado em turmas que possuem atividades complementares !!!"
    );
});

test(`3- Pedidos (notas): Verificar exibição da mensagem`, async (t) => {
  await t
    .click(PortalElements.noteRequest.access)

    .expect(Selector(PortalElements.noteRequest.message).innerText)
    .eql("Não existem pedidos de notas a serem solicitados !!!");
});

test(`4- Consulta de pedidos (notas): Verificar exibição da mensagem`, async (t) => {
  await t
    .click(PortalElements.orderInquiry.access)

    .expect(Selector(PortalElements.orderInquiry.message).innerText)
    .eql("Não existem Pedidos referentes à Notas a serem consultados.");
});

test(`5- Requerimentos: Verificar requerimentos existentes`, async (t) => {
  await t
    .click(PortalElements.requirements.access)
    .click(req)
    .click(reqOption.withText("Requerimento de Desistência de Disciplinas"))
    .expect(req.value)
    .eql("1")

    .click(req)
    .click(reqOption.withText("Requerimento de Pedido de PVS"))
    .expect(req.value)
    .eql("4");
});

test(`6- Nota de estágio: Verificar exibição da tabela`, async (t) => {
  await t
    .click(PortalElements.intershipGrade.access)

    .expect(Selector("th").nth(0).innerText)
    .eql("Sigla")
    .expect(Selector("th").nth(1).innerText)
    .eql("Descrição da Disciplina")
    .expect(Selector("th").nth(2).innerText)
    .eql("Nota")
    .expect(Selector("th").nth(3).innerText)
    .eql("Ano/Semestre")

    .expect(
      Selector(PortalElements.intershipGrade.intershipInitials).nth(0).innerText
    )
    .contains("EST1")
    .expect(
      Selector(PortalElements.intershipGrade.intershipName).nth(1).innerText
    )
    .contains("Estágio Supervisionado");
});

test(`7- Quadro de Pré/Co Requisitos: Verificar a exibição das informações`, async (t) => {
  await t
    .click(PortalElements.requirementsTable.access)

    .expect(Selector(PortalElements.requirementsTable.totalCredits).innerText)
    .contains("Total de Créditos Aprovados")
    .expect(Selector(PortalElements.requirementsTable.totalCredits).innerText)
    .contains("Total de Créditos Matriculados");
});

test(`8- Tesouraria: Verificar dados`, async (t) => {
  const tableDeb = Selector(PortalElements.treasury.tableDebits);
  const tableBankDetails = Selector(PortalElements.treasury.tableBankDetails);

  await t
    .click(PortalElements.treasury.access)
    .expect(Selector(PortalElements.treasury.bankData).innerText)
    .eql("Dados Bancários para Pagamento")

    .expect(Selector(PortalElements.treasury.debits).innerText)
    .eql("Débitos")

    .expect(Selector(PortalElements.treasury.credits).innerText)
    .eql("Créditos e Devoluções")

    .expect(tableDeb.nth(0).innerText)
    .contains("Histórico")

    .expect(tableDeb.nth(1).innerText)
    .contains("Vencimento")

    .expect(tableDeb.nth(2).innerText)
    .contains("Valor")

    .expect(tableDeb.nth(3).innerText)
    .contains("Multa")

    .expect(tableDeb.nth(4).innerText)
    .contains("Correção")

    .expect(tableDeb.nth(5).innerText)
    .contains("Juros")

    .expect(tableDeb.nth(6).innerText)
    .contains("Total")

    .expect(tableBankDetails.nth(2).innerText)
    .contains("Agência")

    .expect(tableBankDetails.nth(3).innerText)
    .contains("0872-9")

    .expect(tableBankDetails.nth(4).innerText)
    .contains("Conta Corrente:")
    .expect(tableBankDetails.nth(5).innerText)
    .contains("3867-9")

    .expect(tableBankDetails.nth(6).innerText)
    .contains("Titular:")
    .expect(tableBankDetails.nth(7).innerText)
    .contains("Fundação Instituto Nacional de Telecomunicações")

    .expect(tableBankDetails.nth(10).innerText)
    .contains("Identificador Bancário:")
    .expect(tableBankDetails.nth(11).innerText)
    .contains("00012499999-9")

    .expect(tableBankDetails.nth(14).innerText)
    .contains("Chave Pix (CNPJ):")
    .expect(tableBankDetails.nth(15).innerText)
    .contains("24.492.886/0001-04");
});
