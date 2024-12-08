import { useState } from 'react';
import { TableColumn } from '../Services/VfcService';
import * as XLSX from 'xlsx';
import { Form, Table, } from 'react-bootstrap';
import { Filter,SortUp,SortDown } from 'react-bootstrap-icons';
import React from 'react';
import SpinnerComponent from './SpinnerComponent';

interface Props<T> {
    data: T[];
    columns: TableColumn<T>[];
    onRowPress?: (row: T) => void;
   // loading?:boolean
  }
  const  TableComponent=<T,>({ data, columns,onRowPress }: Props<T>)=>{
    const [filters, setFilters] =useState<Record<string, string>>({});
    const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);
   
    const handleExport = () => {
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
      XLSX.writeFile(workbook, 'table_data.xlsx');
    };
    // Lọc dữ liệu
    const filteredData = data.filter((item) =>
      Object.entries(filters).every(([key, value]) =>
        value ? item[key as keyof T]?.toString().toLowerCase().includes(value.toLowerCase()) : true
      )
    );
  
    // Sắp xếp dữ liệu
    const sortedData = [...filteredData].sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;
      const multiplier = direction === "asc" ? 1 : -1;
  
      if (a[key] < b[key]) return -1 * multiplier;
      if (a[key] > b[key]) return 1 * multiplier;
      return 0;
    });
    // Tính tổng động cho các cột số
    const totals = columns.reduce((acc, column) => {
      if (column.type === "number") {
        acc[column.key as string] = sortedData.reduce(
          (sum, item) => sum + (parseFloat(item[column.key as keyof T]?.toString() || "0") || 0),
          0
        );
      }
      return acc;
    }, {} as Record<string, number>);
  
    // Xử lý sắp xếp
    const handleSort = (key: keyof T) => {
      setSortConfig((prev) => {
        if (prev?.key === key) {
          return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
        }
        return { key, direction: "asc" };
      });
    };
  
    // Xử lý thay đổi filter
    const handleFilterChange = (key: keyof T, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    };
   
      return (
        <>
     
           <div >
           {/* Export Button */}
          <button onClick={handleExport} className="btn btn-primary ">Export to Excel</button>
        
          <Table striped bordered hover responsive  >
             
          <thead >
            <tr>
            {columns.map((column) => (
                <th key={column.key as string}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span >{column.label}</span>
                    { (<span style={{ cursor: 'pointer' }}onClick={() => handleSort(column.key as keyof T)}>
                        {sortConfig?.key === column.key ? (sortConfig.direction === 'asc' ? (
                            <SortUp  />
                          ) : (
                            <SortDown  />
                          )
                        ) : (
                          <Filter />
                        )}
                      </span>
                    )}
                     </div>              
                     <div className="w-100">
  
                    <Form.Control
                      type="text"
                      placeholder={`${column.label}`}
                      onChange={(e) => handleFilterChange(column.key as keyof T, e.target.value)}
                    />
                  </div>
                </th>
               
              ))}
            </tr>
          </thead>
         
          <tbody >
          {sortedData.map((item, rowIndex) => (
              <tr key={rowIndex} onClick={() => onRowPress?.(item)}>
                {columns.map((column) => (
                  <td key={column.key as string} style={{textAlign:'center'}}>
                     {column.type === "number" ? 
                            item[column.key as keyof T] !== undefined? 
                            Number(item[column.key as keyof T]).toLocaleString("vi-VN") : ""
                      : column.type === "Date" ? 
                            item[column.key as keyof T]   ? 
                            new Date(item[column.key as keyof T] as string).toLocaleDateString("en-GB") : "" 
                      :column.type === 'action' && column.renderAction ? 
                            column.renderAction(item)
                      : item[column.key as keyof T] !== undefined? 
                            String(item[column.key as keyof T]) : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
           {columns.some((col) => col.type === 'number') && (
            <tfoot >
              <tr>
                {columns.map((column) => (
                  <td key={column.key as string} style={{textAlign:'center'}}>
                    {column.type === 'number' ? (
                      totals[column.key as string] !== undefined
                        ? totals[column.key as string].toLocaleString('vi-VN')
                        : ''
                    ) : (
                      ''
                    )}
                  </td>
                ))}
              </tr>
            </tfoot>
          )}
           </Table>
          </div>
      
        </>
      );

}
export default TableComponent