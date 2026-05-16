import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const generationResource = new Command("generation")
  .description("Manage thumbnail generations");

generationResource
  .command("generate")
  .description("Generate a new thumbnail (cost: 1 thumbnail, rate: 10 req/min)")
  .option("--prompt <text>", "Prompt for thumbnail generation")
  .option("--image-ids <ids>", "Comma-separated image IDs to use as references")
  .option("--model <model>", "Model to use", "gemini")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli generation generate --prompt 'A coding tutorial thumbnail'\n  thumbfast-cli generation generate --prompt 'React hooks' --model gemini --image-ids img1,img2")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.prompt) body.prompt = opts.prompt;
      if (opts.imageIds) body.imageIds = opts.imageIds.split(",");
      if (opts.model) body.model = opts.model;
      const data = await client.post("/tools/generate_thumbnail", body);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

generationResource
  .command("status")
  .description("Get the status of a generation")
  .requiredOption("--generation-id <id>", "Generation ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli generation status --generation-id gen_abc123")
  .action(async (opts) => {
    try {
      const data = await client.post("/tools/get_generation_status", {
        generationId: opts.generationId,
      });
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

generationResource
  .command("variation")
  .description("Generate a variation of an existing thumbnail (cost: 1 thumbnail, rate: 10 req/min)")
  .option("--prompt-id <id>", "Prompt ID to create variation from")
  .option("--new-prompt <text>", "New prompt for the variation")
  .option("--model <model>", "Model to use", "gemini")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli generation variation --prompt-id p_abc --new-prompt 'Darker version'\n  thumbfast-cli generation variation --prompt-id p_abc --model gemini")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.promptId) body.promptId = opts.promptId;
      if (opts.newPrompt) body.newPrompt = opts.newPrompt;
      if (opts.model) body.model = opts.model;
      const data = await client.post("/tools/generate_variation", body);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

generationResource
  .command("list")
  .description("List all generations")
  .option("--cursor <cursor>", "Pagination cursor")
  .option("--search <query>", "Search query")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli generation list\n  thumbfast-cli generation list --search 'react' --json")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.cursor) body.cursor = opts.cursor;
      if (opts.search) body.search = opts.search;
      const data = await client.post("/tools/list_generations", body);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

generationResource
  .command("cancel")
  .description("Cancel a running generation")
  .requiredOption("--generation-id <id>", "Generation ID to cancel")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli generation cancel --generation-id gen_abc123")
  .action(async (opts) => {
    try {
      const data = await client.post("/tools/cancel_generation", {
        generationId: opts.generationId,
      });
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

generationResource
  .command("trigger")
  .description("Trigger a generation")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli generation trigger")
  .action(async (opts) => {
    try {
      const data = await client.post("/tools/trigger_generation", {});
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
