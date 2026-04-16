/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/search.js"
/*!*******************************!*\
  !*** ./src/modules/search.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class Search {
  constructor() {
    this.servicesSearchField = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pwf-services-search-field');
    this.servicesSearchSubmit = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pwf-services-search-submit');
    this.servicesSearchSubmitPreview = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pwf-services-search-submit--preview');
    this.servicesResultsSection = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pwf-services-search-results');
    this.servicesSearchTermError = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pwf-search-term-error');
    this.events();
  }
  events() {
    this.servicesSearchSubmitPreview.on('click', this.searchServicePreviews.bind(this));
  }
  searchServicePreviews() {
    console.log('called');
    let searchTerm = this.servicesSearchField.val();
    this.servicesSearchTermError.addClass('hidden');
    if (searchTerm.length < 3) {
      this.servicesSearchTermError.removeClass('hidden');
    } else {
      this.servicesResultsSection.html('');
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        beforeSend: xhr => {
          xhr.setRequestHeader('X-WP-Nonce', pwfData.nonce);
        },
        url: pwfData.root_url + '/wp-json/pwfSearch/v1/serviceSearch',
        type: 'GET',
        data: {
          'searchTerm': searchTerm
        },
        success: response => {
          console.log(response);
          let alreadyAdded = [];
          if (response.length < 1) {
            this.servicesResultsSection.html("<p class='centered-text'>Sorry! We couldn't find any matching results.</p>");
          } else {
            for (let i = 0; i < response.length; i++) {
              if (response[i]['found_in'] == 'title') {
                let resultDiv = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div />').addClass('pwf-service-search-result');
                let resultTitle = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h2 />').html(response[i]['servicename']);
                resultDiv.append(resultTitle);
                let rawDescription = response[i]['servicedescription'];
                let trimmedDescription = rawDescription.substr(0, 500);
                trimmedDescription = trimmedDescription.length < rawDescription.length ? trimmedDescription.substr(0, Math.min(trimmedDescription.length, trimmedDescription.lastIndexOf(" "))) : trimmedDescription;
                trimmedDescription += trimmedDescription.length < rawDescription.length ? '...' : '';
                let resultDescription = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p />').html(trimmedDescription);
                resultDiv.append(resultDescription);
                let loginP = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p />').addClass('search-results-login').html('login for full details');
                resultDiv.append(loginP);
                this.servicesResultsSection.append(resultDiv);
                alreadyAdded.push(response[i]['id']);
              } else {
                if (jquery__WEBPACK_IMPORTED_MODULE_0___default().inArray(response[i]['id'], alreadyAdded) == -1) {
                  let resultDiv = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div />').addClass('pwf-service-search-result');
                  let resultTitle = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h2 />').html(response[i]['servicename']);
                  resultDiv.append(resultTitle);
                  let rawDescription = response[i]['servicedescription'];
                  let trimmedDescription = rawDescription.substr(0, 500);
                  trimmedDescription = trimmedDescription.length < rawDescription.length ? trimmedDescription.substr(0, Math.min(trimmedDescription.length, trimmedDescription.lastIndexOf(" "))) : trimmedDescription;
                  trimmedDescription += trimmedDescription.length < rawDescription.length ? '...' : '';
                  let resultDescription = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p />').html(trimmedDescription);
                  resultDiv.append(resultDescription);
                  let loginP = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p />').addClass('search-results-login').html('login for full details');
                  resultDiv.append(loginP);
                  this.servicesResultsSection.append(resultDiv);
                  alreadyAdded.push(response[i][id]);
                }
              }
            }
          }
        },
        error: response => {
          console.log(response);
        }
      });
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Search);

/***/ },

/***/ "jquery"
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
(module) {

module.exports = window["jQuery"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/search */ "./src/modules/search.js");

const search = new _modules_search__WEBPACK_IMPORTED_MODULE_0__["default"]();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map