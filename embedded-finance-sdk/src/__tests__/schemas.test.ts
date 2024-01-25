import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import { schemas } from "../schemas";

describe("Schema Tests", () => {
  it("should compile all schemas without errors", () => {
    const ajv = addErrors(
      addFormats(new Ajv({ allErrors: true }), [
        "date-time",
        "time",
        "date",
        "email",
        "hostname",
        "ipv4",
        "ipv6",
        "uri",
        "uri-reference",
        "uuid",
        "uri-template",
        "json-pointer",
        "relative-json-pointer",
        "regex",
      ])
    );

    Object.entries(schemas).forEach(([key, schema]) => {
      const validate = ajv.compile(schema);

      expect(validate).toBeInstanceOf(Function);
    });
  });
});
