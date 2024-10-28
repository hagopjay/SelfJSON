import React from 'react';
import ReactJson from 'react-json-view';

interface JsonViewerProps {
  data: any;
}

export function JsonViewer({ data }: JsonViewerProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-h-[600px] overflow-auto">
      <ReactJson
        src={data}
        theme="monokai"
        style={{ backgroundColor: 'transparent' }}
        displayDataTypes={false}
        enableClipboard={true}
        collapsed={2}
      />
    </div>
  );
}