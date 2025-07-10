module.exports = function (plop) {
  plop.setHelper('lowerCase', (text) => text.toLowerCase());

  plop.setGenerator('component', {
    description: 'Create a new Next.js component with styles and hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (e.g. Hero):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/UI/{{pascalCase name}}/{{pascalCase name}}.tsx',
        template: `import styles from './styles.module.scss';\n\n
        type Props = {};\n
        const {{pascalCase name}} = (props: Props) => {
            return (
                <div className={ styles.{{lowerCase name}} }>
                   {{pascalCase name}} component
                </div>
            );
        }\n
        export default {{pascalCase name}};
        `,
      },
      {
        type: 'add',
        path: 'src/UI/{{pascalCase name}}/styles.module.scss',
        template: `.{{lowerCase name}} {
             /* styles here */
        }
        `,
      },
      {
        type: 'add',
        path: 'src/UI/{{pascalCase name}}/index.ts',
        template: `import {{pascalCase name}} from './{{pascalCase name}}';\n\n export default {{pascalCase name}};`,
      },
      {
        type: 'add',
        path: 'src/UI/{{pascalCase name}}/use{{pascalCase name}}.ts',
        template: `import { useEffect, useState } from 'react';

export function use{{pascalCase name}}() {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Your logic here
  }, []);

  return { state };
}
`,
      },
    ],
  });
};
