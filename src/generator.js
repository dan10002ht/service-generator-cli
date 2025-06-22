const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const ejs = require('ejs');
const { getTemplates } = require('./templates');

async function generateService(options) {
  let { language, name, output, interactive } = options;

  // Interactive mode
  if (interactive) {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'language',
        message: 'Choose programming language:',
        choices: [
          { name: 'Java (Spring Boot + gRPC)', value: 'java' },
          { name: 'Go (gRPC + HTTP Gateway)', value: 'go' },
          { name: 'JavaScript (Node.js + Express + gRPC)', value: 'js' }
        ]
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter service name:',
        validate: (input) => {
          if (!input.trim()) {
            return 'Service name is required';
          }
          if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
            return 'Service name can only contain letters, numbers, hyphens, and underscores';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'output',
        message: 'Output directory:',
        default: '.'
      }
    ]);

    language = answers.language;
    name = answers.name;
    output = answers.output;
  }

  // Validate inputs
  if (!name) {
    throw new Error('Service name is required');
  }

  if (!['java', 'go', 'js'].includes(language)) {
    throw new Error('Unsupported language. Supported: java, go, js');
  }

  const servicePath = path.join(output, name);
  const spinner = ora('Generating service...').start();

  try {
    // Check if directory exists
    if (await fs.pathExists(servicePath)) {
      spinner.stop();
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `Directory '${name}' already exists. Overwrite?`,
          default: false
        }
      ]);

      if (!overwrite) {
        console.log(chalk.yellow('Operation cancelled.'));
        return;
      }

      await fs.remove(servicePath);
      spinner.start('Generating service...');
    }

    // Create service directory
    await fs.ensureDir(servicePath);

    // Get templates for the language
    const templates = getTemplates(language);

    // Generate files
    for (const [filePath, template] of Object.entries(templates)) {
      const fullPath = path.join(servicePath, filePath);
      
      // Ensure directory exists
      await fs.ensureDir(path.dirname(fullPath));

      // Render template
      const content = ejs.render(template, {
        serviceName: name,
        packageName: name.toLowerCase().replace(/[^a-z0-9]/g, ''),
        moduleName: name,
        className: name.charAt(0).toUpperCase() + name.slice(1).replace(/[^a-zA-Z0-9]/g, '')
      });

      // Write file
      await fs.writeFile(fullPath, content);
    }

    spinner.succeed(chalk.green(`Service '${name}' generated successfully!`));

    // Show next steps
    console.log(chalk.blue('\n📁 Location:'), servicePath);
    console.log(chalk.blue('🚀 Next steps:'));
    console.log(chalk.cyan(`   cd ${name}`));

    switch (language) {
      case 'java':
        console.log(chalk.cyan('   mvn spring-boot:run'));
        break;
      case 'go':
        console.log(chalk.cyan('   make dev-setup'));
        console.log(chalk.cyan('   make dev'));
        break;
      case 'js':
        console.log(chalk.cyan('   npm install'));
        console.log(chalk.cyan('   npm start'));
        break;
    }

  } catch (error) {
    spinner.fail(chalk.red('Failed to generate service'));
    throw error;
  }
}

module.exports = { generateService }; 