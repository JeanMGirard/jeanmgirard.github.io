let fs = require('fs');
let yargs  = require('yargs');

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

// Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object

const environment = yargs.argv.environment;

let targetPath  = `./src/environments/environment.ts`;
let targetPath2 = `./src/environments/environment.prod.ts`;

function getText(isProd: boolean): string{
  return `
export const environment = {
  production: ${isProd},
  api: {
    live: ${process.env.API_LIVE}
  },
  google: {
    maps: {
      apiKey: "${process.env.GOOGLE_API_KEY}",
      placeId: "${process.env.GOOGLE_PLACEID}",
      shortUrl: "${process.env.GOOGLE_MAP_URL}",
      coordinates: "${process.env.MAP_COORD}"
    }
  },
  firebase: {
    apiKey:        "${process.env.FIRE_API_KEY}",
    authDomain:    "${process.env.FIRE_AUTH_DOM}",
    databaseURL:   "${process.env.FIRE_DB_URL}",
    projectId:     "${process.env.FIRE_PROJ_ID}",
    storageBucket: "${process.env.FIRE_BUCK}",
    messagingSenderId: "${process.env.FIRE_SENDER_ID}"
  }
};
`;
}


fs.writeFile(targetPath, getText(false), function (err) {
  if (err) { console.log(err);  }
  console.log(`Output generated at ${targetPath}`);
});
fs.writeFile(targetPath2, getText(true), function (err) {
  if (err) { console.log(err);  }
  console.log(`Output generated at ${targetPath2}`);
});
