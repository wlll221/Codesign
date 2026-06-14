async function mountExperienceLanyard() {
  const mountNode = document.getElementById("experience-lanyard-mount");
  if (!mountNode) return;

  const showError = (message) => {
    const fallback = mountNode.querySelector(".experience-lanyard-fallback");
    if (fallback) {
      fallback.innerHTML = `
        <span>Interactive Badge Error</span>
        <strong>Lanyard failed</strong>
        <small style="max-width: 320px; line-height: 1.5; color: rgba(216,230,255,0.72); display: block;">
          ${String(message).replace(/</g, "&lt;")}
        </small>
      `;
    }
  };

  try {
    const ReactMod = await import("react");
    const ReactDOMMod = await import("react-dom/client");
    const htmMod = await import("htm");
    const THREE = await import("three");
    const FiberMod = await import("@react-three/fiber");
    const DreiMod = await import("@react-three/drei");
    const RapierMod = await import("@react-three/rapier");
    const MeshlineMod = await import("meshline");

    const React = ReactMod.default;
    const { Suspense, memo, useEffect, useRef, useState } = ReactMod;
    const { createRoot } = ReactDOMMod;
    const html = htmMod.default.bind(React.createElement);
    const { Canvas, extend, useFrame } = FiberMod;
    const { useGLTF, useTexture, Environment, Lightformer } = DreiMod;
    const {
      BallCollider,
      CuboidCollider,
      Physics,
      RigidBody,
      useRopeJoint,
      useSphericalJoint,
    } = RapierMod;
    const { MeshLineGeometry, MeshLineMaterial } = MeshlineMod;

    extend({ MeshLineGeometry, MeshLineMaterial });

    const cardGLB = "https://reactbits.dev/assets/card-BP4TWJmK.glb";
    const lanyardTexture = "https://reactbits.dev/assets/lanyard-BQfo1yFS.png";

    class LanyardErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false, message: "" };
      }

      static getDerivedStateFromError(error) {
        return {
          hasError: true,
          message: error?.message || String(error),
        };
      }

      componentDidCatch(error) {
        mountNode.classList.remove("is-ready");
        showError(error?.message || error);
      }

      render() {
        if (this.state.hasError) return null;
        return this.props.children;
      }
    }

    const Lanyard = memo(function Lanyard({
      position = [0, 0, 24],
      gravity = [0, -40, 0],
      fov = 20,
      transparent = true,
    }) {
      const [isMobile, setIsMobile] = useState(
        () => typeof window !== "undefined" && window.innerWidth < 768
      );

      useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);

      return html`
        <div className="lanyard-wrapper">
          <${Canvas}
            camera=${{ position, fov }}
            dpr=${[1, isMobile ? 1.5 : 2]}
            gl=${{ alpha: transparent, antialias: true }}
            onCreated=${({ gl }) =>
              gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
          >
            <ambientLight intensity=${Math.PI} />
            <${Physics} gravity=${gravity} timeStep=${isMobile ? 1 / 30 : 1 / 60}>
              <${Suspense} fallback=${null}>
                <${Band} isMobile=${isMobile} />
              </${Suspense}>
            </${Physics}>
            <${Environment} blur=${0.75}>
              <${Lightformer}
                intensity=${2}
                color="white"
                position=${[0, -1, 5]}
                rotation=${[0, 0, Math.PI / 3]}
                scale=${[100, 0.1, 1]}
              />
              <${Lightformer}
                intensity=${3}
                color="white"
                position=${[-1, -1, 1]}
                rotation=${[0, 0, Math.PI / 3]}
                scale=${[100, 0.1, 1]}
              />
              <${Lightformer}
                intensity=${3}
                color="white"
                position=${[1, 1, 1]}
                rotation=${[0, 0, Math.PI / 3]}
                scale=${[100, 0.1, 1]}
              />
              <${Lightformer}
                intensity=${10}
                color="white"
                position=${[-10, 0, 14]}
                rotation=${[0, Math.PI / 2, Math.PI / 3]}
                scale=${[100, 10, 1]}
              />
            </${Environment}>
          </${Canvas}>
        </div>
      `;
    });

    function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
      const band = useRef(null);
      const fixed = useRef(null);
      const j1 = useRef(null);
      const j2 = useRef(null);
      const j3 = useRef(null);
      const card = useRef(null);
      const vec = new THREE.Vector3();
      const ang = new THREE.Vector3();
      const rot = new THREE.Vector3();
      const dir = new THREE.Vector3();
      const segmentProps = {
        type: "dynamic",
        canSleep: true,
        colliders: false,
        angularDamping: 4,
        linearDamping: 4,
      };
      const { nodes, materials } = useGLTF(cardGLB);
      const texture = useTexture(lanyardTexture);
      const [curve] = useState(
        () =>
          new THREE.CatmullRomCurve3([
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(),
          ])
      );
      const [dragged, drag] = useState(false);
      const [hovered, hover] = useState(false);

      useEffect(() => {
        mountNode.classList.add("is-ready");
      }, []);

      useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
      useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
      useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
      useSphericalJoint(j3, card, [
        [0, 0, 0],
        [0, 1.5, 0],
      ]);

      useEffect(() => {
        if (hovered) {
          document.body.style.cursor = dragged ? "grabbing" : "grab";
          return () => {
            document.body.style.cursor = "auto";
          };
        }

        return undefined;
      }, [hovered, dragged]);

      useFrame((state, delta) => {
        if (dragged) {
          vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
          dir.copy(vec).sub(state.camera.position).normalize();
          vec.add(dir.multiplyScalar(state.camera.position.length()));
          [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
          card.current?.setNextKinematicTranslation({
            x: vec.x - dragged.x,
            y: vec.y - dragged.y,
            z: vec.z - dragged.z,
          });
        }

        if (fixed.current) {
          [j1, j2].forEach((ref) => {
            if (!ref.current.lerped) {
              ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
            }

            const clampedDistance = Math.max(
              0.1,
              Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
            );

            ref.current.lerped.lerp(
              ref.current.translation(),
              delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
            );
          });

          curve.points[0].copy(j3.current.translation());
          curve.points[1].copy(j2.current.lerped);
          curve.points[2].copy(j1.current.lerped);
          curve.points[3].copy(fixed.current.translation());
          band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

          ang.copy(card.current.angvel());
          rot.copy(card.current.rotation());
          card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
        }
      });

      curve.curveType = "chordal";
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

      return html`
        <${React.Fragment}>
          <group position=${[0, 4, 0]}>
            <${RigidBody}
              ref=${fixed}
              type="fixed"
              canSleep=${segmentProps.canSleep}
              colliders=${segmentProps.colliders}
              angularDamping=${segmentProps.angularDamping}
              linearDamping=${segmentProps.linearDamping}
            />
            <${RigidBody}
              position=${[0.5, 0, 0]}
              ref=${j1}
              type=${segmentProps.type}
              canSleep=${segmentProps.canSleep}
              colliders=${segmentProps.colliders}
              angularDamping=${segmentProps.angularDamping}
              linearDamping=${segmentProps.linearDamping}
            >
              <${BallCollider} args=${[0.1]} />
            </${RigidBody}>
            <${RigidBody}
              position=${[1, 0, 0]}
              ref=${j2}
              type=${segmentProps.type}
              canSleep=${segmentProps.canSleep}
              colliders=${segmentProps.colliders}
              angularDamping=${segmentProps.angularDamping}
              linearDamping=${segmentProps.linearDamping}
            >
              <${BallCollider} args=${[0.1]} />
            </${RigidBody}>
            <${RigidBody}
              position=${[1.5, 0, 0]}
              ref=${j3}
              type=${segmentProps.type}
              canSleep=${segmentProps.canSleep}
              colliders=${segmentProps.colliders}
              angularDamping=${segmentProps.angularDamping}
              linearDamping=${segmentProps.linearDamping}
            >
              <${BallCollider} args=${[0.1]} />
            </${RigidBody}>
            <${RigidBody}
              position=${[2, 0, 0]}
              ref=${card}
              type=${dragged ? "kinematicPosition" : "dynamic"}
              canSleep=${segmentProps.canSleep}
              colliders=${segmentProps.colliders}
              angularDamping=${segmentProps.angularDamping}
              linearDamping=${segmentProps.linearDamping}
            >
              <${CuboidCollider} args=${[0.8, 1.125, 0.01]} />
              <group
                scale=${2.25}
                position=${[0, -1.2, -0.05]}
                onPointerOver=${() => hover(true)}
                onPointerOut=${() => hover(false)}
                onPointerUp=${(event) => {
                  event.target.releasePointerCapture(event.pointerId);
                  drag(false);
                }}
                onPointerDown=${(event) => {
                  event.target.setPointerCapture(event.pointerId);
                  drag(
                    new THREE.Vector3().copy(event.point).sub(vec.copy(card.current.translation()))
                  );
                }}
              >
                <mesh geometry=${nodes.card.geometry}>
                  <meshPhysicalMaterial
                    map=${materials.base.map}
                    map-anisotropy=${16}
                    clearcoat=${isMobile ? 0 : 1}
                    clearcoatRoughness=${0.15}
                    roughness=${0.9}
                    metalness=${0.8}
                  />
                </mesh>
                <mesh
                  geometry=${nodes.clip.geometry}
                  material=${materials.metal}
                  material-roughness=${0.3}
                />
                <mesh geometry=${nodes.clamp.geometry} material=${materials.metal} />
              </group>
            </${RigidBody}>
          </group>
          <mesh ref=${band}>
            <meshLineGeometry />
            <meshLineMaterial
              color="white"
              depthTest=${false}
              resolution=${isMobile ? [1000, 2000] : [1000, 1000]}
              useMap=${true}
              map=${texture}
              repeat=${[-4, 1]}
              lineWidth=${1}
            />
          </mesh>
        </${React.Fragment}>
      `;
    }

    useGLTF.preload(cardGLB);

    const root = createRoot(mountNode);
    root.render(html`
      <${LanyardErrorBoundary}>
        <${Lanyard} />
      </${LanyardErrorBoundary}>
    `);
  } catch (error) {
    console.error("Failed to initialize lanyard:", error);
    mountNode.classList.remove("is-ready");
    showError(error?.message || error);
  }
}

mountExperienceLanyard();
