import { existsSync } from "https://deno.land/std/fs/mod.ts";

async function convertVideoToGif(
  inputPath: string,
  outputPath: string,
) {
  const command = new Deno.Command("ffmpeg", {
    args: ["-i", inputPath, outputPath],
  });
  await command.output();
}

async function batchConvertWebmToGif(
  inputFolder: string,
  outputFolder: string,
  fileSuffix = "webm",
) {
  if (!existsSync(outputFolder)) {
    await Deno.mkdir(outputFolder, { recursive: true });
  }

  for (const entry of Deno.readDirSync(inputFolder)) {
    if (entry.isFile && entry.name.endsWith(fileSuffix)) {
      const inputPath = `${inputFolder}/${entry.name}`;
      const outputPath = `${outputFolder}/${
        entry.name.replace(
          fileSuffix,
          "gif",
        )
      }`;

      console.log(`Converting file: ${entry.name}`);

      if (existsSync(outputPath)) {
        await Deno.remove(outputPath);
      }

      await convertVideoToGif(inputPath, outputPath);
    }
  }

  console.log("Conversion completed!");
}

const inputFolder = "/path/webm";
const outputFolder = "/path/gif";

await batchConvertWebmToGif(inputFolder, outputFolder);
