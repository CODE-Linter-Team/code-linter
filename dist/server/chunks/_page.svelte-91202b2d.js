import { c as create_ssr_component, b as subscribe, d as escape, v as validate_component, g as add_attribute, f as null_to_empty, p as createEventDispatcher, o as onDestroy, e as each } from './index2-af991d7a.js';
import { w as writable } from './index4-d46cba10.js';
import { P as Pulse } from './ArrowUp.svelte_svelte_type_style_lang-1fd7f844.js';
import { T as Toggle } from './Toggle-7c823ac8.js';
import { faClose, faImage } from '@fortawesome/free-solid-svg-icons';
import { F as Fa$1 } from './fa-d4dd1dea.js';
import { visit } from 'unist-util-visit';
import { V as Viewer } from './viewer-42f982de.js';
import gfm from '@bytemd/plugin-gfm';
import gemoji from '@bytemd/plugin-gemoji';
import 'process';
import 'url';
import 'path';

/**
 * Creates a virtual file input element (`<input type="file" />`) with options.
 * @param options
 */
var createInputFile = function (ref) {
  if ( ref === void 0 ) ref = {};
  var accept = ref.accept; if ( accept === void 0 ) accept = '';
  var capture = ref.capture; if ( capture === void 0 ) capture = false;
  var multiple = ref.multiple; if ( multiple === void 0 ) multiple = false;

  var input = document.createElement('input');
  input.type = 'file';
  input.accept = accept;
  input.capture = capture;
  input.multiple = multiple;
  return input;
};
/**
 * Virtually creates a file input element (`<input type="file" />`), triggers it
 * and returns selected files.
 *
 * @example
 * selectFiles({ accept: 'image/*', multiple: true }).then(files => {
 *   // ...
 * });
 *
 * @param options
 */


var selectFiles = function (options) { return new Promise(function (resolve) {
  var input = createInputFile(options);
  input.addEventListener('change', function () { return resolve(input.files || null); });
  setTimeout(function () {
    var event = new MouseEvent('click');
    input.dispatchEvent(event);
  }, 0);
}); };

/**
 * Word Count
 *
 * Word count in respect of CJK characters.
 *
 * Copyright (c) 2015 - 2016 by Hsiaoming Yang.
 */

var pattern = /[a-zA-Z0-9_\u0392-\u03c9\u00c0-\u00ff\u0600-\u06ff]+|[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;

var wordCount = function (data) {
  var m = data.match(pattern);
  var count = 0;
  if (!m) {
    return 0;
  }
  for (var i = 0; i < m.length; i++) {
    if (m[i].charCodeAt(0) >= 0x4e00) {
      count += m[i].length;
    } else {
      count += 1;
    }
  }
  return count;
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var COMMON_MIME_TYPES = new Map([
    ['avi', 'video/avi'],
    ['gif', 'image/gif'],
    ['ico', 'image/x-icon'],
    ['jpeg', 'image/jpeg'],
    ['jpg', 'image/jpeg'],
    ['mkv', 'video/x-matroska'],
    ['mov', 'video/quicktime'],
    ['mp4', 'video/mp4'],
    ['pdf', 'application/pdf'],
    ['png', 'image/png'],
    ['zip', 'application/zip'],
    ['doc', 'application/msword'],
    ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
]);
function toFileWithPath(file, path) {
    var f = withMimeType(file);
    if (typeof f.path !== 'string') { // on electron, path is already set to the absolute path
        var webkitRelativePath = file.webkitRelativePath;
        Object.defineProperty(f, 'path', {
            value: typeof path === 'string'
                ? path
                // If <input webkitdirectory> is set,
                // the File will have a {webkitRelativePath} property
                // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory
                : typeof webkitRelativePath === 'string' && webkitRelativePath.length > 0
                    ? webkitRelativePath
                    : file.name,
            writable: false,
            configurable: false,
            enumerable: true
        });
    }
    return f;
}
function withMimeType(file) {
    var name = file.name;
    var hasExtension = name && name.lastIndexOf('.') !== -1;
    if (hasExtension && !file.type) {
        var ext = name.split('.')
            .pop().toLowerCase();
        var type = COMMON_MIME_TYPES.get(ext);
        if (type) {
            Object.defineProperty(file, 'type', {
                value: type,
                writable: false,
                configurable: false,
                enumerable: true
            });
        }
    }
    return file;
}

var FILES_TO_IGNORE = [
    // Thumbnail cache files for macOS and Windows
    '.DS_Store',
    'Thumbs.db' // Windows
];
/**
 * Convert a DragEvent's DataTrasfer object to a list of File objects
 * NOTE: If some of the items are folders,
 * everything will be flattened and placed in the same list but the paths will be kept as a {path} property.
 * @param evt
 */
function fromEvent(evt) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, isDragEvt(evt) && evt.dataTransfer
                    ? getDataTransferFiles(evt.dataTransfer, evt.type)
                    : getInputFiles(evt)];
        });
    });
}
function isDragEvt(value) {
    return !!value.dataTransfer;
}
function getInputFiles(evt) {
    var files = isInput(evt.target)
        ? evt.target.files
            ? fromList(evt.target.files)
            : []
        : [];
    return files.map(function (file) { return toFileWithPath(file); });
}
function isInput(value) {
    return value !== null;
}
function getDataTransferFiles(dt, type) {
    return __awaiter(this, void 0, void 0, function () {
        var items, files;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!dt.items) return [3 /*break*/, 2];
                    items = fromList(dt.items)
                        .filter(function (item) { return item.kind === 'file'; });
                    // According to https://html.spec.whatwg.org/multipage/dnd.html#dndevents,
                    // only 'dragstart' and 'drop' has access to the data (source node)
                    if (type !== 'drop') {
                        return [2 /*return*/, items];
                    }
                    return [4 /*yield*/, Promise.all(items.map(toFilePromises))];
                case 1:
                    files = _a.sent();
                    return [2 /*return*/, noIgnoredFiles(flatten(files))];
                case 2: return [2 /*return*/, noIgnoredFiles(fromList(dt.files)
                        .map(function (file) { return toFileWithPath(file); }))];
            }
        });
    });
}
function noIgnoredFiles(files) {
    return files.filter(function (file) { return FILES_TO_IGNORE.indexOf(file.name) === -1; });
}
// IE11 does not support Array.from()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Browser_compatibility
// https://developer.mozilla.org/en-US/docs/Web/API/FileList
// https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItemList
function fromList(items) {
    var files = [];
    // tslint:disable: prefer-for-of
    for (var i = 0; i < items.length; i++) {
        var file = items[i];
        files.push(file);
    }
    return files;
}
// https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem
function toFilePromises(item) {
    if (typeof item.webkitGetAsEntry !== 'function') {
        return fromDataTransferItem(item);
    }
    var entry = item.webkitGetAsEntry();
    // Safari supports dropping an image node from a different window and can be retrieved using
    // the DataTransferItem.getAsFile() API
    // NOTE: FileSystemEntry.file() throws if trying to get the file
    if (entry && entry.isDirectory) {
        return fromDirEntry(entry);
    }
    return fromDataTransferItem(item);
}
function flatten(items) {
    return items.reduce(function (acc, files) { return __spread(acc, (Array.isArray(files) ? flatten(files) : [files])); }, []);
}
function fromDataTransferItem(item) {
    var file = item.getAsFile();
    if (!file) {
        return Promise.reject(item + " is not a File");
    }
    var fwp = toFileWithPath(file);
    return Promise.resolve(fwp);
}
// https://developer.mozilla.org/en-US/docs/Web/API/FileSystemEntry
function fromEntry(entry) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, entry.isDirectory ? fromDirEntry(entry) : fromFileEntry(entry)];
        });
    });
}
// https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryEntry
function fromDirEntry(entry) {
    var reader = entry.createReader();
    return new Promise(function (resolve, reject) {
        var entries = [];
        function readEntries() {
            var _this = this;
            // https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryEntry/createReader
            // https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryReader/readEntries
            reader.readEntries(function (batch) { return __awaiter(_this, void 0, void 0, function () {
                var files, err_1, items;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!batch.length) return [3 /*break*/, 5];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, Promise.all(entries)];
                        case 2:
                            files = _a.sent();
                            resolve(files);
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            reject(err_1);
                            return [3 /*break*/, 4];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            items = Promise.all(batch.map(fromEntry));
                            entries.push(items);
                            // Continue reading
                            readEntries();
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            }); }, function (err) {
                reject(err);
            });
        }
        readEntries();
    });
}
// https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileEntry
function fromFileEntry(entry) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    entry.file(function (file) {
                        var fwp = toFileWithPath(file, entry.fullPath);
                        resolve(fwp);
                    }, function (err) {
                        reject(err);
                    });
                })];
        });
    });
}

