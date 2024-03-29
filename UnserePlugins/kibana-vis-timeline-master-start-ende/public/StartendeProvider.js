import optionsTemplate from './options_template.html';
import StartendeVisualization from './StartendeVisualization';
import { RequestHandlerProvider } from './RequestHandlerProvider';
import { handleResponse } from './ResponseHandler';

import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

function StartendeProvider(Private) {
  const VisFactory = Private(VisFactoryProvider);
  const requestHandler = Private(RequestHandlerProvider);

  return VisFactory.createBaseVisualization({
    name: 'startende',
    title: 'Started-Finished',
    icon: 'fa fa-line-chart',
    description: 'startende',
    category: CATEGORY.OTHER,
    visualization: StartendeVisualization,
    responseHandler: handleResponse,
    requestHandler: requestHandler.handle,
    visConfig: {
      defaults: {
        sessionField: 'session.keyword',
        actionField: 'message',
        timeField: 'timestamp',
        maxSessionCount: 10,
        maxSessionLength: 20,
        index: 'user_study_5'
      },
    },
    editorConfig: {
      optionsTemplate: optionsTemplate
    }
  });
}

VisTypesRegistryProvider.register(StartendeProvider);