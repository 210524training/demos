# Logging

## What is logging?

Output statements that describe the current situation of a running program.
Does `console.log` really count as logging? In general, we want our logs to persistent somewhere.
Functions like `console.log` are ephemeral, and are destroyed when a program ends.
We want our logs to be saved somewhere, so that they can be used to re-construct what was happening in the program at different points.
In particular this is very valuable to track down bugs.

## Modern Logging

We want permanent and configurable logs. Modern logs should have different tiers of logs that have different meanings.
Is this log helpful debug information? Is it a warning of a potential issue? Is it detecting a catastrophic issue?
Is it just general information about the current status, that isn't tied to any other meaning?

### Logging Levels

We are able to create log statements associated with certain logging levels.
In addition, we have global logging configuration to specify which logging levels should be saved.

- ALL: Everything gets logged
    - Global log level config
- TRACE - Fine grain details of everything in the application
    - Some logging utilities have TRACE be only a global log level config
- DEBUG - A log level that indicates this message can be used to debug
    - In general, this is what our `console.log` statements turn into
- INFO - High-level alerts about changes to the application state (user stories)
- WARN - Something bad happened but it doesn't result in an error
    - e.g. Someone tried to log in unsuccessfully 3 times
- ERROR - Log when errors occur
    - That don't result in the application ending
    - Despite the error, the application can continue to operate
- FATAL - Log situations that will result in the program terminating
- OFF - Turn off logging

Logging Levels are cumulative. ERROR includes FATAL. DEBUG includes INFO, WARN, ERROR, and FATAL.
It's effectively: The current level plus more severe levels.

In some logging utilities, TRACE can be used to customize and define your own logging levels.

## Log4js

A logging utility that supports Node.

### Setup
1. `npm install log4js`
    - Note: This does *not* use `--save-dev` because this is a dependency we need during actual runtime
2. Create a `logconfig.json` file