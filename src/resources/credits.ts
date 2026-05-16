import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const creditsResource = new Command("credits")
  .description("Manage account credits");

creditsResource
  .command("balance")
  .description("Get current credit balance")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli credits balance\n  thumbfast-cli credits balance --json")
  .action(async (opts) => {
    try {
      const data = await client.post("/tools/get_credits", {});
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

creditsResource
  .command("history")
  .description("Get credit usage history")
  .option("--limit <n>", "Max results", "20")
  .option("--cursor <cursor>", "Pagination cursor")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli credits history\n  thumbfast-cli credits history --limit 50\n  thumbfast-cli credits history --json")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.limit) body.limit = parseInt(opts.limit, 10);
      if (opts.cursor) body.cursor = opts.cursor;
      const data = await client.post("/tools/get_credit_history", body);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
