var eosjs2 =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/eosjs2-api.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/eosjs2-api.ts":
/*!***************************!*\
  !*** ./src/eosjs2-api.ts ***!
  \***************************/
/*! exports provided: serialize, Api */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serialize", function() { return serialize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Api", function() { return Api; });
/* harmony import */ var _eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eosjs2-serialize */ "./src/eosjs2-serialize.ts");
// copyright defined in eosjs2/LICENSE.txt

var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};

const transactionAbi = __webpack_require__(/*! ../src/transaction.abi.json */ "./src/transaction.abi.json");
const serialize = _eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__;
class Api {
    constructor(args) {
        this.contracts = new Map();
        this.rpc = args.rpc;
        this.authorityProvider = args.authorityProvider || args.rpc;
        this.signatureProvider = args.signatureProvider;
        this.chainId = args.chainId;
        this.transactionTypes = _eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__["getTypesFromAbi"](_eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__["createInitialTypes"](), transactionAbi);
    }
    async getContract(accountName, reload = false) {
        if (!reload && this.contracts.get(accountName))
            return this.contracts.get(accountName);
        let abi;
        try {
            abi = (await this.rpc.get_abi(accountName)).abi;
        }
        catch (e) {
            e.message = 'fetching abi for ' + accountName + ': ' + e.message;
            throw e;
        }
        if (!abi)
            throw new Error("Missing abi for " + accountName);
        let types = _eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__["getTypesFromAbi"](_eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__["createInitialTypes"](), abi);
        let actions = new Map();
        for (let { name, type } of abi.actions)
            actions.set(name, _eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__["getType"](types, type));
        let result = { types, actions };
        this.contracts.set(accountName, result);
        return result;
    }
    serialize(buffer, type, value) {
        this.transactionTypes.get(type).serialize(buffer, value);
    }
    deserialize(buffer, type) {
        return this.transactionTypes.get(type).deserialize(buffer);
    }
    serializeTransaction(transaction) {
        let buffer = new _eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__["SerialBuffer"];
        this.serialize(buffer, 'transaction', Object.assign({ max_net_usage_words: 0, max_cpu_usage_ms: 0, delay_sec: 0, context_free_actions: [], actions: [], transaction_extensions: [] }, transaction));
        return buffer.asUint8Array();
    }
    deserializeTransaction(transaction) {
        const buffer = new _eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__["SerialBuffer"]();
        buffer.pushArray(transaction);
        return this.deserialize(buffer, 'transaction');
    }
    async serializeActions(actions) {
        return await Promise.all(actions.map(async ({ account, name, authorization, data }) => {
            const contract = await this.getContract(account);
            return _eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__["serializeAction"](contract, account, name, authorization, data);
        }));
    }
    async deserializeActions(actions) {
        return await Promise.all(actions.map(async ({ account, name, authorization, data }) => {
            const contract = await this.getContract(account);
            return _eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__["deserializeAction"](contract, account, name, authorization, data);
        }));
    }
    async deserializeTransactionWithActions(transaction) {
        if (typeof transaction === "string") {
            transaction = _eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__["hexToUint8Array"](transaction);
        }
        let deserializedTransaction = this.deserializeTransaction(transaction);
        const deserializedActions = await this.deserializeActions(deserializedTransaction.actions);
        return Object.assign({}, deserializedTransaction, { actions: deserializedActions });
    }
    // eventually break out into TransactionValidator class
    hasRequiredTaposFields(_a) {
        var { expiration, ref_block_num, ref_block_prefix } = _a, transaction = __rest(_a, ["expiration", "ref_block_num", "ref_block_prefix"]);
        return !!(expiration && ref_block_num && ref_block_prefix);
    }
    async transact(transaction, { broadcast = true, blocksBehind, expireSeconds } = {}) {
        let info;
        if (!this.chainId) {
            info = await this.rpc.get_info();
            this.chainId = info.chain_id;
        }
        if (typeof blocksBehind === "number" && expireSeconds) { // use config fields to generate TAPOS if they exist
            if (!info) {
                info = await this.rpc.get_info();
            }
            let refBlock = await this.rpc.get_block(info.head_block_num - blocksBehind);
            transaction = Object.assign({}, _eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__["transactionHeader"](refBlock, expireSeconds), transaction);
        }
        if (!this.hasRequiredTaposFields(transaction)) {
            throw new Error("Required configuration or TAPOS fields are not present");
        }
        transaction = Object.assign({}, transaction, { actions: await this.serializeActions(transaction.actions) });
        let serializedTransaction = this.serializeTransaction(transaction);
        let availableKeys = await this.signatureProvider.getAvailableKeys();
        let requiredKeys = await this.authorityProvider.getRequiredKeys({ transaction, availableKeys });
        let signatures = await this.signatureProvider.sign({ chainId: this.chainId, requiredKeys, serializedTransaction });
        let pushTransactionArgs = { signatures, serializedTransaction };
        if (broadcast) {
            return this.pushSignedTransaction(pushTransactionArgs);
        }
        return pushTransactionArgs;
    }
    async pushSignedTransaction({ signatures, serializedTransaction }) {
        return this.rpc.push_transaction({
            signatures,
            serializedTransaction,
        });
    }
} // Api


/***/ }),

/***/ "./src/eosjs2-numeric.ts":
/*!*******************************!*\
  !*** ./src/eosjs2-numeric.ts ***!
  \*******************************/
/*! exports provided: isNegative, negate, decimalToBinary, signedDecimalToBinary, binaryToDecimal, signedBinaryToDecimal, base58ToBinary, binaryToBase58, publicKeyDataSize, privateKeyDataSize, signatureDataSize, stringToPublicKey, publicKeyToString, stringToPrivateKey, privateKeyToString, stringToSignature, signatureToString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNegative", function() { return isNegative; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negate", function() { return negate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decimalToBinary", function() { return decimalToBinary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signedDecimalToBinary", function() { return signedDecimalToBinary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "binaryToDecimal", function() { return binaryToDecimal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signedBinaryToDecimal", function() { return signedBinaryToDecimal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base58ToBinary", function() { return base58ToBinary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "binaryToBase58", function() { return binaryToBase58; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publicKeyDataSize", function() { return publicKeyDataSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "privateKeyDataSize", function() { return privateKeyDataSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signatureDataSize", function() { return signatureDataSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToPublicKey", function() { return stringToPublicKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publicKeyToString", function() { return publicKeyToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToPrivateKey", function() { return stringToPrivateKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "privateKeyToString", function() { return privateKeyToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToSignature", function() { return stringToSignature; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signatureToString", function() { return signatureToString; });
// copyright defined in eosjs2/LICENSE.txt

const ripemd160 = __webpack_require__(/*! ./ripemd */ "./src/ripemd.js").RIPEMD160.hash;
const base58_chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
function create_base58_map() {
    let base58_map = Array(256).fill(-1);
    for (let i = 0; i < base58_chars.length; ++i)
        base58_map[base58_chars.charCodeAt(i)] = i;
    return base58_map;
}
const base58_map = create_base58_map();
function isNegative(bin) {
    return (bin[bin.length - 1] & 0x80) !== 0;
}
function negate(bin) {
    let carry = 1;
    for (let i = 0; i < bin.length; ++i) {
        let x = (~bin[i] & 0xff) + carry;
        bin[i] = x;
        carry = x >> 8;
    }
}
function decimalToBinary(size, s) {
    let result = new Uint8Array(size);
    for (let i = 0; i < s.length; ++i) {
        let srcDigit = s.charCodeAt(i);
        if (srcDigit < '0'.charCodeAt(0) || srcDigit > '9'.charCodeAt(0))
            throw new Error("invalid number");
        let carry = srcDigit - '0'.charCodeAt(0);
        for (let j = 0; j < size; ++j) {
            let x = result[j] * 10 + carry;
            result[j] = x;
            carry = x >> 8;
        }
        if (carry)
            throw new Error("number is out of range");
    }
    return result;
}
function signedDecimalToBinary(size, s) {
    let negative = s[0] === '-';
    if (negative)
        s = s.substr(1);
    let result = decimalToBinary(size, s);
    if (negative)
        negate(result);
    return result;
}
function binaryToDecimal(bin, minDigits = 1) {
    let result = Array(minDigits).fill('0'.charCodeAt(0));
    for (let i = bin.length - 1; i >= 0; --i) {
        let carry = bin[i];
        for (let j = 0; j < result.length; ++j) {
            let x = ((result[j] - '0'.charCodeAt(0)) << 8) + carry;
            result[j] = '0'.charCodeAt(0) + x % 10;
            carry = (x / 10) | 0;
        }
        while (carry) {
            result.push('0'.charCodeAt(0) + carry % 10);
            carry = (carry / 10) | 0;
        }
    }
    result.reverse();
    return String.fromCharCode(...result);
}
function signedBinaryToDecimal(bin, minDigits = 1) {
    if (isNegative(bin)) {
        let x = bin.slice();
        negate(x);
        return '-' + binaryToDecimal(x, minDigits);
    }
    return binaryToDecimal(bin, minDigits);
}
function base58ToBinary(size, s) {
    let result = new Uint8Array(size);
    for (let i = 0; i < s.length; ++i) {
        let carry = base58_map[s.charCodeAt(i)];
        if (carry < 0)
            throw new Error("invalid base-58 value");
        for (let j = 0; j < size; ++j) {
            let x = result[j] * 58 + carry;
            result[j] = x;
            carry = x >> 8;
        }
        if (carry)
            throw new Error("base-58 value is out of range");
    }
    result.reverse();
    return result;
}
function binaryToBase58(bin, minDigits = 1) {
    let result = [];
    for (let byte of bin) {
        let carry = byte;
        for (let j = 0; j < result.length; ++j) {
            let x = (base58_map[result[j]] << 8) + carry;
            result[j] = base58_chars.charCodeAt(x % 58);
            carry = (x / 58) | 0;
        }
        while (carry) {
            result.push(base58_chars.charCodeAt(carry % 58));
            carry = (carry / 58) | 0;
        }
    }
    for (let byte of bin)
        if (byte)
            break;
        else
            result.push('1'.charCodeAt(0));
    result.reverse();
    return String.fromCharCode(...result);
}
;
const publicKeyDataSize = 33;
const privateKeyDataSize = 32;
const signatureDataSize = 65;
;
function digestSuffixRipemd160(data, suffix) {
    let d = new Uint8Array(data.length + suffix.length);
    for (let i = 0; i < data.length; ++i)
        d[i] = data[i];
    for (let i = 0; i < suffix.length; ++i)
        d[data.length + i] = suffix.charCodeAt(i);
    return ripemd160(d);
}
function stringToKey(s, type, size, suffix) {
    let whole = base58ToBinary(size + 4, s);
    let result = { type, data: new Uint8Array(whole.buffer, 0, size) };
    let digest = new Uint8Array(digestSuffixRipemd160(result.data, suffix));
    if (digest[0] !== whole[size + 0] || digest[1] !== whole[size + 1] || digest[2] !== whole[size + 2] || digest[3] !== whole[size + 3])
        throw new Error("checksum doesn't match");
    return result;
}
function keyToString(key, suffix, prefix) {
    let digest = new Uint8Array(digestSuffixRipemd160(key.data, suffix));
    let whole = new Uint8Array(key.data.length + 4);
    for (let i = 0; i < key.data.length; ++i)
        whole[i] = key.data[i];
    for (let i = 0; i < 4; ++i)
        whole[i + key.data.length] = digest[i];
    return prefix + binaryToBase58(whole);
}
function stringToPublicKey(s) {
    if (s.substr(0, 3) == "EOS") {
        let whole = base58ToBinary(publicKeyDataSize + 4, s.substr(3));
        let key = { type: 0 /* k1 */, data: new Uint8Array(publicKeyDataSize) };
        for (let i = 0; i < publicKeyDataSize; ++i)
            key.data[i] = whole[i];
        let digest = new Uint8Array(ripemd160(key.data));
        if (digest[0] !== whole[publicKeyDataSize] || digest[1] !== whole[34] || digest[2] !== whole[35] || digest[3] !== whole[36])
            throw new Error("checksum doesn't match");
        return key;
    }
    else if (s.substr(0, 7) == "PUB_R1_") {
        return stringToKey(s.substr(7), 1 /* r1 */, publicKeyDataSize, "R1");
    }
    else {
        throw new Error("unrecognized public key format");
    }
}
function publicKeyToString(key) {
    if (key.type == 0 /* k1 */ && key.data.length == publicKeyDataSize) {
        let digest = new Uint8Array(ripemd160(key.data));
        let whole = new Uint8Array(publicKeyDataSize + 4);
        for (let i = 0; i < publicKeyDataSize; ++i)
            whole[i] = key.data[i];
        for (let i = 0; i < 4; ++i)
            whole[i + publicKeyDataSize] = digest[i];
        return "EOS" + binaryToBase58(whole);
    }
    else if (key.type == 1 /* r1 */ && key.data.length == publicKeyDataSize) {
        return keyToString(key, "R1", "PUB_R1_");
    }
    else {
        throw new Error("unrecognized public key format");
    }
}
function stringToPrivateKey(s) {
    if (s.substr(0, 7) == "PVT_R1_")
        return stringToKey(s.substr(7), 1 /* r1 */, privateKeyDataSize, "R1");
    else
        throw new Error("unrecognized private key format");
}
function privateKeyToString(signature) {
    if (signature.type == 1 /* r1 */)
        return keyToString(signature, "R1", "PVT_R1_");
    else
        throw new Error("unrecognized private key format");
}
function stringToSignature(s) {
    if (s.substr(0, 7) == "SIG_K1_")
        return stringToKey(s.substr(7), 0 /* k1 */, signatureDataSize, "K1");
    else if (s.substr(0, 7) == "SIG_R1_")
        return stringToKey(s.substr(7), 1 /* r1 */, signatureDataSize, "R1");
    else
        throw new Error("unrecognized signature format");
}
function signatureToString(signature) {
    if (signature.type == 0 /* k1 */)
        return keyToString(signature, "K1", "SIG_K1_");
    else if (signature.type == 1 /* r1 */)
        return keyToString(signature, "R1", "SIG_R1_");
    else
        throw new Error("unrecognized signature format");
}


/***/ }),

/***/ "./src/eosjs2-serialize.ts":
/*!*********************************!*\
  !*** ./src/eosjs2-serialize.ts ***!
  \*********************************/
/*! exports provided: SerialBuffer, dateToTimePoint, timePointToDate, dateToTimePointSec, timePointSecToDate, dateToBlockTimestamp, blockTimestampToDate, stringToSymbol, symbolToString, arrayToHex, hexToUint8Array, createInitialTypes, getType, getTypesFromAbi, transactionHeader, serializeActionData, serializeAction, deserializeActionData, deserializeAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SerialBuffer", function() { return SerialBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateToTimePoint", function() { return dateToTimePoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timePointToDate", function() { return timePointToDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateToTimePointSec", function() { return dateToTimePointSec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timePointSecToDate", function() { return timePointSecToDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateToBlockTimestamp", function() { return dateToBlockTimestamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blockTimestampToDate", function() { return blockTimestampToDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToSymbol", function() { return stringToSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "symbolToString", function() { return symbolToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayToHex", function() { return arrayToHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexToUint8Array", function() { return hexToUint8Array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createInitialTypes", function() { return createInitialTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getType", function() { return getType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTypesFromAbi", function() { return getTypesFromAbi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transactionHeader", function() { return transactionHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serializeActionData", function() { return serializeActionData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serializeAction", function() { return serializeAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deserializeActionData", function() { return deserializeActionData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deserializeAction", function() { return deserializeAction; });
/* harmony import */ var _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eosjs2-numeric */ "./src/eosjs2-numeric.ts");
// copyright defined in eosjs2/LICENSE.txt


