import React, { Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Reflector, useTexture, useGLTF, Loader } from '@react-three/drei';
import couch from '../../../assets/3d-models/couch.glb';
import videoClip from '../../../assets/video/videoplayback.mp4';
import floorTexture from '../../../assets/textures/SurfaceImperfections003_1K_var1.jpg';
import floorTextureNormal from '../../../assets/textures/SurfaceImperfections003_1K_Normal.jpg';
import { sRGBEncoding, Vector3 } from 'three';

/**
 * Utilizing react three fiber to render a 3D WebGL scene
 * NOTE: Component is instantiated with React.memo() to prevent re-renders from parent components
 * Example: An input field is changed in the parent component, this will trigger re-render of all child components
 * @type {React.NamedExoticComponent<object>}
 */

const IntroScene = React.memo(props => {
  const Model = (props) => {
    const { scene } = useGLTF(couch)
    return <primitive object={scene} {...props} />
  }

  const VideoPlane = () => {
    const [video] = useState(() => Object.assign(document.createElement('video'),
      { src: videoClip, crossOrigin: 'Anonymous', autoPlay: true, muted: true, loop: true }))
    useEffect(() => void (video.play()), [video])
    return (
      <mesh scale={[38, 28, 1]} position={[0, 1.4, -2]}>
        <planeBufferGeometry args={[0.095, 0.08]} />
        <meshBasicMaterial toneMapped={false}>
          <videoTexture attach="map" args={[video]} encoding={sRGBEncoding} />
        </meshBasicMaterial>
      </mesh>
    )
  }

  const Ground = () => {
    const [floor, normal] = useTexture([floorTexture, floorTextureNormal])
    return (
      <Reflector resolution={512} args={[10, 10]} mirror={0.4} mixBlur={8} mixStrength={1} rotation={[-Math.PI / 2, 0, Math.PI / 2]} blur={[400, 100]}>
        {(Material, props) => <Material color={'#a0a0a0'} metalness={0.4} roughnessMap={floor} normalMap={normal} normalScale={[1, 1]} {...props} />}
      </Reflector>
    )
  }

  const CameraControls = () => {
    const vec = new Vector3();
    return useFrame((state) => {
      state.camera.position.lerp(vec.set(state.mouse.x * 5, (3 + state.mouse.y) * 2, 14), 0.05);
      state.camera.lookAt(0, 0, 0);
    })
  }

  return (
    <>
      <Canvas concurrent gl={{ alpha: false }} pixelRatio={[1, 1.5]} camera={{ position: [0, 3, 100], fov: 15 }}>
        <color attach="background" args={['black']} />
        <fog attach="fog" args={['black', 15, 20]} />
        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            <Model rotation={[0, Math.PI - 0.4, 0]} position={[-1.2, 0, 0.6]} scale={[0.01, 0.01, 0.01]} />
            <VideoPlane />
            <Ground />
          </group>
          <ambientLight intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={0.3} />
          <directionalLight position={[-20, 0, -10]} intensity={0.7} />
          <CameraControls />
        </Suspense>
      </Canvas>
      <Loader/>
    </>
  );
});

export default IntroScene;