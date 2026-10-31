import React, { useState } from 'react';
import { SENSOR_DATASETS } from '../../data/datasets';
import { DatasetItem } from '../../types';
import { 
  Database, 
  Download, 
  Upload, 
  BarChart3, 
  LineChart as LineChartIcon, 
  Table as TableIcon, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  FileSpreadsheet,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';

export const DatasetExplorerView: React.FC = () => {
  const [datasets, setDatasets] = useState<DatasetItem[]>(SENSOR_DATASETS);
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>(SENSOR_DATASETS[0].id);
  const [viewMode, setViewMode] = useState<'line' | 'bar' | 'table' | 'compare'>('line');
  const [compareDatasetId, setCompareDatasetId] = useState<string>(SENSOR_DATASETS[1]?.id || SENSOR_DATASETS[0].id);
  const [selectedColumn, setSelectedColumn] = useState<string>('temperature_c');
  const [filterKeyword, setFilterKeyword] = useState<string>('');

  const currentDataset = datasets.find(d => d.id === selectedDatasetId) || datasets[0];
  const compareDataset = datasets.find(d => d.id === compareDatasetId) || datasets[0];

  // Pick default charting column if current column is not present in dataset
  const availableNumericColumns = currentDataset.columns.filter(c => 
    c !== 'sample' && c !== 'timestamp' && c !== 'status' && c !== 'pack_status' && c !== 'air_quality_status'
  );
  const activeChartColumn = availableNumericColumns.includes(selectedColumn) ? selectedColumn : availableNumericColumns[0];

  // CSV Download handler
  const handleDownloadCsv = (dataset: DatasetItem) => {
    const headers = dataset.columns.join(',');
    const rows = dataset.data.map(row => dataset.columns.map(col => JSON.stringify(row[col] ?? '')).join(',')).join('\n');
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + '\n' + rows);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `${dataset.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // JSON Download handler
  const handleDownloadJson = (dataset: DatasetItem) => {
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataset, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", jsonStr);
    link.setAttribute("download", `${dataset.id}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // User CSV Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.trim().split('\n');
      if (lines.length < 2) return;

      const cols = lines[0].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
      const parsedData: Array<Record<string, any>> = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        const row: Record<string, any> = {};
        cols.forEach((col, idx) => {
          const num = parseFloat(values[idx]);
          row[col] = isNaN(num) ? values[idx] : num;
        });
        parsedData.push(row);
      }

      const numericKey = cols.find(c => typeof parsedData[0]?.[c] === 'number') || cols[1] || cols[0];
      const numbers = parsedData.map(d => Number(d[numericKey]) || 0);
      const minVal = numbers.length ? Math.min(...numbers) : 0;
      const maxVal = numbers.length ? Math.max(...numbers) : 0;
      const avgVal = numbers.length ? (numbers.reduce((a, b) => a + b, 0) / numbers.length) : 0;

      const newDataset: DatasetItem = {
        id: `user-upload-${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, ""),
        sensorName: 'Custom Uploaded Sensor',
        unit: 'Custom Unit',
        description: `User-imported telemetry file containing ${parsedData.length} records.`,
        normalRange: 'User defined',
        abnormalRange: 'User defined',
        columns: cols,
        data: parsedData,
        stats: {
          min: minVal,
          max: maxVal,
          avg: Number(avgVal.toFixed(2)),
          sampleCount: parsedData.length,
          abnormalCount: 0
        }
      };

      setDatasets(prev => [newDataset, ...prev]);
      setSelectedDatasetId(newDataset.id);
    };
    reader.readAsText(file);
  };

  const filteredData = currentDataset.data.filter(row => {
    if (!filterKeyword) return true;
    return Object.values(row).some(val => 
      String(val).toLowerCase().includes(filterKeyword.toLowerCase())
    );
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-700/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <Database className="h-4 w-4" />
            <span>Telemetry & Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Sensor Dataset Explorer & Visualizer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Analyze time-series sensor telemetry, inspect normal vs abnormal calibration ranges, export CSV/JSON records, or upload custom datasets for interactive charting.
          </p>
        </div>

        {/* Action Buttons: Upload & Export */}
        <div className="flex flex-wrap items-center gap-2">
          
          <label className="cursor-pointer flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-dark-800 hover:bg-dark-750 text-slate-200 border border-dark-700 text-xs font-semibold shadow-sm transition-all">
            <Upload className="h-4 w-4 text-cyan-400" />
            <span>Upload CSV</span>
            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
          </label>

          <button
            onClick={() => handleDownloadCsv(currentDataset)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-900 font-bold text-xs shadow-md transition-all"
          >
            <Download className="h-4 w-4" />
            <span>Download CSV</span>
          </button>

          <button
            onClick={() => handleDownloadJson(currentDataset)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-dark-800 hover:bg-dark-750 text-slate-200 border border-dark-700 text-xs font-semibold transition-all"
          >
            <FileSpreadsheet className="h-4 w-4 text-purple-400" />
            <span>Download JSON</span>
          </button>
        </div>
      </div>

      {/* Dataset Selection Pills */}
      <div className="space-y-2">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
          Available Sensor Datasets
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {datasets.map((ds) => (
            <button
              key={ds.id}
              onClick={() => setSelectedDatasetId(ds.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedDatasetId === ds.id
                  ? 'bg-gradient-to-r from-cyan-950/80 to-dark-800 text-cyan-300 border-cyan-500/80 shadow-md shadow-cyan-950/40'
                  : 'bg-dark-850 hover:bg-dark-800 text-slate-400 hover:text-slate-200 border-dark-700'
              }`}
            >
              <span className="font-bold">{ds.name}</span>
              <span className="ml-2 font-mono text-[10px] text-slate-400">({ds.data.length} pts)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Summary Statistical Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-dark-850 border border-dark-700">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">Total Samples</span>
          <span className="text-xl font-extrabold text-white font-mono mt-1 block">{currentDataset.stats.sampleCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-dark-850 border border-dark-700">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">Minimum Value</span>
          <span className="text-xl font-extrabold text-cyan-400 font-mono mt-1 block">{currentDataset.stats.min}</span>
        </div>

        <div className="p-4 rounded-2xl bg-dark-850 border border-dark-700">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">Average Value</span>
          <span className="text-xl font-extrabold text-purple-400 font-mono mt-1 block">{currentDataset.stats.avg}</span>
        </div>

        <div className="p-4 rounded-2xl bg-dark-850 border border-dark-700">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">Maximum Value</span>
          <span className="text-xl font-extrabold text-emerald-400 font-mono mt-1 block">{currentDataset.stats.max}</span>
        </div>

        <div className="p-4 rounded-2xl bg-dark-850 border border-dark-700">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">Abnormal Records</span>
          <span className="text-xl font-extrabold text-amber-400 font-mono mt-1 block">{currentDataset.stats.abnormalCount}</span>
        </div>
      </div>

      {/* Dataset Description & Threshold Bounds Banner */}
      <div className="rounded-3xl bg-dark-850 border border-dark-700/80 p-6 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-700 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white">{currentDataset.name}</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              {currentDataset.description}
            </p>
          </div>
          <div className="text-xs font-mono text-cyan-400 px-3 py-1 rounded-xl bg-dark-800 border border-dark-700 shrink-0">
            Unit: {currentDataset.unit}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-emerald-300">
            <span className="font-bold font-mono text-[10px] uppercase block mb-1">Normal Operating Envelope</span>
            <span>{currentDataset.normalRange}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 text-rose-300">
            <span className="font-bold font-mono text-[10px] uppercase block mb-1">Abnormal Alert Thresholds</span>
            <span>{currentDataset.abnormalRange}</span>
          </div>
        </div>
      </div>

      {/* Charting Workspace & Mode Switcher */}
      <div className="rounded-3xl bg-dark-850 border border-dark-700/80 p-6 shadow-xl space-y-6">
        
        {/* Controls Bar: View mode + Metric column selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700 pb-4">
          
          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-dark-800 p-1.5 rounded-2xl border border-dark-700 text-xs font-semibold">
            <button
              onClick={() => setViewMode('line')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                viewMode === 'line' ? 'bg-cyan-500 text-dark-900 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LineChartIcon className="h-3.5 w-3.5" />
              <span>Line Trend</span>
            </button>

            <button
              onClick={() => setViewMode('bar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                viewMode === 'bar' ? 'bg-cyan-500 text-dark-900 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="h-3.5 w-3.5" />
              <span>Bar Chart</span>
            </button>

            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                viewMode === 'table' ? 'bg-cyan-500 text-dark-900 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <TableIcon className="h-3.5 w-3.5" />
              <span>Data Table</span>
            </button>

            <button
              onClick={() => setViewMode('compare')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                viewMode === 'compare' ? 'bg-purple-500 text-white font-bold' : 'text-purple-400 hover:text-white'
              }`}
            >
              <ArrowUpDown className="h-3.5 w-3.5" />
              <span>Compare Datasets</span>
            </button>
          </div>

          {/* Column selector for charts */}
          {viewMode !== 'table' && viewMode !== 'compare' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Plot Metric:</span>
              <select
                value={activeChartColumn}
                onChange={(e) => setSelectedColumn(e.target.value)}
                className="bg-dark-800 border border-dark-700 rounded-xl px-3 py-1.5 text-xs text-cyan-300 font-mono focus:outline-none"
              >
                {availableNumericColumns.map(col => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>
          )}

        </div>

        {/* Mode: Line Chart */}
        {viewMode === 'line' && (
          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentDataset.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="timestamp" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b0f19', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey={activeChartColumn} 
                  name={activeChartColumn}
                  stroke="#06b6d4" 
                  strokeWidth={2.5} 
                  dot={{ r: 3, fill: '#06b6d4' }} 
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Mode: Bar Chart */}
        {viewMode === 'bar' && (
          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentDataset.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="timestamp" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b0f19', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend />
                <Bar 
                  dataKey={activeChartColumn} 
                  name={activeChartColumn}
                  fill="#8b5cf6" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Mode: Compare Two Datasets */}
        {viewMode === 'compare' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-300 font-mono">Compare With:</span>
              <select
                value={compareDatasetId}
                onChange={(e) => setCompareDatasetId(e.target.value)}
                className="bg-dark-800 border border-dark-700 rounded-xl px-3 py-1.5 text-xs text-purple-300 font-mono focus:outline-none"
              >
                {datasets.filter(d => d.id !== currentDataset.id).map(ds => (
                  <option key={ds.id} value={ds.id}>{ds.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-dark-800/80 border border-dark-700 space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Dataset A: {currentDataset.name}</span>
                <p className="text-xs text-slate-400">Samples: {currentDataset.stats.sampleCount} • Avg: {currentDataset.stats.avg} • Range: [{currentDataset.stats.min} to {currentDataset.stats.max}]</p>
              </div>

              <div className="p-4 rounded-2xl bg-dark-800/80 border border-dark-700 space-y-2">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase">Dataset B: {compareDataset.name}</span>
                <p className="text-xs text-slate-400">Samples: {compareDataset.stats.sampleCount} • Avg: {compareDataset.stats.avg} • Range: [{compareDataset.stats.min} to {compareDataset.stats.max}]</p>
              </div>
            </div>
          </div>
        )}

        {/* Mode: Table View */}
        {viewMode === 'table' && (
          <div className="space-y-4">
            
            {/* Table Search Input */}
            <div className="max-w-xs">
              <input
                type="text"
                value={filterKeyword}
                onChange={(e) => setFilterKeyword(e.target.value)}
                placeholder="Filter table rows..."
                className="w-full px-3 py-1.5 rounded-xl bg-dark-800 border border-dark-700 text-xs text-slate-200 placeholder-slate-400 focus:outline-none"
              />
            </div>

            <div className="overflow-x-auto rounded-2xl border border-dark-700 max-h-96">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-dark-800 font-mono text-[10px] uppercase text-cyan-400 sticky top-0 border-b border-dark-700">
                  <tr>
                    {currentDataset.columns.map((col) => (
                      <th key={col} className="px-4 py-2.5 font-bold tracking-wider">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-750 font-mono">
                  {filteredData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-dark-800/60 transition-colors">
                      {currentDataset.columns.map((col) => {
                        const isAbnormal = String(row[col]).toLowerCase().includes('abnormal') || String(row[col]).toLowerCase().includes('alert');
                        return (
                          <td key={col} className={`px-4 py-2 whitespace-nowrap ${isAbnormal ? 'text-rose-400 font-bold' : ''}`}>
                            {String(row[col] ?? '')}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
