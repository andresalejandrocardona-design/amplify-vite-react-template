import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/* 
  Definición del esquema de datos para la aplicación de registro de despliegues
*/
const schema = a.schema({
  Despliegue: a
    .model({
      nombre: a.string().required(),
      responsable: a.string().required(),
      fechaHora: a.datetime().required(),
      descripcion: a.string(),
    })
    // Permitimos lectura/escritura pública mediante API Key para fines del laboratorio
    .authorization(allow => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});