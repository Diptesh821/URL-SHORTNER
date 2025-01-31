'use strict';

var alphabet = require('./alphabet');
var build = require('./build');
var isValid = require('./is-valid');

// Variables from config;

var _defaultLength = true;
var _configLength;

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = require('./util/cluster-worker-id') || 0;

/* Config params
 * If defined, sets additional params for the module.
 * exposed as shortid.config(object)
 * @param obejct Object that colud contains:
 * disableDefaultAlphabetLength: (boolean) Disables the original Alphabet Length limitation.
 * disableDefaultIdLength: (boolean) Disables the original module ID generate length and requires the idLength parameter.
 * idLength: (number) Indicates the desired Id length
 */
function config(config) {
    if(config.disableDefaultAlphabetLength) {
        alphabet.setDefaults(true);
    }
    if(config.disableDefaultIdLength) {
        
        if(!config.idLength) {
            throw 'If you sets disableDefaultIdLength to true the parameter idLength is required'
        } else {
            build.setDefaults({
                configLength: config.idLength,
                disableDefault: true
            })
        }
    }
}

/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}

/**
 * Generate unique id
 * Returns string id
 */
function generate() {
  return build.build(clusterWorkerId);
}

// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.isValid = isValid;
module.exports.config = config;
