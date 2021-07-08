FROM node:lts-slim

COPY . .
# In conjunction with the .dockerignore file
# This will only copy the files that we want
# And node_modules, build, log, etc will be ignored

RUN npm install

RUN npm run tsc

EXPOSE 4000

# Every Image must have a CMD or ENTRYPOINT instruction
# This instruction tells the container what process will be
# associated with the lifetime of the container
# They do basically the same thing
# But ENTRYPOINT is preferred if you are associating
# the process with a specific file
ENTRYPOINT ["node", "build/index.js"]