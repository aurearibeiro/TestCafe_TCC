import { Role } from "testcafe";
import { Selector } from "testcafe";
import { LoginElements } from "../elements/login.elements";
import config from "../../login.json";

const authType = Selector(LoginElements.authType);
const course = Selector(LoginElements.course);
const authTypeOption = authType.find("option");
const courseOption = course.find("option");

const regularUser = Role(
  "https://siteseguro.inatel.br/PortalAcademico/WebLogin.aspx?ReturnUrl=%2fPortalacademico",
  async (t) => {
    await t
      .click(authType)
      .click(authTypeOption.withText("Por Curso e Matricula"))
      .expect(authType.value)
      .eql("2")

      .click(course)
      .click(courseOption.withText(config.curso))
      .expect(course.value)
      .eql("24")

      .typeText(LoginElements.inputRegistration, config.matricula)
      .typeText(LoginElements.inputPassword, config.senha)
      .click(LoginElements.buttonLogin);
  },
  { preserveUrl: true }
);

export { regularUser };
