"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportButtonsComponent = void 0;
var React = __importStar(require("react"));
var react_1 = require("@fluentui/react");
var XLSX = __importStar(require("xlsx"));
var file_saver_1 = require("file-saver");
var jspdf_1 = __importDefault(require("jspdf"));
var jspdf_autotable_1 = __importDefault(require("jspdf-autotable"));
var ExportButtonsComponent = function (props) {
    var items = props.items, selectedFields = props.selectedFields, _a = props.title, title = _a === void 0 ? 'Search Results' : _a;
    var exportToExcel = function () {
        if (!items || items.length === 0) {
            alert('No data to export');
            return;
        }
        // Prepare data for export
        var exportData = items.map(function (item) {
            if (selectedFields && selectedFields.length > 0) {
                var filtered_1 = {};
                selectedFields.forEach(function (field) {
                    filtered_1[field] = item[field] || '';
                });
                return filtered_1;
            }
            return item;
        });
        // Create workbook and worksheet
        var ws = XLSX.utils.json_to_sheet(exportData);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Search Results');
        // Generate Excel file
        var excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        var data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        (0, file_saver_1.saveAs)(data, "".concat(title, "_").concat(new Date().toISOString().split('T')[0], ".xlsx"));
    };
    var exportToCSV = function () {
        if (!items || items.length === 0) {
            alert('No data to export');
            return;
        }
        // Prepare data for export
        var exportData = items.map(function (item) {
            if (selectedFields && selectedFields.length > 0) {
                var filtered_2 = {};
                selectedFields.forEach(function (field) {
                    filtered_2[field] = item[field] || '';
                });
                return filtered_2;
            }
            return item;
        });
        // Create CSV content
        var ws = XLSX.utils.json_to_sheet(exportData);
        var csv = XLSX.utils.sheet_to_csv(ws);
        // Save CSV file
        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        (0, file_saver_1.saveAs)(blob, "".concat(title, "_").concat(new Date().toISOString().split('T')[0], ".csv"));
    };
    var exportToPDF = function () {
        if (!items || items.length === 0) {
            alert('No data to export');
            return;
        }
        // Create PDF document
        var doc = new jspdf_1.default();
        // Add title
        doc.setFontSize(16);
        doc.text(title, 14, 15);
        doc.setFontSize(10);
        doc.text("Generated: ".concat(new Date().toLocaleString()), 14, 22);
        // Prepare table data
        var headers = selectedFields && selectedFields.length > 0
            ? selectedFields
            : Object.keys(items[0] || {});
        var data = items.map(function (item) {
            return headers.map(function (header) {
                var value = item[header];
                // Handle different types of values
                if (value === null || value === undefined)
                    return '';
                if (typeof value === 'object')
                    return JSON.stringify(value);
                return String(value);
            });
        });
        // Add table to PDF
        (0, jspdf_autotable_1.default)(doc, {
            head: [headers],
            body: data,
            startY: 30,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [0, 120, 215] }
        });
        // Save PDF
        doc.save("".concat(title, "_").concat(new Date().toISOString().split('T')[0], ".pdf"));
    };
    var menuProps = {
        items: [
            {
                key: 'excel',
                text: 'Export to Excel',
                iconProps: { iconName: 'ExcelDocument' },
                onClick: exportToExcel
            },
            {
                key: 'csv',
                text: 'Export to CSV',
                iconProps: { iconName: 'PageList' },
                onClick: exportToCSV
            },
            {
                key: 'pdf',
                text: 'Export to PDF',
                iconProps: { iconName: 'PDF' },
                onClick: exportToPDF
            }
        ]
    };
    return (React.createElement("div", { className: "export-buttons-container", style: { display: 'inline-block' } },
        React.createElement(react_1.IconButton, { iconProps: { iconName: 'Download' }, title: "Export Results", ariaLabel: "Export Results", menuProps: menuProps, styles: {
                root: {
                    backgroundColor: '#0078d4',
                    color: 'white'
                },
                rootHovered: {
                    backgroundColor: '#106ebe',
                    color: 'white'
                }
            } })));
};
exports.ExportButtonsComponent = ExportButtonsComponent;
