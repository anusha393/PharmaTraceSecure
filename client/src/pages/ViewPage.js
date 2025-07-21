import React from "react";
import { useParams } from "react-router-dom";
import BatchViewer from "../components/BatchViewer";

function ViewPage() {
  const { batchId } = useParams();

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-bold mb-4">🔍 Batch Viewer</h3>
      <BatchViewer batchId={batchId} />
    </div>
  );
}

export default ViewPage;
