import { LazyLottie } from './LazyComponents';

// Simple loading animation data (procedurally generated)
const loadingAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  nm: "Loading",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] },
            { t: 60, s: [360] }
          ]
        },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [40, 40] },
              p: { a: 0, k: [0, 0] }
            },
            {
              ty: "st",
              c: { a: 0, k: [1, 0.8, 0.2, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 4 }
            }
          ]
        }
      ],
      ip: 0,
      op: 60,
      st: 0
    }
  ]
};

// Camera flash animation
const cameraFlashAnimation = {
  v: "5.7.4",
  fr: 24,
  ip: 0,
  op: 24,
  w: 200,
  h: 200,
  nm: "Camera Flash",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Flash",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [0] },
            { t: 3, s: [100] },
            { t: 6, s: [0] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [50, 50, 100] },
            { t: 3, s: [120, 120, 100] },
            { t: 6, s: [50, 50, 100] }
          ]
        }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "rc",
              d: 1,
              s: { a: 0, k: [200, 200] },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 0 }
            },
            {
              ty: "fl",
              c: { a: 0, k: [1, 1, 1, 1] },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ],
      ip: 0,
      op: 24,
      st: 0
    }
  ]
};

// Pulse effect animation
const pulseAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90,
  w: 100,
  h: 100,
  nm: "Pulse",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Pulse Ring",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [80] },
            { t: 45, s: [0] },
            { t: 90, s: [80] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [50, 50, 100] },
            { t: 45, s: [150, 150, 100] },
            { t: 90, s: [50, 50, 100] }
          ]
        }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [30, 30] },
              p: { a: 0, k: [0, 0] }
            },
            {
              ty: "st",
              c: { a: 0, k: [0.96, 0.82, 0.13, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 2 }
            }
          ]
        }
      ],
      ip: 0,
      op: 90,
      st: 0
    }
  ]
};

// Pre-built Lottie components
export const LoadingLottie = ({ className = "" }: { className?: string }) => (
  <LazyLottie
    animationData={loadingAnimation}
    height={100}
    autoplay={true}
    loop={true}
    className={className}
  />
);

export const CameraFlashLottie = ({ 
  className = "",
  trigger = false 
}: { 
  className?: string;
  trigger?: boolean;
}) => (
  <LazyLottie
    animationData={cameraFlashAnimation}
    height={200}
    autoplay={trigger}
    loop={false}
    className={className}
  />
);

export const PulseLottie = ({ className = "" }: { className?: string }) => (
  <LazyLottie
    animationData={pulseAnimation}
    height={100}
    autoplay={true}
    loop={true}
    className={className}
  />
);

// Enhanced loading component with Lottie
export const EnhancedLoading = ({ 
  message = "Loading...",
  size = 100,
  className = ""
}: {
  message?: string;
  size?: number;
  className?: string;
}) => (
  <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
    <LoadingLottie />
    <p className="text-cinema-white/70 text-sm animate-pulse">{message}</p>
  </div>
);
