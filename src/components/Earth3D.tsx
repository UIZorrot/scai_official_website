import { useRef, useEffect, useState } from "react";

interface NodeData {
  id: string;
  location: string;
  capacity: string;
  status: "normal" | "warning" | "error";
  coordinates: [number, number];
}

interface Earth3DProps {
  nodes: NodeData[];
  onNodeSelect?: (node: NodeData) => void;
  className?: string;
}

export function Earth3D({ nodes, onNodeSelect, className = "" }: Earth3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let mounted = true;
    let animationId: number;

    const initVisualization = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        // Dynamic import to avoid SSR issues
        const THREE = await import("three");
        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls");

        if (!mounted || !containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth || 400;
        const height = container.clientHeight || 400;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1;
        controls.minDistance = 3;
        controls.maxDistance = 8;

        // Create Earth
        const earthGeometry = new THREE.SphereGeometry(1.5, 32, 32);
        const earthMaterial = new THREE.MeshPhongMaterial({
          color: 0x2233ff,
          shininess: 100,
          transparent: true,
          opacity: 0.8,
        });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        scene.add(earth);

        // Add wireframe
        const wireframeGeometry = new THREE.SphereGeometry(1.51, 16, 16);
        const wireframeMaterial = new THREE.MeshBasicMaterial({
          color: 0x00f0ff,
          wireframe: true,
          transparent: true,
          opacity: 0.3,
        });
        const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
        scene.add(wireframe);

        // Add nodes
        const nodeGroup = new THREE.Group();
        const nodeObjects: Array<{ mesh: THREE.Mesh; data: NodeData }> = [];

        nodes.forEach((node) => {
          const lat = (node.coordinates[1] * Math.PI) / 180;
          const lon = (-node.coordinates[0] * Math.PI) / 180;
          const radius = 1.6;

          const x = radius * Math.cos(lat) * Math.cos(lon);
          const y = radius * Math.sin(lat);
          const z = radius * Math.cos(lat) * Math.sin(lon);

          // Node color based on status
          const colors = {
            normal: 0x00ff00,
            warning: 0xff9900,
            error: 0xff0000,
          };

          const nodeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
          const nodeMaterial = new THREE.MeshBasicMaterial({
            color: colors[node.status],
            transparent: true,
            opacity: 0.9,
          });
          const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
          nodeMesh.position.set(x, y, z);

          nodeGroup.add(nodeMesh);
          nodeObjects.push({ mesh: nodeMesh, data: node });

          // Add connection lines
          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x00f0ff,
            transparent: true,
            opacity: 0.4,
          });
          const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x * 0.8, y * 0.8, z * 0.8)];
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(lineGeometry, lineMaterial);
          nodeGroup.add(line);
        });

        scene.add(nodeGroup);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);

        // Camera position
        camera.position.set(0, 0, 4);

        // Mouse interaction
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseClick = (event: MouseEvent) => {
          const rect = renderer.domElement.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(nodeObjects.map((obj) => obj.mesh));

          if (intersects.length > 0 && onNodeSelect) {
            const clickedObject = intersects[0].object;
            const nodeData = nodeObjects.find((obj) => obj.mesh === clickedObject)?.data;
            if (nodeData) {
              onNodeSelect(nodeData);
            }
          }
        };

        renderer.domElement.addEventListener("click", onMouseClick);

        // Resize handler
        const handleResize = () => {
          if (!containerRef.current) return;
          const newWidth = containerRef.current.clientWidth;
          const newHeight = containerRef.current.clientHeight;

          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener("resize", handleResize);

        // Animation loop
        const animate = () => {
          if (!mounted) return;

          animationId = requestAnimationFrame(animate);

          earth.rotation.y += 0.005;
          wireframe.rotation.y += 0.003;
          controls.update();
          renderer.render(scene, camera);
        };

        animate();
        setIsLoading(false);

        // Cleanup function
        return () => {
          mounted = false;
          cancelAnimationFrame(animationId);
          window.removeEventListener("resize", handleResize);
          renderer.domElement.removeEventListener("click", onMouseClick);

          // Dispose of Three.js objects
          scene.traverse((object: any) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach((material: any) => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          });

          renderer.dispose();
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        };
      } catch (error) {
        console.error("Failed to initialize 3D visualization:", error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    initVisualization().then((cleanup) => {
      return () => {
        if (cleanup) cleanup();
      };
    });

    return () => {
      mounted = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [nodes, onNodeSelect]);

  if (hasError) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gray-900/50 rounded-lg ${className}`}>
        <div className="text-center p-8">
          <div className="text-red-400 mb-4 text-4xl">🌍</div>
          <p className="text-gray-400 mb-4">3D visualization unavailable</p>
          <p className="text-sm text-gray-500 mb-6">Showing node list instead</p>

          {/* Fallback node list */}
          <div className="space-y-3 max-w-md">
            {nodes.map((node) => (
              <div key={node.id} className="flex items-center justify-between p-3 bg-[#0F172A]/50 rounded-lg border border-[#00F0FF]/20 cursor-pointer hover:bg-[#00F0FF]/10 transition-colors" onClick={() => onNodeSelect?.(node)}>
                <div className="text-left">
                  <div className="font-medium text-white">{node.location}</div>
                  <div className="text-sm text-gray-400">{node.capacity}</div>
                </div>
                <div className={`w-3 h-3 rounded-full ${node.status === "normal" ? "bg-green-400" : node.status === "warning" ? "bg-yellow-400" : "bg-red-400"}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef} className="w-full h-full" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-lg">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#00F0FF] border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-gray-400">Loading 3D visualization...</p>
          </div>
        </div>
      )}
    </div>
  );
}
