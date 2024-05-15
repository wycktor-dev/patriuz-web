'use client'
import { Box, Button, Container,FormControl,FormGroup,Input,InputLabel} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useLoader } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
  const Model = () => {
    // location of the 3D model
    const gltf = useLoader(GLTFLoader, "patriuz.gltf");
    return (
      <>
        {/* Use scale to control the size of the 3D model */}
        <primitive object={gltf.scene} scale={1.8} />
      </>
    );
  };

export default function Home() {

  return (
    <>
   <Canvas camera={90,0.5,1000,}>
          <Suspense fallback={null}>
            <Model />
            To add environment effect to the model
            <Environment preset="city" />
          </Suspense>
        </Canvas>
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