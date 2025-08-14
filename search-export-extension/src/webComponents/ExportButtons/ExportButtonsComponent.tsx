import * as React from 'react';
import { IconButton, IContextualMenuProps } from '@fluentui/react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// Component doesn't need IDataSourceData import

export interface IExportButtonsProps {
    items: any[];
    selectedFields?: string[];
    title?: string;
}

export const ExportButtonsComponent: React.FC<IExportButtonsProps> = (props) => {
    const { items, selectedFields, title = 'Search Results' } = props;
    
    const exportToExcel = () => {
        if (!items || items.length === 0) {
            alert('No data to export');
            return;
        }

        // Prepare data for export
        const exportData = items.map(item => {
            if (selectedFields && selectedFields.length > 0) {
                const filtered: any = {};
                selectedFields.forEach(field => {
                    filtered[field] = item[field] || '';
                });
                return filtered;
            }
            return item;
        });

        // Create workbook and worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Search Results');

        // Generate Excel file
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(data, `${title}_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const exportToCSV = () => {
        if (!items || items.length === 0) {
            alert('No data to export');
            return;
        }

        // Prepare data for export
        const exportData = items.map(item => {
            if (selectedFields && selectedFields.length > 0) {
                const filtered: any = {};
                selectedFields.forEach(field => {
                    filtered[field] = item[field] || '';
                });
                return filtered;
            }
            return item;
        });

        // Create CSV content
        const ws = XLSX.utils.json_to_sheet(exportData);
        const csv = XLSX.utils.sheet_to_csv(ws);
        
        // Save CSV file
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `${title}_${new Date().toISOString().split('T')[0]}.csv`);
    };

    const exportToPDF = () => {
        if (!items || items.length === 0) {
            alert('No data to export');
            return;
        }

        // Create PDF document
        const doc = new jsPDF();
        
        // Add title
        doc.setFontSize(16);
        doc.text(title, 14, 15);
        doc.setFontSize(10);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 22);

        // Prepare table data
        const headers = selectedFields && selectedFields.length > 0 
            ? selectedFields 
            : Object.keys(items[0] || {});
        
        const data = items.map(item => {
            return headers.map(header => {
                const value = item[header];
                // Handle different types of values
                if (value === null || value === undefined) return '';
                if (typeof value === 'object') return JSON.stringify(value);
                return String(value);
            });
        });

        // Add table to PDF
        autoTable(doc, {
            head: [headers],
            body: data,
            startY: 30,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [0, 120, 215] }
        });

        // Save PDF
        doc.save(`${title}_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    const menuProps: IContextualMenuProps = {
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

    return (
        <div className="export-buttons-container" style={{ display: 'inline-block' }}>
            <IconButton
                iconProps={{ iconName: 'Download' }}
                title="Export Results"
                ariaLabel="Export Results"
                menuProps={menuProps}
                styles={{
                    root: {
                        backgroundColor: '#0078d4',
                        color: 'white'
                    },
                    rootHovered: {
                        backgroundColor: '#106ebe',
                        color: 'white'
                    }
                }}
            />
        </div>
    );
};