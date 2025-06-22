#!/usr/bin/env node

const { program } = require("commander");
const chalk = require("chalk");
const { generateService } = require("../src/generator");

// Set version
program.version("1.0.0", "-v, --version");

// Add new service command
program
  .command("new")
  .description("Generate a new microservice")
  .option(
    "-l, --language <language>",
    "Programming language (java, go, js)",
    "java"
  )
  .option("-n, --name <name>", "Service name")
  .option("-o, --output <directory>", "Output directory", ".")
  .option("-i, --interactive", "Interactive mode")
  .action(async (options) => {
    try {
      await generateService(options);
    } catch (error) {
      console.error(chalk.red("Error:"), error.message);
      process.exit(1);
    }
  });

// Add list command
program
  .command("list")
  .description("List available languages and templates")
  .action(() => {
    console.log(chalk.blue("Available languages:"));
    console.log("  java - Spring Boot + gRPC");
    console.log("  go   - Go + gRPC + HTTP Gateway");
    console.log("  js   - Node.js + Express + gRPC");
    console.log("");
    console.log(chalk.blue("Usage:"));
    console.log("  service-generator new --language=java --name=my-service");
    console.log("  service-generator new --interactive");
  });

// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
