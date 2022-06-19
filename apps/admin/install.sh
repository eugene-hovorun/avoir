cp ../../package.json ./package.json
yarn 
netlify build && netlify deploy --prod