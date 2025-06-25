import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NodeData {
  id: string;
  location: string;
  capacity: string;
  status: 'normal' | 'warning' | 'error';
  coordinates: [number, number];
}

interface SimpleNodeVisualizationProps {
  nodes: NodeData[];
  onNodeSelect?: (node: NodeData) => void;
  className?: string;
}

export function SimpleNodeVisualization({ nodes, onNodeSelect, className = '' }: SimpleNodeVisualizationProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleNodeClick = (node: NodeData) => {
    setSelectedNodeId(node.id);
    onNodeSelect?.(node);
  };

  // Convert coordinates to SVG positions
  const getNodePosition = (coordinates: [number, number], index: number) => {
    // Simple circular layout for better visualization
    const angle = (index * 360) / nodes.length;
    const radius = 120;
    const centerX = 200;
    const centerY = 200;
    
    const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
    const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
    
    return { x, y };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return '#00ff00';
      case 'warning': return '#ff9900';
      case 'error': return '#ff0000';
      default: return '#00F0FF';
    }
  };

  return (
    <div className={`relative w-full h-full min-h-[400px] bg-[#0F172A]/30 rounded-lg overflow-hidden ${className}`}>
      {/* Background grid */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="w-full h-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#00F0FF" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Central earth representation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="400" height="400" viewBox="0 0 400 400" className="w-full h-full max-w-md max-h-md">
          {/* Central globe */}
          <motion.circle
            cx="200"
            cy="200"
            r="60"
            fill="none"
            stroke="#00F0FF"
            strokeWidth="2"
            strokeDasharray="5,5"
            animate={{ rotate: animationPhase }}
            style={{ transformOrigin: '200px 200px' }}
          />
          
          {/* Globe lines */}
          <circle cx="200" cy="200" r="60" fill="none" stroke="#00F0FF" strokeWidth="1" opacity="0.3" />
          <ellipse cx="200" cy="200" rx="60" ry="30" fill="none" stroke="#00F0FF" strokeWidth="1" opacity="0.3" />
          <ellipse cx="200" cy="200" rx="30" ry="60" fill="none" stroke="#00F0FF" strokeWidth="1" opacity="0.3" />
          
          {/* Connection lines to nodes */}
          {nodes.map((node, index) => {
            const pos = getNodePosition(node.coordinates, index);
            return (
              <motion.line
                key={`line-${node.id}`}
                x1="200"
                y1="200"
                x2={pos.x}
                y2={pos.y}
                stroke="#00F0FF"
                strokeWidth="1"
                opacity="0.4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node, index) => {
            const pos = getNodePosition(node.coordinates, index);
            const isSelected = selectedNodeId === node.id;
            
            return (
              <g key={node.id}>
                {/* Node circle */}
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected ? 12 : 8}
                  fill={getStatusColor(node.status)}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="cursor-pointer"
                  onClick={() => handleNodeClick(node)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
                
                {/* Pulse effect for active nodes */}
                {node.status === 'normal' && (
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r="8"
                    fill="none"
                    stroke={getStatusColor(node.status)}
                    strokeWidth="2"
                    opacity="0.6"
                    animate={{ 
                      r: [8, 16, 8],
                      opacity: [0.6, 0, 0.6]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                )}

                {/* Node label */}
                <text
                  x={pos.x}
                  y={pos.y - 20}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="bold"
                  className="pointer-events-none select-none"
                >
                  {node.location}
                </text>
                
                {/* Capacity label */}
                <text
                  x={pos.x}
                  y={pos.y + 30}
                  textAnchor="middle"
                  fill="#00F0FF"
                  fontSize="10"
                  className="pointer-events-none select-none"
                >
                  {node.capacity}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-[#0F172A]/80 backdrop-blur-sm rounded-lg p-3 border border-[#00F0FF]/20">
        <div className="text-sm font-semibold text-[#00F0FF] mb-2">Node Status</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="text-xs text-gray-300">Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <span className="text-xs text-gray-300">Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <span className="text-xs text-gray-300">Error</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute top-4 right-4 bg-[#0F172A]/80 backdrop-blur-sm rounded-lg p-3 border border-[#00F0FF]/20">
        <div className="text-sm font-semibold text-[#00F0FF] mb-2">Network Stats</div>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between gap-4">
            <span className="text-gray-300">Total Nodes:</span>
            <span className="text-white">{nodes.length}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-300">Active:</span>
            <span className="text-green-400">{nodes.filter(n => n.status === 'normal').length}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-300">Warning:</span>
            <span className="text-yellow-400">{nodes.filter(n => n.status === 'warning').length}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-300">Error:</span>
            <span className="text-red-400">{nodes.filter(n => n.status === 'error').length}</span>
          </div>
        </div>
      </div>

      {/* Click instruction */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-400">
        Click nodes for details
      </div>
    </div>
  );
}
