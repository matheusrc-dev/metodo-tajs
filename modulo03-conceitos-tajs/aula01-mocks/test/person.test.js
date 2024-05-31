import { describe, it, expect, jest } from "@jest/globals";
import Person from "../src/person";

describe("#Person Suite", () => {
  describe("#validate", () => {
    it("Should throw an error if the name is not present", () => {
      const mockInvalidPerson = {
        name: "",
        cpf: "123.456.789-09",
      };

      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error("Name is required")
      );
    });

    it("Should throw an error if the cpf is not present", () => {
      const mockInvalidPerson = {
        name: "Juliano Pereira",
        cpf: "",
      };

      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error("CPF is required")
      );
    });

    it("Should not throw an error if the person is valid", () => {
      const mockValidPerson = {
        name: "Juliano Pereira",
        cpf: "123.456.789-09",
      };

      expect(() => Person.validate(mockValidPerson)).not.toThrow();
    });
  });

  describe("#format", () => {
    it("Should format the person's name and CPF", () => {
      // AAA
      // Arrange = Prepara
      const mockPerson = {
        name: "Xuxa da Silva",
        cpf: "000.999.444-11",
      };

      // Act = Executar
      const formattedPerson = Person.format(mockPerson);

      // Assert = Validar
      const expected = {
        name: "Xuxa",
        cpf: "00099944411",
        lastName: "da Silva",
      };

      expect(formattedPerson).toStrictEqual(expected);
    });
  });

  describe("#save", () => {
    it("Should not throw an error when saving person", () => {
      const mockPerson = {
        cpf: "12345678910",
        name: "Lucas",
        lastName: "Carneiro Lopez",
      };

      expect(() => Person.save(mockPerson)).not.toThrow();
    });

    it("Should throw and error if a persons property is not present", () => {
      const mockPerson = {
        cpf: "12345678910",
        name: "Lucas"
      };

      expect(() => Person.save(mockPerson)).
        toThrow();
    });
  });

  describe("#process", () => {
    it("Should process a valid person", () => {
      // Arrange

      const mockPerson = {
        name: 'Marcos Hudson Júnior',
        cpf: "999.888.555-44"
      };

      jest.spyOn(
        Person,
        Person.validate.name,
      ).mockReturnValue()

      // A linha abaixo se comentada irá estourar um erro
      // jest.spyOn(
      //   Person,
      //   Person.validate.name
      // ).mockImplementation(() => {
      //   throw new Error("Deu ruim!");
      // })

      jest.spyOn(
        Person,
        Person.format.name
      ).mockReturnValue({
        cpf: "99988855544",
        name: "Marcos",
        lastName: "Hudson Júnior"
      })

      // Act
      const result = Person.process(mockPerson);

      // Assert
      const expected = 'ok';
      expect(result).toStrictEqual(expected);
    })
  })
});