var DEFAULT_ICON_CONFIGS = {
  size: '1em',
  strokeWidth: 4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  theme: 'outline',
  colors: {
    outline: {
      fill: '#333',
      background: 'transparent'
    },
    filled: {
      fill: '#333',
      background: '#FFF'
    },
    twoTone: {
      fill: '#333',
      twoTone: '#2F88FF'
    },
    multiColor: {
      outStrokeColor: '#333',
      outFillColor: '#2F88FF',
      innerStrokeColor: '#FFF',
      innerFillColor: '#43CCF8'
    }
  },
  prefix: 'i'
};

function guid() {
  return 'icon-' + ((1 + Math.random()) * 0x100000000 | 0).toString(16).substring(1);
}

function IconConverter(id, icon, config) {
  var fill = typeof icon.fill === 'string' ? [icon.fill] : icon.fill || [];
  var colors = [];
  var theme = icon.theme || config.theme;

  switch (theme) {
    case 'outline':
      colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
      colors.push('none');
      colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
      colors.push('none');
      break;

    case 'filled':
      colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
      colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
      colors.push('#FFF');
      colors.push('#FFF');
      break;

    case 'two-tone':
      colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
      colors.push(typeof fill[1] === 'string' ? fill[1] : config.colors.twoTone.twoTone);
      colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
      colors.push(typeof fill[1] === 'string' ? fill[1] : config.colors.twoTone.twoTone);
      break;

    case 'multi-color':
      colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
      colors.push(typeof fill[1] === 'string' ? fill[1] : config.colors.multiColor.outFillColor);
      colors.push(typeof fill[2] === 'string' ? fill[2] : config.colors.multiColor.innerStrokeColor);
      colors.push(typeof fill[3] === 'string' ? fill[3] : config.colors.multiColor.innerFillColor);
      break;
  }

  return {
    size: icon.size || config.size,
    strokeWidth: icon.strokeWidth || config.strokeWidth,
    strokeLinecap: icon.strokeLinecap || config.strokeLinecap,
    strokeLinejoin: icon.strokeLinejoin || config.strokeLinejoin,
    colors: colors,
    id: id
  };
}
var currentConfig = DEFAULT_ICON_CONFIGS;
function getConfig() {
  return currentConfig;
}
function IconWrapper(name, render) {
  return function (props) {
    var config = getConfig();
    var svgProps = IconConverter(guid(), props, config);
    return render(svgProps);
  };
}

