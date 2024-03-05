import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import QRCode from "react-qr-code";
// import { useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function App() {
  const [showQr, setShowQr] = useState(false);
  return (
    <div>
      <div className="absolute inset-0">
        <Canvas>
          <Suspense fallback={null}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              decay={0}
              intensity={Math.PI}
            />
            <pointLight
              position={[-10, -10, -10]}
              decay={0}
              intensity={Math.PI}
            />
            {/* <Box position={[-1.2, 0, 0]} /> */}

            <Model />
          </Suspense>
        </Canvas>
        <div className="absolute inset-0 flex justify-center items-center">
          {showQr && (
            <div className="bg-white p-4 rounded-lg max-h-screen">
              <a
                target="_blank"
                href="https://app.memento.land/game/play?gameUuid=2f7d4e7a-efa8-47c2-affd-dacd83682b51&toyUuid=4d430904-3762-477d-9205-253a339ef055&ids=30%2C31%2C32%2C33%2C34%2C35%2C36%2C37%2C38%2C39"
              >
                <QRCode
                  style={{ height: "100%" }}
                  value="https://app.memento.land/game/play?gameUuid=2f7d4e7a-efa8-47c2-affd-dacd83682b51&toyUuid=4d430904-3762-477d-9205-253a339ef055&ids=30%2C31%2C32%2C33%2C34%2C35%2C36%2C37%2C38%2C39"
                />
              </a>
            </div>
          )}
        </div>
        <div className="absolute bottom-5 left-5">
          <button
            onClick={() => setShowQr(!showQr)}
            type="button"
            className="tpx-6 py-3.5 text-base text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l font-medium rounded-lg px-5  text-center me-2 mb-2"
          >
            {showQr ? "Hide" : "Show"} QR Code
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

function Model() {
  const gltf = useGLTF("/model3.glb"); //useLoader(GLTFLoader, "/Cuore_dress.drc.glb");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  useFrame((_, delta) => (ref.current.rotation.y += delta));

  useEffect(() => {
    if (ref.current) {
      ref.current.scale.set(3, 3, 3);
    }
  }, []);

  return (
    <group position={[0, -3, 0]} ref={ref}>
      <primitive object={gltf.scene} />
    </group>
  );
}

// function Box(props: any) {
//   // This reference will give us direct access to the mesh
//   const meshRef = useRef<any>(null);
//   // Set up state for the hovered and active state
//   const [hovered, setHover] = useState(false);
//   const [active, setActive] = useState(false);
//   // Subscribe this component to the render-loop, rotate the mesh every frame
//   useFrame((state, delta) => (meshRef.current.rotation.x += delta));
//   // Return view, these are regular three.js elements expressed in JSX
//   return (
//     <mesh
//       {...props}
//       ref={meshRef}
//       scale={active ? 1.5 : 1}
//       onClick={() => setActive(!active)}
//       onPointerOver={() => setHover(true)}
//       onPointerOut={() => setHover(false)}
//     >
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
//     </mesh>
//   );
// }
