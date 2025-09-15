import { useRef, useEffect, useState, useMemo } from "react";
import ForceGraph2D, { ForceGraphMethods, NodeObject, LinkObject, GraphData } from "react-force-graph-2d";
import techGraph from "../experiences/technologyGraph.json";
// Helper to build three-level graph: profile -> categories -> tools (with duplicates for multi-category)
function buildThreeLevelGraph(rawGraph: typeof techGraph) {
  // Get profile node
  const profileNode = rawGraph.nodes.find(n => n.type === "profile");
  if (!profileNode) return { nodes: [], links: [] };

  // Get categories
  const categories = rawGraph.nodes.filter(n => n.type === "category");

  // Map: category -> tools
  const categoryToolMap: Record<string, string[]> = {};
  rawGraph.links.forEach(link => {
    const sourceNode = rawGraph.nodes.find(n => n.id === link.source);
    const targetNode = rawGraph.nodes.find(n => n.id === link.target);
    if (sourceNode && sourceNode.type === "category" && targetNode && targetNode.type === "tool") {
      if (!categoryToolMap[sourceNode.id]) categoryToolMap[sourceNode.id] = [];
      categoryToolMap[sourceNode.id].push(targetNode.id);
    }
  });

  // Build tool nodes (duplicate for each category)
  const toolNodes: { id: string; type: string; label: string; img?: string; category: string }[] = [];
  Object.entries(categoryToolMap).forEach(([catId, toolIds]) => {
    toolIds.forEach(toolId => {
      const origTool = rawGraph.nodes.find(n => n.id === toolId);
      if (origTool) {
        toolNodes.push({ ...origTool, id: `${toolId}__${catId}`, category: catId });
      }
    });
  });

  // Build nodes array: profile, categories, toolNodes
  const nodes = [profileNode, ...categories, ...toolNodes];

  // Links: profile -> categories, categories -> toolNodes
  const links: { source: string; target: string }[] = [];
  categories.forEach(cat => {
    links.push({ source: profileNode.id, target: cat.id });
    toolNodes.filter(tn => tn.category === cat.id).forEach(tn => {
      links.push({ source: cat.id, target: tn.id });
    });
  });

  return { nodes, links };
}
import techDescriptions from "../experiences/technologyDescriptions.json";
import { techIcons } from "../experiences/icons";
import ReactDOMServer from "react-dom/server";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Panel from "../Components/Panel";

// Node type for graph
interface NodeData {
  id: string;
  type: string;
  label: string;
  img?: string;
  x?: number;
  y?: number;
}

