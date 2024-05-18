'use client'
import { Box, Button, Container,FormControl,FormGroup,Input,InputLabel} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useFrame, useLoader, useThree,Canvas } from "@react-three/fiber";
import { Environment} from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { motion } from "framer-motion-3d";
import { MotionConfig } from "framer-motion";
import { useRef, useLayoutEffect } from "react";
// import { transition } from "./settings";
// import { Canvas, useThree } from "@react-three/fiber";
import { useSmoothTransform } from "./use-smooth-transform";
import * as THREE from 'three'; // Import the 'THREE' namespace from the 'three' package

  const Model = () => {
    // location of the 3D model
    const gltf = useLoader(GLTFLoader, "patriuz.gltf");
    return (
      <>
        {/* Use scale to control the size of the 3D model */}
        <primitive object={gltf.scene} scale={20} />
      </>
    );
  };

  // function Rig() {
  //   const { camera, mouse } = useThree()
  //   const vec = new Vector3()
  
  //   return useFrame(() => {
  //     camera.position.lerp(vec.set(mouse.x, mouse.y, camera.position.z), 0.5)
  //     camera.lookAt(0,0, 5)
  //   })
  // }
  // Adapted from https://github.com/pmndrs/drei/blob/master/src/core/PerspectiveCamera.tsx

export default function Home() {
  // const lightRotateX = useSmoothTransform(mouseY, spring, mouseToLightRotation);
  // const lightRotateY = useSmoothTransform(mouseX, spring, mouseToLightRotation);
  const [mousePos, setMousePos] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event : any) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
  }, [])
  function Camera({ mouseX, mouseY, ...props }: { mouseX: number, mouseY: number, [key: string]: any }) {
    const cameraX = useSmoothTransform(mouseX, spring, (x) => x / 350);
    const cameraY = useSmoothTransform(mouseY, spring, (y) => (-1 * y) / 350);
  
    const set = useThree(({ set }) => set);
   
    const camera = useThree(({ camera }) => camera);
    const scene = useThree(({ scene }) => scene);
    const cameraRef = useRef<THREE.PerspectiveCamera>(null!); // Add type annotation for cameraRef
    const size = useThree(({ size }) => size) as { width: number, height: number }; // Add type annotation for size

    useLayoutEffect(() => {
      const { current: cam } = cameraRef;
      if (cam) {
        cam.aspect = size.width / size.height;
        cam.updateProjectionMatrix();
      }
    }, [size, props]);
  
    useLayoutEffect(() => {
      if (cameraRef.current) {
        const oldCam = camera;
        set(() => ({ camera: cameraRef.current }));
        return () => set(() => ({ camera: oldCam }));
      }
    }, [camera, cameraRef, set]);
  
    useLayoutEffect(() => {
      return cameraX.onChange(() => camera.lookAt(scene.position));
    }, [cameraX]);

    return (
      <motion.perspectiveCamera
        // ref={cameraRef}
        attach="tste"
        fov={90}
        position={[cameraX, cameraY, 3.8]}
      />
    );
  }
  return (
    <>
    {/* ver valores */}
    <h1>Teste</h1>
    <div style={{ width: "100%", height: "50vh" }}>
   <Canvas flat orthographic camera={{ position: [0,0, 0] }}>
   {/* <OrthographicCamera
        makeDefault
        rotation={[0, Math.PI,  Math.PI]}
        position={[240, -420, -240]}
        near={10}
        far={1000}
      ></OrthographicCamera> */}
           <MotionConfig>
        {/* <motion.group
          center={[0, 0, 0]}
          rotation={[lightRotateX, lightRotateY, 0]}
        >
          <Lights />
        </motion.group> */}
        {/* <motion.group
          initial={false}
          animate={isHover ? "hover" : "rest"}
          dispose={null}
          variants={{
            hover: { z: isPress ? -0.9 : 0 }
          }}
        ></motion.group> */}
        <Camera mouseX={mousePos.x} mouseY={mousePos.y} />
          <Suspense fallback={null}>
            <Model />
            <Environment preset="city" />
            {/* <Rig /> */}
          </Suspense>

          </MotionConfig>
        </Canvas>
      </div>
      {/* <Box className="flex justify-center"><img src="patriuz.png" alt="Patriuz logo"/></Box> */}
              <h1 className="text-center text-4xl">Digite aqui embaixo</h1>
                <Container className="flex justify-center w-96">
                <FormGroup>        
                    <FormControl className="m-5 w-96">
                      <InputLabel>Apelido</InputLabel>
                      <Input type="text" />
                    </FormControl>
                    <FormControl className="m-5">
                      <InputLabel>Email</InputLabel>
                      <Input type="text" />
                    </FormControl>
                    <div className="flex justify-end">
                      <Button variant="contained" endIcon={<SendIcon />} color="primary">Enviar</Button>
                    </div>
                  </FormGroup>
                </Container>
    </>
  )
}
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">src/app/page.tsx</code>
//         </p>
//       </div>

//       <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
//         <Image
//           className="relative"
//           src="/patriuz_logo.png"
//           alt="Patriuz Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className="mb-3 text-2xl font-semibold">
//             Docs{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className="m-0 max-w-[30ch] text-sm opacity-50">
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className="mb-3 text-2xl font-semibold">
//             Learn{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className="m-0 max-w-[30ch] text-sm opacity-50">
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className="mb-3 text-2xl font-semibold">
//             Templates{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className="m-0 max-w-[30ch] text-sm opacity-50">
//             Explore starter templates for Next.js.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className="mb-3 text-2xl font-semibold">
//             Deploy{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   );
// }


const spring = { stiffness: 600, damping: 30 };

const mouseToLightRotation = (v: number) => (-1 * v) / 140;
