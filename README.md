# Alexa skill for Guild Wars 2

It is a german skill.

- cd src
- npm install
- npm run build

The 2nd step downloads the Alexa sdk. The 3rd step builds the file /tmp/alexa.zip suitable for uploading to AWS lambda.
The skills invocation name should be 'Guild Wars'. Please use the files in directory speechAssets for setting up the skill.
You have to set an environment variable GW2TOKEN to your GW2 API key during lambda setup.

Questions:

- Alexa, frage Guild Wars, wieviel Gold ich habe.
- Alexa, frage Guild Wars, wer ich bin.

There are 2 more npm scripts:

- npm run deploy: runs the build and uploads the file to AWS lambda
- npm test: runs mocha tests
