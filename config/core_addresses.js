"use strict";

/**
 * List of all addresses and there respective abi, bin, passphrase
 * required for platform.
 *
 * And helper methods to access this information using human readable
 * names.
 *
 */

const relPath = ".."
  , coreAbis = require('./core_abis')
  , coreBins = require('./core_bins');

var simpleTokenAbi, simpleTokenBin, simpleTokenAddr;

if (process.env.USE_MOCK_SIMPLE_TOKEN != 1) {
  console.log("Using Original Simple Token Contract");
  simpleTokenAddr = process.env.OST_SIMPLE_TOKEN_CONTRACT_ADDR;
  simpleTokenAbi = coreAbis.simpleToken;
  simpleTokenBin = coreBins.simpleToken;
} else {
  console.log("Using Mock Simple Token Contract");
  simpleTokenAddr = process.env.OST_SIMPLE_TOKEN_CONTRACT_ADDR;
  simpleTokenAbi = coreAbis.mockSimpleToken;
  simpleTokenBin = coreBins.mockSimpleToken;
}

const allAddresses = {
  users: {

    foundation: {
      address: process.env.OST_FOUNDATION_ADDR,
      passphrase: process.env.OST_FOUNDATION_PASSPHRASE
    },

    company: {
      address: process.env.OST_COMPANY_ADDR,
      passphrase: process.env.OST_COMPANY_PASSPHRASE
    },

    utilityChainOwner: {
      address: process.env.OST_UTILITY_CHAIN_OWNER_ADDR,
      passphrase: process.env.OST_UTILITY_CHAIN_OWNER_PASSPHRASE
    },

    valueRegistrar: {
      address: process.env.OST_VALUE_REGISTRAR_ADDR,
      passphrase: process.env.OST_VALUE_REGISTRAR_PASSPHRASE
    },

    utilityRegistrar: {
      address: process.env.OST_UTILITY_REGISTRAR_ADDR,
      passphrase: process.env.OST_UTILITY_REGISTRAR_PASSPHRASE
    },

    valueDeployer: {
      address: process.env.OST_VALUE_DEPLOYER_ADDR,
      passphrase: process.env.OST_VALUE_DEPLOYER_PASSPHRASE
    },

    utilityDeployer: {
      address: process.env.OST_UTILITY_DEPLOYER_ADDR,
      passphrase: process.env.OST_UTILITY_DEPLOYER_PASSPHRASE
    },

    valueOps: {
      address: process.env.OST_VALUE_OPS_ADDR,
      passphrase: process.env.OST_VALUE_OPS_PASSPHRASE
    }

  },

  contracts: {

    simpleToken: {
      address: simpleTokenAddr,
      abi: simpleTokenAbi,
      bin: simpleTokenBin
    },

    openSTUtility: {
      address: process.env.OST_OPENSTUTILITY_CONTRACT_ADDR,
      abi: coreAbis.openSTUtility,
      bin: coreBins.openSTUtility
    },

    openSTValue: {
      address: process.env.OST_OPENSTVALUE_CONTRACT_ADDR,
      abi: coreAbis.openSTValue,
      bin: coreBins.openSTValue
    },

    stPrime: {
      address: process.env.OST_STPRIME_CONTRACT_ADDR,
      abi: coreAbis.stPrime,
      bin: coreBins.stPrime
    },

    valueCore: {
      address: process.env.OST_VALUE_CORE_CONTRACT_ADDR,
      abi: coreAbis.valueCore,
      bin: coreBins.valueCore
    },

    valueRegistrar: {
      address: process.env.OST_VALUE_REGISTRAR_CONTRACT_ADDR,
      abi: coreAbis.valueRegistrar,
      bin: coreBins.valueRegistrar
    },

    utilityRegistrar: {
      address: process.env.OST_UTILITY_REGISTRAR_CONTRACT_ADDR,
      abi: coreAbis.utilityRegistrar,
      bin: coreBins.utilityRegistrar
    },

    brandedToken: {
      address: null,
      abi: coreAbis.brandedToken,
      bin: coreBins.brandedToken
    },
    simpleStake: {
      address: null,
      abi: coreAbis.simpleStake,
      bin: coreBins.simpleStake
    }
  }
};

// generate a contract address to name map for reverse lookup
const addrToContractNameMap = {};
for (var contractName in allAddresses.contracts) {
  var addr = allAddresses.contracts[contractName].address;

  if ( Array.isArray(addr) ) {
    for (var i = 0; i < addr.length; i++) {
      addrToContractNameMap[addr[i].toLowerCase()] = contractName;
    }
  } else if ( addr !== null && typeof addr !== "undefined") {
    addrToContractNameMap[addr.toLowerCase()] = contractName;
  }
}

// helper methods to access difference addresses and their respective details
const coreAddresses = {
  getAddressForUser: function(userName) {
    return allAddresses.users[userName].address;
  },

  getPassphraseForUser: function(userName) {
    return allAddresses.users[userName].passphrase;
  },

  getAddressForContract: function(contractName) {
    var contractAddress = allAddresses.contracts[contractName].address;
    if (Array.isArray(contractAddress)) {
      throw "Please pass valid contractName to get contract address for: "+contractName;
    }
    return contractAddress;
  },

  // This must return array of addresses.
  getAddressesForContract: function(contractName) {
    var contractAddresses = allAddresses.contracts[contractName].address;
    if (!contractAddresses || !Array.isArray(contractAddresses) || contractAddresses.length===0) {
      throw "Please pass valid contractName to get contract address for: "+contractName;
    }
    return contractAddresses;
  },

  getContractNameFor: function(contractAddr) {
    return addrToContractNameMap[(contractAddr || '').toLowerCase()];
  },

  getAbiForContract: function(contractName) {
    return allAddresses.contracts[contractName].abi;
  },

  getBinForContract: function(contractName) {
    return allAddresses.contracts[contractName].bin;
  }
};

module.exports = coreAddresses;