class SerialBuffer {
    constructor({ textEncoder, textDecoder } = {}) {
        this.length = 0;
        this.array = new Uint8Array(1024);
        this.readPos = 0;
        this.textEncoder = textEncoder || new TextEncoder;
        this.textDecoder = textDecoder || new TextDecoder('utf-8', { fatal: true });
    }
    reserve(size) {
        if (this.length + size <= this.array.length)
            return;
        let l = this.array.length;
        while (this.length + size > l)
            l = Math.ceil(l * 1.5);
        let newArray = new Uint8Array(l);
        newArray.set(this.array);
        this.array = newArray;
    }
    asUint8Array() {
        return new Uint8Array(this.array.buffer, 0, this.length);
    }
    pushArray(v) {
        this.reserve(v.length);
        this.array.set(v, this.length);
        this.length += v.length;
    }
    push(...v) {
        this.pushArray(v);
    }
    get() {
        if (this.readPos < this.length)
            return this.array[this.readPos++];
        throw new Error('Read past end of buffer');
    }
    pushUint8ArrayChecked(v, len) {
        if (v.length !== len)
            throw new Error('Binary data has incorrect size');
        this.pushArray(v);
    }
    getUint8Array(len) {
        if (this.readPos + len > this.length)
            throw new Error('Read past end of buffer');
        let result = new Uint8Array(this.array.buffer, this.readPos, len);
        this.readPos += len;
        return result;
    }
    pushUint16(v) {
        this.push((v >> 0) & 0xff, (v >> 8) & 0xff);
    }
    getUint16() {
        let v = 0;
        v |= this.get() << 0;
        v |= this.get() << 8;
        return v;
    }
    pushUint32(v) {
        this.push((v >> 0) & 0xff, (v >> 8) & 0xff, (v >> 16) & 0xff, (v >> 24) & 0xff);
    }
    getUint32() {
        let v = 0;
        v |= this.get() << 0;
        v |= this.get() << 8;
        v |= this.get() << 16;
        v |= this.get() << 24;
        return v >>> 0;
    }
    pushNumberAsUint64(v) {
        this.pushUint32(v >>> 0);
        this.pushUint32(Math.floor(v / 4294967296) >>> 0);
    }
    getUint64AsNumber() {
        let low = this.getUint32();
        let high = this.getUint32();
        return (high >>> 0) * 4294967296 + (low >>> 0);
    }
    pushVaruint32(v) {
        while (true) {
            if (v >>> 7) {
                this.push(0x80 | (v & 0x7f));
                v = v >>> 7;
            }
            else {
                this.push(v);
                break;
            }
        }
    }
    getVaruint32() {
        let v = 0;
        let bit = 0;
        while (true) {
            let b = this.get();
            v |= (b & 0x7f) << bit;
            bit += 7;
            if (!(b & 0x80))
                break;
        }
        return v >>> 0;
    }
    pushVarint32(v) {
        this.pushVaruint32((v << 1) ^ (v >> 31));
    }
    getVarint32() {
        let v = this.getVaruint32();
        if (v & 1)
            return ((~v) >> 1) | 2147483648;
        else
            return v >>> 1;
    }
    pushFloat32(v) {
        this.pushArray(new Uint8Array((new Float32Array([v])).buffer));
    }
    getFloat32() {
        return new Float32Array(this.getUint8Array(4).slice().buffer)[0];
    }
    pushFloat64(v) {
        this.pushArray(new Uint8Array((new Float64Array([v])).buffer));
    }
    getFloat64() {
        return new Float64Array(this.getUint8Array(8).slice().buffer)[0];
    }
    pushName(s) {
        function charToSymbol(c) {
            if (c >= 'a'.charCodeAt(0) && c <= 'z'.charCodeAt(0))
                return (c - 'a'.charCodeAt(0)) + 6;
            if (c >= '1'.charCodeAt(0) && c <= '5'.charCodeAt(0))
                return (c - '1'.charCodeAt(0)) + 1;
            return 0;
        }
        let a = new Uint8Array(8);
        let bit = 63;
        for (let i = 0; i < s.length; ++i) {
            let c = charToSymbol(s.charCodeAt(i));
            if (bit < 5)
                c = c << 1;
            for (let j = 4; j >= 0; --j) {
                if (bit >= 0) {
                    a[Math.floor(bit / 8)] |= ((c >> j) & 1) << (bit % 8);
                    --bit;
                }
            }
        }
        this.pushArray(a);
    }
    getName() {
        let a = this.getUint8Array(8);
        let result = '';
        for (let bit = 63; bit >= 0;) {
            let c = 0;
            for (let i = 0; i < 5; ++i) {
                if (bit >= 0) {
                    c = (c << 1) | ((a[Math.floor(bit / 8)] >> (bit % 8)) & 1);
                    --bit;
                }
            }
            if (c >= 6)
                result += String.fromCharCode(c + 'a'.charCodeAt(0) - 6);
            else if (c >= 1)
                result += String.fromCharCode(c + '1'.charCodeAt(0) - 1);
            else
                result += '.';
        }
        if (result === '.............')
            return result;
        while (result.endsWith('.'))
            result = result.substr(0, result.length - 1);
        return result;
    }
    pushBytes(v) {
        this.pushVaruint32(v.length);
        this.pushArray(v);
    }
    getBytes() {
        return this.getUint8Array(this.getVaruint32());
    }
    pushString(v) {
        this.pushBytes(this.textEncoder.encode(v));
    }
    getString() {
        return this.textDecoder.decode(this.getBytes());
    }
    pushSymbolCode(name) {
        let a = [];
        a.push(...this.textEncoder.encode(name));
        while (a.length < 8)
            a.push(0);
        this.pushArray(a.slice(0, 8));
    }
    getSymbolCode() {
        let a = this.getUint8Array(8);
        let len;
        for (len = 0; len < a.length; ++len)
            if (!a[len])
                break;
        let name = this.textDecoder.decode(new Uint8Array(a.buffer, a.byteOffset, len));
        return name;
    }
    pushSymbol({ name, precision }) {
        let a = [precision & 0xff];
        a.push(...this.textEncoder.encode(name));
        while (a.length < 8)
            a.push(0);
        this.pushArray(a.slice(0, 8));
    }
    getSymbol() {
        let precision = this.get();
        let a = this.getUint8Array(7);
        let len;
        for (len = 0; len < a.length; ++len)
            if (!a[len])
                break;
        let name = this.textDecoder.decode(new Uint8Array(a.buffer, a.byteOffset, len));
        return { name, precision };
    }
    pushAsset(s) {
        s = s.trim();
        let pos = 0;
        let amount = '';
        let precision = 0;
        if (s[pos] === '-') {
            amount += '-';
            ++pos;
        }
        let foundDigit = false;
        while (pos < s.length && s.charCodeAt(pos) >= '0'.charCodeAt(0) && s.charCodeAt(pos) <= '9'.charCodeAt(0)) {
            foundDigit = true;
            amount += s[pos];
            ++pos;
        }
        if (!foundDigit)
            throw new Error('Asset must begin with a number');
        if (s[pos] === '.') {
            ++pos;
            while (pos < s.length && s.charCodeAt(pos) >= '0'.charCodeAt(0) && s.charCodeAt(pos) <= '9'.charCodeAt(0)) {
                amount += s[pos];
                ++precision;
                ++pos;
            }
        }
        let name = s.substr(pos).trim();
        this.pushArray(_eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["signedDecimalToBinary"](8, amount));
        this.pushSymbol({ name, precision });
    }
    getAsset() {
        let amount = this.getUint8Array(8);
        let { name, precision } = this.getSymbol();
        let s = _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["signedBinaryToDecimal"](amount, precision + 1);
        if (precision)
            s = s.substr(0, s.length - precision) + '.' + s.substr(s.length - precision);
        return s + ' ' + name;
    }
    pushPublicKey(s) {
        let key = _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["stringToPublicKey"](s);
        this.push(key.type);
        this.pushArray(key.data);
    }
    getPublicKey() {
        let type = this.get();
        let data = this.getUint8Array(_eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["publicKeyDataSize"]);
        return _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["publicKeyToString"]({ type, data });
    }
    pushPrivateKey(s) {
        let key = _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["stringToPrivateKey"](s);
        this.push(key.type);
        this.pushArray(key.data);
    }
    getPrivateKey() {
        let type = this.get();
        let data = this.getUint8Array(_eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["privateKeyDataSize"]);
        return _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["privateKeyToString"]({ type, data });
    }
    pushSignature(s) {
        let key = _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["stringToSignature"](s);
        this.push(key.type);
        this.pushArray(key.data);
    }
    getSignature() {
        let type = this.get();
        let data = this.getUint8Array(_eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["signatureDataSize"]);
        return _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["signatureToString"]({ type, data });
    }
} // SerialBuffer
function dateToTimePoint(date) {
    return Math.round(Date.parse(date + 'Z') * 1000);
}
function timePointToDate(us) {
    let s = (new Date(us / 1000)).toISOString();
    return s.substr(0, s.length - 1);
}
function dateToTimePointSec(date) {
    return Math.round(Date.parse(date + 'Z') / 1000);
}
function timePointSecToDate(sec) {
    let s = (new Date(sec * 1000)).toISOString();
    return s.substr(0, s.length - 1);
}
function dateToBlockTimestamp(date) {
    return Math.round((Date.parse(date + 'Z') - 946684800000) / 500);
}
function blockTimestampToDate(slot) {
    let s = (new Date(slot * 500 + 946684800000)).toISOString();
    return s.substr(0, s.length - 1);
}
function stringToSymbol(s) {
    let m = s.match(/^([0-9]+),([A-Z]+)$/);
    if (!m)
        throw new Error('Invalid symbol');
    return { name: m[2], precision: +m[1] };
}
function symbolToString({ name, precision }) {
    return precision + ',' + name;
}
function arrayToHex(data) {
    let result = '';
    for (let x of data)
        result += ('00' + x.toString(16)).slice(-2);
    return result.toUpperCase();
}
function hexToUint8Array(hex) {
    let l = hex.length / 2;
    let result = new Uint8Array(l);
    for (let i = 0; i < l; ++i)
        result[i] = parseInt(hex.substr(i * 2, 2), 16);
    return result;
}
function serializeUnknown(buffer, data) {
    throw new Error("Don't know how to serialize " + this.name);
}
function deserializeUnknown(buffer) {
    throw new Error("Don't know how to deserialize " + this.name);
}
function serializeStruct(buffer, data) {
    if (this.base)
        this.base.serialize(buffer, data);
    for (let field of this.fields) {
        if (!(field.name in data))
            throw new Error('missing ' + this.name + '.' + field.name + ' (type=' + field.type.name + ')');
        field.type.serialize(buffer, data[field.name]);
    }
}
function deserializeStruct(buffer) {
    let result;
    if (this.base)
        result = this.base.deserialize(buffer);
    else
        result = {};
    for (let field of this.fields)
        result[field.name] = field.type.deserialize(buffer);
    return result;
}
function serializeArray(buffer, data) {
    buffer.pushVaruint32(data.length);
    for (let item of data)
        this.arrayOf.serialize(buffer, item);
}
function deserializeArray(buffer) {
    let len = buffer.getVaruint32();
    let result = [];
    for (let i = 0; i < len; ++i)
        result.push(this.arrayOf.deserialize(buffer));
    return result;
}
function serializeOptional(buffer, data) {
    if (data === null || data === undefined) {
        buffer.push(0);
    }
    else {
        buffer.push(1);
        this.optionalOf.serialize(buffer, data);
    }
}
function deserializeOptional(buffer) {
    if (buffer.get())
        return this.optionalOf.deserialize(buffer);
    else
        return null;
}
function createType(attrs) {
    return Object.assign({ name: '<missing name>', aliasOfName: '', arrayOf: null, optionalOf: null, baseName: '', base: null, fields: [], serialize: serializeUnknown, deserialize: deserializeUnknown }, attrs);
}
function createInitialTypes() {
    let result = new Map(Object.entries({
        bool: createType({
            name: 'bool',
            serialize(buffer, data) { buffer.push(data ? 1 : 0); },
            deserialize(buffer) { return !!buffer.get(); },
        }),
        uint8: createType({
            name: 'uint8',
            serialize(buffer, data) { buffer.push(data); },
            deserialize(buffer) { return buffer.get(); },
        }),
        int8: createType({
            name: 'int8',
            serialize(buffer, data) { buffer.push(data); },
            deserialize(buffer) { return buffer.get() << 24 >> 24; },
        }),
        uint16: createType({
            name: 'uint16',
            serialize(buffer, data) { buffer.pushUint16(data); },
            deserialize(buffer) { return buffer.getUint16(); },
        }),
        int16: createType({
            name: 'int16',
            serialize(buffer, data) { buffer.pushUint16(data); },
            deserialize(buffer) { return buffer.getUint16() << 16 >> 16; },
        }),
        uint32: createType({
            name: 'uint32',
            serialize(buffer, data) { buffer.pushUint32(data); },
            deserialize(buffer) { return buffer.getUint32(); },
        }),
        uint64: createType({
            name: 'uint64',
            serialize(buffer, data) { buffer.pushArray(_eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["decimalToBinary"](8, '' + data)); },
            deserialize(buffer) { return _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["binaryToDecimal"](buffer.getUint8Array(8)); },
        }),
        int64: createType({
            name: 'int64',
            serialize(buffer, data) { buffer.pushArray(_eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["signedDecimalToBinary"](8, '' + data)); },
            deserialize(buffer) { return _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["signedBinaryToDecimal"](buffer.getUint8Array(8)); },
        }),
        int32: createType({
            name: 'int32',
            serialize(buffer, data) { buffer.pushUint32(data); },
            deserialize(buffer) { return buffer.getUint32() | 0; },
        }),
        varuint32: createType({
            name: 'varuint32',
            serialize(buffer, data) { buffer.pushVaruint32(data); },
            deserialize(buffer) { return buffer.getVaruint32(); },
        }),
        varint32: createType({
            name: 'varint32',
            serialize(buffer, data) { buffer.pushVarint32(data); },
            deserialize(buffer) { return buffer.getVarint32(); },
        }),
        uint128: createType({
            name: 'uint128',
            serialize(buffer, data) { buffer.pushArray(_eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["decimalToBinary"](16, data)); },
            deserialize(buffer) { return _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["binaryToDecimal"](buffer.getUint8Array(16)); },
        }),
        int128: createType({
            name: 'int128',
            serialize(buffer, data) { buffer.pushArray(_eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["signedDecimalToBinary"](16, data)); },
            deserialize(buffer) { return _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["signedBinaryToDecimal"](buffer.getUint8Array(16)); },
        }),
        float32: createType({
            name: 'float32',
            serialize(buffer, data) { buffer.pushFloat32(data); },
            deserialize(buffer) { return buffer.getFloat32(); },
        }),
        float64: createType({
            name: 'float64',
            serialize(buffer, data) { buffer.pushFloat64(data); },
            deserialize(buffer) { return buffer.getFloat64(); },
        }),
        float128: createType({
            name: 'float128',
            serialize(buffer, data) { buffer.pushUint8ArrayChecked(hexToUint8Array(data), 16); },
            deserialize(buffer) { return arrayToHex(buffer.getUint8Array(16)); },
        }),
        bytes: createType({
            name: 'bytes',
            serialize(buffer, data) { buffer.pushBytes(hexToUint8Array(data)); },
            deserialize(buffer) { return arrayToHex(buffer.getBytes()); },
        }),
        string: createType({
            name: 'string',
            serialize(buffer, data) { buffer.pushString(data); },
            deserialize(buffer) { return buffer.getString(); },
        }),
        name: createType({
            name: 'name',
            serialize(buffer, data) { buffer.pushName(data); },
            deserialize(buffer) { return buffer.getName(); },
        }),
        time_point: createType({
            name: 'time_point',
            serialize(buffer, data) { buffer.pushNumberAsUint64(dateToTimePoint(data)); },
            deserialize(buffer) { return timePointToDate(buffer.getUint64AsNumber()); },
        }),
        time_point_sec: createType({
            name: 'time_point_sec',
            serialize(buffer, data) { buffer.pushUint32(dateToTimePointSec(data)); },
            deserialize(buffer) { return timePointSecToDate(buffer.getUint32()); },
        }),
        block_timestamp_type: createType({
            name: 'block_timestamp_type',
            serialize(buffer, data) { buffer.pushUint32(dateToBlockTimestamp(data)); },
            deserialize(buffer) { return blockTimestampToDate(buffer.getUint32()); },
        }),
        symbol_code: createType({
            name: 'symbol_code',
            serialize(buffer, data) { buffer.pushSymbolCode(data); },
            deserialize(buffer) { return buffer.getSymbolCode(); },
        }),
        symbol: createType({
            name: 'symbol',
            serialize(buffer, data) { buffer.pushSymbol(stringToSymbol(data)); },
            deserialize(buffer) { return symbolToString(buffer.getSymbol()); },
        }),
        asset: createType({
            name: 'asset',
            serialize(buffer, data) { buffer.pushAsset(data); },
            deserialize(buffer) { return buffer.getAsset(); },
        }),
        checksum160: createType({
            name: 'checksum160',
            serialize(buffer, data) { buffer.pushUint8ArrayChecked(hexToUint8Array(data), 20); },
            deserialize(buffer) { return arrayToHex(buffer.getUint8Array(20)); },
        }),
        checksum256: createType({
            name: 'checksum256',
            serialize(buffer, data) { buffer.pushUint8ArrayChecked(hexToUint8Array(data), 32); },
            deserialize(buffer) { return arrayToHex(buffer.getUint8Array(32)); },
        }),
        checksum512: createType({
            name: 'checksum512',
            serialize(buffer, data) { buffer.pushUint8ArrayChecked(hexToUint8Array(data), 64); },
            deserialize(buffer) { return arrayToHex(buffer.getUint8Array(64)); },
        }),
        public_key: createType({
            name: 'public_key',
            serialize(buffer, data) { buffer.pushPublicKey(data); },
            deserialize(buffer) { return buffer.getPublicKey(); },
        }),
        private_key: createType({
            name: 'private_key',
            serialize(buffer, data) { buffer.pushPrivateKey(data); },
            deserialize(buffer) { return buffer.getPrivateKey(); },
        }),
        signature: createType({
            name: 'signature',
            serialize(buffer, data) { buffer.pushSignature(data); },
            deserialize(buffer) { return buffer.getSignature(); },
        }),
    }));
    result.set('extended_asset', createType({
        name: 'extended_asset',
        baseName: '',
        fields: [
            { name: 'quantity', typeName: 'asset', type: result.get('asset') },
            { name: 'contract', typeName: 'name', type: result.get('name') },
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    return result;
} // createInitialTypes()
function getType(types, name) {
    let type = types.get(name);
    if (type && type.aliasOfName)
        return getType(types, type.aliasOfName);
    if (type)
        return type;
    if (name.endsWith('[]')) {
        return createType({
            name,
            arrayOf: getType(types, name.substr(0, name.length - 2)),
            serialize: serializeArray,
            deserialize: deserializeArray,
        });
    }
    if (name.endsWith('?')) {
        return createType({
            name,
            optionalOf: getType(types, name.substr(0, name.length - 1)),
            serialize: serializeOptional,
            deserialize: deserializeOptional,
        });
    }
    throw new Error('Unknown type: ' + name);
}
function getTypesFromAbi(initialTypes, abi) {
    let types = new Map(initialTypes);
    for (let { new_type_name, type } of abi.types)
        types.set(new_type_name, createType({ name: new_type_name, aliasOfName: type, }));
    for (let { name, base, fields } of abi.structs) {
        types.set(name, createType({
            name,
            baseName: base,
            fields: fields.map(({ name, type }) => ({ name, typeName: type, type: null })),
            serialize: serializeStruct,
            deserialize: deserializeStruct,
        }));
    }
    for (let [name, type] of types) {
        if (type.baseName)
            type.base = getType(types, type.baseName);
        for (let field of type.fields)
            field.type = getType(types, field.typeName);
    }
    return types;
} // getTypesFromAbi
function transactionHeader(refBlock, expireSeconds) {
    return {
        expiration: timePointSecToDate(dateToTimePointSec(refBlock.timestamp) + expireSeconds),
        ref_block_num: refBlock.block_num & 0xffff,
        ref_block_prefix: refBlock.ref_block_prefix,
    };
}
;
function serializeActionData(contract, account, name, data) {
    let action = contract.actions.get(name);
    if (!action) {
        throw new Error(`Unknown action ${name} in contract ${account}`);
    }
    let buffer = new SerialBuffer;
    action.serialize(buffer, data);
    return arrayToHex(buffer.asUint8Array());
}
function serializeAction(contract, account, name, authorization, data) {
    return {
        account,
        name,
        authorization,
        data: serializeActionData(contract, account, name, data),
    };
}
function deserializeActionData(contract, account, name, data) {
    const action = contract.actions.get(name);
    if (typeof data === "string") {
        data = hexToUint8Array(data);
    }
    if (!action) {
        throw new Error(`Unknown action ${name} in contract ${account}`);
    }
    let buffer = new SerialBuffer;
    buffer.pushArray(data);
    return action.deserialize(buffer);
}
function deserializeAction(contract, account, name, authorization, data) {
    return {
        account,
        name,
        authorization,
        data: deserializeActionData(contract, account, name, data),
    };
}


/***/ }),

/***/ "./src/ripemd.js":
/*!***********************!*\
  !*** ./src/ripemd.js ***!
  \***********************/
/*! exports provided: RIPEMD160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RIPEMD160", function() { return RIPEMD160; });
// https://gist.githubusercontent.com/wlzla000/bac83df6d3c51916c4dd0bc947e46947/raw/7ee3462b095ab22580ddaf191f44a590da6fe33b/RIPEMD-160.js

/*
	RIPEMD-160.js

		developed
			by K. (https://github.com/wlzla000)
			on December 27-29, 2017,

		licensed under


		the MIT license

		Copyright (c) 2017 K.

		 Permission is hereby granted, free of charge, to any person
		obtaining a copy of this software and associated documentation
		files (the "Software"), to deal in the Software without
		restriction, including without limitation the rights to use,
		copy, modify, merge, publish, distribute, sublicense, and/or
		sell copies of the Software, and to permit persons to whom the
		Software is furnished to do so, subject to the following
		conditions:

		 The above copyright notice and this permission notice shall be
		included in all copies or substantial portions of the Software.

		 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
		EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
		OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
		NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
		HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
		WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
		FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
		OTHER DEALINGS IN THE SOFTWARE.
*/



class RIPEMD160
{
	constructor()
	{
		// https://webcache.googleusercontent.com/search?q=cache:CnLOgolTHYEJ:https://www.cosic.esat.kuleuven.be/publications/article-317.pdf
		// http://shodhganga.inflibnet.ac.in/bitstream/10603/22978/13/13_appendix.pdf
	}

	static get_n_pad_bytes(message_size /* in bytes, 1 byte is 8 bits. */)
	{
		//  Obtain the number of bytes needed to pad the message.
		// It does not contain the size of the message size information.
		/*
			https://webcache.googleusercontent.com/search?q=cache:CnLOgolTHYEJ:https://www.cosic.esat.kuleuven.be/publications/article-317.pdf

			The Cryptographic Hash Function RIPEMD-160

			written by
				Bart Preneel,
				Hans Dobbertin,
				Antoon Bosselaers
			in
				1997.

			--------------------------------------------------

			§5     Description of RIPEMD-160

			......

			 In order to guarantee that the total input size is a
			multiple of 512 bits, the input is padded in the same
			way as for all the members of the MD4-family: one
			appends a single 1 followed by a string of 0s (the
			number of 0s lies between 0 and 511); the last 64 bits
			of the extended input contain the binary representation
			of the input size in bits, least significant byte first.
		*/
		/*
			https://tools.ietf.org/rfc/rfc1186.txt

			RFC 1186: MD4 Message Digest Algorithm.

			written by
				Ronald Linn Rivest
			in
				October 1990.

			--------------------------------------------------

			§3     MD4 Algorithm Description

			......

			Step 1. Append padding bits

			 The message is "padded" (extended) so that its length
			(in bits) is congruent to 448, modulo 512. That is, the
			message is extended so that it is just 64 bits shy of
			being a multiple of 512 bits long. Padding is always
			performed, even if the length of the message is already
			congruent to 448, modulo 512 (in which case 512 bits of
			padding are added).

			 Padding is performed as follows: a single "1" bit is
			appended to the message, and then enough zero bits are
			appended so that the length in bits of the padded
			message becomes congruent to 448, modulo 512.

			Step 2. Append length

			 A 64-bit representation of b (the length of the message
			before the padding bits were added) is appended to the
			result of the previous step. In the unlikely event that
			b is greater than 2^64, then only the low-order 64 bits
			of b are used. (These bits are appended as two 32-bit
			words and appended low-order word first in accordance
			with the previous conventions.)

			 At this point the resulting message (after padding with
			bits and with b) has a length that is an exact multiple
			of 512 bits. Equivalently, this message has a length
			that is an exact multiple of 16 (32-bit) words. Let
			M[0 ... N-1] denote the words of the resulting message,
			where N is a multiple of 16.
		*/
		// https://crypto.stackexchange.com/a/32407/54568
		/*
			Example case  # 1
				[0 bit: message.]
				[1 bit: 1.]
				[447 bits: 0.]
				[64 bits: message size information.]

			Example case  # 2
				[512-bits: message]
				[1 bit: 1.]
				[447 bits: 0.]
				[64 bits: message size information.]

			Example case  # 3
				[(512 - 64 = 448) bits: message.]
				[1 bit: 1.]
				[511 bits: 0.]
				[64 bits: message size information.]

			Example case  # 4
				[(512 - 65 = 447) bits: message.]
				[1 bit: 1.]
				[0 bit: 0.]
				[64 bits: message size information.]
		*/
		// The number of padding zero bits:
		//      511 - [{(message size in bits) + 64} (mod 512)]
		return 64 - ((message_size + 8) & 0b00111111 /* 63 */);
	}
	static pad(message /* An ArrayBuffer. */)
	{
		const message_size = message.byteLength;
		const n_pad = RIPEMD160.get_n_pad_bytes(message_size);

		//  `Number.MAX_SAFE_INTEGER` is ((2 ** 53) - 1) and
		// bitwise operation in Javascript is done on 32-bits operands.
		const divmod = (dividend, divisor) => [
			Math.floor(dividend / divisor),
			dividend % divisor
		];
		/*
To shift

   00000000 000????? ???????? ???????? ???????? ???????? ???????? ????????
                                     t o
   00000000 ???????? ???????? ???????? ???????? ???????? ???????? ?????000

--------------------------------------------------------------------------------

Method #1

    00000000 000????? ???????? ????????  ???????? ???????? ???????? ????????
   [00000000 000AAAAA AAAAAAAA AAAAAAAA] (<A> captured)
   [00000000 AAAAAAAA AAAAAAAA AAAAA000] (<A> shifted)
                         (<B> captured) [BBBBBBBB BBBBBBBB BBBBBBBB BBBBBBBB]
                     (<B> shifted) [BBB][BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
   [00000000 AAAAAAAA AAAAAAAA AAAAABBB] (<A> & <B_2> merged)
   [00000000 AAAAAAAA AAAAAAAA AAAAABBB][BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
    00000000 ???????? ???????? ????????  ???????? ???????? ???????? ?????000

		const uint32_max_plus_1 = 0x100000000; // (2 ** 32)
		const [
			msg_byte_size_most, // Value range [0, (2 ** 21) - 1].
			msg_byte_size_least // Value range [0, (2 ** 32) - 1].
		] = divmod(message_size, uint32_max_plus_1);
		const [
			carry, // Value range [0, 7].
			msg_bit_size_least // Value range [0, (2 ** 32) - 8].
		] = divmod(message_byte_size_least * 8, uint32_max_plus_1);
		const message_bit_size_most = message_byte_size_most * 8
			+ carry; // Value range [0, (2 ** 24) - 1].

--------------------------------------------------------------------------------

Method #2
    00000000 000????? ???????? ????????  ???????? ???????? ???????? ????????
      [00000 000AAAAA AAAAAAAA AAAAAAAA  AAA] (<A> captured)
                         (<B> captured) [000BBBBB BBBBBBBB BBBBBBBB BBBBBBBB]
                          (<B> shifted) [BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
   [00000000 AAAAAAAA AAAAAAAA AAAAAAAA][BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
    00000000 ???????? ???????? ????????  ???????? ???????? ???????? ?????000

		*/
		const [
			msg_bit_size_most,
			msg_bit_size_least
		] = divmod(message_size, 536870912 /* (2 ** 29) */)
			.map((x, index) => (index ? (x * 8) : x));

		// `ArrayBuffer.transfer()` is not supported.
		const padded = new Uint8Array(message_size + n_pad + 8);
		padded.set(new Uint8Array(message), 0);
		const data_view = new DataView(padded.buffer);
		data_view.setUint8(message_size, 0b10000000);
		data_view.setUint32(
			message_size + n_pad,
			msg_bit_size_least,
			true // Little-endian
		);
		data_view.setUint32(
			message_size + n_pad + 4,
			msg_bit_size_most,
			true // Little-endian
		);

		return padded.buffer;
	}

	static f(j, x, y, z)
	{
		if(0 <= j && j <= 15)
		{ // Exclusive-OR
			return x ^ y ^ z;
		}
		if(16 <= j && j <= 31)
		{ // Multiplexing (muxing)
			return (x & y) | (~x & z);
		}
		if(32 <= j && j <= 47)
		{
			return (x | ~y) ^ z;
		}
		if(48 <= j && j <= 63)
		{ // Multiplexing (muxing)
			return (x & z) | (y & ~z);
		}
		if(64 <= j && j <= 79)
		{
			return x ^ (y | ~z);
		}
	}
	static K(j)
	{
		if(0 <= j && j <= 15)
		{
			return 0x00000000;
		}
		if(16 <= j && j <= 31)
		{
			// Math.floor((2 ** 30) * Math.SQRT2)
			return 0x5A827999;
		}
		if(32 <= j && j <= 47)
		{
			// Math.floor((2 ** 30) * Math.sqrt(3))
			return 0x6ED9EBA1;
		}
		if(48 <= j && j <= 63)
		{
			// Math.floor((2 ** 30) * Math.sqrt(5))
			return 0x8F1BBCDC;
		}
		if(64 <= j && j <= 79)
		{
			// Math.floor((2 ** 30) * Math.sqrt(7))
			return 0xA953FD4E;
		}
	}
	static KP(j) // K'
	{
		if(0 <= j && j <= 15)
		{
			// Math.floor((2 ** 30) * Math.cbrt(2))
			return 0x50A28BE6;
		}
		if(16 <= j && j <= 31)
		{
			// Math.floor((2 ** 30) * Math.cbrt(3))
			return 0x5C4DD124;
		}
		if(32 <= j && j <= 47)
		{
			// Math.floor((2 ** 30) * Math.cbrt(5))
			return 0x6D703EF3;
		}
		if(48 <= j && j <= 63)
		{
			// Math.floor((2 ** 30) * Math.cbrt(7))
			return 0x7A6D76E9;
		}
		if(64 <= j && j <= 79)
		{
			return 0x00000000;
		}
	}
	static add_modulo32(/* ...... */)
	{
		// 1.  Modulo addition (addition modulo) is associative.
		//    https://proofwiki.org/wiki/Modulo_Addition_is_Associative
 		// 2.  Bitwise operation in Javascript
		//    is done on 32-bits operands
		//    and results in a 32-bits value.
		return Array
			.from(arguments)
			.reduce((a, b) => (a + b), 0) | 0;
	}
	static rol32(value, count)
	{ // Cyclic left shift (rotate) on 32-bits value.
		return (value << count) | (value >>> (32 - count));
	}
	static hash(message /* An ArrayBuffer. */)
	{
		//////////       Padding       //////////

		// The padded message.
		const padded = RIPEMD160.pad(message);

		//////////     Compression     //////////

		// Message word selectors.
		const r = [
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
			7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
			3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
			1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
			4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
		];
		const rP = [ // r'
			5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
			6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
			15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
			8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
			12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
		];

		// Amounts for 'rotate left' operation.
		const s = [
			11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
			7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
			11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
			11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
			9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
		];
		const sP = [ // s'
			8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
			9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
			9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
			15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
			8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
		];

		// The size, in bytes, of a word.
		const word_size = 4;

		// The size, in bytes, of a 16-words block.
		const block_size = 64;

		// The number of the 16-words blocks.
		const t = padded.byteLength / block_size;

		//  The message after padding consists of t 16-word blocks that
		// are denoted with X_i[j], with 0≤i≤(t − 1) and 0≤j≤15.
		const X = (new Array(t))
			.fill(undefined)
			.map((_, i) => new Proxy(
				new DataView(
					padded, i * block_size, block_size
				), {
				get(block_view, j)
				{
					return block_view.getUint32(
						j * word_size,
						true // Little-endian
					);
				}
			}));

		//  The result of RIPEMD-160 is contained in five 32-bit words,
		// which form the internal state of the algorithm. The final
		// content of these five 32-bit words is converted to a 160-bit
		// string, again using the little-endian convention.
		let h = [
			0x67452301, // h_0
			0xEFCDAB89, // h_1
			0x98BADCFE, // h_2
			0x10325476, // h_3
			0xC3D2E1F0  // h_4
		];

		for(let i = 0; i < t; ++i)
		{
			let A = h[0], B = h[1], C = h[2], D = h[3], E = h[4];
			let AP = A, BP = B, CP = C, DP = D, EP = E;
			for(let j = 0; j < 80; ++j)
			{
				// Left rounds
				let T = RIPEMD160.add_modulo32(
					RIPEMD160.rol32(
						RIPEMD160.add_modulo32(
							A,
							RIPEMD160.f(j, B, C, D),
							X[i][r[j]],
							RIPEMD160.K(j)
						),
						s[j]
					),
					E
				);
				A = E;
				E = D;
				D = RIPEMD160.rol32(C, 10);
				C = B;
				B = T;

				// Right rounds
				T = RIPEMD160.add_modulo32(
					RIPEMD160.rol32(
						RIPEMD160.add_modulo32(
							AP,
							RIPEMD160.f(
								79 - j,
								BP,
								CP,
								DP
							),
							X[i][rP[j]],
							RIPEMD160.KP(j)
						),
						sP[j]
					),
					EP
				);
				AP = EP;
				EP = DP;
				DP = RIPEMD160.rol32(CP, 10);
				CP = BP;
				BP = T;
			}
			let T = RIPEMD160.add_modulo32(h[1], C, DP);
			h[1] = RIPEMD160.add_modulo32(h[2], D, EP);
			h[2] = RIPEMD160.add_modulo32(h[3], E, AP);
			h[3] = RIPEMD160.add_modulo32(h[4], A, BP);
			h[4] = RIPEMD160.add_modulo32(h[0], B, CP);
			h[0] = T;
		}

		//  The final output string then consists of the concatenatation
		// of h_0, h_1, h_2, h_3, and h_4 after converting each h_i to a
		// 4-byte string using the little-endian convention.
		const result = new ArrayBuffer(20);
		const data_view = new DataView(result);
		h.forEach((h_i, i) => data_view.setUint32(i * 4, h_i, true));
		return result;
	}
}


/***/ }),