var AlignTextLeftOne = IconWrapper('align-text-left-one', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z" fill="' + props.colors[1] + '" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M26 24H14" stroke="' + props.colors[2] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M34 15H14" stroke="' + props.colors[2] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M32 33H14" stroke="' + props.colors[2] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

var Close = IconWrapper('close', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M8 8L40 40" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M8 40L40 8" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

var Code = IconWrapper('code', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M16 13L4 25.4322L16 37" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M32 13L44 25.4322L32 37" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M28 4L21 44" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '"/>' + '</svg>';
});

var CodeBrackets = IconWrapper('code-brackets', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M16 4C14 4 11 5 11 9C11 13 11 15 11 18C11 21 6 23 6 23C6 23 11 25 11 28C11 31 11 35 11 39C11 43 14 44 16 44" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M32 4C34 4 37 5 37 9C37 13 37 15 37 18C37 21 42 23 42 23C42 23 37 25 37 28C37 31 37 35 37 39C37 43 34 44 32 44" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

var DividingLine = IconWrapper('dividing-line', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M5 24H43" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M21 38H27" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M37 38H43" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M21 10H27" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M5 38H11" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M5 10H11" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M37 10H43" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

var FullScreen = IconWrapper('full-screen', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M33 6H42V15" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M42 33V42H33" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M15 42H6V33" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M6 15V6H15" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

var GithubOne = IconWrapper('github-one', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M29.3444 30.4765C31.7481 29.977 33.9292 29.1108 35.6247 27.8391C38.5202 25.6676 40 22.3136 40 18.9999C40 16.6752 39.1187 14.505 37.5929 12.6668C36.7427 11.6425 39.2295 3.99989 37.02 5.02919C34.8105 6.05848 31.5708 8.33679 29.8726 7.83398C28.0545 7.29565 26.0733 6.99989 24 6.99989C22.1992 6.99989 20.4679 7.22301 18.8526 7.6344C16.5046 8.23237 14.2591 5.99989 12 5.02919C9.74086 4.05848 10.9736 11.9632 10.3026 12.7944C8.84119 14.6051 8 16.7288 8 18.9999C8 22.3136 9.79086 25.6676 12.6863 27.8391C14.6151 29.2857 17.034 30.2076 19.7401 30.6619" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '"/>' + '<path d="M19.7397 30.6619C18.5812 31.937 18.002 33.1478 18.002 34.2944C18.002 35.441 18.002 38.3464 18.002 43.0106" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '"/>' + '<path d="M29.3446 30.4766C30.4423 31.9174 30.9912 33.211 30.9912 34.3576C30.9912 35.5042 30.9912 38.3885 30.9912 43.0107" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '"/>' + '<path d="M6 31.2155C6.89887 31.3254 7.56554 31.7387 8 32.4554C8.65169 33.5303 11.0742 37.518 13.8251 37.518C15.6591 37.518 17.0515 37.518 18.0024 37.518" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '"/>' + '</svg>';
});

var H = IconWrapper('h', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M12 5V43" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M36 5V43" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M12 24L36 24" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

var H1 = IconWrapper('h1', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M6 8V40" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M25 8V40" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M6 24H25" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M34.2261 24L39.0001 19.0166V40" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

var H2 = IconWrapper('h2', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M6 8V40" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M24 8V40" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M7 24H23" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M32 25C32 21.8334 34.6667 20 37 20C39.3334 20 42 21.8334 42 25C42 30.7 32 34.9333 32 40H42" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

var H3 = IconWrapper('h3', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M6 8V40" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M24 8V40" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M7 24H23" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M32 20H42L35 29C39 29 42 31 42 35C42 39 39 40 37 40C34.619 40 33 39 32 37.9" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

var Helpcenter = IconWrapper('helpcenter', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z" fill="' + props.colors[1] + '" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M24 28.625V24.625C27.3137 24.625 30 21.9387 30 18.625C30 15.3113 27.3137 12.625 24 12.625C20.6863 12.625 18 15.3113 18 18.625" stroke="' + props.colors[2] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path fill-rule="evenodd" clip-rule="evenodd" d="M24 37.625C25.3807 37.625 26.5 36.5057 26.5 35.125C26.5 33.7443 25.3807 32.625 24 32.625C22.6193 32.625 21.5 33.7443 21.5 35.125C21.5 36.5057 22.6193 37.625 24 37.625Z" fill="' + props.colors[2] + '"/>' + '</svg>';
});

var LeftExpand = IconWrapper('left-expand', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<rect x="6" y="6" width="28" height="36" rx="2" fill="' + props.colors[1] + '" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M42 6V42" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

var LevelFiveTitle = IconWrapper('level-five-title', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M6 8V40" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M24 8V40" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M7 24H23" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M40 21.0093H32V28.0341C32 28 34 27 37 27C40 27 41 29.5339 41 33.5C41 37.4661 40 40 36 40C33 40 32 38 32 36.0078" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

var LevelFourTitle = IconWrapper('level-four-title', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M6 8V40" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M24 8V40" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M7 24H23" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M39.9767 40V20L31 32.9967V35.0199H43" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

var LevelSixTitle = IconWrapper('level-six-title', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M6 8V40" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M24 8V40" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M7 24H23" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M36.5 40C39.5376 40 42 37.5376 42 34.5C42 31.4624 39.5376 29 36.5 29C33.4624 29 31 31.4624 31 34.5C31 37.5376 33.4624 40 36.5 40Z" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '"/>' + '<path d="M41.5962 24.7392C40.7778 22.5461 38.8044 21 36.5 21C33.4624 21 31 23.6863 31 27V34" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

var LinkOne = IconWrapper('link-one', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M26.2401 16.373L17.1001 7.23303C14.4388 4.57168 10.0653 4.6303 7.33158 7.36397C4.59791 10.0976 4.53929 14.4712 7.20064 17.1325L15.1359 25.0678" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M32.9027 23.0031L40.838 30.9384C43.4994 33.5998 43.4407 37.9733 40.7071 40.707C37.9734 43.4407 33.5999 43.4993 30.9385 40.8379L21.7985 31.6979" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M26.1093 26.1416C28.843 23.4079 28.9016 19.0344 26.2403 16.373" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M21.7989 21.7984C19.0652 24.5321 19.0066 28.9056 21.6679 31.5669" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

var ListTwo = IconWrapper('list-two', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M9 42C11.2091 42 13 40.2091 13 38C13 35.7909 11.2091 34 9 34C6.79086 34 5 35.7909 5 38C5 40.2091 6.79086 42 9 42Z" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M9 14C11.2091 14 13 12.2092 13 10C13 7.79086 11.2091 6 9 6C6.79086 6 5 7.79086 5 10C5 12.2092 6.79086 14 9 14Z" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M9 28C11.2091 28 13 26.2092 13 24C13 21.7908 11.2091 20 9 20C6.79086 20 5 21.7908 5 24C5 26.2092 6.79086 28 9 28Z" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M21 24H43" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M21 38H43" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M21 10H43" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

var OffScreen = IconWrapper('off-screen', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M33 6V15H42" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M15 6V15H6" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M15 42V33H6" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M33 42V33H41.8995" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

var OrderedList = IconWrapper('ordered-list', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M9 4V13" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M12 13H6" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M12 27H6" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M6 19.9998C6 19.9998 9 16.9998 11 19.9998C13 22.9999 6 26.9998 6 26.9998" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M6.00016 34.5001C6.00016 34.5001 8.00016 31.5 11.0002 33.5C14.0002 35.5 11.0002 38 11.0002 38C11.0002 38 14.0002 40.5 11.0002 42.5C8.00015 44.5 6.00015 41.5 6.00015 41.5" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M11 38H9" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M9 4L6 6" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M21 24H43" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M21 38H43" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M21 10H43" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

var Pic = IconWrapper('pic', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path fill-rule="evenodd" clip-rule="evenodd" d="M5 10C5 8.89543 5.89543 8 7 8L41 8C42.1046 8 43 8.89543 43 10V38C43 39.1046 42.1046 40 41 40H7C5.89543 40 5 39.1046 5 38V10Z" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 18C15.3284 18 16 17.3284 16 16.5C16 15.6716 15.3284 15 14.5 15C13.6716 15 13 15.6716 13 16.5C13 17.3284 13.6716 18 14.5 18Z" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M15 24L20 28L26 21L43 34V38C43 39.1046 42.1046 40 41 40H7C5.89543 40 5 39.1046 5 38V34L15 24Z" fill="' + props.colors[1] + '" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

var Quote = IconWrapper('quote', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path fill-rule="evenodd" clip-rule="evenodd" d="M18.8533 9.11587C11.3227 13.9521 7.13913 19.5811 6.30256 26.0028C5.00021 35.9999 13.9404 40.8932 18.4703 36.4966C23.0002 32.1 20.2848 26.5195 17.0047 24.9941C13.7246 23.4686 11.7187 23.9999 12.0686 21.9614C12.4185 19.923 17.0851 14.2712 21.1849 11.6391C21.4569 11.4078 21.5604 10.959 21.2985 10.6185C21.1262 10.3946 20.7883 9.95545 20.2848 9.30102C19.8445 8.72875 19.4227 8.75017 18.8533 9.11587Z" fill="' + props.colors[0] + '"/>' + '<path fill-rule="evenodd" clip-rule="evenodd" d="M38.6789 9.11587C31.1484 13.9521 26.9648 19.5811 26.1282 26.0028C24.8259 35.9999 33.7661 40.8932 38.296 36.4966C42.8259 32.1 40.1105 26.5195 36.8304 24.9941C33.5503 23.4686 31.5443 23.9999 31.8943 21.9614C32.2442 19.923 36.9108 14.2712 41.0106 11.6391C41.2826 11.4078 41.3861 10.959 41.1241 10.6185C40.9519 10.3946 40.614 9.95545 40.1105 9.30102C39.6702 8.72875 39.2484 8.75017 38.6789 9.11587Z" fill="' + props.colors[0] + '"/>' + '</svg>';
});

var RightExpand = IconWrapper('right-expand', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<rect x="14" y="6" width="28" height="36" rx="2" fill="' + props.colors[1] + '" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M6 6V42" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

var TextBold = IconWrapper('text-bold', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path fill-rule="evenodd" clip-rule="evenodd" d="M24 24C29.5056 24 33.9688 19.5228 33.9688 14C33.9688 8.47715 29.5056 4 24 4H11V24H24Z" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path fill-rule="evenodd" clip-rule="evenodd" d="M28.0312 44C33.5368 44 38 39.5228 38 34C38 28.4772 33.5368 24 28.0312 24H11V44H28.0312Z" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

var TextItalic = IconWrapper('text-italic', function (props) {
  return '<?xml version="1.0" encoding="UTF-8"?>' + '<svg width="' + props.size + '" height="' + props.size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M20 6H36" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M12 42H28" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '<path d="M29 5.95215L19 41.9998" stroke="' + props.colors[0] + '" stroke-width="' + props.strokeWidth + '" stroke-linecap="' + props.strokeLinecap + '" stroke-linejoin="' + props.strokeLinejoin + '"/>' + '</svg>';
});

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

var freeGlobal$1 = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal$1 || freeSelf || Function('return this')();

var root$1 = root;

/** Built-in value references. */
var Symbol$1 = root$1.Symbol;

var Symbol$2 = Symbol$1;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root$1.Date.now();
};

var now$1 = now;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now$1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now$1());
  }

  function debounced() {
    var time = now$1(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

const bold = "Bold";
const boldText = "bold text";
const cheatsheet = "Markdown Cheatsheet";
const closeHelp = "Close help";
const closeToc = "Close table of contents";
const code = "Code";
const codeBlock = "Code block";
const codeLang = "lang";
const codeText = "code";
const exitFullscreen = "Exit fullscreen";
const exitPreviewOnly = "Exit preview only";
const exitWriteOnly = "Exit write only";
const fullscreen = "Fullscreen";
const h1 = "Heading 1";
const h2 = "Heading 2";
const h3 = "Heading 3";
const h4 = "Heading 4";
const h5 = "Heading 5";
const h6 = "Heading 6";
const headingText = "heading";
const help = "Help";
const hr = "Horizontal rule";
const image = "Image";
const imageAlt = "alt";
const imageTitle = "title";
const italic = "Italic";
const italicText = "italic text";
const limited = "The maximum character limit has been reached";
const lines = "Lines";
const link = "Link";
const linkText = "link text";
const ol = "Ordered list";
const olItem = "item";
const preview = "Preview";
const previewOnly = "Preview only";
const quote = "Quote";
const quotedText = "quoted text";
const shortcuts = "Shortcuts";
const source = "Source code";
const sync = "Scroll sync";
const toc = "Table of contents";
const top = "Scroll to top";
const ul = "Unordered list";
const ulItem = "item";
const words = "Words";
const write = "Write";
const writeOnly = "Write only";
const en = {
  bold,
  boldText,
  cheatsheet,
  closeHelp,
  closeToc,
  code,
  codeBlock,
  codeLang,
  codeText,
  exitFullscreen,
  exitPreviewOnly,
  exitWriteOnly,
  fullscreen,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  headingText,
  help,
  hr,
  image,
  imageAlt,
  imageTitle,
  italic,
  italicText,
  limited,
  lines,
  link,
  linkText,
  ol,
  olItem,
  preview,
  previewOnly,
  quote,
  quotedText,
  shortcuts,
  source,
  sync,
  toc,
  top,
  ul,
  ulItem,
  words,
  write,
  writeOnly
};
function createEditorUtils(codemirror, editor) {
  return {
    wrapText(before, after = before) {
      const range = editor.somethingSelected() ? editor.listSelections()[0] : editor.findWordAt(editor.getCursor());
      const from = range.from();
      const to = range.to();
      const text = editor.getRange(from, to);
      const fromBefore = codemirror.Pos(from.line, from.ch - before.length);
      const toAfter = codemirror.Pos(to.line, to.ch + after.length);
      if (editor.getRange(fromBefore, from) === before && editor.getRange(to, toAfter) === after) {
        editor.replaceRange(text, fromBefore, toAfter);
        editor.setSelection(fromBefore, codemirror.Pos(fromBefore.line, fromBefore.ch + text.length));
      } else {
        editor.replaceRange(before + text + after, from, to);
        const cursor = editor.getCursor();
        editor.setSelection(codemirror.Pos(cursor.line, cursor.ch - after.length - text.length), codemirror.Pos(cursor.line, cursor.ch - after.length));
      }
    },
    replaceLines(replace) {
      const [selection] = editor.listSelections();
      const range = [
        codemirror.Pos(selection.from().line, 0),
        codemirror.Pos(selection.to().line)
      ];
      const lines2 = editor.getRange(...range).split("\n");
      editor.replaceRange(lines2.map(replace).join("\n"), ...range);
      editor.setSelection(...range);
    },
    appendBlock(content) {
      const cursor = editor.getCursor();
      let emptyLine = -1;
      for (let i = cursor.line; i < editor.lineCount(); i++) {
        if (!editor.getLine(i).trim()) {
          emptyLine = i;
          break;
        }
      }
      if (emptyLine === -1) {
        editor.replaceRange("\n", codemirror.Pos(editor.lineCount()));
        emptyLine = editor.lineCount();
      }
      editor.replaceRange("\n" + content, codemirror.Pos(emptyLine));
      return codemirror.Pos(emptyLine + 1, 0);
    },
    selectFiles
  };
}
const getShortcutWithPrefix = (key, shift = false) => {
  const shiftPrefix = shift ? "Shift-" : "";
  const CmdPrefix = typeof navigator !== "undefined" && /Mac/.test(navigator.platform) ? "Cmd-" : "Ctrl-";
  return shiftPrefix + CmdPrefix + key;
};
async function handleImageUpload({ editor, appendBlock, codemirror }, uploadImages, files) {
  const imgs = await uploadImages(files);
  const pos = appendBlock(imgs.map(({ url, alt, title }, i) => {
    alt = alt ?? files[i].name;
    return `![${alt}](${url}${title ? ` "${title}"` : ""})`;
  }).join("\n\n"));
  editor.setSelection(pos, codemirror.Pos(pos.line + imgs.length * 2 - 2));
  editor.focus();
}
function getBuiltinActions(locale, plugins, uploadImages) {
  const leftActions = [
    {
      icon: H({}),
      handler: {
        type: "dropdown",
        actions: [1, 2, 3, 4, 5, 6].map((level) => ({
          title: locale[`h${level}`],
          icon: [
            H1({}),
            H2({}),
            H3({}),
            LevelFourTitle({}),
            LevelFiveTitle({}),
            LevelSixTitle({})
          ][level - 1],
          cheatsheet: level <= 3 ? `${"#".repeat(level)} ${locale.headingText}` : void 0,
          handler: {
            type: "action",
            click({ replaceLines, editor }) {
              replaceLines((line) => {
                line = line.trim().replace(/^#*/, "").trim();
                line = "#".repeat(level) + " " + line;
                return line;
              });
              editor.focus();
            }
          }
        }))
      }
    },
    {
      title: locale.bold,
      icon: TextBold({}),
      cheatsheet: `**${locale.boldText}**`,
      handler: {
        type: "action",
        shortcut: getShortcutWithPrefix("B"),
        click({ wrapText, editor }) {
          wrapText("**");
          editor.focus();
        }
      }
    },
    {
      title: locale.italic,
      icon: TextItalic({}),
      cheatsheet: `*${locale.italicText}*`,
      handler: {
        type: "action",
        shortcut: getShortcutWithPrefix("I"),
        click({ wrapText, editor }) {
          wrapText("*");
          editor.focus();
        }
      }
    },
    {
      title: locale.quote,
      icon: Quote({}),
      cheatsheet: `> ${locale.quotedText}`,
      handler: {
        type: "action",
        click({ replaceLines, editor }) {
          replaceLines((line) => "> " + line);
          editor.focus();
        }
      }
    },
    {
      title: locale.link,
      icon: LinkOne({}),
      cheatsheet: `[${locale.linkText}](url)`,
      handler: {
        type: "action",
        shortcut: getShortcutWithPrefix("K"),
        click({ editor, wrapText, codemirror }) {
          wrapText("[", "](url)");
          const cursor = editor.getCursor();
          editor.setSelection(codemirror.Pos(cursor.line, cursor.ch + 2), codemirror.Pos(cursor.line, cursor.ch + 5));
          editor.focus();
        }
      }
    },
    {
      title: locale.image,
      icon: Pic({}),
      cheatsheet: `![${locale.imageAlt}](url "${locale.imageTitle}")`,
      handler: uploadImages ? {
        type: "action",
        shortcut: getShortcutWithPrefix("I", true),
        async click(ctx) {
          const fileList = await selectFiles({
            accept: "image/*",
            multiple: true
          });
          if (fileList?.length) {
            await handleImageUpload(ctx, uploadImages, Array.from(fileList));
          }
        }
      } : void 0
    },
    {
      title: locale.code,
      icon: Code({}),
      cheatsheet: "`" + locale.codeText + "`",
      handler: {
        type: "action",
        shortcut: getShortcutWithPrefix("K", true),
        click({ wrapText, editor }) {
          wrapText("`");
          editor.focus();
        }
      }
    },
    {
      title: locale.codeBlock,
      icon: CodeBrackets({}),
      cheatsheet: "```" + locale.codeLang + "↵",
      handler: {
        type: "action",
        shortcut: getShortcutWithPrefix("C", true),
        click({ editor, appendBlock, codemirror }) {
          const pos = appendBlock("```js\n```");
          editor.setSelection(codemirror.Pos(pos.line, 3), codemirror.Pos(pos.line, 5));
          editor.focus();
        }
      }
    },
    {
      title: locale.ul,
      icon: ListTwo({}),
      cheatsheet: `- ${locale.ulItem}`,
      handler: {
        type: "action",
        shortcut: getShortcutWithPrefix("U", true),
        click({ replaceLines, editor }) {
          replaceLines((line) => "- " + line);
          editor.focus();
        }
      }
    },
    {
      title: locale.ol,
      icon: OrderedList({}),
      cheatsheet: `1. ${locale.olItem}`,
      handler: {
        type: "action",
        shortcut: getShortcutWithPrefix("O", true),
        click({ replaceLines, editor }) {
          replaceLines((line, i) => `${i + 1}. ${line}`);
          editor.focus();
        }
      }
    },
    {
      title: locale.hr,
      icon: DividingLine({}),
      cheatsheet: "---"
    }
  ];
  const rightActions = [];
  plugins.forEach(({ actions }) => {
    if (actions) {
      actions.forEach((action) => {
        if (!action.position || action.position !== "right")
          leftActions.push(action);
        else
          rightActions.unshift(action);
      });
    }
  });
  return {
    leftActions,
    rightActions
  };
}
const Help = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let items;
  let { actions } = $$props;
  let { locale } = $$props;
  let { visible } = $$props;
  function flatItems(actions2) {
    let items2 = [];
    actions2.forEach((action) => {
      const { handler, cheatsheet: cheatsheet2 } = action;
      if (handler?.type === "dropdown") {
        items2.push(...flatItems(handler.actions));
      }
      if (cheatsheet2) {
        items2.push(action);
      }
    });
    return items2;
  }
  if ($$props.actions === void 0 && $$bindings.actions && actions !== void 0)
    $$bindings.actions(actions);
  if ($$props.locale === void 0 && $$bindings.locale && locale !== void 0)
    $$bindings.locale(locale);
  if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0)
    $$bindings.visible(visible);
  items = flatItems(actions);
  return `<div class="${["bytemd-help", !visible ? "bytemd-hidden" : ""].join(" ").trim()}"><h2>${escape(locale.cheatsheet)}</h2><ul>${each(items, (action) => {
    return `${action.cheatsheet ? `<li><div class="${"bytemd-help-icon"}"><!-- HTML_TAG_START -->${action.icon}<!-- HTML_TAG_END --></div><div class="${"bytemd-help-title"}">${escape(action.title)}</div><div class="${"bytemd-help-content"}"><code>${escape(action.cheatsheet)}</code></div></li>` : ``}`;
  })}</ul><h2>${escape(locale.shortcuts)}</h2><ul>${each(items, (action) => {
    return `${action.handler && action.handler.type === "action" && action.handler.shortcut ? `<li><div class="${"bytemd-help-icon"}"><!-- HTML_TAG_START -->${action.icon}<!-- HTML_TAG_END --></div><div class="${"bytemd-help-title"}">${escape(action.title)}</div><div class="${"bytemd-help-content"}"><kbd>${escape(action.handler.shortcut)}</kbd></div></li>` : ``}`;
  })}</ul></div>`;
});
const Status = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let words2;
  let lines2;
  let { showSync } = $$props;
  let { value } = $$props;
  let { syncEnabled } = $$props;
  let { locale } = $$props;
  let { islimited } = $$props;
  createEventDispatcher();
  if ($$props.showSync === void 0 && $$bindings.showSync && showSync !== void 0)
    $$bindings.showSync(showSync);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.syncEnabled === void 0 && $$bindings.syncEnabled && syncEnabled !== void 0)
    $$bindings.syncEnabled(syncEnabled);
  if ($$props.locale === void 0 && $$bindings.locale && locale !== void 0)
    $$bindings.locale(locale);
  if ($$props.islimited === void 0 && $$bindings.islimited && islimited !== void 0)
    $$bindings.islimited(islimited);
  words2 = wordCount(value);
  lines2 = value.split("\n").length;
  return `<div class="${"bytemd-status"}"><div class="${"bytemd-status-left"}"><span>${escape(locale.words)}: <strong>${escape(words2)}</strong></span><span>${escape(locale.lines)}: <strong>${escape(lines2)}</strong></span>${islimited ? `<span class="${"bytemd-status-error"}">${escape(locale.limited)}</span>` : ``}</div><div class="${"bytemd-status-right"}">${showSync ? `<label><input type="${"checkbox"}" ${syncEnabled ? "checked" : ""}>${escape(locale.sync)}</label>` : ``}<span>${escape(locale.top)}</span></div></div>`;
});
const Toc = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { hast } = $$props;
  let { currentBlockIndex } = $$props;
  let { locale } = $$props;
  let { visible } = $$props;
  createEventDispatcher();
  let items;
  let minLevel = 6;
  let currentHeadingIndex = 0;
  function stringifyHeading(e) {
    let result = "";
    visit(e, (node) => {
      if (node.type === "text") {
        result += node.value;
      }
    });
    return result;
  }
  if ($$props.hast === void 0 && $$bindings.hast && hast !== void 0)
    $$bindings.hast(hast);
  if ($$props.currentBlockIndex === void 0 && $$bindings.currentBlockIndex && currentBlockIndex !== void 0)
    $$bindings.currentBlockIndex(currentBlockIndex);
  if ($$props.locale === void 0 && $$bindings.locale && locale !== void 0)
    $$bindings.locale(locale);
  if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0)
    $$bindings.visible(visible);
  {
    (() => {
      items = [];
      currentHeadingIndex = 0;
      hast.children.filter((v) => v.type === "element").forEach((node, index) => {
        if (node.tagName[0] === "h" && !!node.children.length) {
          const i = Number(node.tagName[1]);
          minLevel = Math.min(minLevel, i);
          items.push({ level: i, text: stringifyHeading(node) });
        }
        if (currentBlockIndex >= index) {
          currentHeadingIndex = items.length - 1;
        }
      });
    })();
  }
  return `<div class="${["bytemd-toc", !visible ? "bytemd-hidden" : ""].join(" ").trim()}"><h2>${escape(locale.toc)}</h2><ul>${each(items, (item, index) => {
    return `<li class="${[
      escape(`bytemd-toc-${item.level}`, true),
      (currentHeadingIndex === index ? "bytemd-toc-active" : "") + " " + (item.level === minLevel ? "bytemd-toc-first" : "")
    ].join(" ").trim()}"${add_attribute("style", `padding-left:${(item.level - minLevel) * 16 + 8}px`, 0)}>${escape(item.text)}</li>`;
  })}</ul></div>`;
});
const tippyClass = "bytemd-tippy";
const tippyClassRight = "bytemd-tippy-right";
const Toolbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let tocActive;
  let helpActive;
  let writeActive;
  let previewActive;
  let rightActions;
  const dispatch = createEventDispatcher();
  let toolbar;
  let { context } = $$props;
  let { split } = $$props;
  let { activeTab } = $$props;
  let { fullscreen: fullscreen2 } = $$props;
  let { sidebar } = $$props;
  let { locale } = $$props;
  let { actions } = $$props;
  let { rightAfferentActions } = $$props;
  if ($$props.context === void 0 && $$bindings.context && context !== void 0)
    $$bindings.context(context);
  if ($$props.split === void 0 && $$bindings.split && split !== void 0)
    $$bindings.split(split);
  if ($$props.activeTab === void 0 && $$bindings.activeTab && activeTab !== void 0)
    $$bindings.activeTab(activeTab);
  if ($$props.fullscreen === void 0 && $$bindings.fullscreen && fullscreen2 !== void 0)
    $$bindings.fullscreen(fullscreen2);
  if ($$props.sidebar === void 0 && $$bindings.sidebar && sidebar !== void 0)
    $$bindings.sidebar(sidebar);
  if ($$props.locale === void 0 && $$bindings.locale && locale !== void 0)
    $$bindings.locale(locale);
  if ($$props.actions === void 0 && $$bindings.actions && actions !== void 0)
    $$bindings.actions(actions);
  if ($$props.rightAfferentActions === void 0 && $$bindings.rightAfferentActions && rightAfferentActions !== void 0)
    $$bindings.rightAfferentActions(rightAfferentActions);
  tocActive = sidebar === "toc";
  helpActive = sidebar === "help";
  writeActive = activeTab === "write";
  previewActive = activeTab === "preview";
  rightActions = [
    {
      title: tocActive ? locale.closeToc : locale.toc,
      icon: AlignTextLeftOne({}),
      handler: {
        type: "action",
        click() {
          dispatch("click", "toc");
        }
      },
      active: tocActive
    },
    {
      title: helpActive ? locale.closeHelp : locale.help,
      icon: Helpcenter({}),
      handler: {
        type: "action",
        click() {
          dispatch("click", "help");
        }
      },
      active: helpActive
    },
    {
      title: writeActive ? locale.exitWriteOnly : locale.writeOnly,
      icon: LeftExpand({}),
      handler: {
        type: "action",
        click() {
          dispatch("tab", "write");
        }
      },
      active: writeActive,
      hidden: !split
    },
    {
      title: previewActive ? locale.exitPreviewOnly : locale.previewOnly,
      icon: RightExpand({}),
      handler: {
        type: "action",
        click() {
          dispatch("tab", "preview");
        }
      },
      active: previewActive,
      hidden: !split
    },
    {
      title: fullscreen2 ? locale.exitFullscreen : locale.fullscreen,
      icon: fullscreen2 ? OffScreen({}) : FullScreen({}),
      handler: {
        type: "action",
        click() {
          dispatch("click", "fullscreen");
        }
      }
    },
    {
      title: locale.source,
      icon: GithubOne({}),
      handler: {
        type: "action",
        click() {
          window.open("https://github.com/bytedance/bytemd");
        }
      }
    },
    ...rightAfferentActions
  ];
  return `<div class="${"bytemd-toolbar"}"${add_attribute("this", toolbar, 0)}><div class="${"bytemd-toolbar-left"}">${split ? `${each(actions, (item, index) => {
    return `${item.handler ? `<div${add_attribute("class", ["bytemd-toolbar-icon", tippyClass].join(" "), 0)}${add_attribute("bytemd-tippy-path", index, 0)}><!-- HTML_TAG_START -->${item.icon}<!-- HTML_TAG_END --></div>` : ``}`;
  })}` : `<div class="${[
    "bytemd-toolbar-tab",
    activeTab !== "preview" ? "bytemd-toolbar-tab-active" : ""
  ].join(" ").trim()}">${escape(locale.write)}</div><div class="${[
    "bytemd-toolbar-tab",
    activeTab === "preview" ? "bytemd-toolbar-tab-active" : ""
  ].join(" ").trim()}">${escape(locale.preview)}</div>`}</div><div class="${"bytemd-toolbar-right"}">${each(rightActions, (item, index) => {
    return `${!item.hidden ? `<div class="${[
      escape(["bytemd-toolbar-icon", tippyClass, tippyClassRight].join(" "), true),
      item.active ? "bytemd-toolbar-icon-active" : ""
    ].join(" ").trim()}"${add_attribute("bytemd-tippy-path", index, 0)}><!-- HTML_TAG_START -->${item.icon}<!-- HTML_TAG_END --></div>` : ``}`;
  })}</div></div>`;
});
const Editor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let mergedLocale;
  let actions;
  let split;
  let styles;
  let context;
  let { value = "" } = $$props;
  let { plugins = [] } = $$props;
  let { sanitize = void 0 } = $$props;
  let { remarkRehype = void 0 } = $$props;
  let { mode = "auto" } = $$props;
  let { previewDebounce = 300 } = $$props;
  let { placeholder = void 0 } = $$props;
  let { editorConfig = void 0 } = $$props;
  let { locale = void 0 } = $$props;
  let { uploadImages = void 0 } = $$props;
  let { overridePreview = void 0 } = $$props;
  let { maxLength = Infinity } = $$props;
  createEventDispatcher();
  let root;
  let editorEl;
  let previewEl;
  let containerWidth = Infinity;
  let codemirror;
  let editor;
  let activeTab;
  let fullscreen2 = false;
  let sidebar = false;
  let cbs = [];
  let keyMap = {};
  function off() {
    cbs.forEach((cb) => cb && cb());
    editor?.removeKeyMap(keyMap);
  }
  let debouncedValue = value;
  const setDebouncedValue = debounce(
    (value2) => {
      debouncedValue = value2;
      overridePreview?.(previewEl, {
        value: debouncedValue,
        plugins,
        sanitize,
        remarkRehype
      });
    },
    previewDebounce
  );
  let syncEnabled = true;
  let hast = { type: "root", children: [] };
  let currentBlockIndex = 0;
  onDestroy(off);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.plugins === void 0 && $$bindings.plugins && plugins !== void 0)
    $$bindings.plugins(plugins);
  if ($$props.sanitize === void 0 && $$bindings.sanitize && sanitize !== void 0)
    $$bindings.sanitize(sanitize);
  if ($$props.remarkRehype === void 0 && $$bindings.remarkRehype && remarkRehype !== void 0)
    $$bindings.remarkRehype(remarkRehype);
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0)
    $$bindings.mode(mode);
  if ($$props.previewDebounce === void 0 && $$bindings.previewDebounce && previewDebounce !== void 0)
    $$bindings.previewDebounce(previewDebounce);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.editorConfig === void 0 && $$bindings.editorConfig && editorConfig !== void 0)
    $$bindings.editorConfig(editorConfig);
  if ($$props.locale === void 0 && $$bindings.locale && locale !== void 0)
    $$bindings.locale(locale);
  if ($$props.uploadImages === void 0 && $$bindings.uploadImages && uploadImages !== void 0)
    $$bindings.uploadImages(uploadImages);
  if ($$props.overridePreview === void 0 && $$bindings.overridePreview && overridePreview !== void 0)
    $$bindings.overridePreview(overridePreview);
  if ($$props.maxLength === void 0 && $$bindings.maxLength && maxLength !== void 0)
    $$bindings.maxLength(maxLength);
  mergedLocale = { ...en, ...locale };
  actions = getBuiltinActions(mergedLocale, plugins, uploadImages);
  split = mode === "split" || mode === "auto" && containerWidth >= 800;
  {
    ((_) => {
      if (split)
        activeTab = false;
    })();
  }
  styles = (() => {
    let edit;
    let preview2;
    if (split && activeTab === false) {
      {
        edit = "width:50%";
        preview2 = "width:50%";
      }
    } else if (activeTab === "preview") {
      edit = "display:none";
      preview2 = `width:calc(100% - ${0}px)`;
    } else {
      edit = `width:calc(100% - ${0}px)`;
      preview2 = "display:none";
    }
    return { edit, preview: preview2 };
  })();
  context = (() => {
    const context2 = {
      codemirror,
      editor,
      root,
      ...createEditorUtils(codemirror, editor)
    };
    return context2;
  })();
  {
    setDebouncedValue(value);
  }
  return `<div class="${[
    "bytemd",
    (split && activeTab === false ? "bytemd-split" : "") + " "
  ].join(" ").trim()}"${add_attribute("this", root, 0)}>${validate_component(Toolbar, "Toolbar").$$render(
    $$result,
    {
      context,
      split,
      activeTab,
      sidebar,
      fullscreen: fullscreen2,
      rightAfferentActions: actions.rightActions,
      locale: mergedLocale,
      actions: actions.leftActions
    },
    {},
    {}
  )}<div class="${"bytemd-body"}"><div class="${"bytemd-editor"}"${add_attribute("style", styles.edit, 0)}${add_attribute("this", editorEl, 0)}></div><div class="${"bytemd-preview"}"${add_attribute("style", styles.preview, 0)}${add_attribute("this", previewEl, 0)}>${!overridePreview ? `${validate_component(Viewer, "Viewer").$$render(
    $$result,
    {
      value: debouncedValue,
      plugins,
      sanitize,
      remarkRehype
    },
    {},
    {}
  )}` : ``}</div><div class="${["bytemd-sidebar", "bytemd-hidden"].join(" ").trim()}"><div class="${"bytemd-sidebar-close"}"><!-- HTML_TAG_START -->${Close({})}<!-- HTML_TAG_END --></div>${validate_component(Help, "Help").$$render(
    $$result,
    {
      locale: mergedLocale,
      actions: actions.leftActions,
      visible: sidebar === "help"
    },
    {},
    {}
  )}${validate_component(Toc, "Toc").$$render(
    $$result,
    {
      hast,
      locale: mergedLocale,
      currentBlockIndex,
      visible: sidebar === "toc"
    },
    {},
    {}
  )}</div></div>${validate_component(Status, "Status").$$render(
    $$result,
    {
      locale: mergedLocale,
      showSync: !overridePreview && split,
      value: debouncedValue,
      syncEnabled,
      islimited: value.length > maxLength
    },
    {},
    {}
  )}</div>`;
});
const css$2 = {
  code: ".dropzone.svelte-817dg2{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px;border-width:2px;border-radius:2px;border-color:#eeeeee;border-style:dashed;background-color:#fafafa;color:#bdbdbd;outline:none;transition:border 0.24s ease-in-out}.dropzone.svelte-817dg2:focus{border-color:#2196f3}",
  map: null
};
const Dropzone = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { accept } = $$props;
  let { disabled = false } = $$props;
  let { getFilesFromEvent = fromEvent } = $$props;
  let { maxSize = Infinity } = $$props;
  let { minSize = 0 } = $$props;
  let { multiple = true } = $$props;
  let { preventDropOnDocument = true } = $$props;
  let { noClick = false } = $$props;
  let { noKeyboard = false } = $$props;
  let { noDrag = false } = $$props;
  let { noDragEventsBubbling = false } = $$props;
  let { containerClasses = "" } = $$props;
  let { containerStyles = "" } = $$props;
  let { disableDefaultStyles = false } = $$props;
  let { name = "" } = $$props;
  createEventDispatcher();
  let rootRef;
  onDestroy(() => {
  });
  if ($$props.accept === void 0 && $$bindings.accept && accept !== void 0)
    $$bindings.accept(accept);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.getFilesFromEvent === void 0 && $$bindings.getFilesFromEvent && getFilesFromEvent !== void 0)
    $$bindings.getFilesFromEvent(getFilesFromEvent);
  if ($$props.maxSize === void 0 && $$bindings.maxSize && maxSize !== void 0)
    $$bindings.maxSize(maxSize);
  if ($$props.minSize === void 0 && $$bindings.minSize && minSize !== void 0)
    $$bindings.minSize(minSize);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0)
    $$bindings.multiple(multiple);
  if ($$props.preventDropOnDocument === void 0 && $$bindings.preventDropOnDocument && preventDropOnDocument !== void 0)
    $$bindings.preventDropOnDocument(preventDropOnDocument);
  if ($$props.noClick === void 0 && $$bindings.noClick && noClick !== void 0)
    $$bindings.noClick(noClick);
  if ($$props.noKeyboard === void 0 && $$bindings.noKeyboard && noKeyboard !== void 0)
    $$bindings.noKeyboard(noKeyboard);
  if ($$props.noDrag === void 0 && $$bindings.noDrag && noDrag !== void 0)
    $$bindings.noDrag(noDrag);
  if ($$props.noDragEventsBubbling === void 0 && $$bindings.noDragEventsBubbling && noDragEventsBubbling !== void 0)
    $$bindings.noDragEventsBubbling(noDragEventsBubbling);
  if ($$props.containerClasses === void 0 && $$bindings.containerClasses && containerClasses !== void 0)
    $$bindings.containerClasses(containerClasses);
  if ($$props.containerStyles === void 0 && $$bindings.containerStyles && containerStyles !== void 0)
    $$bindings.containerStyles(containerStyles);
  if ($$props.disableDefaultStyles === void 0 && $$bindings.disableDefaultStyles && disableDefaultStyles !== void 0)
    $$bindings.disableDefaultStyles(disableDefaultStyles);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  $$result.css.add(css$2);
  return `

