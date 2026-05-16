import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const imageResource = new Command("image")
  .description("Manage images for thumbnail generation");

imageResource
  .command("upload")
  .description("Upload an image from URL (cost: 0.05 thumbnails)")
  .requiredOption("--image-url <url>", "URL of the image to upload")
  .option("--name <name>", "Name for the image")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli image upload --image-url 'https://example.com/photo.jpg'\n  thumbfast-cli image upload --image-url 'https://example.com/photo.jpg' --name 'My Photo'")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { imageUrl: opts.imageUrl };
      if (opts.name) body.name = opts.name;
      const data = await client.post("/tools/upload_image", body);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

imageResource
  .command("list")
  .description("List all images")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli image list\n  thumbfast-cli image list --json")
  .action(async (opts) => {
    try {
      const data = await client.post("/tools/list_images", {});
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

imageResource
  .command("get")
  .description("Get an image by ID")
  .requiredOption("--image-id <id>", "Image ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli image get --image-id img_abc123")
  .action(async (opts) => {
    try {
      const data = await client.post("/tools/get_image", { imageId: opts.imageId });
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

imageResource
  .command("search")
  .description("Search images")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli image search\n  thumbfast-cli image search --json")
  .action(async (opts) => {
    try {
      const data = await client.post("/tools/search_images", {});
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

imageResource
  .command("delete")
  .description("Delete an image")
  .requiredOption("--image-id <id>", "Image ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thumbfast-cli image delete --image-id img_abc123")
  .action(async (opts) => {
    try {
      const data = await client.post("/tools/delete_image", { imageId: opts.imageId });
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
