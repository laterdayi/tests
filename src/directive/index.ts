import { permission } from './modules/permission-button';
import { draggable } from './modules/draggable';
import type { Directive } from 'vue';

interface DirectivesType {
  [key: string]: Directive;
}

const directivesList: DirectivesType = {
  permission,
  draggable
};

const directives = {
  install: (app: App) => {
    Object.keys(directivesList).forEach(key => {
      app.directive(key, directivesList[key]);
    });
  }
};

export function setupDirective(app: App) {
  app.use(directives);
}
