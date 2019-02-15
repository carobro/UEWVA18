import optionsTemplate from './options_template.html';
import items_timeline_realestate_indicators_Visualization from './items_timeline_realestate_indicators_Visualization';
import { RequestHandlerProvider } from './RequestHandlerProvider';
import { handleResponse } from './ResponseHandler';

import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

function items_timeline_realestate_indicators_Provider(Private) {
  const VisFactory = Private(VisFactoryProvider);
  const requestHandler = Private(RequestHandlerProvider);

  return VisFactory.createBaseVisualization({
    name: 'items_timeline_realestate_indicators_',
    title: 'items_timeline_realestate_indicators_',
    icon: 'fa fa-line-chart',
    description: 'items_timeline_realestate_indicators_',
    category: CATEGORY.OTHER,
    visualization: items_timeline_realestate_indicators_Visualization,
    responseHandler: handleResponse,
    requestHandler: requestHandler.handle,
    visConfig: {
      defaults: {
        appField: 'app_id.keyword',
        appValue: 'realestate_with_indicators',
        sessionField: 'session.keyword',
        actionField: 'message',
        timeField: 'timestamp',
        maxSessionCount: 7,
        maxSessionLength: 100,
        index: 'user_study_5'
      },
    },
    editorConfig: {
      optionsTemplate: optionsTemplate
    }
  });
}

VisTypesRegistryProvider.register(items_timeline_realestate_indicators_Provider);