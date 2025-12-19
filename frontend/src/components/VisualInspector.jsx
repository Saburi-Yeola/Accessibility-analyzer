import React from 'react';
import { motion } from 'framer-motion';

const VisualInspector = ({ screenshotUrl, violations, activeViolation }) => {
  return (
    <div className="relative border-2 border-slate-700 rounded-lg overflow-hidden bg-slate-900">
      {/* The Captured Screenshot of the Site */}
      <img src={screenshotUrl} alt="Scan Result" className="w-full h-auto" />

      {/* The Overlay Layer */}
      {violations.map((violation, vIdx) => 
        violation.nodes.map((node, nIdx) => {
          const isActive = activeViolation?.id === violation.id;
          
          return (
            <motion.div
              key={`${vIdx}-${nIdx}`}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isActive ? 1 : 0.3,
                outline: isActive ? '4px solid #ef4444' : '1px solid #f87171'
              }}
              style={{
                position: 'absolute',
                top: node.coordinates.top,
                left: node.coordinates.left,
                width: node.coordinates.width,
                height: node.coordinates.height,
                pointerEvents: 'none',
                backgroundColor: isActive ? 'rgba(239, 68, 68, 0.1)' : 'transparent'
              }}
            />
          );
        })
      )}
    </div>
  );
};

export default VisualInspector;