<div tabindex="${"0"}" class="${escape(disableDefaultStyles ? "" : "dropzone", true) + " " + escape(containerClasses, true) + " svelte-817dg2"}"${add_attribute("style", containerStyles, 0)}${add_attribute("this", rootRef, 0)}><input${add_attribute("accept", accept, 0)} ${multiple ? "multiple" : ""} type="${"file"}"${add_attribute("name", name, 0)} autocomplete="${"off"}" tabindex="${"-1"}" style="${"display: none;"}">
  ${slots.default ? slots.default({}) : `
    <p>Drag &#39;n&#39; drop some files here, or click to select files</p>
  `}</div>`;
});
const css$1 = {
  code: ".uploadedImage.svelte-1ktv4cw{position:absolute;width:100%;height:100%;object-fit:cover;background-size:100%;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.2)}.uploadedImageContent.svelte-1ktv4cw{position:absolute;z-index:999;width:100%;height:100%;transition-duration:0.2s;background:rgba(0, 0, 0, 0.2);filter:opacity(0)}.uploadedImageContent.svelte-1ktv4cw:hover{filter:opacity(1)}.closeButton.svelte-1ktv4cw{position:absolute;display:flex;align-items:center;justify-content:center;width:3rem;height:3rem;right:0;top:0;background:none;border:none;color:white;font-weight:bold;cursor:pointer;transition-duration:0.2s;border-bottom-left-radius:6px}.closeButton.svelte-1ktv4cw:hover{background:rgba(0, 0, 0, 0.2)}.svelte-1ktv4cw,*{box-sizing:border-box}.dropzoneFileInput.svelte-1ktv4cw{position:relative;width:100%;height:100%;border-radius:6px;overflow:hidden}.dropzoneFileInput.svelte-1ktv4cw .dropzone{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;background:var(--vscode-layer1);border-radius:6px;transition:filter 0.2s;cursor:pointer;border:3px dashed var(--vscode-layer2)}.dropzoneFileInput.svelte-1ktv4cw .dropzone:hover{filter:brightness(1.1)}.dropzoneFileInput.svelte-1ktv4cw .dropzone svg{color:white;font-size:2rem}span.svelte-1ktv4cw{color:var(--vscode-text);margin-top:1rem}",
  map: null
};
const FileInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isFull;
  let hasFiles;
  let { maxFiles = 1 } = $$props;
  let { maxSizeMb = 10 } = $$props;
  let { setFiles } = $$props;
  let { files } = $$props;
  if ($$props.maxFiles === void 0 && $$bindings.maxFiles && maxFiles !== void 0)
    $$bindings.maxFiles(maxFiles);
  if ($$props.maxSizeMb === void 0 && $$bindings.maxSizeMb && maxSizeMb !== void 0)
    $$bindings.maxSizeMb(maxSizeMb);
  if ($$props.setFiles === void 0 && $$bindings.setFiles && setFiles !== void 0)
    $$bindings.setFiles(setFiles);
  if ($$props.files === void 0 && $$bindings.files && files !== void 0)
    $$bindings.files(files);
  $$result.css.add(css$1);
  isFull = files.length >= maxFiles;
  hasFiles = files.length > 0;
  return `<div class="${escape(null_to_empty("dropzoneFileInput" + (hasFiles ? "" : " dropzoneFileInput--empty")), true) + " svelte-1ktv4cw"}">${hasFiles ? `${each(files, (file) => {
    return `<div class="${"uploadedImageContent svelte-1ktv4cw"}"><button class="${"closeButton svelte-1ktv4cw"}" title="${"Remove image"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faClose }, {}, {})}
				</button></div>
			<div${add_attribute("style", `background-image: url('${file.url}')`, 0)} class="${"uploadedImage svelte-1ktv4cw"}"></div>`;
  })}` : ``}
	${!isFull ? `${validate_component(Dropzone, "Dropzone").$$render(
    $$result,
    {
      multiple: maxFiles > 1,
      disabled: isFull,
      maxSize: maxSizeMb * 1e6,
      accept: "image/*"
    },
    {},
    {
      default: () => {
        return `${validate_component(Fa$1, "Fa").$$render($$result, { icon: faImage }, {}, {})}
			<span class="${"svelte-1ktv4cw"}">${escape(`Click or drag and drop to add a hero image (max size is ${maxSizeMb}mb)`)}</span>`;
      }
    }
  )}` : ``}</div>





