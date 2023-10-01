export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator('Component', {
    description: 'Generate react native components',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{name}}.tsx',
        templateFile: 'plop-templates/TemplateComponent.tsx.hbs',
      },
    ],
  });
}
