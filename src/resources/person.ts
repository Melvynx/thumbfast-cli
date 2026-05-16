import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const personResource = new Command("person")
  .description("Manage persons (face references for thumbnails)");

personResource
  .command("create")
  .description("Create a new person")
  .requiredOption("--name <name>", "Name for the person")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli person create --name 'John Doe'\n  thumbfast-cli person create --name 'Jane' --json")
  .action(async (opts) => {
    try {
      const data = await client.post("/tools/create_person", { name: opts.name });
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

personResource
  .command("list")
  .description("List all persons")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli person list\n  thumbfast-cli person list --json")
  .action(async (opts) => {
    try {
      const data = await client.post("/tools/list_persons", {});
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

personResource
  .command("get")
  .description("Get a person by ID")
  .requiredOption("--person-id <id>", "Person ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli person get --person-id per_abc123")
  .action(async (opts) => {
    try {
      const data = await client.post("/tools/get_person", { personId: opts.personId });
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

personResource
  .command("delete")
  .description("Delete a person")
  .requiredOption("--person-id <id>", "Person ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli person delete --person-id per_abc123")
  .action(async (opts) => {
    try {
      const data = await client.post("/tools/delete_person", { personId: opts.personId });
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
