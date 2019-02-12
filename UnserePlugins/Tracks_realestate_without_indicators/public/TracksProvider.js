import optionsTemplate from './options_template.html';
import TracksVisualization from './TracksVisualization';
import { RequestHandlerProvider } from './RequestHandlerProvider';
import { handleResponse } from './ResponseHandler';

import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

function TracksProvider(Private) {
  const VisFactory = Private(VisFactoryProvider);
  const requestHandler = Private(RequestHandlerProvider);

  return VisFactory.createBaseVisualization({
    name: 'tracks_realetstate_without_indicators',
    title: 'Tracks_realetstate_without_indicators',
    icon: 'fa fa-map',
    description: 'tracks_realetstate_without_indicators',
    category: CATEGORY.OTHER,
    visualization: TracksVisualization,
    responseHandler: handleResponse,
    requestHandler: requestHandler.handle,
    visConfig: {
      defaults: {
		appField: 'app_id.keyword',
        appValue: 'realestate_without_indicators',
        index: 'user_study_5',
        sessionField: 'session.keyword',
        timeField: 'timestamp',
        geoField: 'map_center',
        scaleField: 'map_scale',
        actionField: 'message.keyword',
        actionValue: 'map-init CENTER_CHANGED',
        maxSessionLength: 100,
        maxSessionCount: 100
      },
    },
    editorConfig: {
      optionsTemplate: optionsTemplate
    }
  });
}

VisTypesRegistryProvider.register(TracksProvider);