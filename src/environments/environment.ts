// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// ng build --env=prod
export const environment = {
  production: false,
  baseApiFacturacion: 'http://api.dev.facturasiweb.com/',
  baseApiCatalogos: 'http://api.dev.facturasiweb.com/',
  baseApiReportes: 'http://api.dev.facturasiweb.com/',
  baseApiConsultas: 'http://api.dev.facturasiweb.com/',  
      // baseApiFacturacion: 'http://apiFact.dev.facturasiweb.com/',
      // baseApiCatalogos: 'http://apiCatalogos.dev.facturasiweb.com/',
      // baseApiReportes: 'http://apiReportes.dev.facturasiweb.com/',
      // baseApiConsultas: 'http://apiConsultas.dev.facturasiweb.com/',
      // baseApiFacturacion: 'http://localhost:52733/',
      // baseApiInventario: 'http://localhost:52733/',
      // baseApiCatalogos: 'http://localhost:52733/',
  //  baseApi: 'http://localhost:3000/'
};
