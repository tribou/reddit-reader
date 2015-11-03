export const routes = [{
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'web/static',
    },
  },
}];