`;
});
const css = {
  code: ".editor.svelte-1gayql4.svelte-1gayql4{display:flex;flex-direction:column;gap:2rem}.booleanRow.svelte-1gayql4.svelte-1gayql4{display:flex;align-items:center;width:100%;height:40px;padding:0 1rem;margin-bottom:-1.5rem;font-weight:bold;gap:1rem;color:white;font-size:1rem;cursor:pointer}.booleanRow.svelte-1gayql4:hover div{filter:brightness(1.1)}.button.svelte-1gayql4.svelte-1gayql4{display:flex;align-items:center;justify-content:center;background:none;border-radius:6px;cursor:pointer;border:none;color:white;background:var(--color);transition-duration:0.1s;height:3rem;font-size:1rem;font-weight:bold;width:100%}.button.svelte-1gayql4.svelte-1gayql4:hover{filter:brightness(1.1)}input.svelte-1gayql4.svelte-1gayql4{height:2.5rem;padding:0 1rem;border-radius:6px;background:var(--vscode-card-bg);color:#ccc;border:none;transition-duration:0.2s}input.svelte-1gayql4.svelte-1gayql4:hover,.textBox.svelte-1gayql4.svelte-1gayql4:hover{filter:brightness(1.1)}.textBox.svelte-1gayql4.svelte-1gayql4{min-height:1rem;padding:1rem;border-radius:6px;background:var(--vscode-card-bg);color:#ccc;border:none;transition:filter 0.2s;font-family:inherit}.resizing-column.svelte-1gayql4.svelte-1gayql4{display:flex;flex-direction:column;gap:0.5rem;width:calc(50% - 1rem)}@media(max-width: 52rem){.resizing-column.svelte-1gayql4.svelte-1gayql4{width:100% !important}}.editor.editor--highlightInvalidInputs.svelte-1gayql4 input.svelte-1gayql4:invalid{outline:3px solid var(--error)}.editor.editor--highlightInvalidInputs.svelte-1gayql4 .dropzoneFileInput.dropzoneFileInput--empty .dropzone{border-color:var(--error)}",
  map: null
};
function codeUniversityEntities() {
  return {};
}
async function uploadEditorImages(files2) {
  const refinedFiles = await Promise.all(files2.map(async (i) => {
    const formData = new FormData();
    const filenameWithoutExtension = /^(.*)\..*$/;
    const imageTitle2 = i.name.match(filenameWithoutExtension)?.[1] ?? i.name ?? "Untitled image";
    formData.append("data", i);
    formData.append("title", imageTitle2);
    formData.append("alt", imageTitle2);
    const options = { method: "POST", body: formData };
    const res = await fetch("/api/assets", options);
    const file = res.json();
    return file;
  }));
  return refinedFiles.map(({ url, title: title2, alt }) => ({ url, title: title2, alt }));
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isSubmitting;
  let files;
  let $coverImg, $$unsubscribe_coverImg;
  let $isInternal, $$unsubscribe_isInternal;
  let $topic, $$unsubscribe_topic;
  let $markdownContent, $$unsubscribe_markdownContent;
  let $description, $$unsubscribe_description;
  let $title, $$unsubscribe_title;
  const defaultMarkdownContent = `## Writing your first article

