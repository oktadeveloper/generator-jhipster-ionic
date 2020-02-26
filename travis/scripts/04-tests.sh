#!/bin/bash
set -e

#-------------------------------------------------------------------------------
# Launch Ionic for JHipster tests
#-------------------------------------------------------------------------------
cd "$TRAVIS_BUILD_DIR"
npm i
npm test

#-------------------------------------------------------------------------------
# Launch Ionic app tests
#-------------------------------------------------------------------------------
cd "$IONIC_FOLDER"
npm test