/***/ "./src/transaction.abi.json":
/*!**********************************!*\
  !*** ./src/transaction.abi.json ***!
  \**********************************/
/*! exports provided: types, structs, default */
/***/ (function(module) {

module.exports = {"types":[{"new_type_name":"account_name","type":"name"},{"new_type_name":"action_name","type":"name"},{"new_type_name":"permission_name","type":"name"}],"structs":[{"name":"permission_level","base":"","fields":[{"name":"actor","type":"account_name"},{"name":"permission","type":"permission_name"}]},{"name":"action","base":"","fields":[{"name":"account","type":"account_name"},{"name":"name","type":"action_name"},{"name":"authorization","type":"permission_level[]"},{"name":"data","type":"bytes"}]},{"name":"extension","base":"","fields":[{"name":"type","type":"uint16"},{"name":"data","type":"bytes"}]},{"name":"transaction_header","base":"","fields":[{"name":"expiration","type":"time_point_sec"},{"name":"ref_block_num","type":"uint16"},{"name":"ref_block_prefix","type":"uint32"},{"name":"max_net_usage_words","type":"varuint32"},{"name":"max_cpu_usage_ms","type":"uint8"},{"name":"delay_sec","type":"varuint32"}]},{"name":"transaction","base":"transaction_header","fields":[{"name":"context_free_actions","type":"action[]"},{"name":"actions","type":"action[]"},{"name":"transaction_extensions","type":"extension[]"}]}]};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9baWRdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1tpZF0vLi9zcmMvZW9zanMyLWFwaS50cyIsIndlYnBhY2s6Ly9baWRdLy4vc3JjL2Vvc2pzMi1udW1lcmljLnRzIiwid2VicGFjazovL1tpZF0vLi9zcmMvZW9zanMyLXNlcmlhbGl6ZS50cyIsIndlYnBhY2s6Ly9baWRdLy4vc3JjL3JpcGVtZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBLDBDQUEwQztBQUU3Qjs7Ozs7Ozs7OztBQUc2QjtBQUMxQyxNQUFNLGNBQWMsR0FBRyxtQkFBTyxDQUFDLCtEQUE2QixDQUFDLENBQUM7QUFFdkQsTUFBTSxTQUFTLEdBQUcsOENBQUcsQ0FBQztBQXNCdkI7SUFRSixZQUFZLElBQW9IO1FBRmhJLGNBQVMsR0FBRyxJQUFJLEdBQUcs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OztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJlb3NqczItZGVidWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9lb3NqczItYXBpLnRzXCIpO1xuIiwiLy8gY29weXJpZ2h0IGRlZmluZWQgaW4gZW9zanMyL0xJQ0VOU0UudHh0XHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBBYmksIEdldEluZm9SZXN1bHQsIEpzb25ScGMsIFB1c2hUcmFuc2FjdGlvbkFyZ3MsIFRyYW5zYWN0aW9uQ29uZmlnIH0gZnJvbSAnLi9lb3NqczItanNvbnJwYyc7XHJcbmltcG9ydCAqIGFzIHNlciBmcm9tICcuL2Vvc2pzMi1zZXJpYWxpemUnO1xyXG5jb25zdCB0cmFuc2FjdGlvbkFiaSA9IHJlcXVpcmUoJy4uL3NyYy90cmFuc2FjdGlvbi5hYmkuanNvbicpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlcmlhbGl6ZSA9IHNlcjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXV0aG9yaXR5UHJvdmlkZXJBcmdzIHtcclxuICB0cmFuc2FjdGlvbjogYW55O1xyXG4gIGF2YWlsYWJsZUtleXM6IHN0cmluZ1tdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhvcml0eVByb3ZpZGVyIHtcclxuICBnZXRSZXF1aXJlZEtleXM6IChhcmdzOiBBdXRob3JpdHlQcm92aWRlckFyZ3MpID0+IFByb21pc2U8c3RyaW5nW10+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNpZ25hdHVyZVByb3ZpZGVyQXJncyB7XHJcbiAgY2hhaW5JZDogc3RyaW5nO1xyXG4gIHJlcXVpcmVkS2V5czogc3RyaW5nW107XHJcbiAgc2VyaWFsaXplZFRyYW5zYWN0aW9uOiBVaW50OEFycmF5O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNpZ25hdHVyZVByb3ZpZGVyIHtcclxuICBnZXRBdmFpbGFibGVLZXlzOiAoKSA9PiBQcm9taXNlPHN0cmluZ1tdPjtcclxuICBzaWduOiAoYXJnczogU2lnbmF0dXJlUHJvdmlkZXJBcmdzKSA9PiBQcm9taXNlPHN0cmluZ1tdPjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFwaSB7XHJcbiAgcnBjOiBKc29uUnBjO1xyXG4gIGF1dGhvcml0eVByb3ZpZGVyOiBBdXRob3JpdHlQcm92aWRlcjtcclxuICBzaWduYXR1cmVQcm92aWRlcjogU2lnbmF0dXJlUHJvdmlkZXI7XHJcbiAgY2hhaW5JZDogc3RyaW5nO1xyXG4gIHRyYW5zYWN0aW9uVHlwZXM6IE1hcDxzdHJpbmcsIHNlci5UeXBlPjtcclxuICBjb250cmFjdHMgPSBuZXcgTWFwPHN0cmluZywgc2VyLkNvbnRyYWN0PigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihhcmdzOiB7IHJwYzogSnNvblJwYywgYXV0aG9yaXR5UHJvdmlkZXI/OiBBdXRob3JpdHlQcm92aWRlciwgc2lnbmF0dXJlUHJvdmlkZXI6IFNpZ25hdHVyZVByb3ZpZGVyLCBjaGFpbklkOiBzdHJpbmcgfSkge1xyXG4gICAgdGhpcy5ycGMgPSBhcmdzLnJwYztcclxuICAgIHRoaXMuYXV0aG9yaXR5UHJvdmlkZXIgPSBhcmdzLmF1dGhvcml0eVByb3ZpZGVyIHx8IGFyZ3MucnBjO1xyXG4gICAgdGhpcy5zaWduYXR1cmVQcm92aWRlciA9IGFyZ3Muc2lnbmF0dXJlUHJvdmlkZXI7XHJcbiAgICB0aGlzLmNoYWluSWQgPSBhcmdzLmNoYWluSWQ7XHJcbiAgICB0aGlzLnRyYW5zYWN0aW9uVHlwZXMgPSBzZXIuZ2V0VHlwZXNGcm9tQWJpKHNlci5jcmVhdGVJbml0aWFsVHlwZXMoKSwgdHJhbnNhY3Rpb25BYmkpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0Q29udHJhY3QoYWNjb3VudE5hbWU6IHN0cmluZywgcmVsb2FkID0gZmFsc2UpOiBQcm9taXNlPHNlci5Db250cmFjdD4ge1xyXG4gICAgaWYgKCFyZWxvYWQgJiYgdGhpcy5jb250cmFjdHMuZ2V0KGFjY291bnROYW1lKSlcclxuICAgICAgcmV0dXJuIHRoaXMuY29udHJhY3RzLmdldChhY2NvdW50TmFtZSk7XHJcbiAgICBsZXQgYWJpOiBBYmk7XHJcbiAgICB0cnkge1xyXG4gICAgICBhYmkgPSAoYXdhaXQgdGhpcy5ycGMuZ2V0X2FiaShhY2NvdW50TmFtZSkpLmFiaTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgZS5tZXNzYWdlID0gJ2ZldGNoaW5nIGFiaSBmb3IgJyArIGFjY291bnROYW1lICsgJzogJyArIGUubWVzc2FnZTtcclxuICAgICAgdGhyb3cgZTtcclxuICAgIH1cclxuICAgIGlmICghYWJpKVxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGFiaSBmb3IgXCIgKyBhY2NvdW50TmFtZSk7XHJcbiAgICBsZXQgdHlwZXMgPSBzZXIuZ2V0VHlwZXNGcm9tQWJpKHNlci5jcmVhdGVJbml0aWFsVHlwZXMoKSwgYWJpKTtcclxuICAgIGxldCBhY3Rpb25zID0gbmV3IE1hcDxzdHJpbmcsIHNlci5UeXBlPigpO1xyXG4gICAgZm9yIChsZXQgeyBuYW1lLCB0eXBlIH0gb2YgYWJpLmFjdGlvbnMpXHJcbiAgICAgIGFjdGlvbnMuc2V0KG5hbWUsIHNlci5nZXRUeXBlKHR5cGVzLCB0eXBlKSk7XHJcbiAgICBsZXQgcmVzdWx0ID0geyB0eXBlcywgYWN0aW9ucyB9O1xyXG4gICAgdGhpcy5jb250cmFjdHMuc2V0KGFjY291bnROYW1lLCByZXN1bHQpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHNlcmlhbGl6ZShidWZmZXI6IHNlci5TZXJpYWxCdWZmZXIsIHR5cGU6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy50cmFuc2FjdGlvblR5cGVzLmdldCh0eXBlKS5zZXJpYWxpemUoYnVmZmVyLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBkZXNlcmlhbGl6ZShidWZmZXI6IHNlci5TZXJpYWxCdWZmZXIsIHR5cGU6IHN0cmluZyk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy50cmFuc2FjdGlvblR5cGVzLmdldCh0eXBlKS5kZXNlcmlhbGl6ZShidWZmZXIpO1xyXG4gIH1cclxuXHJcbiAgc2VyaWFsaXplVHJhbnNhY3Rpb24odHJhbnNhY3Rpb246IGFueSk6IFVpbnQ4QXJyYXkge1xyXG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBzZXIuU2VyaWFsQnVmZmVyO1xyXG4gICAgdGhpcy5zZXJpYWxpemUoYnVmZmVyLCAndHJhbnNhY3Rpb24nLCB7XHJcbiAgICAgIG1heF9uZXRfdXNhZ2Vfd29yZHM6IDAsXHJcbiAgICAgIG1heF9jcHVfdXNhZ2VfbXM6IDAsXHJcbiAgICAgIGRlbGF5X3NlYzogMCxcclxuICAgICAgY29udGV4dF9mcmVlX2FjdGlvbnM6IFtdLFxyXG4gICAgICBhY3Rpb25zOiBbXSxcclxuICAgICAgdHJhbnNhY3Rpb25fZXh0ZW5zaW9uczogW10sXHJcbiAgICAgIC4uLnRyYW5zYWN0aW9uLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYnVmZmVyLmFzVWludDhBcnJheSgpO1xyXG4gIH1cclxuXHJcbiAgZGVzZXJpYWxpemVUcmFuc2FjdGlvbih0cmFuc2FjdGlvbjogVWludDhBcnJheSk6IGFueSB7XHJcbiAgICBjb25zdCBidWZmZXIgPSBuZXcgc2VyLlNlcmlhbEJ1ZmZlcigpO1xyXG4gICAgYnVmZmVyLnB1c2hBcnJheSh0cmFuc2FjdGlvbilcclxuICAgIHJldHVybiB0aGlzLmRlc2VyaWFsaXplKGJ1ZmZlciwgJ3RyYW5zYWN0aW9uJyk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBzZXJpYWxpemVBY3Rpb25zKGFjdGlvbnM6IHNlci5BY3Rpb25bXSk6IFByb21pc2U8c2VyLlNlcmlhbGl6ZWRBY3Rpb25bXT4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKGFjdGlvbnMubWFwKGFzeW5jICh7IGFjY291bnQsIG5hbWUsIGF1dGhvcml6YXRpb24sIGRhdGEgfSkgPT4ge1xyXG4gICAgICBjb25zdCBjb250cmFjdCA9IGF3YWl0IHRoaXMuZ2V0Q29udHJhY3QoYWNjb3VudClcclxuICAgICAgcmV0dXJuIHNlci5zZXJpYWxpemVBY3Rpb24oY29udHJhY3QsIGFjY291bnQsIG5hbWUsIGF1dGhvcml6YXRpb24sIGRhdGEpO1xyXG4gICAgfSkpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGVzZXJpYWxpemVBY3Rpb25zKGFjdGlvbnM6IHNlci5BY3Rpb25bXSk6IFByb21pc2U8c2VyLkFjdGlvbltdPiB7XHJcbiAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwoYWN0aW9ucy5tYXAoYXN5bmMgKHsgYWNjb3VudCwgbmFtZSwgYXV0aG9yaXphdGlvbiwgZGF0YSB9KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbnRyYWN0ID0gYXdhaXQgdGhpcy5nZXRDb250cmFjdChhY2NvdW50KVxyXG4gICAgICByZXR1cm4gc2VyLmRlc2VyaWFsaXplQWN0aW9uKGNvbnRyYWN0LCBhY2NvdW50LCBuYW1lLCBhdXRob3JpemF0aW9uLCBkYXRhKTtcclxuICAgIH0pKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGRlc2VyaWFsaXplVHJhbnNhY3Rpb25XaXRoQWN0aW9ucyh0cmFuc2FjdGlvbjogVWludDhBcnJheSB8IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcbiAgICBpZiAodHlwZW9mIHRyYW5zYWN0aW9uID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIHRyYW5zYWN0aW9uID0gc2VyLmhleFRvVWludDhBcnJheSh0cmFuc2FjdGlvbilcclxuICAgIH1cclxuICAgIGxldCBkZXNlcmlhbGl6ZWRUcmFuc2FjdGlvbiA9IHRoaXMuZGVzZXJpYWxpemVUcmFuc2FjdGlvbih0cmFuc2FjdGlvbilcclxuICAgIGNvbnN0IGRlc2VyaWFsaXplZEFjdGlvbnMgPSBhd2FpdCB0aGlzLmRlc2VyaWFsaXplQWN0aW9ucyhkZXNlcmlhbGl6ZWRUcmFuc2FjdGlvbi5hY3Rpb25zKVxyXG4gICAgcmV0dXJuIHsgLi4uZGVzZXJpYWxpemVkVHJhbnNhY3Rpb24sIGFjdGlvbnM6IGRlc2VyaWFsaXplZEFjdGlvbnMgfVxyXG4gIH1cclxuXHJcbiAgLy8gZXZlbnR1YWxseSBicmVhayBvdXQgaW50byBUcmFuc2FjdGlvblZhbGlkYXRvciBjbGFzc1xyXG4gIHByaXZhdGUgaGFzUmVxdWlyZWRUYXBvc0ZpZWxkcyh7IGV4cGlyYXRpb24sIHJlZl9ibG9ja19udW0sIHJlZl9ibG9ja19wcmVmaXgsIC4uLnRyYW5zYWN0aW9uIH06IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICEhKGV4cGlyYXRpb24gJiYgcmVmX2Jsb2NrX251bSAmJiByZWZfYmxvY2tfcHJlZml4KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHRyYW5zYWN0KHRyYW5zYWN0aW9uOiBhbnksIHsgYnJvYWRjYXN0ID0gdHJ1ZSwgYmxvY2tzQmVoaW5kLCBleHBpcmVTZWNvbmRzIH06IFRyYW5zYWN0aW9uQ29uZmlnID0ge30pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgbGV0IGluZm86IEdldEluZm9SZXN1bHQ7XHJcblxyXG4gICAgaWYgKCF0aGlzLmNoYWluSWQpIHtcclxuICAgICAgaW5mbyA9IGF3YWl0IHRoaXMucnBjLmdldF9pbmZvKCk7XHJcbiAgICAgIHRoaXMuY2hhaW5JZCA9IGluZm8uY2hhaW5faWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBibG9ja3NCZWhpbmQgPT09IFwibnVtYmVyXCIgJiYgZXhwaXJlU2Vjb25kcykgeyAvLyB1c2UgY29uZmlnIGZpZWxkcyB0byBnZW5lcmF0ZSBUQVBPUyBpZiB0aGV5IGV4aXN0XHJcbiAgICAgIGlmICghaW5mbykge1xyXG4gICAgICAgIGluZm8gPSBhd2FpdCB0aGlzLnJwYy5nZXRfaW5mbygpO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCByZWZCbG9jayA9IGF3YWl0IHRoaXMucnBjLmdldF9ibG9jayhpbmZvLmhlYWRfYmxvY2tfbnVtIC0gYmxvY2tzQmVoaW5kKTtcclxuICAgICAgdHJhbnNhY3Rpb24gPSB7IC4uLnNlci50cmFuc2FjdGlvbkhlYWRlcihyZWZCbG9jaywgZXhwaXJlU2Vjb25kcyksIC4uLnRyYW5zYWN0aW9uIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmhhc1JlcXVpcmVkVGFwb3NGaWVsZHModHJhbnNhY3Rpb24pKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlcXVpcmVkIGNvbmZpZ3VyYXRpb24gb3IgVEFQT1MgZmllbGRzIGFyZSBub3QgcHJlc2VudFwiKVxyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zYWN0aW9uID0geyAuLi50cmFuc2FjdGlvbiwgYWN0aW9uczogYXdhaXQgdGhpcy5zZXJpYWxpemVBY3Rpb25zKHRyYW5zYWN0aW9uLmFjdGlvbnMpIH07XHJcbiAgICBsZXQgc2VyaWFsaXplZFRyYW5zYWN0aW9uID0gdGhpcy5zZXJpYWxpemVUcmFuc2FjdGlvbih0cmFuc2FjdGlvbik7XHJcbiAgICBsZXQgYXZhaWxhYmxlS2V5cyA9IGF3YWl0IHRoaXMuc2lnbmF0dXJlUHJvdmlkZXIuZ2V0QXZhaWxhYmxlS2V5cygpO1xyXG4gICAgbGV0IHJlcXVpcmVkS2V5cyA9IGF3YWl0IHRoaXMuYXV0aG9yaXR5UHJvdmlkZXIuZ2V0UmVxdWlyZWRLZXlzKHsgdHJhbnNhY3Rpb24sIGF2YWlsYWJsZUtleXMgfSk7XHJcbiAgICBsZXQgc2lnbmF0dXJlcyA9IGF3YWl0IHRoaXMuc2lnbmF0dXJlUHJvdmlkZXIuc2lnbih7IGNoYWluSWQ6IHRoaXMuY2hhaW5JZCwgcmVxdWlyZWRLZXlzLCBzZXJpYWxpemVkVHJhbnNhY3Rpb24gfSk7XHJcbiAgICBsZXQgcHVzaFRyYW5zYWN0aW9uQXJncyA9IHsgc2lnbmF0dXJlcywgc2VyaWFsaXplZFRyYW5zYWN0aW9uIH07XHJcbiAgICBpZiAoYnJvYWRjYXN0KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnB1c2hTaWduZWRUcmFuc2FjdGlvbihwdXNoVHJhbnNhY3Rpb25BcmdzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwdXNoVHJhbnNhY3Rpb25BcmdzO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcHVzaFNpZ25lZFRyYW5zYWN0aW9uKHsgc2lnbmF0dXJlcywgc2VyaWFsaXplZFRyYW5zYWN0aW9uIH06IFB1c2hUcmFuc2FjdGlvbkFyZ3MpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMucnBjLnB1c2hfdHJhbnNhY3Rpb24oe1xyXG4gICAgICBzaWduYXR1cmVzLFxyXG4gICAgICBzZXJpYWxpemVkVHJhbnNhY3Rpb24sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG59IC8vIEFwaVxyXG4iLCIvLyBjb3B5cmlnaHQgZGVmaW5lZCBpbiBlb3NqczIvTElDRU5TRS50eHRcclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IHJpcGVtZDE2MCA9IHJlcXVpcmUoJy4vcmlwZW1kJykuUklQRU1EMTYwLmhhc2ggYXMgKGE6IFVpbnQ4QXJyYXkpID0+IEFycmF5QnVmZmVyO1xyXG5cclxuY29uc3QgYmFzZTU4X2NoYXJzID0gXCIxMjM0NTY3ODlBQkNERUZHSEpLTE1OUFFSU1RVVldYWVphYmNkZWZnaGlqa21ub3BxcnN0dXZ3eHl6XCI7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVfYmFzZTU4X21hcCgpIHtcclxuICBsZXQgYmFzZTU4X21hcCA9IEFycmF5KDI1NikuZmlsbCgtMSkgYXMgbnVtYmVyW107XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYXNlNThfY2hhcnMubGVuZ3RoOyArK2kpXHJcbiAgICBiYXNlNThfbWFwW2Jhc2U1OF9jaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7XHJcbiAgcmV0dXJuIGJhc2U1OF9tYXA7XHJcbn1cclxuXHJcbmNvbnN0IGJhc2U1OF9tYXAgPSBjcmVhdGVfYmFzZTU4X21hcCgpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTmVnYXRpdmUoYmluOiBVaW50OEFycmF5KSB7XHJcbiAgcmV0dXJuIChiaW5bYmluLmxlbmd0aCAtIDFdICYgMHg4MCkgIT09IDA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuZWdhdGUoYmluOiBVaW50OEFycmF5KSB7XHJcbiAgbGV0IGNhcnJ5ID0gMTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGJpbi5sZW5ndGg7ICsraSkge1xyXG4gICAgbGV0IHggPSAofmJpbltpXSAmIDB4ZmYpICsgY2Fycnk7XHJcbiAgICBiaW5baV0gPSB4O1xyXG4gICAgY2FycnkgPSB4ID4+IDg7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVjaW1hbFRvQmluYXJ5KHNpemU6IG51bWJlciwgczogc3RyaW5nKSB7XHJcbiAgbGV0IHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KHNpemUpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcy5sZW5ndGg7ICsraSkge1xyXG4gICAgbGV0IHNyY0RpZ2l0ID0gcy5jaGFyQ29kZUF0KGkpO1xyXG4gICAgaWYgKHNyY0RpZ2l0IDwgJzAnLmNoYXJDb2RlQXQoMCkgfHwgc3JjRGlnaXQgPiAnOScuY2hhckNvZGVBdCgwKSlcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBudW1iZXJcIik7XHJcbiAgICBsZXQgY2FycnkgPSBzcmNEaWdpdCAtICcwJy5jaGFyQ29kZUF0KDApO1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaXplOyArK2opIHtcclxuICAgICAgbGV0IHggPSByZXN1bHRbal0gKiAxMCArIGNhcnJ5O1xyXG4gICAgICByZXN1bHRbal0gPSB4O1xyXG4gICAgICBjYXJyeSA9IHggPj4gODtcclxuICAgIH1cclxuICAgIGlmIChjYXJyeSlcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibnVtYmVyIGlzIG91dCBvZiByYW5nZVwiKTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNpZ25lZERlY2ltYWxUb0JpbmFyeShzaXplOiBudW1iZXIsIHM6IHN0cmluZykge1xyXG4gIGxldCBuZWdhdGl2ZSA9IHNbMF0gPT09ICctJztcclxuICBpZiAobmVnYXRpdmUpXHJcbiAgICBzID0gcy5zdWJzdHIoMSk7XHJcbiAgbGV0IHJlc3VsdCA9IGRlY2ltYWxUb0JpbmFyeShzaXplLCBzKTtcclxuICBpZiAobmVnYXRpdmUpXHJcbiAgICBuZWdhdGUocmVzdWx0KTtcclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYmluYXJ5VG9EZWNpbWFsKGJpbjogVWludDhBcnJheSwgbWluRGlnaXRzID0gMSkge1xyXG4gIGxldCByZXN1bHQgPSBBcnJheShtaW5EaWdpdHMpLmZpbGwoJzAnLmNoYXJDb2RlQXQoMCkpIGFzIG51bWJlcltdO1xyXG4gIGZvciAobGV0IGkgPSBiaW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcclxuICAgIGxldCBjYXJyeSA9IGJpbltpXTtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmVzdWx0Lmxlbmd0aDsgKytqKSB7XHJcbiAgICAgIGxldCB4ID0gKChyZXN1bHRbal0gLSAnMCcuY2hhckNvZGVBdCgwKSkgPDwgOCkgKyBjYXJyeTtcclxuICAgICAgcmVzdWx0W2pdID0gJzAnLmNoYXJDb2RlQXQoMCkgKyB4ICUgMTA7XHJcbiAgICAgIGNhcnJ5ID0gKHggLyAxMCkgfCAwO1xyXG4gICAgfVxyXG4gICAgd2hpbGUgKGNhcnJ5KSB7XHJcbiAgICAgIHJlc3VsdC5wdXNoKCcwJy5jaGFyQ29kZUF0KDApICsgY2FycnkgJSAxMCk7XHJcbiAgICAgIGNhcnJ5ID0gKGNhcnJ5IC8gMTApIHwgMDtcclxuICAgIH1cclxuICB9XHJcbiAgcmVzdWx0LnJldmVyc2UoKTtcclxuICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSguLi5yZXN1bHQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2lnbmVkQmluYXJ5VG9EZWNpbWFsKGJpbjogVWludDhBcnJheSwgbWluRGlnaXRzID0gMSkge1xyXG4gIGlmIChpc05lZ2F0aXZlKGJpbikpIHtcclxuICAgIGxldCB4ID0gYmluLnNsaWNlKCk7XHJcbiAgICBuZWdhdGUoeCk7XHJcbiAgICByZXR1cm4gJy0nICsgYmluYXJ5VG9EZWNpbWFsKHgsIG1pbkRpZ2l0cyk7XHJcbiAgfVxyXG4gIHJldHVybiBiaW5hcnlUb0RlY2ltYWwoYmluLCBtaW5EaWdpdHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYmFzZTU4VG9CaW5hcnkoc2l6ZTogbnVtYmVyLCBzOiBzdHJpbmcpIHtcclxuICBsZXQgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzLmxlbmd0aDsgKytpKSB7XHJcbiAgICBsZXQgY2FycnkgPSBiYXNlNThfbWFwW3MuY2hhckNvZGVBdChpKV07XHJcbiAgICBpZiAoY2FycnkgPCAwKVxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGJhc2UtNTggdmFsdWVcIik7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNpemU7ICsraikge1xyXG4gICAgICBsZXQgeCA9IHJlc3VsdFtqXSAqIDU4ICsgY2Fycnk7XHJcbiAgICAgIHJlc3VsdFtqXSA9IHg7XHJcbiAgICAgIGNhcnJ5ID0geCA+PiA4O1xyXG4gICAgfVxyXG4gICAgaWYgKGNhcnJ5KVxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJiYXNlLTU4IHZhbHVlIGlzIG91dCBvZiByYW5nZVwiKTtcclxuICB9XHJcbiAgcmVzdWx0LnJldmVyc2UoKTtcclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYmluYXJ5VG9CYXNlNTgoYmluOiBVaW50OEFycmF5LCBtaW5EaWdpdHMgPSAxKSB7XHJcbiAgbGV0IHJlc3VsdCA9IFtdIGFzIG51bWJlcltdO1xyXG4gIGZvciAobGV0IGJ5dGUgb2YgYmluKSB7XHJcbiAgICBsZXQgY2FycnkgPSBieXRlO1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCByZXN1bHQubGVuZ3RoOyArK2opIHtcclxuICAgICAgbGV0IHggPSAoYmFzZTU4X21hcFtyZXN1bHRbal1dIDw8IDgpICsgY2Fycnk7XHJcbiAgICAgIHJlc3VsdFtqXSA9IGJhc2U1OF9jaGFycy5jaGFyQ29kZUF0KHggJSA1OCk7XHJcbiAgICAgIGNhcnJ5ID0gKHggLyA1OCkgfCAwO1xyXG4gICAgfVxyXG4gICAgd2hpbGUgKGNhcnJ5KSB7XHJcbiAgICAgIHJlc3VsdC5wdXNoKGJhc2U1OF9jaGFycy5jaGFyQ29kZUF0KGNhcnJ5ICUgNTgpKTtcclxuICAgICAgY2FycnkgPSAoY2FycnkgLyA1OCkgfCAwO1xyXG4gICAgfVxyXG4gIH1cclxuICBmb3IgKGxldCBieXRlIG9mIGJpbilcclxuICAgIGlmIChieXRlKVxyXG4gICAgICBicmVhaztcclxuICAgIGVsc2VcclxuICAgICAgcmVzdWx0LnB1c2goJzEnLmNoYXJDb2RlQXQoMCkpO1xyXG4gIHJlc3VsdC5yZXZlcnNlKCk7XHJcbiAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoLi4ucmVzdWx0KTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGVudW0gS2V5VHlwZSB7XHJcbiAgazEgPSAwLFxyXG4gIHIxID0gMSxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwdWJsaWNLZXlEYXRhU2l6ZSA9IDMzO1xyXG5leHBvcnQgY29uc3QgcHJpdmF0ZUtleURhdGFTaXplID0gMzI7XHJcbmV4cG9ydCBjb25zdCBzaWduYXR1cmVEYXRhU2l6ZSA9IDY1O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBLZXkge1xyXG4gIHR5cGU6IEtleVR5cGU7XHJcbiAgZGF0YTogVWludDhBcnJheTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGRpZ2VzdFN1ZmZpeFJpcGVtZDE2MChkYXRhOiBVaW50OEFycmF5LCBzdWZmaXg6IHN0cmluZykge1xyXG4gIGxldCBkID0gbmV3IFVpbnQ4QXJyYXkoZGF0YS5sZW5ndGggKyBzdWZmaXgubGVuZ3RoKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyArK2kpXHJcbiAgICBkW2ldID0gZGF0YVtpXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN1ZmZpeC5sZW5ndGg7ICsraSlcclxuICAgIGRbZGF0YS5sZW5ndGggKyBpXSA9IHN1ZmZpeC5jaGFyQ29kZUF0KGkpO1xyXG4gIHJldHVybiByaXBlbWQxNjAoZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0cmluZ1RvS2V5KHM6IHN0cmluZywgdHlwZTogS2V5VHlwZSwgc2l6ZTogbnVtYmVyLCBzdWZmaXg6IHN0cmluZyk6IEtleSB7XHJcbiAgbGV0IHdob2xlID0gYmFzZTU4VG9CaW5hcnkoc2l6ZSArIDQsIHMpO1xyXG4gIGxldCByZXN1bHQgPSB7IHR5cGUsIGRhdGE6IG5ldyBVaW50OEFycmF5KHdob2xlLmJ1ZmZlciwgMCwgc2l6ZSkgfTtcclxuICBsZXQgZGlnZXN0ID0gbmV3IFVpbnQ4QXJyYXkoZGlnZXN0U3VmZml4UmlwZW1kMTYwKHJlc3VsdC5kYXRhLCBzdWZmaXgpKTtcclxuICBpZiAoZGlnZXN0WzBdICE9PSB3aG9sZVtzaXplICsgMF0gfHwgZGlnZXN0WzFdICE9PSB3aG9sZVtzaXplICsgMV0gfHwgZGlnZXN0WzJdICE9PSB3aG9sZVtzaXplICsgMl0gfHwgZGlnZXN0WzNdICE9PSB3aG9sZVtzaXplICsgM10pXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJjaGVja3N1bSBkb2Vzbid0IG1hdGNoXCIpO1xyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGtleVRvU3RyaW5nKGtleTogS2V5LCBzdWZmaXg6IHN0cmluZywgcHJlZml4OiBzdHJpbmcpIHtcclxuICBsZXQgZGlnZXN0ID0gbmV3IFVpbnQ4QXJyYXkoZGlnZXN0U3VmZml4UmlwZW1kMTYwKGtleS5kYXRhLCBzdWZmaXgpKTtcclxuICBsZXQgd2hvbGUgPSBuZXcgVWludDhBcnJheShrZXkuZGF0YS5sZW5ndGggKyA0KTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGtleS5kYXRhLmxlbmd0aDsgKytpKVxyXG4gICAgd2hvbGVbaV0gPSBrZXkuZGF0YVtpXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7ICsraSlcclxuICAgIHdob2xlW2kgKyBrZXkuZGF0YS5sZW5ndGhdID0gZGlnZXN0W2ldO1xyXG4gIHJldHVybiBwcmVmaXggKyBiaW5hcnlUb0Jhc2U1OCh3aG9sZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdUb1B1YmxpY0tleShzOiBzdHJpbmcpOiBLZXkge1xyXG4gIGlmIChzLnN1YnN0cigwLCAzKSA9PSBcIkVPU1wiKSB7XHJcbiAgICBsZXQgd2hvbGUgPSBiYXNlNThUb0JpbmFyeShwdWJsaWNLZXlEYXRhU2l6ZSArIDQsIHMuc3Vic3RyKDMpKTtcclxuICAgIGxldCBrZXkgPSB7IHR5cGU6IEtleVR5cGUuazEsIGRhdGE6IG5ldyBVaW50OEFycmF5KHB1YmxpY0tleURhdGFTaXplKSB9O1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwdWJsaWNLZXlEYXRhU2l6ZTsgKytpKVxyXG4gICAgICBrZXkuZGF0YVtpXSA9IHdob2xlW2ldO1xyXG4gICAgbGV0IGRpZ2VzdCA9IG5ldyBVaW50OEFycmF5KHJpcGVtZDE2MChrZXkuZGF0YSkpO1xyXG4gICAgaWYgKGRpZ2VzdFswXSAhPT0gd2hvbGVbcHVibGljS2V5RGF0YVNpemVdIHx8IGRpZ2VzdFsxXSAhPT0gd2hvbGVbMzRdIHx8IGRpZ2VzdFsyXSAhPT0gd2hvbGVbMzVdIHx8IGRpZ2VzdFszXSAhPT0gd2hvbGVbMzZdKVxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjaGVja3N1bSBkb2Vzbid0IG1hdGNoXCIpO1xyXG4gICAgcmV0dXJuIGtleTtcclxuICB9IGVsc2UgaWYgKHMuc3Vic3RyKDAsIDcpID09IFwiUFVCX1IxX1wiKSB7XHJcbiAgICByZXR1cm4gc3RyaW5nVG9LZXkocy5zdWJzdHIoNyksIEtleVR5cGUucjEsIHB1YmxpY0tleURhdGFTaXplLCBcIlIxXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnJlY29nbml6ZWQgcHVibGljIGtleSBmb3JtYXRcIik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHVibGljS2V5VG9TdHJpbmcoa2V5OiBLZXkpIHtcclxuICBpZiAoa2V5LnR5cGUgPT0gS2V5VHlwZS5rMSAmJiBrZXkuZGF0YS5sZW5ndGggPT0gcHVibGljS2V5RGF0YVNpemUpIHtcclxuICAgIGxldCBkaWdlc3QgPSBuZXcgVWludDhBcnJheShyaXBlbWQxNjAoa2V5LmRhdGEpKTtcclxuICAgIGxldCB3aG9sZSA9IG5ldyBVaW50OEFycmF5KHB1YmxpY0tleURhdGFTaXplICsgNCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHB1YmxpY0tleURhdGFTaXplOyArK2kpXHJcbiAgICAgIHdob2xlW2ldID0ga2V5LmRhdGFbaV07XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7ICsraSlcclxuICAgICAgd2hvbGVbaSArIHB1YmxpY0tleURhdGFTaXplXSA9IGRpZ2VzdFtpXTtcclxuICAgIHJldHVybiBcIkVPU1wiICsgYmluYXJ5VG9CYXNlNTgod2hvbGUpO1xyXG4gIH0gZWxzZSBpZiAoa2V5LnR5cGUgPT0gS2V5VHlwZS5yMSAmJiBrZXkuZGF0YS5sZW5ndGggPT0gcHVibGljS2V5RGF0YVNpemUpIHtcclxuICAgIHJldHVybiBrZXlUb1N0cmluZyhrZXksIFwiUjFcIiwgXCJQVUJfUjFfXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnJlY29nbml6ZWQgcHVibGljIGtleSBmb3JtYXRcIik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nVG9Qcml2YXRlS2V5KHM6IHN0cmluZyk6IEtleSB7XHJcbiAgaWYgKHMuc3Vic3RyKDAsIDcpID09IFwiUFZUX1IxX1wiKVxyXG4gICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLnIxLCBwcml2YXRlS2V5RGF0YVNpemUsIFwiUjFcIik7XHJcbiAgZWxzZVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwidW5yZWNvZ25pemVkIHByaXZhdGUga2V5IGZvcm1hdFwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByaXZhdGVLZXlUb1N0cmluZyhzaWduYXR1cmU6IEtleSkge1xyXG4gIGlmIChzaWduYXR1cmUudHlwZSA9PSBLZXlUeXBlLnIxKVxyXG4gICAgcmV0dXJuIGtleVRvU3RyaW5nKHNpZ25hdHVyZSwgXCJSMVwiLCBcIlBWVF9SMV9cIik7XHJcbiAgZWxzZVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwidW5yZWNvZ25pemVkIHByaXZhdGUga2V5IGZvcm1hdFwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1RvU2lnbmF0dXJlKHM6IHN0cmluZyk6IEtleSB7XHJcbiAgaWYgKHMuc3Vic3RyKDAsIDcpID09IFwiU0lHX0sxX1wiKVxyXG4gICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLmsxLCBzaWduYXR1cmVEYXRhU2l6ZSwgXCJLMVwiKTtcclxuICBlbHNlIGlmIChzLnN1YnN0cigwLCA3KSA9PSBcIlNJR19SMV9cIilcclxuICAgIHJldHVybiBzdHJpbmdUb0tleShzLnN1YnN0cig3KSwgS2V5VHlwZS5yMSwgc2lnbmF0dXJlRGF0YVNpemUsIFwiUjFcIik7XHJcbiAgZWxzZVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwidW5yZWNvZ25pemVkIHNpZ25hdHVyZSBmb3JtYXRcIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaWduYXR1cmVUb1N0cmluZyhzaWduYXR1cmU6IEtleSkge1xyXG4gIGlmIChzaWduYXR1cmUudHlwZSA9PSBLZXlUeXBlLmsxKVxyXG4gICAgcmV0dXJuIGtleVRvU3RyaW5nKHNpZ25hdHVyZSwgXCJLMVwiLCBcIlNJR19LMV9cIik7XHJcbiAgZWxzZSBpZiAoc2lnbmF0dXJlLnR5cGUgPT0gS2V5VHlwZS5yMSlcclxuICAgIHJldHVybiBrZXlUb1N0cmluZyhzaWduYXR1cmUsIFwiUjFcIiwgXCJTSUdfUjFfXCIpO1xyXG4gIGVsc2VcclxuICAgIHRocm93IG5ldyBFcnJvcihcInVucmVjb2duaXplZCBzaWduYXR1cmUgZm9ybWF0XCIpO1xyXG59XHJcbiIsIi8vIGNvcHlyaWdodCBkZWZpbmVkIGluIGVvc2pzMi9MSUNFTlNFLnR4dFxyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgQWJpLCBCbG9ja1RhcG9zSW5mbyB9IGZyb20gJy4vZW9zanMyLWpzb25ycGMnO1xyXG5pbXBvcnQgKiBhcyBudW1lcmljIGZyb20gJy4vZW9zanMyLW51bWVyaWMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGaWVsZCB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIHR5cGVOYW1lOiBzdHJpbmc7XHJcbiAgdHlwZTogVHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUeXBlIHtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgYWxpYXNPZk5hbWU6IHN0cmluZztcclxuICBhcnJheU9mOiBUeXBlO1xyXG4gIG9wdGlvbmFsT2Y6IFR5cGU7XHJcbiAgYmFzZU5hbWU6IHN0cmluZztcclxuICBiYXNlOiBUeXBlO1xyXG4gIGZpZWxkczogRmllbGRbXTtcclxuICBzZXJpYWxpemU6IChidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogYW55KSA9PiB2b2lkO1xyXG4gIGRlc2VyaWFsaXplOiAoYnVmZmVyOiBTZXJpYWxCdWZmZXIpID0+IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTeW1ib2wge1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBwcmVjaXNpb246IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb250cmFjdCB7XHJcbiAgYWN0aW9uczogTWFwPHN0cmluZywgVHlwZT47XHJcbiAgdHlwZXM6IE1hcDxzdHJpbmcsIFR5cGU+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhvcml6YXRpb24ge1xyXG4gIGFjdG9yOiBzdHJpbmc7XHJcbiAgcGVybWlzc2lvbjogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbiB7XHJcbiAgYWNjb3VudDogc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBhdXRob3JpemF0aW9uOiBBdXRob3JpemF0aW9uW107XHJcbiAgZGF0YTogYW55O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNlcmlhbGl6ZWRBY3Rpb24ge1xyXG4gIGFjY291bnQ6IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgYXV0aG9yaXphdGlvbjogQXV0aG9yaXphdGlvbltdO1xyXG4gIGRhdGE6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNlcmlhbEJ1ZmZlciB7XHJcbiAgbGVuZ3RoID0gMDtcclxuICBhcnJheSA9IG5ldyBVaW50OEFycmF5KDEwMjQpO1xyXG4gIHJlYWRQb3MgPSAwO1xyXG4gIHRleHRFbmNvZGVyOiBUZXh0RW5jb2RlcjtcclxuICB0ZXh0RGVjb2RlcjogVGV4dERlY29kZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHsgdGV4dEVuY29kZXIsIHRleHREZWNvZGVyIH0gPSB7fSBhcyB7IHRleHRFbmNvZGVyOiBUZXh0RW5jb2RlciwgdGV4dERlY29kZXI6IFRleHREZWNvZGVyIH0pIHtcclxuICAgIHRoaXMudGV4dEVuY29kZXIgPSB0ZXh0RW5jb2RlciB8fCBuZXcgVGV4dEVuY29kZXI7XHJcbiAgICB0aGlzLnRleHREZWNvZGVyID0gdGV4dERlY29kZXIgfHwgbmV3IFRleHREZWNvZGVyKCd1dGYtOCcsIHsgZmF0YWw6IHRydWUgfSk7XHJcbiAgfVxyXG5cclxuICByZXNlcnZlKHNpemU6IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMubGVuZ3RoICsgc2l6ZSA8PSB0aGlzLmFycmF5Lmxlbmd0aClcclxuICAgICAgcmV0dXJuO1xyXG4gICAgbGV0IGwgPSB0aGlzLmFycmF5Lmxlbmd0aDtcclxuICAgIHdoaWxlICh0aGlzLmxlbmd0aCArIHNpemUgPiBsKVxyXG4gICAgICBsID0gTWF0aC5jZWlsKGwgKiAxLjUpO1xyXG4gICAgbGV0IG5ld0FycmF5ID0gbmV3IFVpbnQ4QXJyYXkobCk7XHJcbiAgICBuZXdBcnJheS5zZXQodGhpcy5hcnJheSk7XHJcbiAgICB0aGlzLmFycmF5ID0gbmV3QXJyYXk7XHJcbiAgfVxyXG5cclxuICBhc1VpbnQ4QXJyYXkoKSB7XHJcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkodGhpcy5hcnJheS5idWZmZXIsIDAsIHRoaXMubGVuZ3RoKTtcclxuICB9XHJcblxyXG4gIHB1c2hBcnJheSh2OiBudW1iZXJbXSB8IFVpbnQ4QXJyYXkpIHtcclxuICAgIHRoaXMucmVzZXJ2ZSh2Lmxlbmd0aCk7XHJcbiAgICB0aGlzLmFycmF5LnNldCh2LCB0aGlzLmxlbmd0aCk7XHJcbiAgICB0aGlzLmxlbmd0aCArPSB2Lmxlbmd0aDtcclxuICB9XHJcblxyXG4gIHB1c2goLi4udjogbnVtYmVyW10pIHtcclxuICAgIHRoaXMucHVzaEFycmF5KHYpO1xyXG4gIH1cclxuXHJcbiAgZ2V0KCkge1xyXG4gICAgaWYgKHRoaXMucmVhZFBvcyA8IHRoaXMubGVuZ3RoKVxyXG4gICAgICByZXR1cm4gdGhpcy5hcnJheVt0aGlzLnJlYWRQb3MrK107XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlYWQgcGFzdCBlbmQgb2YgYnVmZmVyJyk7XHJcbiAgfVxyXG5cclxuICBwdXNoVWludDhBcnJheUNoZWNrZWQodjogVWludDhBcnJheSwgbGVuOiBudW1iZXIpIHtcclxuICAgIGlmICh2Lmxlbmd0aCAhPT0gbGVuKVxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JpbmFyeSBkYXRhIGhhcyBpbmNvcnJlY3Qgc2l6ZScpO1xyXG4gICAgdGhpcy5wdXNoQXJyYXkodik7XHJcbiAgfVxyXG5cclxuICBnZXRVaW50OEFycmF5KGxlbjogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5yZWFkUG9zICsgbGVuID4gdGhpcy5sZW5ndGgpXHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVhZCBwYXN0IGVuZCBvZiBidWZmZXInKTtcclxuICAgIGxldCByZXN1bHQgPSBuZXcgVWludDhBcnJheSh0aGlzLmFycmF5LmJ1ZmZlciwgdGhpcy5yZWFkUG9zLCBsZW4pO1xyXG4gICAgdGhpcy5yZWFkUG9zICs9IGxlbjtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBwdXNoVWludDE2KHY6IG51bWJlcikge1xyXG4gICAgdGhpcy5wdXNoKCh2ID4+IDApICYgMHhmZiwgKHYgPj4gOCkgJiAweGZmKTtcclxuICB9XHJcblxyXG4gIGdldFVpbnQxNigpIHtcclxuICAgIGxldCB2ID0gMDtcclxuICAgIHYgfD0gdGhpcy5nZXQoKSA8PCAwO1xyXG4gICAgdiB8PSB0aGlzLmdldCgpIDw8IDg7XHJcbiAgICByZXR1cm4gdjtcclxuICB9XHJcblxyXG4gIHB1c2hVaW50MzIodjogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnB1c2goKHYgPj4gMCkgJiAweGZmLCAodiA+PiA4KSAmIDB4ZmYsICh2ID4+IDE2KSAmIDB4ZmYsICh2ID4+IDI0KSAmIDB4ZmYpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VWludDMyKCkge1xyXG4gICAgbGV0IHYgPSAwO1xyXG4gICAgdiB8PSB0aGlzLmdldCgpIDw8IDA7XHJcbiAgICB2IHw9IHRoaXMuZ2V0KCkgPDwgODtcclxuICAgIHYgfD0gdGhpcy5nZXQoKSA8PCAxNjtcclxuICAgIHYgfD0gdGhpcy5nZXQoKSA8PCAyNDtcclxuICAgIHJldHVybiB2ID4+PiAwO1xyXG4gIH1cclxuXHJcbiAgcHVzaE51bWJlckFzVWludDY0KHY6IG51bWJlcikge1xyXG4gICAgdGhpcy5wdXNoVWludDMyKHYgPj4+IDApO1xyXG4gICAgdGhpcy5wdXNoVWludDMyKE1hdGguZmxvb3IodiAvIDB4MTAwMDBfMDAwMCkgPj4+IDApO1xyXG4gIH1cclxuXHJcbiAgZ2V0VWludDY0QXNOdW1iZXIoKSB7XHJcbiAgICBsZXQgbG93ID0gdGhpcy5nZXRVaW50MzIoKTtcclxuICAgIGxldCBoaWdoID0gdGhpcy5nZXRVaW50MzIoKTtcclxuICAgIHJldHVybiAoaGlnaCA+Pj4gMCkgKiAweDEwMDAwXzAwMDAgKyAobG93ID4+PiAwKTtcclxuICB9XHJcblxyXG4gIHB1c2hWYXJ1aW50MzIodjogbnVtYmVyKSB7XHJcbiAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICBpZiAodiA+Pj4gNykge1xyXG4gICAgICAgIHRoaXMucHVzaCgweDgwIHwgKHYgJiAweDdmKSk7XHJcbiAgICAgICAgdiA9IHYgPj4+IDc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wdXNoKHYpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRWYXJ1aW50MzIoKSB7XHJcbiAgICBsZXQgdiA9IDA7XHJcbiAgICBsZXQgYml0ID0gMDtcclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgIGxldCBiID0gdGhpcy5nZXQoKTtcclxuICAgICAgdiB8PSAoYiAmIDB4N2YpIDw8IGJpdDtcclxuICAgICAgYml0ICs9IDc7XHJcbiAgICAgIGlmICghKGIgJiAweDgwKSlcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiB2ID4+PiAwO1xyXG4gIH1cclxuXHJcbiAgcHVzaFZhcmludDMyKHY6IG51bWJlcikge1xyXG4gICAgdGhpcy5wdXNoVmFydWludDMyKCh2IDw8IDEpIF4gKHYgPj4gMzEpKTtcclxuICB9XHJcblxyXG4gIGdldFZhcmludDMyKCkge1xyXG4gICAgbGV0IHYgPSB0aGlzLmdldFZhcnVpbnQzMigpO1xyXG4gICAgaWYgKHYgJiAxKVxyXG4gICAgICByZXR1cm4gKCh+dikgPj4gMSkgfCAweDgwMDBfMDAwMDtcclxuICAgIGVsc2VcclxuICAgICAgcmV0dXJuIHYgPj4+IDE7XHJcbiAgfVxyXG5cclxuICBwdXNoRmxvYXQzMih2OiBudW1iZXIpIHtcclxuICAgIHRoaXMucHVzaEFycmF5KG5ldyBVaW50OEFycmF5KChuZXcgRmxvYXQzMkFycmF5KFt2XSkpLmJ1ZmZlcikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmxvYXQzMigpIHtcclxuICAgIHJldHVybiBuZXcgRmxvYXQzMkFycmF5KHRoaXMuZ2V0VWludDhBcnJheSg0KS5zbGljZSgpLmJ1ZmZlcilbMF07XHJcbiAgfVxyXG5cclxuICBwdXNoRmxvYXQ2NCh2OiBudW1iZXIpIHtcclxuICAgIHRoaXMucHVzaEFycmF5KG5ldyBVaW50OEFycmF5KChuZXcgRmxvYXQ2NEFycmF5KFt2XSkpLmJ1ZmZlcikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmxvYXQ2NCgpIHtcclxuICAgIHJldHVybiBuZXcgRmxvYXQ2NEFycmF5KHRoaXMuZ2V0VWludDhBcnJheSg4KS5zbGljZSgpLmJ1ZmZlcilbMF07XHJcbiAgfVxyXG5cclxuICBwdXNoTmFtZShzOiBzdHJpbmcpIHtcclxuICAgIGZ1bmN0aW9uIGNoYXJUb1N5bWJvbChjOiBudW1iZXIpIHtcclxuICAgICAgaWYgKGMgPj0gJ2EnLmNoYXJDb2RlQXQoMCkgJiYgYyA8PSAneicuY2hhckNvZGVBdCgwKSlcclxuICAgICAgICByZXR1cm4gKGMgLSAnYScuY2hhckNvZGVBdCgwKSkgKyA2O1xyXG4gICAgICBpZiAoYyA+PSAnMScuY2hhckNvZGVBdCgwKSAmJiBjIDw9ICc1Jy5jaGFyQ29kZUF0KDApKVxyXG4gICAgICAgIHJldHVybiAoYyAtICcxJy5jaGFyQ29kZUF0KDApKSArIDE7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgbGV0IGEgPSBuZXcgVWludDhBcnJheSg4KTtcclxuICAgIGxldCBiaXQgPSA2MztcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICBsZXQgYyA9IGNoYXJUb1N5bWJvbChzLmNoYXJDb2RlQXQoaSkpO1xyXG4gICAgICBpZiAoYml0IDwgNSlcclxuICAgICAgICBjID0gYyA8PCAxO1xyXG4gICAgICBmb3IgKGxldCBqID0gNDsgaiA+PSAwOyAtLWopIHtcclxuICAgICAgICBpZiAoYml0ID49IDApIHtcclxuICAgICAgICAgIGFbTWF0aC5mbG9vcihiaXQgLyA4KV0gfD0gKChjID4+IGopICYgMSkgPDwgKGJpdCAlIDgpO1xyXG4gICAgICAgICAgLS1iaXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnB1c2hBcnJheShhKTtcclxuICB9XHJcblxyXG4gIGdldE5hbWUoKSB7XHJcbiAgICBsZXQgYSA9IHRoaXMuZ2V0VWludDhBcnJheSg4KTtcclxuICAgIGxldCByZXN1bHQgPSAnJztcclxuICAgIGZvciAobGV0IGJpdCA9IDYzOyBiaXQgPj0gMDspIHtcclxuICAgICAgbGV0IGMgPSAwO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7ICsraSkge1xyXG4gICAgICAgIGlmIChiaXQgPj0gMCkge1xyXG4gICAgICAgICAgYyA9IChjIDw8IDEpIHwgKChhW01hdGguZmxvb3IoYml0IC8gOCldID4+IChiaXQgJSA4KSkgJiAxKTtcclxuICAgICAgICAgIC0tYml0O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoYyA+PSA2KVxyXG4gICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMgKyAnYScuY2hhckNvZGVBdCgwKSAtIDYpO1xyXG4gICAgICBlbHNlIGlmIChjID49IDEpXHJcbiAgICAgICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyArICcxJy5jaGFyQ29kZUF0KDApIC0gMSk7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICByZXN1bHQgKz0gJy4nO1xyXG4gICAgfVxyXG4gICAgaWYgKHJlc3VsdCA9PT0gJy4uLi4uLi4uLi4uLi4nKVxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgd2hpbGUgKHJlc3VsdC5lbmRzV2l0aCgnLicpKVxyXG4gICAgICByZXN1bHQgPSByZXN1bHQuc3Vic3RyKDAsIHJlc3VsdC5sZW5ndGggLSAxKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBwdXNoQnl0ZXModjogbnVtYmVyW10gfCBVaW50OEFycmF5KSB7XHJcbiAgICB0aGlzLnB1c2hWYXJ1aW50MzIodi5sZW5ndGgpO1xyXG4gICAgdGhpcy5wdXNoQXJyYXkodik7XHJcbiAgfVxyXG5cclxuICBnZXRCeXRlcygpIHtcclxuICAgIHJldHVybiB0aGlzLmdldFVpbnQ4QXJyYXkodGhpcy5nZXRWYXJ1aW50MzIoKSk7XHJcbiAgfVxyXG5cclxuICBwdXNoU3RyaW5nKHY6IHN0cmluZykge1xyXG4gICAgdGhpcy5wdXNoQnl0ZXModGhpcy50ZXh0RW5jb2Rlci5lbmNvZGUodikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGV4dERlY29kZXIuZGVjb2RlKHRoaXMuZ2V0Qnl0ZXMoKSk7XHJcbiAgfVxyXG5cclxuICBwdXNoU3ltYm9sQ29kZShuYW1lOiBzdHJpbmcpIHtcclxuICAgIGxldCBhID0gW107XHJcbiAgICBhLnB1c2goLi4udGhpcy50ZXh0RW5jb2Rlci5lbmNvZGUobmFtZSkpO1xyXG4gICAgd2hpbGUgKGEubGVuZ3RoIDwgOClcclxuICAgICAgYS5wdXNoKDApO1xyXG4gICAgdGhpcy5wdXNoQXJyYXkoYS5zbGljZSgwLCA4KSk7XHJcbiAgfVxyXG5cclxuICBnZXRTeW1ib2xDb2RlKCkge1xyXG4gICAgbGV0IGEgPSB0aGlzLmdldFVpbnQ4QXJyYXkoOCk7XHJcbiAgICBsZXQgbGVuO1xyXG4gICAgZm9yIChsZW4gPSAwOyBsZW4gPCBhLmxlbmd0aDsgKytsZW4pXHJcbiAgICAgIGlmICghYVtsZW5dKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgbGV0IG5hbWUgPSB0aGlzLnRleHREZWNvZGVyLmRlY29kZShuZXcgVWludDhBcnJheShhLmJ1ZmZlciwgYS5ieXRlT2Zmc2V0LCBsZW4pKTtcclxuICAgIHJldHVybiBuYW1lO1xyXG4gIH1cclxuXHJcbiAgcHVzaFN5bWJvbCh7IG5hbWUsIHByZWNpc2lvbiB9OiBTeW1ib2wpIHtcclxuICAgIGxldCBhID0gW3ByZWNpc2lvbiAmIDB4ZmZdO1xyXG4gICAgYS5wdXNoKC4uLnRoaXMudGV4dEVuY29kZXIuZW5jb2RlKG5hbWUpKTtcclxuICAgIHdoaWxlIChhLmxlbmd0aCA8IDgpXHJcbiAgICAgIGEucHVzaCgwKTtcclxuICAgIHRoaXMucHVzaEFycmF5KGEuc2xpY2UoMCwgOCkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3ltYm9sKCk6IFN5bWJvbCB7XHJcbiAgICBsZXQgcHJlY2lzaW9uID0gdGhpcy5nZXQoKTtcclxuICAgIGxldCBhID0gdGhpcy5nZXRVaW50OEFycmF5KDcpO1xyXG4gICAgbGV0IGxlbjtcclxuICAgIGZvciAobGVuID0gMDsgbGVuIDwgYS5sZW5ndGg7ICsrbGVuKVxyXG4gICAgICBpZiAoIWFbbGVuXSlcclxuICAgICAgICBicmVhaztcclxuICAgIGxldCBuYW1lID0gdGhpcy50ZXh0RGVjb2Rlci5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoYS5idWZmZXIsIGEuYnl0ZU9mZnNldCwgbGVuKSk7XHJcbiAgICByZXR1cm4geyBuYW1lLCBwcmVjaXNpb24gfTtcclxuICB9XHJcblxyXG4gIHB1c2hBc3NldChzOiBzdHJpbmcpIHtcclxuICAgIHMgPSBzLnRyaW0oKTtcclxuICAgIGxldCBwb3MgPSAwO1xyXG4gICAgbGV0IGFtb3VudCA9ICcnO1xyXG4gICAgbGV0IHByZWNpc2lvbiA9IDA7XHJcbiAgICBpZiAoc1twb3NdID09PSAnLScpIHtcclxuICAgICAgYW1vdW50ICs9ICctJztcclxuICAgICAgKytwb3M7XHJcbiAgICB9XHJcbiAgICBsZXQgZm91bmREaWdpdCA9IGZhbHNlO1xyXG4gICAgd2hpbGUgKHBvcyA8IHMubGVuZ3RoICYmIHMuY2hhckNvZGVBdChwb3MpID49ICcwJy5jaGFyQ29kZUF0KDApICYmIHMuY2hhckNvZGVBdChwb3MpIDw9ICc5Jy5jaGFyQ29kZUF0KDApKSB7XHJcbiAgICAgIGZvdW5kRGlnaXQgPSB0cnVlO1xyXG4gICAgICBhbW91bnQgKz0gc1twb3NdO1xyXG4gICAgICArK3BvcztcclxuICAgIH1cclxuICAgIGlmICghZm91bmREaWdpdClcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBc3NldCBtdXN0IGJlZ2luIHdpdGggYSBudW1iZXInKTtcclxuICAgIGlmIChzW3Bvc10gPT09ICcuJykge1xyXG4gICAgICArK3BvcztcclxuICAgICAgd2hpbGUgKHBvcyA8IHMubGVuZ3RoICYmIHMuY2hhckNvZGVBdChwb3MpID49ICcwJy5jaGFyQ29kZUF0KDApICYmIHMuY2hhckNvZGVBdChwb3MpIDw9ICc5Jy5jaGFyQ29kZUF0KDApKSB7XHJcbiAgICAgICAgYW1vdW50ICs9IHNbcG9zXTtcclxuICAgICAgICArK3ByZWNpc2lvbjtcclxuICAgICAgICArK3BvcztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IG5hbWUgPSBzLnN1YnN0cihwb3MpLnRyaW0oKTtcclxuICAgIHRoaXMucHVzaEFycmF5KG51bWVyaWMuc2lnbmVkRGVjaW1hbFRvQmluYXJ5KDgsIGFtb3VudCkpO1xyXG4gICAgdGhpcy5wdXNoU3ltYm9sKHsgbmFtZSwgcHJlY2lzaW9uIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0QXNzZXQoKSB7XHJcbiAgICBsZXQgYW1vdW50ID0gdGhpcy5nZXRVaW50OEFycmF5KDgpO1xyXG4gICAgbGV0IHsgbmFtZSwgcHJlY2lzaW9uIH0gPSB0aGlzLmdldFN5bWJvbCgpO1xyXG4gICAgbGV0IHMgPSBudW1lcmljLnNpZ25lZEJpbmFyeVRvRGVjaW1hbChhbW91bnQsIHByZWNpc2lvbiArIDEpO1xyXG4gICAgaWYgKHByZWNpc2lvbilcclxuICAgICAgcyA9IHMuc3Vic3RyKDAsIHMubGVuZ3RoIC0gcHJlY2lzaW9uKSArICcuJyArIHMuc3Vic3RyKHMubGVuZ3RoIC0gcHJlY2lzaW9uKTtcclxuICAgIHJldHVybiBzICsgJyAnICsgbmFtZTtcclxuICB9XHJcblxyXG4gIHB1c2hQdWJsaWNLZXkoczogc3RyaW5nKSB7XHJcbiAgICBsZXQga2V5ID0gbnVtZXJpYy5zdHJpbmdUb1B1YmxpY0tleShzKTtcclxuICAgIHRoaXMucHVzaChrZXkudHlwZSk7XHJcbiAgICB0aGlzLnB1c2hBcnJheShrZXkuZGF0YSk7XHJcbiAgfVxyXG5cclxuICBnZXRQdWJsaWNLZXkoKSB7XHJcbiAgICBsZXQgdHlwZSA9IHRoaXMuZ2V0KCk7XHJcbiAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0VWludDhBcnJheShudW1lcmljLnB1YmxpY0tleURhdGFTaXplKTtcclxuICAgIHJldHVybiBudW1lcmljLnB1YmxpY0tleVRvU3RyaW5nKHsgdHlwZSwgZGF0YSB9KTtcclxuICB9XHJcblxyXG4gIHB1c2hQcml2YXRlS2V5KHM6IHN0cmluZykge1xyXG4gICAgbGV0IGtleSA9IG51bWVyaWMuc3RyaW5nVG9Qcml2YXRlS2V5KHMpO1xyXG4gICAgdGhpcy5wdXNoKGtleS50eXBlKTtcclxuICAgIHRoaXMucHVzaEFycmF5KGtleS5kYXRhKTtcclxuICB9XHJcblxyXG4gIGdldFByaXZhdGVLZXkoKSB7XHJcbiAgICBsZXQgdHlwZSA9IHRoaXMuZ2V0KCk7XHJcbiAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0VWludDhBcnJheShudW1lcmljLnByaXZhdGVLZXlEYXRhU2l6ZSk7XHJcbiAgICByZXR1cm4gbnVtZXJpYy5wcml2YXRlS2V5VG9TdHJpbmcoeyB0eXBlLCBkYXRhIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVzaFNpZ25hdHVyZShzOiBzdHJpbmcpIHtcclxuICAgIGxldCBrZXkgPSBudW1lcmljLnN0cmluZ1RvU2lnbmF0dXJlKHMpO1xyXG4gICAgdGhpcy5wdXNoKGtleS50eXBlKTtcclxuICAgIHRoaXMucHVzaEFycmF5KGtleS5kYXRhKTtcclxuICB9XHJcblxyXG4gIGdldFNpZ25hdHVyZSgpIHtcclxuICAgIGxldCB0eXBlID0gdGhpcy5nZXQoKTtcclxuICAgIGxldCBkYXRhID0gdGhpcy5nZXRVaW50OEFycmF5KG51bWVyaWMuc2lnbmF0dXJlRGF0YVNpemUpO1xyXG4gICAgcmV0dXJuIG51bWVyaWMuc2lnbmF0dXJlVG9TdHJpbmcoeyB0eXBlLCBkYXRhIH0pO1xyXG4gIH1cclxufSAvLyBTZXJpYWxCdWZmZXJcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkYXRlVG9UaW1lUG9pbnQoZGF0ZTogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIE1hdGgucm91bmQoRGF0ZS5wYXJzZShkYXRlICsgJ1onKSAqIDEwMDApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGltZVBvaW50VG9EYXRlKHVzOiBudW1iZXIpIHtcclxuICBsZXQgcyA9IChuZXcgRGF0ZSh1cyAvIDEwMDApKS50b0lTT1N0cmluZygpO1xyXG4gIHJldHVybiBzLnN1YnN0cigwLCBzLmxlbmd0aCAtIDEpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGF0ZVRvVGltZVBvaW50U2VjKGRhdGU6IHN0cmluZykge1xyXG4gIHJldHVybiBNYXRoLnJvdW5kKERhdGUucGFyc2UoZGF0ZSArICdaJykgLyAxMDAwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRpbWVQb2ludFNlY1RvRGF0ZShzZWM6IG51bWJlcikge1xyXG4gIGxldCBzID0gKG5ldyBEYXRlKHNlYyAqIDEwMDApKS50b0lTT1N0cmluZygpO1xyXG4gIHJldHVybiBzLnN1YnN0cigwLCBzLmxlbmd0aCAtIDEpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGF0ZVRvQmxvY2tUaW1lc3RhbXAoZGF0ZTogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIE1hdGgucm91bmQoKERhdGUucGFyc2UoZGF0ZSArICdaJykgLSA5NDY2ODQ4MDAwMDApIC8gNTAwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJsb2NrVGltZXN0YW1wVG9EYXRlKHNsb3Q6IG51bWJlcikge1xyXG4gIGxldCBzID0gKG5ldyBEYXRlKHNsb3QgKiA1MDAgKyA5NDY2ODQ4MDAwMDApKS50b0lTT1N0cmluZygpO1xyXG4gIHJldHVybiBzLnN1YnN0cigwLCBzLmxlbmd0aCAtIDEpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nVG9TeW1ib2woczogc3RyaW5nKTogU3ltYm9sIHtcclxuICBsZXQgbSA9IHMubWF0Y2goL14oWzAtOV0rKSwoW0EtWl0rKSQvKTtcclxuICBpZiAoIW0pXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3ltYm9sJyk7XHJcbiAgcmV0dXJuIHsgbmFtZTogbVsyXSwgcHJlY2lzaW9uOiArbVsxXSB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3ltYm9sVG9TdHJpbmcoeyBuYW1lLCBwcmVjaXNpb24gfTogU3ltYm9sKSB7XHJcbiAgcmV0dXJuIHByZWNpc2lvbiArICcsJyArIG5hbWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhcnJheVRvSGV4KGRhdGE6IFVpbnQ4QXJyYXkpIHtcclxuICBsZXQgcmVzdWx0ID0gJyc7XHJcbiAgZm9yIChsZXQgeCBvZiBkYXRhKVxyXG4gICAgcmVzdWx0ICs9ICgnMDAnICsgeC50b1N0cmluZygxNikpLnNsaWNlKC0yKTtcclxuICByZXR1cm4gcmVzdWx0LnRvVXBwZXJDYXNlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoZXhUb1VpbnQ4QXJyYXkoaGV4OiBzdHJpbmcpIHtcclxuICBsZXQgbCA9IGhleC5sZW5ndGggLyAyO1xyXG4gIGxldCByZXN1bHQgPSBuZXcgVWludDhBcnJheShsKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGw7ICsraSlcclxuICAgIHJlc3VsdFtpXSA9IHBhcnNlSW50KGhleC5zdWJzdHIoaSAqIDIsIDIpLCAxNik7XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VyaWFsaXplVW5rbm93bihidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogYW55KTogU2VyaWFsQnVmZmVyIHtcclxuICB0aHJvdyBuZXcgRXJyb3IoXCJEb24ndCBrbm93IGhvdyB0byBzZXJpYWxpemUgXCIgKyB0aGlzLm5hbWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZXNlcmlhbGl6ZVVua25vd24oYnVmZmVyOiBTZXJpYWxCdWZmZXIpOiBTZXJpYWxCdWZmZXIge1xyXG4gIHRocm93IG5ldyBFcnJvcihcIkRvbid0IGtub3cgaG93IHRvIGRlc2VyaWFsaXplIFwiICsgdGhpcy5uYW1lKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VyaWFsaXplU3RydWN0KGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBhbnkpIHtcclxuICBpZiAodGhpcy5iYXNlKVxyXG4gICAgdGhpcy5iYXNlLnNlcmlhbGl6ZShidWZmZXIsIGRhdGEpO1xyXG4gIGZvciAobGV0IGZpZWxkIG9mIHRoaXMuZmllbGRzKSB7XHJcbiAgICBpZiAoIShmaWVsZC5uYW1lIGluIGRhdGEpKVxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgJyArIHRoaXMubmFtZSArICcuJyArIGZpZWxkLm5hbWUgKyAnICh0eXBlPScgKyBmaWVsZC50eXBlLm5hbWUgKyAnKScpO1xyXG4gICAgZmllbGQudHlwZS5zZXJpYWxpemUoYnVmZmVyLCBkYXRhW2ZpZWxkLm5hbWVdKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlc2VyaWFsaXplU3RydWN0KGJ1ZmZlcjogU2VyaWFsQnVmZmVyKSB7XHJcbiAgbGV0IHJlc3VsdDtcclxuICBpZiAodGhpcy5iYXNlKVxyXG4gICAgcmVzdWx0ID0gdGhpcy5iYXNlLmRlc2VyaWFsaXplKGJ1ZmZlcik7XHJcbiAgZWxzZVxyXG4gICAgcmVzdWx0ID0ge307XHJcbiAgZm9yIChsZXQgZmllbGQgb2YgdGhpcy5maWVsZHMpXHJcbiAgICByZXN1bHRbZmllbGQubmFtZV0gPSBmaWVsZC50eXBlLmRlc2VyaWFsaXplKGJ1ZmZlcik7XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VyaWFsaXplQXJyYXkoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IGFueVtdKSB7XHJcbiAgYnVmZmVyLnB1c2hWYXJ1aW50MzIoZGF0YS5sZW5ndGgpO1xyXG4gIGZvciAobGV0IGl0ZW0gb2YgZGF0YSlcclxuICAgIHRoaXMuYXJyYXlPZi5zZXJpYWxpemUoYnVmZmVyLCBpdGVtKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVzZXJpYWxpemVBcnJheShidWZmZXI6IFNlcmlhbEJ1ZmZlcikge1xyXG4gIGxldCBsZW4gPSBidWZmZXIuZ2V0VmFydWludDMyKCk7XHJcbiAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyArK2kpXHJcbiAgICByZXN1bHQucHVzaCh0aGlzLmFycmF5T2YuZGVzZXJpYWxpemUoYnVmZmVyKSk7XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VyaWFsaXplT3B0aW9uYWwoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IGFueSkge1xyXG4gIGlmIChkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgYnVmZmVyLnB1c2goMCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGJ1ZmZlci5wdXNoKDEpO1xyXG4gICAgdGhpcy5vcHRpb25hbE9mLnNlcmlhbGl6ZShidWZmZXIsIGRhdGEpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGVzZXJpYWxpemVPcHRpb25hbChidWZmZXI6IFNlcmlhbEJ1ZmZlcikge1xyXG4gIGlmIChidWZmZXIuZ2V0KCkpXHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25hbE9mLmRlc2VyaWFsaXplKGJ1ZmZlcik7XHJcbiAgZWxzZVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmludGVyZmFjZSBDcmVhdGVUeXBlQXJncyB7XHJcbiAgbmFtZT86IHN0cmluZztcclxuICBhbGlhc09mTmFtZT86IHN0cmluZztcclxuICBhcnJheU9mPzogVHlwZTtcclxuICBvcHRpb25hbE9mPzogVHlwZTtcclxuICBiYXNlTmFtZT86IHN0cmluZztcclxuICBiYXNlPzogVHlwZTtcclxuICBmaWVsZHM/OiBGaWVsZFtdO1xyXG4gIHNlcmlhbGl6ZT86IChidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogYW55KSA9PiB2b2lkO1xyXG4gIGRlc2VyaWFsaXplPzogKGJ1ZmZlcjogU2VyaWFsQnVmZmVyKSA9PiBhbnk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVR5cGUoYXR0cnM6IENyZWF0ZVR5cGVBcmdzKTogVHlwZSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6ICc8bWlzc2luZyBuYW1lPicsXHJcbiAgICBhbGlhc09mTmFtZTogJycsXHJcbiAgICBhcnJheU9mOiBudWxsLFxyXG4gICAgb3B0aW9uYWxPZjogbnVsbCxcclxuICAgIGJhc2VOYW1lOiAnJyxcclxuICAgIGJhc2U6IG51bGwsXHJcbiAgICBmaWVsZHM6IFtdLFxyXG4gICAgc2VyaWFsaXplOiBzZXJpYWxpemVVbmtub3duLFxyXG4gICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplVW5rbm93bixcclxuICAgIC4uLmF0dHJzXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUluaXRpYWxUeXBlcygpOiBNYXA8c3RyaW5nLCBUeXBlPiB7XHJcbiAgbGV0IHJlc3VsdCA9IG5ldyBNYXAoT2JqZWN0LmVudHJpZXMoe1xyXG4gICAgYm9vbDogY3JlYXRlVHlwZSh7XHJcbiAgICAgIG5hbWU6ICdib29sJyxcclxuICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBib29sZWFuKSB7IGJ1ZmZlci5wdXNoKGRhdGEgPyAxIDogMCk7IH0sXHJcbiAgICAgIGRlc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyKSB7IHJldHVybiAhIWJ1ZmZlci5nZXQoKTsgfSxcclxuICAgIH0pLFxyXG4gICAgdWludDg6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICBuYW1lOiAndWludDgnLFxyXG4gICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IG51bWJlcikgeyBidWZmZXIucHVzaChkYXRhKTsgfSxcclxuICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXQoKTsgfSxcclxuICAgIH0pLFxyXG4gICAgaW50ODogY3JlYXRlVHlwZSh7XHJcbiAgICAgIG5hbWU6ICdpbnQ4JyxcclxuICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBudW1iZXIpIHsgYnVmZmVyLnB1c2goZGF0YSk7IH0sXHJcbiAgICAgIGRlc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0KCkgPDwgMjQgPj4gMjQ7IH0sXHJcbiAgICB9KSxcclxuICAgIHVpbnQxNjogY3JlYXRlVHlwZSh7XHJcbiAgICAgIG5hbWU6ICd1aW50MTYnLFxyXG4gICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IG51bWJlcikgeyBidWZmZXIucHVzaFVpbnQxNihkYXRhKTsgfSxcclxuICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRVaW50MTYoKTsgfSxcclxuICAgIH0pLFxyXG4gICAgaW50MTY6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICBuYW1lOiAnaW50MTYnLFxyXG4gICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IG51bWJlcikgeyBidWZmZXIucHVzaFVpbnQxNihkYXRhKTsgfSxcclxuICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRVaW50MTYoKSA8PCAxNiA+PiAxNjsgfSxcclxuICAgIH0pLFxyXG4gICAgdWludDMyOiBjcmVhdGVUeXBlKHtcclxuICAgICAgbmFtZTogJ3VpbnQzMicsXHJcbiAgICAgIHNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogbnVtYmVyKSB7IGJ1ZmZlci5wdXNoVWludDMyKGRhdGEpOyB9LFxyXG4gICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFVpbnQzMigpOyB9LFxyXG4gICAgfSksXHJcbiAgICB1aW50NjQ6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICBuYW1lOiAndWludDY0JyxcclxuICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBzdHJpbmcgfCBudW1iZXIpIHsgYnVmZmVyLnB1c2hBcnJheShudW1lcmljLmRlY2ltYWxUb0JpbmFyeSg4LCAnJyArIGRhdGEpKTsgfSxcclxuICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuIG51bWVyaWMuYmluYXJ5VG9EZWNpbWFsKGJ1ZmZlci5nZXRVaW50OEFycmF5KDgpKTsgfSxcclxuICAgIH0pLFxyXG4gICAgaW50NjQ6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICBuYW1lOiAnaW50NjQnLFxyXG4gICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IHN0cmluZyB8IG51bWJlcikgeyBidWZmZXIucHVzaEFycmF5KG51bWVyaWMuc2lnbmVkRGVjaW1hbFRvQmluYXJ5KDgsICcnICsgZGF0YSkpOyB9LFxyXG4gICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gbnVtZXJpYy5zaWduZWRCaW5hcnlUb0RlY2ltYWwoYnVmZmVyLmdldFVpbnQ4QXJyYXkoOCkpOyB9LFxyXG4gICAgfSksXHJcbiAgICBpbnQzMjogY3JlYXRlVHlwZSh7XHJcbiAgICAgIG5hbWU6ICdpbnQzMicsXHJcbiAgICAgIHNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogbnVtYmVyKSB7IGJ1ZmZlci5wdXNoVWludDMyKGRhdGEpOyB9LFxyXG4gICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFVpbnQzMigpIHwgMDsgfSxcclxuICAgIH0pLFxyXG4gICAgdmFydWludDMyOiBjcmVhdGVUeXBlKHtcclxuICAgICAgbmFtZTogJ3ZhcnVpbnQzMicsXHJcbiAgICAgIHNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogbnVtYmVyKSB7IGJ1ZmZlci5wdXNoVmFydWludDMyKGRhdGEpOyB9LFxyXG4gICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFZhcnVpbnQzMigpOyB9LFxyXG4gICAgfSksXHJcbiAgICB2YXJpbnQzMjogY3JlYXRlVHlwZSh7XHJcbiAgICAgIG5hbWU6ICd2YXJpbnQzMicsXHJcbiAgICAgIHNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogbnVtYmVyKSB7IGJ1ZmZlci5wdXNoVmFyaW50MzIoZGF0YSk7IH0sXHJcbiAgICAgIGRlc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0VmFyaW50MzIoKTsgfSxcclxuICAgIH0pLFxyXG4gICAgdWludDEyODogY3JlYXRlVHlwZSh7XHJcbiAgICAgIG5hbWU6ICd1aW50MTI4JyxcclxuICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBzdHJpbmcpIHsgYnVmZmVyLnB1c2hBcnJheShudW1lcmljLmRlY2ltYWxUb0JpbmFyeSgxNiwgZGF0YSkpOyB9LFxyXG4gICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gbnVtZXJpYy5iaW5hcnlUb0RlY2ltYWwoYnVmZmVyLmdldFVpbnQ4QXJyYXkoMTYpKTsgfSxcclxuICAgIH0pLFxyXG4gICAgaW50MTI4OiBjcmVhdGVUeXBlKHtcclxuICAgICAgbmFtZTogJ2ludDEyOCcsXHJcbiAgICAgIHNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogc3RyaW5nKSB7IGJ1ZmZlci5wdXNoQXJyYXkobnVtZXJpYy5zaWduZWREZWNpbWFsVG9CaW5hcnkoMTYsIGRhdGEpKTsgfSxcclxuICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuIG51bWVyaWMuc2lnbmVkQmluYXJ5VG9EZWNpbWFsKGJ1ZmZlci5nZXRVaW50OEFycmF5KDE2KSk7IH0sXHJcbiAgICB9KSxcclxuICAgIGZsb2F0MzI6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICBuYW1lOiAnZmxvYXQzMicsXHJcbiAgICAgIHNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogbnVtYmVyKSB7IGJ1ZmZlci5wdXNoRmxvYXQzMihkYXRhKTsgfSxcclxuICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRGbG9hdDMyKCk7IH0sXHJcbiAgICB9KSxcclxuICAgIGZsb2F0NjQ6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICBuYW1lOiAnZmxvYXQ2NCcsXHJcbiAgICAgIHNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogbnVtYmVyKSB7IGJ1ZmZlci5wdXNoRmxvYXQ2NChkYXRhKTsgfSxcclxuICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRGbG9hdDY0KCk7IH0sXHJcbiAgICB9KSxcclxuICAgIGZsb2F0MTI4OiBjcmVhdGVUeXBlKHtcclxuICAgICAgbmFtZTogJ2Zsb2F0MTI4JyxcclxuICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBzdHJpbmcpIHsgYnVmZmVyLnB1c2hVaW50OEFycmF5Q2hlY2tlZChoZXhUb1VpbnQ4QXJyYXkoZGF0YSksIDE2KTsgfSxcclxuICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuIGFycmF5VG9IZXgoYnVmZmVyLmdldFVpbnQ4QXJyYXkoMTYpKTsgfSxcclxuICAgIH0pLFxyXG5cclxuICAgIGJ5dGVzOiBjcmVhdGVUeXBlKHtcclxuICAgICAgbmFtZTogJ2J5dGVzJyxcclxuICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBzdHJpbmcpIHsgYnVmZmVyLnB1c2hCeXRlcyhoZXhUb1VpbnQ4QXJyYXkoZGF0YSkpOyB9LFxyXG4gICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gYXJyYXlUb0hleChidWZmZXIuZ2V0Qnl0ZXMoKSk7IH0sXHJcbiAgICB9KSxcclxuICAgIHN0cmluZzogY3JlYXRlVHlwZSh7XHJcbiAgICAgIG5hbWU6ICdzdHJpbmcnLFxyXG4gICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IHN0cmluZykgeyBidWZmZXIucHVzaFN0cmluZyhkYXRhKTsgfSxcclxuICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRTdHJpbmcoKTsgfSxcclxuICAgIH0pLFxyXG4gICAgbmFtZTogY3JlYXRlVHlwZSh7XHJcbiAgICAgIG5hbWU6ICduYW1lJyxcclxuICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBzdHJpbmcpIHsgYnVmZmVyLnB1c2hOYW1lKGRhdGEpOyB9LFxyXG4gICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldE5hbWUoKTsgfSxcclxuICAgIH0pLFxyXG4gICAgdGltZV9wb2ludDogY3JlYXRlVHlwZSh7XHJcbiAgICAgIG5hbWU6ICd0aW1lX3BvaW50JyxcclxuICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBzdHJpbmcpIHsgYnVmZmVyLnB1c2hOdW1iZXJBc1VpbnQ2NChkYXRlVG9UaW1lUG9pbnQoZGF0YSkpOyB9LFxyXG4gICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gdGltZVBvaW50VG9EYXRlKGJ1ZmZlci5nZXRVaW50NjRBc051bWJlcigpKTsgfSxcclxuICAgIH0pLFxyXG4gICAgdGltZV9wb2ludF9zZWM6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICBuYW1lOiAndGltZV9wb2ludF9zZWMnLFxyXG4gICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IHN0cmluZykgeyBidWZmZXIucHVzaFVpbnQzMihkYXRlVG9UaW1lUG9pbnRTZWMoZGF0YSkpOyB9LFxyXG4gICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gdGltZVBvaW50U2VjVG9EYXRlKGJ1ZmZlci5nZXRVaW50MzIoKSk7IH0sXHJcbiAgICB9KSxcclxuICAgIGJsb2NrX3RpbWVzdGFtcF90eXBlOiBjcmVhdGVUeXBlKHtcclxuICAgICAgbmFtZTogJ2Jsb2NrX3RpbWVzdGFtcF90eXBlJyxcclxuICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBzdHJpbmcpIHsgYnVmZmVyLnB1c2hVaW50MzIoZGF0ZVRvQmxvY2tUaW1lc3RhbXAoZGF0YSkpOyB9LFxyXG4gICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gYmxvY2tUaW1lc3RhbXBUb0RhdGUoYnVmZmVyLmdldFVpbnQzMigpKTsgfSxcclxuICAgIH0pLFxyXG4gICAgc3ltYm9sX2NvZGU6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICBuYW1lOiAnc3ltYm9sX2NvZGUnLFxyXG4gICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IHN0cmluZykgeyBidWZmZXIucHVzaFN5bWJvbENvZGUoZGF0YSk7IH0sXHJcbiAgICAgIGRlc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0U3ltYm9sQ29kZSgpOyB9LFxyXG4gICAgfSksXHJcbiAgICBzeW1ib2w6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICBuYW1lOiAnc3ltYm9sJyxcclxuICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBzdHJpbmcpIHsgYnVmZmVyLnB1c2hTeW1ib2woc3RyaW5nVG9TeW1ib2woZGF0YSkpOyB9LFxyXG4gICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gc3ltYm9sVG9TdHJpbmcoYnVmZmVyLmdldFN5bWJvbCgpKTsgfSxcclxuICAgIH0pLFxyXG4gICAgYXNzZXQ6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICBuYW1lOiAnYXNzZXQnLFxyXG4gICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IHN0cmluZykgeyBidWZmZXIucHVzaEFzc2V0KGRhdGEpOyB9LFxyXG4gICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldEFzc2V0KCk7IH0sXHJcbiAgICB9KSxcclxuICAgIGNoZWNrc3VtMTYwOiBjcmVhdGVUeXBlKHtcclxuICAgICAgbmFtZTogJ2NoZWNrc3VtMTYwJyxcclxuICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBzdHJpbmcpIHsgYnVmZmVyLnB1c2hVaW50OEFycmF5Q2hlY2tlZChoZXhUb1VpbnQ4QXJyYXkoZGF0YSksIDIwKTsgfSxcclxuICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuIGFycmF5VG9IZXgoYnVmZmVyLmdldFVpbnQ4QXJyYXkoMjApKTsgfSxcclxuICAgIH0pLFxyXG4gICAgY2hlY2tzdW0yNTY6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICBuYW1lOiAnY2hlY2tzdW0yNTYnLFxyXG4gICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IHN0cmluZykgeyBidWZmZXIucHVzaFVpbnQ4QXJyYXlDaGVja2VkKGhleFRvVWludDhBcnJheShkYXRhKSwgMzIpOyB9LFxyXG4gICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gYXJyYXlUb0hleChidWZmZXIuZ2V0VWludDhBcnJheSgzMikpOyB9LFxyXG4gICAgfSksXHJcbiAgICBjaGVja3N1bTUxMjogY3JlYXRlVHlwZSh7XHJcbiAgICAgIG5hbWU6ICdjaGVja3N1bTUxMicsXHJcbiAgICAgIHNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogc3RyaW5nKSB7IGJ1ZmZlci5wdXNoVWludDhBcnJheUNoZWNrZWQoaGV4VG9VaW50OEFycmF5KGRhdGEpLCA2NCk7IH0sXHJcbiAgICAgIGRlc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyKSB7IHJldHVybiBhcnJheVRvSGV4KGJ1ZmZlci5nZXRVaW50OEFycmF5KDY0KSk7IH0sXHJcbiAgICB9KSxcclxuICAgIHB1YmxpY19rZXk6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICBuYW1lOiAncHVibGljX2tleScsXHJcbiAgICAgIHNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogc3RyaW5nKSB7IGJ1ZmZlci5wdXNoUHVibGljS2V5KGRhdGEpOyB9LFxyXG4gICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFB1YmxpY0tleSgpOyB9LFxyXG4gICAgfSksXHJcbiAgICBwcml2YXRlX2tleTogY3JlYXRlVHlwZSh7XHJcbiAgICAgIG5hbWU6ICdwcml2YXRlX2tleScsXHJcbiAgICAgIHNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogc3RyaW5nKSB7IGJ1ZmZlci5wdXNoUHJpdmF0ZUtleShkYXRhKTsgfSxcclxuICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRQcml2YXRlS2V5KCk7IH0sXHJcbiAgICB9KSxcclxuICAgIHNpZ25hdHVyZTogY3JlYXRlVHlwZSh7XHJcbiAgICAgIG5hbWU6ICdzaWduYXR1cmUnLFxyXG4gICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IHN0cmluZykgeyBidWZmZXIucHVzaFNpZ25hdHVyZShkYXRhKTsgfSxcclxuICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRTaWduYXR1cmUoKTsgfSxcclxuICAgIH0pLFxyXG4gIH0pKTtcclxuXHJcbiAgcmVzdWx0LnNldCgnZXh0ZW5kZWRfYXNzZXQnLCBjcmVhdGVUeXBlKHtcclxuICAgIG5hbWU6ICdleHRlbmRlZF9hc3NldCcsXHJcbiAgICBiYXNlTmFtZTogJycsXHJcbiAgICBmaWVsZHM6IFtcclxuICAgICAgeyBuYW1lOiAncXVhbnRpdHknLCB0eXBlTmFtZTogJ2Fzc2V0JywgdHlwZTogcmVzdWx0LmdldCgnYXNzZXQnKSB9LFxyXG4gICAgICB7IG5hbWU6ICdjb250cmFjdCcsIHR5cGVOYW1lOiAnbmFtZScsIHR5cGU6IHJlc3VsdC5nZXQoJ25hbWUnKSB9LFxyXG4gICAgXSxcclxuICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxyXG4gICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplU3RydWN0LFxyXG4gIH0pKTtcclxuXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufSAvLyBjcmVhdGVJbml0aWFsVHlwZXMoKVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFR5cGUodHlwZXM6IE1hcDxzdHJpbmcsIFR5cGU+LCBuYW1lOiBzdHJpbmcpOiBUeXBlIHtcclxuICBsZXQgdHlwZSA9IHR5cGVzLmdldChuYW1lKTtcclxuICBpZiAodHlwZSAmJiB0eXBlLmFsaWFzT2ZOYW1lKVxyXG4gICAgcmV0dXJuIGdldFR5cGUodHlwZXMsIHR5cGUuYWxpYXNPZk5hbWUpO1xyXG4gIGlmICh0eXBlKVxyXG4gICAgcmV0dXJuIHR5cGU7XHJcbiAgaWYgKG5hbWUuZW5kc1dpdGgoJ1tdJykpIHtcclxuICAgIHJldHVybiBjcmVhdGVUeXBlKHtcclxuICAgICAgbmFtZSxcclxuICAgICAgYXJyYXlPZjogZ2V0VHlwZSh0eXBlcywgbmFtZS5zdWJzdHIoMCwgbmFtZS5sZW5ndGggLSAyKSksXHJcbiAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplQXJyYXksXHJcbiAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZUFycmF5LFxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGlmIChuYW1lLmVuZHNXaXRoKCc/JykpIHtcclxuICAgIHJldHVybiBjcmVhdGVUeXBlKHtcclxuICAgICAgbmFtZSxcclxuICAgICAgb3B0aW9uYWxPZjogZ2V0VHlwZSh0eXBlcywgbmFtZS5zdWJzdHIoMCwgbmFtZS5sZW5ndGggLSAxKSksXHJcbiAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplT3B0aW9uYWwsXHJcbiAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZU9wdGlvbmFsLFxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHRocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlOiAnICsgbmFtZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUeXBlc0Zyb21BYmkoaW5pdGlhbFR5cGVzOiBNYXA8c3RyaW5nLCBUeXBlPiwgYWJpOiBBYmkpIHtcclxuICBsZXQgdHlwZXMgPSBuZXcgTWFwKGluaXRpYWxUeXBlcyk7XHJcbiAgZm9yIChsZXQgeyBuZXdfdHlwZV9uYW1lLCB0eXBlIH0gb2YgYWJpLnR5cGVzKVxyXG4gICAgdHlwZXMuc2V0KG5ld190eXBlX25hbWUsXHJcbiAgICAgIGNyZWF0ZVR5cGUoeyBuYW1lOiBuZXdfdHlwZV9uYW1lLCBhbGlhc09mTmFtZTogdHlwZSwgfSkpO1xyXG4gIGZvciAobGV0IHsgbmFtZSwgYmFzZSwgZmllbGRzIH0gb2YgYWJpLnN0cnVjdHMpIHtcclxuICAgIHR5cGVzLnNldChuYW1lLCBjcmVhdGVUeXBlKHtcclxuICAgICAgbmFtZSxcclxuICAgICAgYmFzZU5hbWU6IGJhc2UsXHJcbiAgICAgIGZpZWxkczogZmllbGRzLm1hcCgoeyBuYW1lLCB0eXBlIH0pID0+ICh7IG5hbWUsIHR5cGVOYW1lOiB0eXBlLCB0eXBlOiBudWxsIH0pKSxcclxuICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVTdHJ1Y3QsXHJcbiAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVN0cnVjdCxcclxuICAgIH0pKTtcclxuICB9XHJcbiAgZm9yIChsZXQgW25hbWUsIHR5cGVdIG9mIHR5cGVzKSB7XHJcbiAgICBpZiAodHlwZS5iYXNlTmFtZSlcclxuICAgICAgdHlwZS5iYXNlID0gZ2V0VHlwZSh0eXBlcywgdHlwZS5iYXNlTmFtZSk7XHJcbiAgICBmb3IgKGxldCBmaWVsZCBvZiB0eXBlLmZpZWxkcylcclxuICAgICAgZmllbGQudHlwZSA9IGdldFR5cGUodHlwZXMsIGZpZWxkLnR5cGVOYW1lKTtcclxuICB9XHJcbiAgcmV0dXJuIHR5cGVzO1xyXG59IC8vIGdldFR5cGVzRnJvbUFiaVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zYWN0aW9uSGVhZGVyKHJlZkJsb2NrOiBCbG9ja1RhcG9zSW5mbywgZXhwaXJlU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGV4cGlyYXRpb246IHRpbWVQb2ludFNlY1RvRGF0ZShkYXRlVG9UaW1lUG9pbnRTZWMocmVmQmxvY2sudGltZXN0YW1wKSArIGV4cGlyZVNlY29uZHMpLFxyXG4gICAgcmVmX2Jsb2NrX251bTogcmVmQmxvY2suYmxvY2tfbnVtICYgMHhmZmZmLFxyXG4gICAgcmVmX2Jsb2NrX3ByZWZpeDogcmVmQmxvY2sucmVmX2Jsb2NrX3ByZWZpeCxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZUFjdGlvbkRhdGEoY29udHJhY3Q6IENvbnRyYWN0LCBhY2NvdW50OiBzdHJpbmcsIG5hbWU6IHN0cmluZywgZGF0YTogYW55KTogc3RyaW5nIHtcclxuICBsZXQgYWN0aW9uID0gY29udHJhY3QuYWN0aW9ucy5nZXQobmFtZSk7XHJcbiAgaWYgKCFhY3Rpb24pIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBhY3Rpb24gJHtuYW1lfSBpbiBjb250cmFjdCAke2FjY291bnR9YCk7XHJcbiAgfVxyXG4gIGxldCBidWZmZXIgPSBuZXcgU2VyaWFsQnVmZmVyO1xyXG4gIGFjdGlvbi5zZXJpYWxpemUoYnVmZmVyLCBkYXRhKTtcclxuICByZXR1cm4gYXJyYXlUb0hleChidWZmZXIuYXNVaW50OEFycmF5KCkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplQWN0aW9uKGNvbnRyYWN0OiBDb250cmFjdCwgYWNjb3VudDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGF1dGhvcml6YXRpb246IEF1dGhvcml6YXRpb25bXSwgZGF0YTogYW55KTogU2VyaWFsaXplZEFjdGlvbiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGFjY291bnQsXHJcbiAgICBuYW1lLFxyXG4gICAgYXV0aG9yaXphdGlvbixcclxuICAgIGRhdGE6IHNlcmlhbGl6ZUFjdGlvbkRhdGEoY29udHJhY3QsIGFjY291bnQsIG5hbWUsIGRhdGEpLFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZXNlcmlhbGl6ZUFjdGlvbkRhdGEoY29udHJhY3Q6IENvbnRyYWN0LCBhY2NvdW50OiBzdHJpbmcsIG5hbWU6IHN0cmluZywgZGF0YTogYW55KTogYW55IHtcclxuICBjb25zdCBhY3Rpb24gPSBjb250cmFjdC5hY3Rpb25zLmdldChuYW1lKTtcclxuICBpZiAodHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIGRhdGEgPSBoZXhUb1VpbnQ4QXJyYXkoZGF0YSlcclxuICB9XHJcbiAgaWYgKCFhY3Rpb24pIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBhY3Rpb24gJHtuYW1lfSBpbiBjb250cmFjdCAke2FjY291bnR9YCk7XHJcbiAgfVxyXG4gIGxldCBidWZmZXIgPSBuZXcgU2VyaWFsQnVmZmVyO1xyXG4gIGJ1ZmZlci5wdXNoQXJyYXkoZGF0YSlcclxuICByZXR1cm4gYWN0aW9uLmRlc2VyaWFsaXplKGJ1ZmZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZXNlcmlhbGl6ZUFjdGlvbihjb250cmFjdDogQ29udHJhY3QsIGFjY291bnQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBhdXRob3JpemF0aW9uOiBBdXRob3JpemF0aW9uW10sIGRhdGE6IGFueSk6IEFjdGlvbiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGFjY291bnQsXHJcbiAgICBuYW1lLFxyXG4gICAgYXV0aG9yaXphdGlvbixcclxuICAgIGRhdGE6IGRlc2VyaWFsaXplQWN0aW9uRGF0YShjb250cmFjdCwgYWNjb3VudCwgbmFtZSwgZGF0YSksXHJcbiAgfTtcclxufVxyXG4iLCIvLyBodHRwczovL2dpc3QuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3dsemxhMDAwL2JhYzgzZGY2ZDNjNTE5MTZjNGRkMGJjOTQ3ZTQ2OTQ3L3Jhdy83ZWUzNDYyYjA5NWFiMjI1ODBkZGFmMTkxZjQ0YTU5MGRhNmZlMzNiL1JJUEVNRC0xNjAuanNcclxuXHJcbi8qXHJcblx0UklQRU1ELTE2MC5qc1xyXG5cclxuXHRcdGRldmVsb3BlZFxyXG5cdFx0XHRieSBLLiAoaHR0cHM6Ly9naXRodWIuY29tL3dsemxhMDAwKVxyXG5cdFx0XHRvbiBEZWNlbWJlciAyNy0yOSwgMjAxNyxcclxuXHJcblx0XHRsaWNlbnNlZCB1bmRlclxyXG5cclxuXHJcblx0XHR0aGUgTUlUIGxpY2Vuc2VcclxuXHJcblx0XHRDb3B5cmlnaHQgKGMpIDIwMTcgSy5cclxuXHJcblx0XHQgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cclxuXHRcdG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXHJcblx0XHRmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXRcclxuXHRcdHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLFxyXG5cdFx0Y29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXHJcblx0XHRzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZVxyXG5cdFx0U29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmdcclxuXHRcdGNvbmRpdGlvbnM6XHJcblxyXG5cdFx0IFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXHJcblx0XHRpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblx0XHQgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcclxuXHRcdEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFU1xyXG5cdFx0T0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkRcclxuXHRcdE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUXHJcblx0XHRIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSxcclxuXHRcdFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xyXG5cdFx0RlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUlxyXG5cdFx0T1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxyXG4qL1xyXG5cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUklQRU1EMTYwXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0Ly8gaHR0cHM6Ly93ZWJjYWNoZS5nb29nbGV1c2VyY29udGVudC5jb20vc2VhcmNoP3E9Y2FjaGU6Q25MT2dvbFRIWUVKOmh0dHBzOi8vd3d3LmNvc2ljLmVzYXQua3VsZXV2ZW4uYmUvcHVibGljYXRpb25zL2FydGljbGUtMzE3LnBkZlxyXG5cdFx0Ly8gaHR0cDovL3Nob2RoZ2FuZ2EuaW5mbGlibmV0LmFjLmluL2JpdHN0cmVhbS8xMDYwMy8yMjk3OC8xMy8xM19hcHBlbmRpeC5wZGZcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXRfbl9wYWRfYnl0ZXMobWVzc2FnZV9zaXplIC8qIGluIGJ5dGVzLCAxIGJ5dGUgaXMgOCBiaXRzLiAqLylcclxuXHR7XHJcblx0XHQvLyAgT2J0YWluIHRoZSBudW1iZXIgb2YgYnl0ZXMgbmVlZGVkIHRvIHBhZCB0aGUgbWVzc2FnZS5cclxuXHRcdC8vIEl0IGRvZXMgbm90IGNvbnRhaW4gdGhlIHNpemUgb2YgdGhlIG1lc3NhZ2Ugc2l6ZSBpbmZvcm1hdGlvbi5cclxuXHRcdC8qXHJcblx0XHRcdGh0dHBzOi8vd2ViY2FjaGUuZ29vZ2xldXNlcmNvbnRlbnQuY29tL3NlYXJjaD9xPWNhY2hlOkNuTE9nb2xUSFlFSjpodHRwczovL3d3dy5jb3NpYy5lc2F0Lmt1bGV1dmVuLmJlL3B1YmxpY2F0aW9ucy9hcnRpY2xlLTMxNy5wZGZcclxuXHJcblx0XHRcdFRoZSBDcnlwdG9ncmFwaGljIEhhc2ggRnVuY3Rpb24gUklQRU1ELTE2MFxyXG5cclxuXHRcdFx0d3JpdHRlbiBieVxyXG5cdFx0XHRcdEJhcnQgUHJlbmVlbCxcclxuXHRcdFx0XHRIYW5zIERvYmJlcnRpbixcclxuXHRcdFx0XHRBbnRvb24gQm9zc2VsYWVyc1xyXG5cdFx0XHRpblxyXG5cdFx0XHRcdDE5OTcuXHJcblxyXG5cdFx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHRcdFx0wqc1ICAgICBEZXNjcmlwdGlvbiBvZiBSSVBFTUQtMTYwXHJcblxyXG5cdFx0XHQuLi4uLi5cclxuXHJcblx0XHRcdCBJbiBvcmRlciB0byBndWFyYW50ZWUgdGhhdCB0aGUgdG90YWwgaW5wdXQgc2l6ZSBpcyBhXHJcblx0XHRcdG11bHRpcGxlIG9mIDUxMiBiaXRzLCB0aGUgaW5wdXQgaXMgcGFkZGVkIGluIHRoZSBzYW1lXHJcblx0XHRcdHdheSBhcyBmb3IgYWxsIHRoZSBtZW1iZXJzIG9mIHRoZSBNRDQtZmFtaWx5OiBvbmVcclxuXHRcdFx0YXBwZW5kcyBhIHNpbmdsZSAxIGZvbGxvd2VkIGJ5IGEgc3RyaW5nIG9mIDBzICh0aGVcclxuXHRcdFx0bnVtYmVyIG9mIDBzIGxpZXMgYmV0d2VlbiAwIGFuZCA1MTEpOyB0aGUgbGFzdCA2NCBiaXRzXHJcblx0XHRcdG9mIHRoZSBleHRlbmRlZCBpbnB1dCBjb250YWluIHRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb25cclxuXHRcdFx0b2YgdGhlIGlucHV0IHNpemUgaW4gYml0cywgbGVhc3Qgc2lnbmlmaWNhbnQgYnl0ZSBmaXJzdC5cclxuXHRcdCovXHJcblx0XHQvKlxyXG5cdFx0XHRodHRwczovL3Rvb2xzLmlldGYub3JnL3JmYy9yZmMxMTg2LnR4dFxyXG5cclxuXHRcdFx0UkZDIDExODY6IE1ENCBNZXNzYWdlIERpZ2VzdCBBbGdvcml0aG0uXHJcblxyXG5cdFx0XHR3cml0dGVuIGJ5XHJcblx0XHRcdFx0Um9uYWxkIExpbm4gUml2ZXN0XHJcblx0XHRcdGluXHJcblx0XHRcdFx0T2N0b2JlciAxOTkwLlxyXG5cclxuXHRcdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0XHRcdMKnMyAgICAgTUQ0IEFsZ29yaXRobSBEZXNjcmlwdGlvblxyXG5cclxuXHRcdFx0Li4uLi4uXHJcblxyXG5cdFx0XHRTdGVwIDEuIEFwcGVuZCBwYWRkaW5nIGJpdHNcclxuXHJcblx0XHRcdCBUaGUgbWVzc2FnZSBpcyBcInBhZGRlZFwiIChleHRlbmRlZCkgc28gdGhhdCBpdHMgbGVuZ3RoXHJcblx0XHRcdChpbiBiaXRzKSBpcyBjb25ncnVlbnQgdG8gNDQ4LCBtb2R1bG8gNTEyLiBUaGF0IGlzLCB0aGVcclxuXHRcdFx0bWVzc2FnZSBpcyBleHRlbmRlZCBzbyB0aGF0IGl0IGlzIGp1c3QgNjQgYml0cyBzaHkgb2ZcclxuXHRcdFx0YmVpbmcgYSBtdWx0aXBsZSBvZiA1MTIgYml0cyBsb25nLiBQYWRkaW5nIGlzIGFsd2F5c1xyXG5cdFx0XHRwZXJmb3JtZWQsIGV2ZW4gaWYgdGhlIGxlbmd0aCBvZiB0aGUgbWVzc2FnZSBpcyBhbHJlYWR5XHJcblx0XHRcdGNvbmdydWVudCB0byA0NDgsIG1vZHVsbyA1MTIgKGluIHdoaWNoIGNhc2UgNTEyIGJpdHMgb2ZcclxuXHRcdFx0cGFkZGluZyBhcmUgYWRkZWQpLlxyXG5cclxuXHRcdFx0IFBhZGRpbmcgaXMgcGVyZm9ybWVkIGFzIGZvbGxvd3M6IGEgc2luZ2xlIFwiMVwiIGJpdCBpc1xyXG5cdFx0XHRhcHBlbmRlZCB0byB0aGUgbWVzc2FnZSwgYW5kIHRoZW4gZW5vdWdoIHplcm8gYml0cyBhcmVcclxuXHRcdFx0YXBwZW5kZWQgc28gdGhhdCB0aGUgbGVuZ3RoIGluIGJpdHMgb2YgdGhlIHBhZGRlZFxyXG5cdFx0XHRtZXNzYWdlIGJlY29tZXMgY29uZ3J1ZW50IHRvIDQ0OCwgbW9kdWxvIDUxMi5cclxuXHJcblx0XHRcdFN0ZXAgMi4gQXBwZW5kIGxlbmd0aFxyXG5cclxuXHRcdFx0IEEgNjQtYml0IHJlcHJlc2VudGF0aW9uIG9mIGIgKHRoZSBsZW5ndGggb2YgdGhlIG1lc3NhZ2VcclxuXHRcdFx0YmVmb3JlIHRoZSBwYWRkaW5nIGJpdHMgd2VyZSBhZGRlZCkgaXMgYXBwZW5kZWQgdG8gdGhlXHJcblx0XHRcdHJlc3VsdCBvZiB0aGUgcHJldmlvdXMgc3RlcC4gSW4gdGhlIHVubGlrZWx5IGV2ZW50IHRoYXRcclxuXHRcdFx0YiBpcyBncmVhdGVyIHRoYW4gMl42NCwgdGhlbiBvbmx5IHRoZSBsb3ctb3JkZXIgNjQgYml0c1xyXG5cdFx0XHRvZiBiIGFyZSB1c2VkLiAoVGhlc2UgYml0cyBhcmUgYXBwZW5kZWQgYXMgdHdvIDMyLWJpdFxyXG5cdFx0XHR3b3JkcyBhbmQgYXBwZW5kZWQgbG93LW9yZGVyIHdvcmQgZmlyc3QgaW4gYWNjb3JkYW5jZVxyXG5cdFx0XHR3aXRoIHRoZSBwcmV2aW91cyBjb252ZW50aW9ucy4pXHJcblxyXG5cdFx0XHQgQXQgdGhpcyBwb2ludCB0aGUgcmVzdWx0aW5nIG1lc3NhZ2UgKGFmdGVyIHBhZGRpbmcgd2l0aFxyXG5cdFx0XHRiaXRzIGFuZCB3aXRoIGIpIGhhcyBhIGxlbmd0aCB0aGF0IGlzIGFuIGV4YWN0IG11bHRpcGxlXHJcblx0XHRcdG9mIDUxMiBiaXRzLiBFcXVpdmFsZW50bHksIHRoaXMgbWVzc2FnZSBoYXMgYSBsZW5ndGhcclxuXHRcdFx0dGhhdCBpcyBhbiBleGFjdCBtdWx0aXBsZSBvZiAxNiAoMzItYml0KSB3b3Jkcy4gTGV0XHJcblx0XHRcdE1bMCAuLi4gTi0xXSBkZW5vdGUgdGhlIHdvcmRzIG9mIHRoZSByZXN1bHRpbmcgbWVzc2FnZSxcclxuXHRcdFx0d2hlcmUgTiBpcyBhIG11bHRpcGxlIG9mIDE2LlxyXG5cdFx0Ki9cclxuXHRcdC8vIGh0dHBzOi8vY3J5cHRvLnN0YWNrZXhjaGFuZ2UuY29tL2EvMzI0MDcvNTQ1NjhcclxuXHRcdC8qXHJcblx0XHRcdEV4YW1wbGUgY2FzZSAgIyAxXHJcblx0XHRcdFx0WzAgYml0OiBtZXNzYWdlLl1cclxuXHRcdFx0XHRbMSBiaXQ6IDEuXVxyXG5cdFx0XHRcdFs0NDcgYml0czogMC5dXHJcblx0XHRcdFx0WzY0IGJpdHM6IG1lc3NhZ2Ugc2l6ZSBpbmZvcm1hdGlvbi5dXHJcblxyXG5cdFx0XHRFeGFtcGxlIGNhc2UgICMgMlxyXG5cdFx0XHRcdFs1MTItYml0czogbWVzc2FnZV1cclxuXHRcdFx0XHRbMSBiaXQ6IDEuXVxyXG5cdFx0XHRcdFs0NDcgYml0czogMC5dXHJcblx0XHRcdFx0WzY0IGJpdHM6IG1lc3NhZ2Ugc2l6ZSBpbmZvcm1hdGlvbi5dXHJcblxyXG5cdFx0XHRFeGFtcGxlIGNhc2UgICMgM1xyXG5cdFx0XHRcdFsoNTEyIC0gNjQgPSA0NDgpIGJpdHM6IG1lc3NhZ2UuXVxyXG5cdFx0XHRcdFsxIGJpdDogMS5dXHJcblx0XHRcdFx0WzUxMSBiaXRzOiAwLl1cclxuXHRcdFx0XHRbNjQgYml0czogbWVzc2FnZSBzaXplIGluZm9ybWF0aW9uLl1cclxuXHJcblx0XHRcdEV4YW1wbGUgY2FzZSAgIyA0XHJcblx0XHRcdFx0Wyg1MTIgLSA2NSA9IDQ0NykgYml0czogbWVzc2FnZS5dXHJcblx0XHRcdFx0WzEgYml0OiAxLl1cclxuXHRcdFx0XHRbMCBiaXQ6IDAuXVxyXG5cdFx0XHRcdFs2NCBiaXRzOiBtZXNzYWdlIHNpemUgaW5mb3JtYXRpb24uXVxyXG5cdFx0Ki9cclxuXHRcdC8vIFRoZSBudW1iZXIgb2YgcGFkZGluZyB6ZXJvIGJpdHM6XHJcblx0XHQvLyAgICAgIDUxMSAtIFt7KG1lc3NhZ2Ugc2l6ZSBpbiBiaXRzKSArIDY0fSAobW9kIDUxMildXHJcblx0XHRyZXR1cm4gNjQgLSAoKG1lc3NhZ2Vfc2l6ZSArIDgpICYgMGIwMDExMTExMSAvKiA2MyAqLyk7XHJcblx0fVxyXG5cdHN0YXRpYyBwYWQobWVzc2FnZSAvKiBBbiBBcnJheUJ1ZmZlci4gKi8pXHJcblx0e1xyXG5cdFx0Y29uc3QgbWVzc2FnZV9zaXplID0gbWVzc2FnZS5ieXRlTGVuZ3RoO1xyXG5cdFx0Y29uc3Qgbl9wYWQgPSBSSVBFTUQxNjAuZ2V0X25fcGFkX2J5dGVzKG1lc3NhZ2Vfc2l6ZSk7XHJcblxyXG5cdFx0Ly8gIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAgaXMgKCgyICoqIDUzKSAtIDEpIGFuZFxyXG5cdFx0Ly8gYml0d2lzZSBvcGVyYXRpb24gaW4gSmF2YXNjcmlwdCBpcyBkb25lIG9uIDMyLWJpdHMgb3BlcmFuZHMuXHJcblx0XHRjb25zdCBkaXZtb2QgPSAoZGl2aWRlbmQsIGRpdmlzb3IpID0+IFtcclxuXHRcdFx0TWF0aC5mbG9vcihkaXZpZGVuZCAvIGRpdmlzb3IpLFxyXG5cdFx0XHRkaXZpZGVuZCAlIGRpdmlzb3JcclxuXHRcdF07XHJcblx0XHQvKlxyXG5UbyBzaGlmdFxyXG5cclxuICAgMDAwMDAwMDAgMDAwPz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQgb1xyXG4gICAwMDAwMDAwMCA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/PzAwMFxyXG5cclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbk1ldGhvZCAjMVxyXG5cclxuICAgIDAwMDAwMDAwIDAwMD8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ICA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/P1xyXG4gICBbMDAwMDAwMDAgMDAwQUFBQUEgQUFBQUFBQUEgQUFBQUFBQUFdICg8QT4gY2FwdHVyZWQpXHJcbiAgIFswMDAwMDAwMCBBQUFBQUFBQSBBQUFBQUFBQSBBQUFBQTAwMF0gKDxBPiBzaGlmdGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKDxCPiBjYXB0dXJlZCkgW0JCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCXVxyXG4gICAgICAgICAgICAgICAgICAgICAoPEI+IHNoaWZ0ZWQpIFtCQkJdW0JCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCMDAwXVxyXG4gICBbMDAwMDAwMDAgQUFBQUFBQUEgQUFBQUFBQUEgQUFBQUFCQkJdICg8QT4gJiA8Ql8yPiBtZXJnZWQpXHJcbiAgIFswMDAwMDAwMCBBQUFBQUFBQSBBQUFBQUFBQSBBQUFBQUJCQl1bQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkIwMDBdXHJcbiAgICAwMDAwMDAwMCA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8wMDBcclxuXHJcblx0XHRjb25zdCB1aW50MzJfbWF4X3BsdXNfMSA9IDB4MTAwMDAwMDAwOyAvLyAoMiAqKiAzMilcclxuXHRcdGNvbnN0IFtcclxuXHRcdFx0bXNnX2J5dGVfc2l6ZV9tb3N0LCAvLyBWYWx1ZSByYW5nZSBbMCwgKDIgKiogMjEpIC0gMV0uXHJcblx0XHRcdG1zZ19ieXRlX3NpemVfbGVhc3QgLy8gVmFsdWUgcmFuZ2UgWzAsICgyICoqIDMyKSAtIDFdLlxyXG5cdFx0XSA9IGRpdm1vZChtZXNzYWdlX3NpemUsIHVpbnQzMl9tYXhfcGx1c18xKTtcclxuXHRcdGNvbnN0IFtcclxuXHRcdFx0Y2FycnksIC8vIFZhbHVlIHJhbmdlIFswLCA3XS5cclxuXHRcdFx0bXNnX2JpdF9zaXplX2xlYXN0IC8vIFZhbHVlIHJhbmdlIFswLCAoMiAqKiAzMikgLSA4XS5cclxuXHRcdF0gPSBkaXZtb2QobWVzc2FnZV9ieXRlX3NpemVfbGVhc3QgKiA4LCB1aW50MzJfbWF4X3BsdXNfMSk7XHJcblx0XHRjb25zdCBtZXNzYWdlX2JpdF9zaXplX21vc3QgPSBtZXNzYWdlX2J5dGVfc2l6ZV9tb3N0ICogOFxyXG5cdFx0XHQrIGNhcnJ5OyAvLyBWYWx1ZSByYW5nZSBbMCwgKDIgKiogMjQpIC0gMV0uXHJcblxyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuTWV0aG9kICMyXHJcbiAgICAwMDAwMDAwMCAwMDA/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz9cclxuICAgICAgWzAwMDAwIDAwMEFBQUFBIEFBQUFBQUFBIEFBQUFBQUFBICBBQUFdICg8QT4gY2FwdHVyZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAoPEI+IGNhcHR1cmVkKSBbMDAwQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKDxCPiBzaGlmdGVkKSBbQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkIwMDBdXHJcbiAgIFswMDAwMDAwMCBBQUFBQUFBQSBBQUFBQUFBQSBBQUFBQUFBQV1bQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkIwMDBdXHJcbiAgICAwMDAwMDAwMCA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8wMDBcclxuXHJcblx0XHQqL1xyXG5cdFx0Y29uc3QgW1xyXG5cdFx0XHRtc2dfYml0X3NpemVfbW9zdCxcclxuXHRcdFx0bXNnX2JpdF9zaXplX2xlYXN0XHJcblx0XHRdID0gZGl2bW9kKG1lc3NhZ2Vfc2l6ZSwgNTM2ODcwOTEyIC8qICgyICoqIDI5KSAqLylcclxuXHRcdFx0Lm1hcCgoeCwgaW5kZXgpID0+IChpbmRleCA/ICh4ICogOCkgOiB4KSk7XHJcblxyXG5cdFx0Ly8gYEFycmF5QnVmZmVyLnRyYW5zZmVyKClgIGlzIG5vdCBzdXBwb3J0ZWQuXHJcblx0XHRjb25zdCBwYWRkZWQgPSBuZXcgVWludDhBcnJheShtZXNzYWdlX3NpemUgKyBuX3BhZCArIDgpO1xyXG5cdFx0cGFkZGVkLnNldChuZXcgVWludDhBcnJheShtZXNzYWdlKSwgMCk7XHJcblx0XHRjb25zdCBkYXRhX3ZpZXcgPSBuZXcgRGF0YVZpZXcocGFkZGVkLmJ1ZmZlcik7XHJcblx0XHRkYXRhX3ZpZXcuc2V0VWludDgobWVzc2FnZV9zaXplLCAwYjEwMDAwMDAwKTtcclxuXHRcdGRhdGFfdmlldy5zZXRVaW50MzIoXHJcblx0XHRcdG1lc3NhZ2Vfc2l6ZSArIG5fcGFkLFxyXG5cdFx0XHRtc2dfYml0X3NpemVfbGVhc3QsXHJcblx0XHRcdHRydWUgLy8gTGl0dGxlLWVuZGlhblxyXG5cdFx0KTtcclxuXHRcdGRhdGFfdmlldy5zZXRVaW50MzIoXHJcblx0XHRcdG1lc3NhZ2Vfc2l6ZSArIG5fcGFkICsgNCxcclxuXHRcdFx0bXNnX2JpdF9zaXplX21vc3QsXHJcblx0XHRcdHRydWUgLy8gTGl0dGxlLWVuZGlhblxyXG5cdFx0KTtcclxuXHJcblx0XHRyZXR1cm4gcGFkZGVkLmJ1ZmZlcjtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBmKGosIHgsIHksIHopXHJcblx0e1xyXG5cdFx0aWYoMCA8PSBqICYmIGogPD0gMTUpXHJcblx0XHR7IC8vIEV4Y2x1c2l2ZS1PUlxyXG5cdFx0XHRyZXR1cm4geCBeIHkgXiB6O1xyXG5cdFx0fVxyXG5cdFx0aWYoMTYgPD0gaiAmJiBqIDw9IDMxKVxyXG5cdFx0eyAvLyBNdWx0aXBsZXhpbmcgKG11eGluZylcclxuXHRcdFx0cmV0dXJuICh4ICYgeSkgfCAofnggJiB6KTtcclxuXHRcdH1cclxuXHRcdGlmKDMyIDw9IGogJiYgaiA8PSA0NylcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuICh4IHwgfnkpIF4gejtcclxuXHRcdH1cclxuXHRcdGlmKDQ4IDw9IGogJiYgaiA8PSA2MylcclxuXHRcdHsgLy8gTXVsdGlwbGV4aW5nIChtdXhpbmcpXHJcblx0XHRcdHJldHVybiAoeCAmIHopIHwgKHkgJiB+eik7XHJcblx0XHR9XHJcblx0XHRpZig2NCA8PSBqICYmIGogPD0gNzkpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiB4IF4gKHkgfCB+eik7XHJcblx0XHR9XHJcblx0fVxyXG5cdHN0YXRpYyBLKGopXHJcblx0e1xyXG5cdFx0aWYoMCA8PSBqICYmIGogPD0gMTUpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiAweDAwMDAwMDAwO1xyXG5cdFx0fVxyXG5cdFx0aWYoMTYgPD0gaiAmJiBqIDw9IDMxKVxyXG5cdFx0e1xyXG5cdFx0XHQvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguU1FSVDIpXHJcblx0XHRcdHJldHVybiAweDVBODI3OTk5O1xyXG5cdFx0fVxyXG5cdFx0aWYoMzIgPD0gaiAmJiBqIDw9IDQ3KVxyXG5cdFx0e1xyXG5cdFx0XHQvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguc3FydCgzKSlcclxuXHRcdFx0cmV0dXJuIDB4NkVEOUVCQTE7XHJcblx0XHR9XHJcblx0XHRpZig0OCA8PSBqICYmIGogPD0gNjMpXHJcblx0XHR7XHJcblx0XHRcdC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5zcXJ0KDUpKVxyXG5cdFx0XHRyZXR1cm4gMHg4RjFCQkNEQztcclxuXHRcdH1cclxuXHRcdGlmKDY0IDw9IGogJiYgaiA8PSA3OSlcclxuXHRcdHtcclxuXHRcdFx0Ly8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLnNxcnQoNykpXHJcblx0XHRcdHJldHVybiAweEE5NTNGRDRFO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzdGF0aWMgS1AoaikgLy8gSydcclxuXHR7XHJcblx0XHRpZigwIDw9IGogJiYgaiA8PSAxNSlcclxuXHRcdHtcclxuXHRcdFx0Ly8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLmNicnQoMikpXHJcblx0XHRcdHJldHVybiAweDUwQTI4QkU2O1xyXG5cdFx0fVxyXG5cdFx0aWYoMTYgPD0gaiAmJiBqIDw9IDMxKVxyXG5cdFx0e1xyXG5cdFx0XHQvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguY2JydCgzKSlcclxuXHRcdFx0cmV0dXJuIDB4NUM0REQxMjQ7XHJcblx0XHR9XHJcblx0XHRpZigzMiA8PSBqICYmIGogPD0gNDcpXHJcblx0XHR7XHJcblx0XHRcdC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5jYnJ0KDUpKVxyXG5cdFx0XHRyZXR1cm4gMHg2RDcwM0VGMztcclxuXHRcdH1cclxuXHRcdGlmKDQ4IDw9IGogJiYgaiA8PSA2MylcclxuXHRcdHtcclxuXHRcdFx0Ly8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLmNicnQoNykpXHJcblx0XHRcdHJldHVybiAweDdBNkQ3NkU5O1xyXG5cdFx0fVxyXG5cdFx0aWYoNjQgPD0gaiAmJiBqIDw9IDc5KVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gMHgwMDAwMDAwMDtcclxuXHRcdH1cclxuXHR9XHJcblx0c3RhdGljIGFkZF9tb2R1bG8zMigvKiAuLi4uLi4gKi8pXHJcblx0e1xyXG5cdFx0Ly8gMS4gIE1vZHVsbyBhZGRpdGlvbiAoYWRkaXRpb24gbW9kdWxvKSBpcyBhc3NvY2lhdGl2ZS5cclxuXHRcdC8vICAgIGh0dHBzOi8vcHJvb2Z3aWtpLm9yZy93aWtpL01vZHVsb19BZGRpdGlvbl9pc19Bc3NvY2lhdGl2ZVxyXG4gXHRcdC8vIDIuICBCaXR3aXNlIG9wZXJhdGlvbiBpbiBKYXZhc2NyaXB0XHJcblx0XHQvLyAgICBpcyBkb25lIG9uIDMyLWJpdHMgb3BlcmFuZHNcclxuXHRcdC8vICAgIGFuZCByZXN1bHRzIGluIGEgMzItYml0cyB2YWx1ZS5cclxuXHRcdHJldHVybiBBcnJheVxyXG5cdFx0XHQuZnJvbShhcmd1bWVudHMpXHJcblx0XHRcdC5yZWR1Y2UoKGEsIGIpID0+IChhICsgYiksIDApIHwgMDtcclxuXHR9XHJcblx0c3RhdGljIHJvbDMyKHZhbHVlLCBjb3VudClcclxuXHR7IC8vIEN5Y2xpYyBsZWZ0IHNoaWZ0IChyb3RhdGUpIG9uIDMyLWJpdHMgdmFsdWUuXHJcblx0XHRyZXR1cm4gKHZhbHVlIDw8IGNvdW50KSB8ICh2YWx1ZSA+Pj4gKDMyIC0gY291bnQpKTtcclxuXHR9XHJcblx0c3RhdGljIGhhc2gobWVzc2FnZSAvKiBBbiBBcnJheUJ1ZmZlci4gKi8pXHJcblx0e1xyXG5cdFx0Ly8vLy8vLy8vLyAgICAgICBQYWRkaW5nICAgICAgIC8vLy8vLy8vLy9cclxuXHJcblx0XHQvLyBUaGUgcGFkZGVkIG1lc3NhZ2UuXHJcblx0XHRjb25zdCBwYWRkZWQgPSBSSVBFTUQxNjAucGFkKG1lc3NhZ2UpO1xyXG5cclxuXHRcdC8vLy8vLy8vLy8gICAgIENvbXByZXNzaW9uICAgICAvLy8vLy8vLy8vXHJcblxyXG5cdFx0Ly8gTWVzc2FnZSB3b3JkIHNlbGVjdG9ycy5cclxuXHRcdGNvbnN0IHIgPSBbXHJcblx0XHRcdDAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsXHJcblx0XHRcdDcsIDQsIDEzLCAxLCAxMCwgNiwgMTUsIDMsIDEyLCAwLCA5LCA1LCAyLCAxNCwgMTEsIDgsXHJcblx0XHRcdDMsIDEwLCAxNCwgNCwgOSwgMTUsIDgsIDEsIDIsIDcsIDAsIDYsIDEzLCAxMSwgNSwgMTIsXHJcblx0XHRcdDEsIDksIDExLCAxMCwgMCwgOCwgMTIsIDQsIDEzLCAzLCA3LCAxNSwgMTQsIDUsIDYsIDIsXHJcblx0XHRcdDQsIDAsIDUsIDksIDcsIDEyLCAyLCAxMCwgMTQsIDEsIDMsIDgsIDExLCA2LCAxNSwgMTNcclxuXHRcdF07XHJcblx0XHRjb25zdCByUCA9IFsgLy8gcidcclxuXHRcdFx0NSwgMTQsIDcsIDAsIDksIDIsIDExLCA0LCAxMywgNiwgMTUsIDgsIDEsIDEwLCAzLCAxMixcclxuXHRcdFx0NiwgMTEsIDMsIDcsIDAsIDEzLCA1LCAxMCwgMTQsIDE1LCA4LCAxMiwgNCwgOSwgMSwgMixcclxuXHRcdFx0MTUsIDUsIDEsIDMsIDcsIDE0LCA2LCA5LCAxMSwgOCwgMTIsIDIsIDEwLCAwLCA0LCAxMyxcclxuXHRcdFx0OCwgNiwgNCwgMSwgMywgMTEsIDE1LCAwLCA1LCAxMiwgMiwgMTMsIDksIDcsIDEwLCAxNCxcclxuXHRcdFx0MTIsIDE1LCAxMCwgNCwgMSwgNSwgOCwgNywgNiwgMiwgMTMsIDE0LCAwLCAzLCA5LCAxMVxyXG5cdFx0XTtcclxuXHJcblx0XHQvLyBBbW91bnRzIGZvciAncm90YXRlIGxlZnQnIG9wZXJhdGlvbi5cclxuXHRcdGNvbnN0IHMgPSBbXHJcblx0XHRcdDExLCAxNCwgMTUsIDEyLCA1LCA4LCA3LCA5LCAxMSwgMTMsIDE0LCAxNSwgNiwgNywgOSwgOCxcclxuXHRcdFx0NywgNiwgOCwgMTMsIDExLCA5LCA3LCAxNSwgNywgMTIsIDE1LCA5LCAxMSwgNywgMTMsIDEyLFxyXG5cdFx0XHQxMSwgMTMsIDYsIDcsIDE0LCA5LCAxMywgMTUsIDE0LCA4LCAxMywgNiwgNSwgMTIsIDcsIDUsXHJcblx0XHRcdDExLCAxMiwgMTQsIDE1LCAxNCwgMTUsIDksIDgsIDksIDE0LCA1LCA2LCA4LCA2LCA1LCAxMixcclxuXHRcdFx0OSwgMTUsIDUsIDExLCA2LCA4LCAxMywgMTIsIDUsIDEyLCAxMywgMTQsIDExLCA4LCA1LCA2XHJcblx0XHRdO1xyXG5cdFx0Y29uc3Qgc1AgPSBbIC8vIHMnXHJcblx0XHRcdDgsIDksIDksIDExLCAxMywgMTUsIDE1LCA1LCA3LCA3LCA4LCAxMSwgMTQsIDE0LCAxMiwgNixcclxuXHRcdFx0OSwgMTMsIDE1LCA3LCAxMiwgOCwgOSwgMTEsIDcsIDcsIDEyLCA3LCA2LCAxNSwgMTMsIDExLFxyXG5cdFx0XHQ5LCA3LCAxNSwgMTEsIDgsIDYsIDYsIDE0LCAxMiwgMTMsIDUsIDE0LCAxMywgMTMsIDcsIDUsXHJcblx0XHRcdDE1LCA1LCA4LCAxMSwgMTQsIDE0LCA2LCAxNCwgNiwgOSwgMTIsIDksIDEyLCA1LCAxNSwgOCxcclxuXHRcdFx0OCwgNSwgMTIsIDksIDEyLCA1LCAxNCwgNiwgOCwgMTMsIDYsIDUsIDE1LCAxMywgMTEsIDExXHJcblx0XHRdO1xyXG5cclxuXHRcdC8vIFRoZSBzaXplLCBpbiBieXRlcywgb2YgYSB3b3JkLlxyXG5cdFx0Y29uc3Qgd29yZF9zaXplID0gNDtcclxuXHJcblx0XHQvLyBUaGUgc2l6ZSwgaW4gYnl0ZXMsIG9mIGEgMTYtd29yZHMgYmxvY2suXHJcblx0XHRjb25zdCBibG9ja19zaXplID0gNjQ7XHJcblxyXG5cdFx0Ly8gVGhlIG51bWJlciBvZiB0aGUgMTYtd29yZHMgYmxvY2tzLlxyXG5cdFx0Y29uc3QgdCA9IHBhZGRlZC5ieXRlTGVuZ3RoIC8gYmxvY2tfc2l6ZTtcclxuXHJcblx0XHQvLyAgVGhlIG1lc3NhZ2UgYWZ0ZXIgcGFkZGluZyBjb25zaXN0cyBvZiB0IDE2LXdvcmQgYmxvY2tzIHRoYXRcclxuXHRcdC8vIGFyZSBkZW5vdGVkIHdpdGggWF9pW2pdLCB3aXRoIDDiiaRp4omkKHQg4oiSIDEpIGFuZCAw4omkauKJpDE1LlxyXG5cdFx0Y29uc3QgWCA9IChuZXcgQXJyYXkodCkpXHJcblx0XHRcdC5maWxsKHVuZGVmaW5lZClcclxuXHRcdFx0Lm1hcCgoXywgaSkgPT4gbmV3IFByb3h5KFxyXG5cdFx0XHRcdG5ldyBEYXRhVmlldyhcclxuXHRcdFx0XHRcdHBhZGRlZCwgaSAqIGJsb2NrX3NpemUsIGJsb2NrX3NpemVcclxuXHRcdFx0XHQpLCB7XHJcblx0XHRcdFx0Z2V0KGJsb2NrX3ZpZXcsIGopXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0cmV0dXJuIGJsb2NrX3ZpZXcuZ2V0VWludDMyKFxyXG5cdFx0XHRcdFx0XHRqICogd29yZF9zaXplLFxyXG5cdFx0XHRcdFx0XHR0cnVlIC8vIExpdHRsZS1lbmRpYW5cclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KSk7XHJcblxyXG5cdFx0Ly8gIFRoZSByZXN1bHQgb2YgUklQRU1ELTE2MCBpcyBjb250YWluZWQgaW4gZml2ZSAzMi1iaXQgd29yZHMsXHJcblx0XHQvLyB3aGljaCBmb3JtIHRoZSBpbnRlcm5hbCBzdGF0ZSBvZiB0aGUgYWxnb3JpdGhtLiBUaGUgZmluYWxcclxuXHRcdC8vIGNvbnRlbnQgb2YgdGhlc2UgZml2ZSAzMi1iaXQgd29yZHMgaXMgY29udmVydGVkIHRvIGEgMTYwLWJpdFxyXG5cdFx0Ly8gc3RyaW5nLCBhZ2FpbiB1c2luZyB0aGUgbGl0dGxlLWVuZGlhbiBjb252ZW50aW9uLlxyXG5cdFx0bGV0IGggPSBbXHJcblx0XHRcdDB4Njc0NTIzMDEsIC8vIGhfMFxyXG5cdFx0XHQweEVGQ0RBQjg5LCAvLyBoXzFcclxuXHRcdFx0MHg5OEJBRENGRSwgLy8gaF8yXHJcblx0XHRcdDB4MTAzMjU0NzYsIC8vIGhfM1xyXG5cdFx0XHQweEMzRDJFMUYwICAvLyBoXzRcclxuXHRcdF07XHJcblxyXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHQ7ICsraSlcclxuXHRcdHtcclxuXHRcdFx0bGV0IEEgPSBoWzBdLCBCID0gaFsxXSwgQyA9IGhbMl0sIEQgPSBoWzNdLCBFID0gaFs0XTtcclxuXHRcdFx0bGV0IEFQID0gQSwgQlAgPSBCLCBDUCA9IEMsIERQID0gRCwgRVAgPSBFO1xyXG5cdFx0XHRmb3IobGV0IGogPSAwOyBqIDwgODA7ICsrailcclxuXHRcdFx0e1xyXG5cdFx0XHRcdC8vIExlZnQgcm91bmRzXHJcblx0XHRcdFx0bGV0IFQgPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKFxyXG5cdFx0XHRcdFx0UklQRU1EMTYwLnJvbDMyKFxyXG5cdFx0XHRcdFx0XHRSSVBFTUQxNjAuYWRkX21vZHVsbzMyKFxyXG5cdFx0XHRcdFx0XHRcdEEsXHJcblx0XHRcdFx0XHRcdFx0UklQRU1EMTYwLmYoaiwgQiwgQywgRCksXHJcblx0XHRcdFx0XHRcdFx0WFtpXVtyW2pdXSxcclxuXHRcdFx0XHRcdFx0XHRSSVBFTUQxNjAuSyhqKVxyXG5cdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRzW2pdXHJcblx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0RVxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdFx0QSA9IEU7XHJcblx0XHRcdFx0RSA9IEQ7XHJcblx0XHRcdFx0RCA9IFJJUEVNRDE2MC5yb2wzMihDLCAxMCk7XHJcblx0XHRcdFx0QyA9IEI7XHJcblx0XHRcdFx0QiA9IFQ7XHJcblxyXG5cdFx0XHRcdC8vIFJpZ2h0IHJvdW5kc1xyXG5cdFx0XHRcdFQgPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKFxyXG5cdFx0XHRcdFx0UklQRU1EMTYwLnJvbDMyKFxyXG5cdFx0XHRcdFx0XHRSSVBFTUQxNjAuYWRkX21vZHVsbzMyKFxyXG5cdFx0XHRcdFx0XHRcdEFQLFxyXG5cdFx0XHRcdFx0XHRcdFJJUEVNRDE2MC5mKFxyXG5cdFx0XHRcdFx0XHRcdFx0NzkgLSBqLFxyXG5cdFx0XHRcdFx0XHRcdFx0QlAsXHJcblx0XHRcdFx0XHRcdFx0XHRDUCxcclxuXHRcdFx0XHRcdFx0XHRcdERQXHJcblx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHRYW2ldW3JQW2pdXSxcclxuXHRcdFx0XHRcdFx0XHRSSVBFTUQxNjAuS1AoailcclxuXHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0c1Bbal1cclxuXHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRFUFxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdFx0QVAgPSBFUDtcclxuXHRcdFx0XHRFUCA9IERQO1xyXG5cdFx0XHRcdERQID0gUklQRU1EMTYwLnJvbDMyKENQLCAxMCk7XHJcblx0XHRcdFx0Q1AgPSBCUDtcclxuXHRcdFx0XHRCUCA9IFQ7XHJcblx0XHRcdH1cclxuXHRcdFx0bGV0IFQgPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbMV0sIEMsIERQKTtcclxuXHRcdFx0aFsxXSA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoaFsyXSwgRCwgRVApO1xyXG5cdFx0XHRoWzJdID0gUklQRU1EMTYwLmFkZF9tb2R1bG8zMihoWzNdLCBFLCBBUCk7XHJcblx0XHRcdGhbM10gPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbNF0sIEEsIEJQKTtcclxuXHRcdFx0aFs0XSA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoaFswXSwgQiwgQ1ApO1xyXG5cdFx0XHRoWzBdID0gVDtcclxuXHRcdH1cclxuXHJcblx0XHQvLyAgVGhlIGZpbmFsIG91dHB1dCBzdHJpbmcgdGhlbiBjb25zaXN0cyBvZiB0aGUgY29uY2F0ZW5hdGF0aW9uXHJcblx0XHQvLyBvZiBoXzAsIGhfMSwgaF8yLCBoXzMsIGFuZCBoXzQgYWZ0ZXIgY29udmVydGluZyBlYWNoIGhfaSB0byBhXHJcblx0XHQvLyA0LWJ5dGUgc3RyaW5nIHVzaW5nIHRoZSBsaXR0bGUtZW5kaWFuIGNvbnZlbnRpb24uXHJcblx0XHRjb25zdCByZXN1bHQgPSBuZXcgQXJyYXlCdWZmZXIoMjApO1xyXG5cdFx0Y29uc3QgZGF0YV92aWV3ID0gbmV3IERhdGFWaWV3KHJlc3VsdCk7XHJcblx0XHRoLmZvckVhY2goKGhfaSwgaSkgPT4gZGF0YV92aWV3LnNldFVpbnQzMihpICogNCwgaF9pLCB0cnVlKSk7XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9