So you wanna write an article huh?
Easy as cake, just fill out all the required fields and hit \`Submit for review\`.
But please, finish reading this text first :)

### CODE-Linter content guidelines

CODE-Linter presents itself as a respectable platform, so please respect a few rules:

#### Objectivity

#### Respecting others
If you include people inside or outside of CODE in your article, ask them for permission beforehand.
If the article should best remain inside the CODE community, toggle the \`Internal article\` switch at the top of the editor.

#### Topical relevance
Even though CODE is primarily a tech university, we accept articles on any topic given relevance to CODE.

You can tell your article is not suitable for CODE-Linter if:
- its purely focused on tech or current events, consider posting this on a blog instead

### Text format
CODE-Linter uses \`markdown\` as its content format of choice. If you're not familiar with the syntax, you can find a guide [here](https://www.markdownguide.org/basic-syntax/).

#### Images
- Article submissions with foreign image urls will get rejected.
Upload images using the button at the top of the editor instead.
- Submissions with images that you don't have usage rights for will get rejected.

### Submitting your article for review

Once your article is finished, just hit the submit button.
If you're and admin, you can just head.
Otherwise, you'll have to wait until your article either gets published or rejected.
Check the status of your pending articles anytime by clicking on your profile picture at the top of the page.


![Good luck](https://t4.ftcdn.net/jpg/02/24/11/57/360_F_224115780_2ssvcCoTfQrx68Qsl5NxtVIDFWKtAgq2.jpg "Good luck")

> this is how you do comments
\\- sun tzu`;
  function registerLocalField(defaultValue, key) {
    const initialValue = defaultValue;
    const field = writable(initialValue);
    field.subscribe((value) => {
    });
    return field;
  }
  const title = registerLocalField("");
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  const description = registerLocalField("");
  $$unsubscribe_description = subscribe(description, (value) => $description = value);
  const markdownContent = registerLocalField(defaultMarkdownContent);
  $$unsubscribe_markdownContent = subscribe(markdownContent, (value) => $markdownContent = value);
  const coverImg = registerLocalField(null);
  $$unsubscribe_coverImg = subscribe(coverImg, (value) => $coverImg = value);
  const topic = registerLocalField("");
  $$unsubscribe_topic = subscribe(topic, (value) => $topic = value);
  let { isInternal = registerLocalField(false) } = $$props;
  $$unsubscribe_isInternal = subscribe(isInternal, (value) => $isInternal = value);
  let state = { state: "DEFAULT" };
  let { fieldContainer = null } = $$props;
  function setFiles(newFiles) {
    if (newFiles.length === 0) {
      coverImg.set(null);
      return;
    }
    const { data, ...rest } = newFiles[0];
    coverImg.set(rest);
  }
  let { shouldHighlightInvalidInputs = false } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.markdownContent === void 0 && $$bindings.markdownContent && markdownContent !== void 0)
    $$bindings.markdownContent(markdownContent);
  if ($$props.coverImg === void 0 && $$bindings.coverImg && coverImg !== void 0)
    $$bindings.coverImg(coverImg);
  if ($$props.topic === void 0 && $$bindings.topic && topic !== void 0)
    $$bindings.topic(topic);
  if ($$props.isInternal === void 0 && $$bindings.isInternal && isInternal !== void 0)
    $$bindings.isInternal(isInternal);
  if ($$props.fieldContainer === void 0 && $$bindings.fieldContainer && fieldContainer !== void 0)
    $$bindings.fieldContainer(fieldContainer);
  if ($$props.shouldHighlightInvalidInputs === void 0 && $$bindings.shouldHighlightInvalidInputs && shouldHighlightInvalidInputs !== void 0)
    $$bindings.shouldHighlightInvalidInputs(shouldHighlightInvalidInputs);
  $$result.css.add(css);
  isSubmitting = state.state === "SUBMITTING";
  files = $coverImg == null ? [] : [$coverImg];
  $$unsubscribe_coverImg();
  $$unsubscribe_isInternal();
  $$unsubscribe_topic();
  $$unsubscribe_markdownContent();
  $$unsubscribe_description();
  $$unsubscribe_title();
  return `<div class="${escape(
    null_to_empty("editor" + (shouldHighlightInvalidInputs ? " editor--highlightInvalidInputs" : "")),
    true
  ) + " svelte-1gayql4"}"><div class="${"booleanRow svelte-1gayql4"}" title="${"Internal articles can only be viewed by users signed into their CODE account"}"><span>Internal article</span>
		${validate_component(Toggle, "Toggle").$$render($$result, { isToggled: $isInternal }, {}, {})}</div>

	<div style="${"display: flex; flex-wrap: wrap; gap: 2rem"}"${add_attribute("this", fieldContainer, 0)}><div class="${"resizing-column svelte-1gayql4"}"><input type="${"text"}" placeholder="${"Article title"}" minlength="${"12"}" required class="${"svelte-1gayql4"}"${add_attribute("value", $title, 0)}>
			<input type="${"text"}" placeholder="${"Article description"}" minlength="${"12"}" maxlength="${"42"}" required class="${"svelte-1gayql4"}"${add_attribute("value", $description, 0)}>
			<input type="${"text"}" placeholder="${"Article topic"}" minlength="${"1"}" required class="${"svelte-1gayql4"}"${add_attribute("value", $topic, 0)}></div>
		<div class="${"resizing-column svelte-1gayql4"}">${validate_component(FileInput, "FileInput").$$render($$result, { files, setFiles }, {}, {})}</div></div>

	

	${validate_component(Editor, "Editor").$$render(
    $$result,
    {
      value: $markdownContent,
      plugins: [gfm(), gemoji(), codeUniversityEntities()],
      previewDebounce: 10,
      placeholder: "Article content",
      uploadImages: uploadEditorImages,
      editorConfig: { theme: "neo" }
    },
    {},
    {}
  )}
	

	<button class="${"button svelte-1gayql4"}" style="${"--color: var(--primary)"}" ${isSubmitting ? "disabled" : ""}>${isSubmitting ? `${validate_component(Pulse, "Pulse").$$render(
    $$result,
    {
      size: "40",
      color: "white",
      unit: "px",
      duration: "1s"
    },
    {},
    {}
  )}` : `Submit for review`}</button></div>



`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-91202b2d.js.map
