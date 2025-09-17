import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuditLogTable = ({ auditData, onRowClick, isLoading = false }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const sortedData = useMemo(() => {
    if (!auditData || auditData?.length === 0) return [];
    
    const sortableData = [...auditData];
    if (sortConfig?.key) {
      sortableData?.sort((a, b) => {
        if (a?.[sortConfig?.key] < b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (a?.[sortConfig?.key] > b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [auditData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData?.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-foreground" />
      : <Icon name="ArrowDown" size={14} className="text-foreground" />;
  };

  const getActionTypeColor = (actionType) => {
    switch (actionType?.toLowerCase()) {
      case 'override':
        return 'text-warning bg-warning/10';
      case 'accept':
        return 'text-success bg-success/10';
      case 'emergency':
        return 'text-error bg-error/10';
      case 'manual':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const getOutcomeColor = (outcome) => {
    switch (outcome?.toLowerCase()) {
      case 'successful':
        return 'text-success';
      case 'delayed':
        return 'text-warning';
      case 'failed':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg">
        <div className="p-8 text-center">
          <Icon name="Loader2" size={32} className="animate-spin text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Loading audit trail data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('timestamp')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                  <span>Timestamp</span>
                  {getSortIcon('timestamp')}
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('controller')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                  <span>Controller</span>
                  {getSortIcon('controller')}
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('trainNumber')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                  <span>Train</span>
                  {getSortIcon('trainNumber')}
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('actionType')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                  <span>Action</span>
                  {getSortIcon('actionType')}
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">Rationale</span>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('outcome')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                  <span>Outcome</span>
                  {getSortIcon('outcome')}
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">Impact</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((entry, index) => (
              <tr
                key={entry?.id}
                onClick={() => onRowClick && onRowClick(entry)}
                className="border-b border-border hover:bg-muted/30 cursor-pointer transition-micro"
              >
                <td className="p-4">
                  <div className="text-sm font-medium text-foreground">
                    {formatTimestamp(entry?.timestamp)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ID: {entry?.id}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={14} color="white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{entry?.controller}</div>
                      <div className="text-xs text-muted-foreground">{entry?.controllerRole}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm font-medium text-foreground">{entry?.trainNumber}</div>
                  <div className="text-xs text-muted-foreground">{entry?.trainType}</div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getActionTypeColor(entry?.actionType)}`}>
                    {entry?.actionType}
                  </span>
                </td>
                <td className="p-4 max-w-xs">
                  <div className="text-sm text-foreground truncate" title={entry?.rationale}>
                    {entry?.rationale}
                  </div>
                </td>
                <td className="p-4">
                  <div className={`text-sm font-medium ${getOutcomeColor(entry?.outcome)}`}>
                    {entry?.outcome}
                  </div>
                  {entry?.delayMinutes && (
                    <div className="text-xs text-muted-foreground">
                      +{entry?.delayMinutes}min
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{entry?.impact}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData?.length)} of {sortedData?.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogTable;