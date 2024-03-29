export function handleResponse(vis, response) {
  return response.aggregations.sessions.buckets.map(session => {
    const events = session.events.hits.hits.map(event => {
      return {
        center: {
          x: event._source[vis.params.geoField].x,
          y: event._source[vis.params.geoField].y
        },
        scale: event._source[vis.params.scaleField],
      };
    });
    return {
      events,
      session_key: session.key
    };
  });
}