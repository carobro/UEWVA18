import './prelert_swimlane_vis.less';
import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { Schemas } from 'ui/vis/editors/default/schemas';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import optionsTemplate from './prelert_swimlane_vis_options.html';

import './prelert_swimlane_vis_controller';
import template from './prelert_swimlane_vis.html';


function PrelertSwimlaneProvider(Private) {
  const VisFactory = Private(VisFactoryProvider);

  return VisFactory.createAngularVisualization({
    name: 'ml_swimlane',
    title: 'Swimlane',
    icon: 'fa fa-bars',
    description: 'Swimlane visualization displaying the behavior of a metric ' +
                  'over time across a field from the results. ' +
                  'Each lane displays a different value of the field, with the ' +
                  'relative size of the metric over each interval indicated ' +
                  'by the color of the symbol at that time. ' +
                  'Created by Prelert.',
    category: CATEGORY.OTHER,
    visConfig: {
      defaults: {
        index: 'user_study_5',
        sessionField: 'session.keyword',
        timeField: 'timestamp',
        geoField: 'map_center',
        scaleField: 'map_scale',
        actionField: 'message.keyword',
        actionValue: 'map-init CENTER_CHANGED'
      },
      template,
      intervalOptions: [
        { display: 'Auto', val: 'auto' },
        { display: '5 minutes', val: 'custom', customInterval: '5m' },
        { display: '10 minutes', val: 'custom', customInterval: '10m' },
        { display: '30 minutes', val: 'custom', customInterval: '30m' },
        { display: '1 hour', val: 'h' },
        { display: '3 hours', val: 'custom', customInterval: '3h' },
        { display: '12 hours', val: 'custom', customInterval: '12h' },
        { display: '1 day', val: 'd' }]
    },
    responseHandler: 'none',
    editorConfig: {
      collections: {},
      optionsTemplate,
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Value',
          min: 1,
          max: 1,
          aggFilter: [ 'count', 'avg', 'sum', 'min', 'max', 'cardinality' ]
        },
        {
          group: 'buckets',
          name: 'viewBy',
          icon: 'fa fa-eye',
          title: 'View by',
          mustBeFirst: true,
          min: 0,
          max: 1,
          aggFilter: 'terms'
        },
        {
          group: 'buckets',
          name: 'timeSplit',
          icon: 'fa fa-th',
          title: 'Time field',
          min: 1,
          max: 1,
          aggFilter: 'date_histogram'
        }
      ])
    }
  });
}

// register the provider with the visTypes registry
VisTypesRegistryProvider.register(PrelertSwimlaneProvider);

// export the provider so that the visType can be required with Private()
export default PrelertSwimlaneProvider;
