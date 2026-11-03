
// import { useEffect, useRef, useState } from "react";
// import {
//   FaceLandmarker,
//   FilesetResolver,
// } from "@mediapipe/tasks-vision";

// function App() {
//   const videoRef = useRef(null);
//   const faceLandmarkerRef = useRef(null);
//   const animationRef = useRef(null);

//   const [expression, setExpression] = useState("Detecting...");
//   const [cameraStarted, setCameraStarted] = useState(false);

//   // MediaPipe Face Landmarker setup
//   useEffect(() => {
//     let mounted = true;

//     const setup = async () => {
//       try {
//         const vision = await FilesetResolver.forVisionTasks(
//           "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm"
//         );

//         const faceLandmarker = await FaceLandmarker.createFromOptions(
//           vision,
//           {
//             baseOptions: {
//               modelAssetPath:
//                 "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",

//               delegate: "GPU",
//             },

//             runningMode: "VIDEO",

//             numFaces: 1,

//             outputFaceBlendshapes: true,

//             outputFacialTransformationMatrixes: true,
//           }
//         );

//         if (mounted) {
//           faceLandmarkerRef.current = faceLandmarker;
//           startCamera();
//         }
//       } catch (error) {
//         console.error("MediaPipe setup error:", error);
//       }
//     };

//     setup();

//     return () => {
//       mounted = false;

//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }

//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject
//           .getTracks()
//           .forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   // Start webcam
//  const startCamera = async () => {
//   try {
//     console.log("Starting camera...");

//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: false,
//     });

//     console.log("Camera permission granted");
//     console.log(stream);

//     if (videoRef.current) {
//       videoRef.current.srcObject = stream;

//       // Camera actually start hone ka wait
//       await videoRef.current.play();

//       console.log("Video playing");

//       setCameraStarted(true);

//       // detectFace();
//     }
//   } catch (error) {
//     console.error("Camera error:", error);
//     setExpression("Camera error");
//   }
// };

//   // Detect face continuously
//   const detectFace = () => {
//     if (!videoRef.current || !faceLandmarkerRef.current) {
//       animationRef.current = requestAnimationFrame(detectFace);
//       return;
//     }

//     const video = videoRef.current;

//     if (video.readyState >= 2) {
//       const result = faceLandmarkerRef.current.detectForVideo(
//         video,
//         performance.now()
//       );

//       if (
//         result.faceBlendshapes &&
//         result.faceBlendshapes.length > 0
//       ) {
//         const categories = result.faceBlendshapes[0].categories;

//         detectExpression(categories);
//       } else {
//         setExpression("No face detected");
//       }
//     }

//     animationRef.current = requestAnimationFrame(detectFace);
//   };

//   // Convert blendshape values into simple expressions
//   const detectExpression = (categories) => {
//     const getScore = (name) => {
//       const item = categories.find(
//         (category) => category.categoryName === name
//       );

//       return item ? item.score : 0;
//     };

//     const smileLeft = getScore("mouthSmileLeft");
//     const smileRight = getScore("mouthSmileRight");

//     const jawOpen = getScore("jawOpen");

//     const eyeWideLeft = getScore("eyeWideLeft");
//     const eyeWideRight = getScore("eyeWideRight");

//     const browUpLeft = getScore("browOuterUpLeft");
//     const browUpRight = getScore("browOuterUpRight");

//     const frownLeft = getScore("mouthFrownLeft");
//     const frownRight = getScore("mouthFrownRight");

//     const smile = (smileLeft + smileRight) / 2;

//     const eyesWide = (eyeWideLeft + eyeWideRight) / 2;

//     const browsUp = (browUpLeft + browUpRight) / 2;

//     const frown = (frownLeft + frownRight) / 2;

    
//     // console.log(frown);
    

//     // Simple expression rules

//     if (smile > 0.45) {
//       setExpression("😊 Happy / Smiling");
//     } else if (jawOpen > 0.3 && eyesWide > 0.2) {
//       setExpression("😮 Surprised");
//     } else if (frown > 0.01) {
//       setExpression("😞 Sad / Frowning");
//     } else if (browsUp > 0.4 && eyesWide > 0.3) {
//       setExpression("😯 Surprised");
//     } else {
//       setExpression("😐 Neutral");
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         gap: "20px",
//         background: "#111",
//         color: "white",
//       }}
//     >
//       <h1>Face Expression Tracker</h1>

//       <div
//         style={{
//           position: "relative",
//           width: "640px",
//           maxWidth: "90vw",
//         }}
//       >
//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           muted
//           style={{
//             width: "100%",
//             borderRadius: "15px",
//             transform: "scaleX(-1)",
//           }}
//         />
//       </div>

//       <div
//         style={{
//           fontSize: "28px",
//           fontWeight: "bold",
//         }}
//       >
//         {expression}
//       </div>

//       <p>
//         Camera: {cameraStarted ? "Running ✅" : "Starting..."}
//       </p>
//       <button onClick={detectFace}>Detect expression</button>
//     </div>
//   );
// }

// export default App; 



import { RouterProvider } from "react-router"
import { router } from "./app.route"
import "./Features/shared/styles/global.scss"
import { AuthProvider } from "./Features/auth/auth.context"
import { SongContextProvider } from "./Features/home/song.context"

function App() {

  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthProvider>
  )
}

export default App