class Person {
  static validate(person) {
    if (!person.name) throw new Error("Name is required");
    if (!person.cpf) throw new Error("CPF is required");
  }

  static format(person) {
    const [name, ...lastName] = person.name.split(" ");
    return {
      cpf: person.cpf.replace(/\D/g, ""), // Remove caracteres não numéricos do CPF
      name,
      lastName: lastName.join(" "), //  Junta o resto das partes do nome como lastName
    };
  }

  static save(person) {
    if (!["cpf", "name", "lastName"].every((prop) => person[prop])) {
      throw new Error(`Cannot save invalid person: ${JSON.stringify(person)}`);
    }

    console.log("Registrado com sucesso!", person);
  }

  static process(person) {
    this.validate(person);
    const personFormatted = this.format(person);
    this.save(personFormatted);
    return "ok";
  }
}

export default Person;
