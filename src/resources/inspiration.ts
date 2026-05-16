import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const inspirationResource = new Command("inspiration")
  .description("Manage thumbnail inspirations");

inspirationResource
  .command("create")
  .description("Create a new inspiration (cost: 0.1 thumbnails)")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli inspiration create\n  thumbfast-cli inspiration create --json")
  .action(async (opts) => {
    try {
      const data = await client.post("/tools/create_inspiration", {});
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

inspirationResource
  .command("list")
  .description("List inspirations")
  .option("--category <category>", "Filter by category")
  .option("--search <query>", "Search query")
  .option("--limit <n>", "Max results", "20")
  .option("--cursor <cursor>", "Pagination cursor")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli inspiration list\n  thumbfast-cli inspiration list --category tech --limit 10\n  thumbfast-cli inspiration list --search 'coding' --json")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.category) body.category = opts.category;
      if (opts.search) body.search = opts.search;
      if (opts.limit) body.limit = parseInt(opts.limit, 10);
      if (opts.cursor) body.cursor = opts.cursor;
      const data = await client.post("/tools/list_inspirations", body);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

inspirationResource
  .command("get")
  .description("Get an inspiration by ID")
  .requiredOption("--inspiration-id <id>", "Inspiration ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli inspiration get --inspiration-id ins_abc123")
  .action(async (opts) => {
    try {
      const data = await client.post("/tools/get_inspiration", {
        inspirationId: opts.inspirationId,
      });
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

inspirationResource
  .command("delete")
  .description("Delete an inspiration")
  .requiredOption("--inspiration-id <id>", "Inspiration ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli inspiration delete --inspiration-id ins_abc123")
  .action(async (opts) => {
    try {
      const data = await client.post("/tools/delete_inspiration", {
        inspirationId: opts.inspirationId,
      });
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