export default function Technologies() {
  const [devPanelVisible, setDevPanelVisible] = useState(true);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const fgRef = useRef<ForceGraphMethods<NodeObject<NodeData>, LinkObject<NodeObject<NodeData>>>>(undefined);
  const [infoBoxVisible, setInfoBoxVisible] = useState(false);
  // Track if initial centering is done
  const [centered, setCentered] = useState(false);

  useEffect(() => {
    if (fgRef.current) {
      // d3 is attached to window by react-force-graph
      const win = window as Window & { d3?: { forceCollide: (radius: number) => unknown, forceManyBody: (opts?: object) => unknown } };
      // Much stronger repulsion for more spacing
      if (win.d3 && typeof win.d3.forceManyBody === "function") {
  // @ts-expect-error: d3Force type mismatch is safe at runtime
        fgRef.current.d3Force("charge", win.d3.forceManyBody({ strength: -2000 }));
      }
      // Much larger collision radius for more separation
      if (win.d3 && typeof win.d3.forceCollide === "function") {
  // @ts-expect-error: d3Force type mismatch is safe at runtime
        fgRef.current.d3Force("collide", win.d3.forceCollide(38));
      }
    }
  }, []);

  // Build three-level graph: profile -> categories -> tools (with duplicates for multi-category)
  const filteredGraph: GraphData<NodeObject<NodeData>, LinkObject<NodeObject<NodeData>>> = useMemo(() => {
    return buildThreeLevelGraph(techGraph);
  }, []);

  // Center and zoom on profile node on initial load
  useEffect(() => {
    if (!centered && fgRef.current && filteredGraph.nodes.length > 0) {
      const profileNode = filteredGraph.nodes.find(n => n.type === "profile");
      if (profileNode && typeof profileNode.x === "number" && typeof profileNode.y === "number") {
        fgRef.current.centerAt(profileNode.x, profileNode.y, 0);
        fgRef.current.zoom(2, 0); // Adjust zoom level as needed
        setCentered(true);
      }
    }
  }, [centered, filteredGraph.nodes]);

  // Info box logic
  const selectedNode: NodeData | null = useMemo(() => {
    if (!activeNodeId) return null;
    // For duplicated tool nodes, strip __category suffix to get original id
    const baseId = activeNodeId.split("__")[0];
    return techGraph.nodes.find((n: NodeData) => n.id === baseId) || null;
  }, [activeNodeId]);

  // Find projects related to the selected technology using projects.json
  // Find projects related to the selected technology using technologyDescriptions.json
  const relatedProjects: string[] = useMemo(() => {
    if (!selectedNode) return [];
    const descObj = (techDescriptions as Record<string, { description: string; projects: string[] }>)[selectedNode.label];
    return descObj && Array.isArray(descObj.projects) ? descObj.projects : [];
  }, [selectedNode]);

  const iconImageCache = useRef<{ [key: string]: HTMLImageElement }>({});

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center relative overflow-hidden">
      {devPanelVisible && (
        <Panel
          text="This page is a demo and may not work perfectly on all devices. For the best experience, please view it on a desktop or laptop with a modern browser."
          buttonText="Dismiss"
          onButtonClick={() => { setDevPanelVisible(false); setInfoBoxVisible(true); }}
        />
      )}
      <h1 className="text-4xl font-bold mb-8 text-purple-400">Technologies</h1>
      <div className="w-full flex flex-row justify-center items-start mx-auto">
        <div style={{ width: "100vw", height: "80vh", minWidth: "320px" }}>
          <ForceGraph2D
            ref={fgRef}
            graphData={filteredGraph}
            nodeLabel={undefined}
            nodeCanvasObject={(node, ctx, globalScale) => {
              if (
                typeof node === "object" &&
                node !== null &&
                "type" in node &&
                "label" in node &&
                typeof node.x === "number" &&
                typeof node.y === "number"
              ) {
                ctx.save();
                let radius = 18;
                if (node.type === "category") radius = 14;
                if (node.type === "tool") radius = techIcons[node.label] ? 12 : 10;
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
                ctx.fillStyle = node.type === "category" ? "#a855f7" : "#fff";
                ctx.fill();
                ctx.strokeStyle = "#a855f7";
                ctx.stroke();
                ctx.closePath();
                if (node.type === "profile" && node.img) {
                  ctx.save();
                  ctx.beginPath();
                  ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
                  ctx.closePath();
                  ctx.clip();
                  const img = new window.Image();
                  img.src = node.img;
                  ctx.drawImage(img, node.x - radius, node.y - radius, radius * 2, radius * 2);
                  ctx.restore();
                } else if (node.type === "tool" && techIcons[node.label]) {
                  let img = iconImageCache.current[node.label];
                  if (!img) {
                    const svgString = ReactDOMServer.renderToStaticMarkup(techIcons[node.label]);
                    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${radius * 2}' height='${radius * 2}' viewBox='0 0 24 24'>${svgString}</svg>`;
                    const url = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
                    img = new window.Image();
                    img.src = url;
                    iconImageCache.current[node.label] = img;
                  }
                  ctx.save();
                  ctx.beginPath();
                  ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
                  ctx.closePath();
                  ctx.clip();
                  if (img.complete) {
                    ctx.drawImage(img, node.x - radius, node.y - radius, radius * 2, radius * 2);
                  } else {
                    img.onload = () => {
                      if (typeof node.x === "number" && typeof node.y === "number") {
                        ctx.drawImage(img, node.x - radius, node.y - radius, radius * 2, radius * 2);
                      }
                    };
                  }
                  ctx.restore();
                }
                ctx.font = `${10 / globalScale}px Arial`;
                ctx.fillStyle = "#fff";
                ctx.textAlign = "center";
                ctx.fillText(node.label, node.x, node.y + radius + 12);
                ctx.restore();
              }
            }}
            nodePointerAreaPaint={(node, color, ctx) => {
              if (
                typeof node === "object" &&
                node !== null &&
                "type" in node &&
                "label" in node &&
                typeof node.x === "number" &&
                typeof node.y === "number"
              ) {
                let radius = 18;
                if (node.type === "category") radius = 14;
                if (node.type === "tool") radius = techIcons[node.label] ? 12 : 10;
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
                ctx.fillStyle = color;
                ctx.fill();
              }
            }}
            linkColor={() => "#a855f7"}
            linkDirectionalParticles={2}
            linkDirectionalParticleSpeed={() => 0.005}
            linkDirectionalParticleWidth={2}
            enableNodeDrag={true}
            cooldownTicks={100}
            
            onNodeClick={(node) => {
              if (
                typeof node === "object" &&
                node !== null &&
                typeof node.id === "string"
              ) {
                setActiveNodeId(node.id);
              }
              if (
                typeof node === "object" &&
                node !== null &&
                typeof node.x === "number" &&
                typeof node.y === "number"
              ) {
                fgRef.current?.centerAt(node.x, node.y, 1000);
              }
            }}
          />
        </div>
      </div>
      {/* Info Box Overlay */}
      {/* Always-visible arrow button, fixed to right edge, centered vertically */}
      <button
        className="fixed right-2 top-1/2 -translate-y-1/2 bg-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-600 transition-colors z-50"
        style={{ display: infoBoxVisible ? "none" : "block" }}
        onClick={() => setInfoBoxVisible(true)}
        aria-label="Show info box"
      >
        <FaChevronLeft size={24} />
      </button>
      <div
        className={`fixed top-8 right-2 z-50 transition-all duration-500 ${infoBoxVisible ? "translate-x-0 opacity-100" : "translate-x-96 opacity-0 pointer-events-none"}`}
        style={{ width: "360px", maxWidth: "90vw" }}
      >
        <div className="relative">
          <button
            className="absolute -left-8 top-1/2 -translate-y-1/2 bg-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-600 transition-colors"
            onClick={() => setInfoBoxVisible(false)}
            aria-label="Hide info box"
          >
            <FaChevronRight size={24} />
          </button>
          {infoBoxVisible && (
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col min-h-[200px] justify-start overflow-y-auto max-h-[80vh]">
              <h2 className="text-2xl font-semibold mb-4 text-purple-300">How to use</h2>
              <ul className="mb-6 list-disc list-inside text-gray-200 text-base">
                <li>Click any node to see its details.</li>
                <li>Click a technology node to see related projects and description.</li>
                <li>Try dragging nodes to rearrange the graph !</li>
              </ul>
              <h2 className="text-xl font-semibold mb-2 text-purple-300">Node Details</h2>
              {selectedNode ? (
                <div className="bg-gray-700 rounded p-4 flex flex-col gap-2">
                  <p className="text-2xl font-bold text-purple-200 mb-2 break-words">{selectedNode.label}</p>
                  <p className="text-lg text-gray-100 break-words">Type: {selectedNode.type}</p>
                  <p className="text-xl text-gray-300 mt-2 break-words">{
                    (techDescriptions as Record<string, { description: string; projects: string[] }>)[selectedNode.label]?.description || "No description available."
                  }</p>
                  {relatedProjects.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-purple-300 mb-2">Related Projects:</h3>
                      <ul className="list-disc list-inside">
                        {relatedProjects.map(projectName => (
                          <li key={projectName}>{projectName}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xl text-gray-400">Select a node to see details.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
