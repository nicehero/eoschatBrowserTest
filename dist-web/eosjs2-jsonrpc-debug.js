var eosjs2_jsonrpc =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/eosjs2-jsonrpc.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/_webpack@4.16.2@webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/eosjs2-jsonrpc.ts":
/*!*******************************!*\
  !*** ./src/eosjs2-jsonrpc.ts ***!
  \*******************************/
/*! exports provided: RpcError, JsonRpc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RpcError", function() { return RpcError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonRpc", function() { return JsonRpc; });
// copyright defined in eosjs2/LICENSE.txt
class RpcError extends Error {
    constructor(json) {
        if (json.error && json.error.details && json.error.details.length && json.error.details[0].message)
            super(json.error.details[0].message);
        else if (json.processed && json.processed.except && json.processed.except.message)
            super(json.processed.except.message);
        else
            super(json.message);
        this.json = json;
    }
}
function arrayToHex(data) {
    let result = '';
    for (let x of data)
        result += ('00' + x.toString(16)).slice(-2);
    return result;
}
class JsonRpc {
    constructor(endpoint, args = {}) {
        this.endpoint = endpoint;
        if (args.fetch)
            this.fetchBuiltin = args.fetch;
        else
            this.fetchBuiltin = global.fetch;
    }
    async fetch(path, body) {
        let response, json;
        try {
            let f = this.fetchBuiltin;
            response = await f(this.endpoint + path, {
                body: JSON.stringify(body),
                method: 'POST',
            });
            json = await response.json();
            if (json.processed && json.processed.except)
                throw new RpcError(json);
        }
        catch (e) {
            e.isFetchError = true;
            throw e;
        }
        if (!response.ok)
            throw new RpcError(json);
        return json;
    }
    async get_abi(account_name) { return await this.fetch('/v1/chain/get_abi', { account_name }); }
    async get_account(account_name) { return await this.fetch('/v1/chain/get_account', { account_name }); }
    async get_block_header_state(block_num_or_id) { return await this.fetch('/v1/chain/get_block_header_state', { block_num_or_id }); }
    async get_block(block_num_or_id) { return await this.fetch('/v1/chain/get_block', { block_num_or_id }); }
    async get_code(account_name) { return await this.fetch('/v1/chain/get_code', { account_name }); }
    async get_currency_balance(code, account, symbol = null) { return await this.fetch('/v1/chain/get_currency_balance', { code, account, symbol }); }
    async get_currency_stats(code, symbol) { return await this.fetch('/v1/chain/get_currency_stats', { code, symbol }); }
    async get_info() { return await this.fetch('/v1/chain/get_info', {}); }
    async get_producer_schedule() { return await this.fetch('/v1/chain/get_producer_schedule', {}); }
    async get_producers(json = true, lower_bound = '', limit = 50) { return await this.fetch('/v1/chain/get_producers', { json, lower_bound, limit }); }
    async get_table_rows({ json = true, code, scope, table, table_key = '', lower_bound = '', upper_bound = '', limit = 10 }) {
        return await this.fetch('/v1/chain/get_table_rows', {
            json,
            code,
            scope,
            table,
            table_key,
            lower_bound,
            upper_bound,
            limit
        });
    }
    async getRequiredKeys(args) {
        return (await this.fetch('/v1/chain/get_required_keys', {
            transaction: args.transaction,
            available_keys: args.availableKeys
        })).required_keys;
    }
    async push_transaction({ signatures, serializedTransaction }) {
        return await this.fetch('/v1/chain/push_transaction', {
            signatures,
            compression: 0,
            packed_context_free_data: '',
            packed_trx: arrayToHex(serializedTransaction),
        });
    }
    async db_size_get() { return await this.fetch('/v1/db_size/get', {}); }
    async history_get_actions(account_name, pos = null, offset = null) { return await this.fetch('/v1/history/get_actions', { account_name, pos, offset }); }
    async history_get_transaction(id, block_num_hint = null) { return await this.fetch('/v1/history/get_transaction', { id, block_num_hint }); }
    async history_get_key_accounts(public_key) { return await this.fetch('/v1/history/get_key_accounts', { public_key }); }
    async history_get_controlled_accounts(controlling_account) { return await this.fetch('/v1/history/get_controlled_accounts', { controlling_account }); }
} // JsonRpc

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/_webpack@4.16.2@webpack/buildin/global.js */ "./node_modules/_webpack@4.16.2@webpack/buildin/global.js")))

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9baWRdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1tpZF0vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovL1tpZF0vLi9zcmMvZW9zanMyLWpzb25ycGMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7Ozs7Ozs7OztBQ25CQTtBQUFBLDBDQUEwQztBQUlwQyxjQUFnQixTQUFRLEtBQUs7SUFFakMsWUFBWSxJQUFTO1FBQ25CLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxJQUFJLENB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RSxZQUFZLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pMLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxFQUFVLEVBQUUsaUJBQXlCLElBQUksSUFBSSxPQUFPLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsRUFBRSxFQUFFLEVBQUUsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1SixLQUFLLENBQUMsd0JBQXdCLENBQUMsVUFBa0IsSUFBSSxPQUFPLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9ILEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxtQkFBMkIsSUFBSSxPQUFPLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsRUFBRSxFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDaEssQ0FBQyxVQUFVIiwiZmlsZSI6ImVvc2pzMi1qc29ucnBjLWRlYnVnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvZW9zanMyLWpzb25ycGMudHNcIik7XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiLy8gY29weXJpZ2h0IGRlZmluZWQgaW4gZW9zanMyL0xJQ0VOU0UudHh0XHJcblxyXG5pbXBvcnQgeyBBdXRob3JpdHlQcm92aWRlciwgQXV0aG9yaXR5UHJvdmlkZXJBcmdzIH0gZnJvbSAnLi9lb3NqczItYXBpJztcclxuXHJcbmV4cG9ydCBjbGFzcyBScGNFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICBqc29uOiBhbnk7XHJcbiAgY29uc3RydWN0b3IoanNvbjogYW55KSB7XHJcbiAgICBpZiAoanNvbi5lcnJvciAmJiBqc29uLmVycm9yLmRldGFpbHMgJiYganNvbi5lcnJvci5kZXRhaWxzLmxlbmd0aCAmJiBqc29uLmVycm9yLmRldGFpbHNbMF0ubWVzc2FnZSlcclxuICAgICAgc3VwZXIoanNvbi5lcnJvci5kZXRhaWxzWzBdLm1lc3NhZ2UpXHJcbiAgICBlbHNlIGlmIChqc29uLnByb2Nlc3NlZCAmJiBqc29uLnByb2Nlc3NlZC5leGNlcHQgJiYganNvbi5wcm9jZXNzZWQuZXhjZXB0Lm1lc3NhZ2UpXHJcbiAgICAgIHN1cGVyKGpzb24ucHJvY2Vzc2VkLmV4Y2VwdC5tZXNzYWdlKTtcclxuICAgIGVsc2VcclxuICAgICAgc3VwZXIoanNvbi5tZXNzYWdlKTtcclxuICAgIHRoaXMuanNvbiA9IGpzb247XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFiaSB7XHJcbiAgdmVyc2lvbjogc3RyaW5nO1xyXG4gIHR5cGVzOiB7IG5ld190eXBlX25hbWU6IHN0cmluZywgdHlwZTogc3RyaW5nIH1bXTtcclxuICBzdHJ1Y3RzOiB7IG5hbWU6IHN0cmluZywgYmFzZTogc3RyaW5nLCBmaWVsZHM6IHsgbmFtZTogc3RyaW5nLCB0eXBlOiBzdHJpbmcgfVtdIH1bXTtcclxuICBhY3Rpb25zOiB7IG5hbWU6IHN0cmluZywgdHlwZTogc3RyaW5nLCByaWNhcmRpYW5fY29udHJhY3Q6IHN0cmluZyB9W107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR2V0QWJpUmVzdWx0IHtcclxuICBhY2NvdW50X25hbWU6IHN0cmluZztcclxuICBhYmk6IEFiaTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCbG9ja1RhcG9zSW5mbyB7XHJcbiAgdGltZXN0YW1wOiBzdHJpbmc7XHJcbiAgYmxvY2tfbnVtOiBudW1iZXI7XHJcbiAgcmVmX2Jsb2NrX3ByZWZpeDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdldEJsb2NrUmVzdWx0IHtcclxuICB0aW1lc3RhbXA6IHN0cmluZztcclxuICBwcm9kdWNlcjogc3RyaW5nO1xyXG4gIGNvbmZpcm1lZDogbnVtYmVyO1xyXG4gIHByZXZpb3VzOiBzdHJpbmc7XHJcbiAgdHJhbnNhY3Rpb25fbXJvb3Q6IHN0cmluZztcclxuICBhY3Rpb25fbXJvb3Q6IHN0cmluZztcclxuICBzY2hlZHVsZV92ZXJzaW9uOiBudW1iZXI7XHJcbiAgcHJvZHVjZXJfc2lnbmF0dXJlOiBzdHJpbmc7XHJcbiAgaWQ6IHN0cmluZztcclxuICBibG9ja19udW06IG51bWJlcjtcclxuICByZWZfYmxvY2tfcHJlZml4OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR2V0Q29kZVJlc3VsdCB7XHJcbiAgYWNjb3VudF9uYW1lOiBzdHJpbmc7XHJcbiAgY29kZV9oYXNoOiBzdHJpbmc7XHJcbiAgd2FzdDogc3RyaW5nO1xyXG4gIHdhc206IHN0cmluZztcclxuICBhYmk6IEFiaTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHZXRJbmZvUmVzdWx0IHtcclxuICBzZXJ2ZXJfdmVyc2lvbjogc3RyaW5nO1xyXG4gIGNoYWluX2lkOiBzdHJpbmc7XHJcbiAgaGVhZF9ibG9ja19udW06IG51bWJlcjtcclxuICBsYXN0X2lycmV2ZXJzaWJsZV9ibG9ja19udW06IG51bWJlcjtcclxuICBsYXN0X2lycmV2ZXJzaWJsZV9ibG9ja19pZDogc3RyaW5nO1xyXG4gIGhlYWRfYmxvY2tfaWQ6IHN0cmluZztcclxuICBoZWFkX2Jsb2NrX3RpbWU6IHN0cmluZztcclxuICBoZWFkX2Jsb2NrX3Byb2R1Y2VyOiBzdHJpbmc7XHJcbiAgdmlydHVhbF9ibG9ja19jcHVfbGltaXQ6IG51bWJlcjtcclxuICB2aXJ0dWFsX2Jsb2NrX25ldF9saW1pdDogbnVtYmVyO1xyXG4gIGJsb2NrX2NwdV9saW1pdDogbnVtYmVyO1xyXG4gIGJsb2NrX25ldF9saW1pdDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRyYW5zYWN0aW9uQ29uZmlnIHtcclxuICBicm9hZGNhc3Q/OiBib29sZWFuO1xyXG4gIGJsb2Nrc0JlaGluZD86IG51bWJlcjtcclxuICBleHBpcmVTZWNvbmRzPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFB1c2hUcmFuc2FjdGlvbkFyZ3Mge1xyXG4gIHNpZ25hdHVyZXM6IHN0cmluZ1tdO1xyXG4gIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbjogVWludDhBcnJheTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXJyYXlUb0hleChkYXRhOiBVaW50OEFycmF5KSB7XHJcbiAgbGV0IHJlc3VsdCA9ICcnO1xyXG4gIGZvciAobGV0IHggb2YgZGF0YSlcclxuICAgIHJlc3VsdCArPSAoJzAwJyArIHgudG9TdHJpbmcoMTYpKS5zbGljZSgtMik7XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25ScGMgaW1wbGVtZW50cyBBdXRob3JpdHlQcm92aWRlciB7XHJcbiAgZW5kcG9pbnQ6IHN0cmluZztcclxuICBmZXRjaEJ1aWx0aW46IChpbnB1dD86IFJlcXVlc3QgfCBzdHJpbmcsIGluaXQ/OiBSZXF1ZXN0SW5pdCkgPT4gUHJvbWlzZTxSZXNwb25zZT47XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVuZHBvaW50OiBzdHJpbmcsIGFyZ3M6IGFueSA9IHt9KSB7XHJcbiAgICB0aGlzLmVuZHBvaW50ID0gZW5kcG9pbnQ7XHJcbiAgICBpZiAoYXJncy5mZXRjaClcclxuICAgICAgdGhpcy5mZXRjaEJ1aWx0aW4gPSBhcmdzLmZldGNoO1xyXG4gICAgZWxzZVxyXG4gICAgICB0aGlzLmZldGNoQnVpbHRpbiA9ICg8YW55Pmdsb2JhbCkuZmV0Y2g7XHJcbiAgfVxyXG5cclxuICBhc3luYyBmZXRjaChwYXRoOiBzdHJpbmcsIGJvZHk6IGFueSkge1xyXG4gICAgbGV0IHJlc3BvbnNlLCBqc29uO1xyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IGYgPSB0aGlzLmZldGNoQnVpbHRpbjtcclxuICAgICAgcmVzcG9uc2UgPSBhd2FpdCBmKHRoaXMuZW5kcG9pbnQgKyBwYXRoLCB7XHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIH0pO1xyXG4gICAgICBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICBpZiAoanNvbi5wcm9jZXNzZWQgJiYganNvbi5wcm9jZXNzZWQuZXhjZXB0KVxyXG4gICAgICAgIHRocm93IG5ldyBScGNFcnJvcihqc29uKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgZS5pc0ZldGNoRXJyb3IgPSB0cnVlO1xyXG4gICAgICB0aHJvdyBlO1xyXG4gICAgfVxyXG4gICAgaWYgKCFyZXNwb25zZS5vaylcclxuICAgICAgdGhyb3cgbmV3IFJwY0Vycm9yKGpzb24pO1xyXG4gICAgcmV0dXJuIGpzb247XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRfYWJpKGFjY291bnRfbmFtZTogc3RyaW5nKTogUHJvbWlzZTxHZXRBYmlSZXN1bHQ+IHsgcmV0dXJuIGF3YWl0IHRoaXMuZmV0Y2goJy92MS9jaGFpbi9nZXRfYWJpJywgeyBhY2NvdW50X25hbWUgfSk7IH1cclxuICBhc3luYyBnZXRfYWNjb3VudChhY2NvdW50X25hbWU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7IHJldHVybiBhd2FpdCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vZ2V0X2FjY291bnQnLCB7IGFjY291bnRfbmFtZSB9KTsgfVxyXG4gIGFzeW5jIGdldF9ibG9ja19oZWFkZXJfc3RhdGUoYmxvY2tfbnVtX29yX2lkOiBudW1iZXIgfCBzdHJpbmcpOiBQcm9taXNlPGFueT4geyByZXR1cm4gYXdhaXQgdGhpcy5mZXRjaCgnL3YxL2NoYWluL2dldF9ibG9ja19oZWFkZXJfc3RhdGUnLCB7IGJsb2NrX251bV9vcl9pZCB9KTsgfVxyXG4gIGFzeW5jIGdldF9ibG9jayhibG9ja19udW1fb3JfaWQ6IG51bWJlciB8IHN0cmluZyk6IFByb21pc2U8R2V0QmxvY2tSZXN1bHQ+IHsgcmV0dXJuIGF3YWl0IHRoaXMuZmV0Y2goJy92MS9jaGFpbi9nZXRfYmxvY2snLCB7IGJsb2NrX251bV9vcl9pZCB9KTsgfVxyXG4gIGFzeW5jIGdldF9jb2RlKGFjY291bnRfbmFtZTogc3RyaW5nKTogUHJvbWlzZTxHZXRDb2RlUmVzdWx0PiB7IHJldHVybiBhd2FpdCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vZ2V0X2NvZGUnLCB7IGFjY291bnRfbmFtZSB9KTsgfVxyXG4gIGFzeW5jIGdldF9jdXJyZW5jeV9iYWxhbmNlKGNvZGU6IHN0cmluZywgYWNjb3VudDogc3RyaW5nLCBzeW1ib2w6IHN0cmluZyA9IG51bGwpOiBQcm9taXNlPGFueT4geyByZXR1cm4gYXdhaXQgdGhpcy5mZXRjaCgnL3YxL2NoYWluL2dldF9jdXJyZW5jeV9iYWxhbmNlJywgeyBjb2RlLCBhY2NvdW50LCBzeW1ib2wgfSk7IH1cclxuICBhc3luYyBnZXRfY3VycmVuY3lfc3RhdHMoY29kZTogc3RyaW5nLCBzeW1ib2w6IHN0cmluZyk6IFByb21pc2U8YW55PiB7IHJldHVybiBhd2FpdCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vZ2V0X2N1cnJlbmN5X3N0YXRzJywgeyBjb2RlLCBzeW1ib2wgfSk7IH1cclxuICBhc3luYyBnZXRfaW5mbygpOiBQcm9taXNlPEdldEluZm9SZXN1bHQ+IHsgcmV0dXJuIGF3YWl0IHRoaXMuZmV0Y2goJy92MS9jaGFpbi9nZXRfaW5mbycsIHt9KTsgfVxyXG4gIGFzeW5jIGdldF9wcm9kdWNlcl9zY2hlZHVsZSgpOiBQcm9taXNlPGFueT4geyByZXR1cm4gYXdhaXQgdGhpcy5mZXRjaCgnL3YxL2NoYWluL2dldF9wcm9kdWNlcl9zY2hlZHVsZScsIHt9KTsgfVxyXG4gIGFzeW5jIGdldF9wcm9kdWNlcnMoanNvbiA9IHRydWUsIGxvd2VyX2JvdW5kID0gJycsIGxpbWl0ID0gNTApOiBQcm9taXNlPGFueT4geyByZXR1cm4gYXdhaXQgdGhpcy5mZXRjaCgnL3YxL2NoYWluL2dldF9wcm9kdWNlcnMnLCB7IGpzb24sIGxvd2VyX2JvdW5kLCBsaW1pdCB9KTsgfVxyXG5cclxuICBhc3luYyBnZXRfdGFibGVfcm93cyh7XHJcbiAgICBqc29uID0gdHJ1ZSxcclxuICAgIGNvZGUsXHJcbiAgICBzY29wZSxcclxuICAgIHRhYmxlLFxyXG4gICAgdGFibGVfa2V5ID0gJycsXHJcbiAgICBsb3dlcl9ib3VuZCA9ICcnLFxyXG4gICAgdXBwZXJfYm91bmQgPSAnJyxcclxuICAgIGxpbWl0ID0gMTAgfTogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5mZXRjaChcclxuICAgICAgJy92MS9jaGFpbi9nZXRfdGFibGVfcm93cycsIHtcclxuICAgICAgICBqc29uLFxyXG4gICAgICAgIGNvZGUsXHJcbiAgICAgICAgc2NvcGUsXHJcbiAgICAgICAgdGFibGUsXHJcbiAgICAgICAgdGFibGVfa2V5LFxyXG4gICAgICAgIGxvd2VyX2JvdW5kLFxyXG4gICAgICAgIHVwcGVyX2JvdW5kLFxyXG4gICAgICAgIGxpbWl0XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0UmVxdWlyZWRLZXlzKGFyZ3M6IEF1dGhvcml0eVByb3ZpZGVyQXJncyk6IFByb21pc2U8c3RyaW5nW10+IHtcclxuICAgIHJldHVybiAoYXdhaXQgdGhpcy5mZXRjaCgnL3YxL2NoYWluL2dldF9yZXF1aXJlZF9rZXlzJywge1xyXG4gICAgICB0cmFuc2FjdGlvbjogYXJncy50cmFuc2FjdGlvbixcclxuICAgICAgYXZhaWxhYmxlX2tleXM6IGFyZ3MuYXZhaWxhYmxlS2V5c1xyXG4gICAgfSkpLnJlcXVpcmVkX2tleXM7XHJcbiAgfVxyXG5cclxuICBhc3luYyBwdXNoX3RyYW5zYWN0aW9uKHsgc2lnbmF0dXJlcywgc2VyaWFsaXplZFRyYW5zYWN0aW9uIH06IFB1c2hUcmFuc2FjdGlvbkFyZ3MpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZmV0Y2goJy92MS9jaGFpbi9wdXNoX3RyYW5zYWN0aW9uJywge1xyXG4gICAgICBzaWduYXR1cmVzLFxyXG4gICAgICBjb21wcmVzc2lvbjogMCxcclxuICAgICAgcGFja2VkX2NvbnRleHRfZnJlZV9kYXRhOiAnJyxcclxuICAgICAgcGFja2VkX3RyeDogYXJyYXlUb0hleChzZXJpYWxpemVkVHJhbnNhY3Rpb24pLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBkYl9zaXplX2dldCgpIHsgcmV0dXJuIGF3YWl0IHRoaXMuZmV0Y2goJy92MS9kYl9zaXplL2dldCcsIHt9KTsgfVxyXG5cclxuICBhc3luYyBoaXN0b3J5X2dldF9hY3Rpb25zKGFjY291bnRfbmFtZTogc3RyaW5nLCBwb3M6IG51bWJlciA9IG51bGwsIG9mZnNldDogbnVtYmVyID0gbnVsbCkgeyByZXR1cm4gYXdhaXQgdGhpcy5mZXRjaCgnL3YxL2hpc3RvcnkvZ2V0X2FjdGlvbnMnLCB7IGFjY291bnRfbmFtZSwgcG9zLCBvZmZzZXQgfSk7IH1cclxuICBhc3luYyBoaXN0b3J5X2dldF90cmFuc2FjdGlvbihpZDogc3RyaW5nLCBibG9ja19udW1faGludDogbnVtYmVyID0gbnVsbCkgeyByZXR1cm4gYXdhaXQgdGhpcy5mZXRjaCgnL3YxL2hpc3RvcnkvZ2V0X3RyYW5zYWN0aW9uJywgeyBpZCwgYmxvY2tfbnVtX2hpbnQgfSk7IH1cclxuICBhc3luYyBoaXN0b3J5X2dldF9rZXlfYWNjb3VudHMocHVibGljX2tleTogc3RyaW5nKSB7IHJldHVybiBhd2FpdCB0aGlzLmZldGNoKCcvdjEvaGlzdG9yeS9nZXRfa2V5X2FjY291bnRzJywgeyBwdWJsaWNfa2V5IH0pOyB9XHJcbiAgYXN5bmMgaGlzdG9yeV9nZXRfY29udHJvbGxlZF9hY2NvdW50cyhjb250cm9sbGluZ19hY2NvdW50OiBzdHJpbmcpIHsgcmV0dXJuIGF3YWl0IHRoaXMuZmV0Y2goJy92MS9oaXN0b3J5L2dldF9jb250cm9sbGVkX2FjY291bnRzJywgeyBjb250cm9sbGluZ19hY2NvdW50IH0pOyB9XHJcbn0gLy8gSnNvblJwY1xyXG4iXSwic291cmNlUm9vdCI6IiJ9