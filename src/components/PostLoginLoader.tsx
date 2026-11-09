import { useEffect, useState } from "react";

import BrandMark from "./BrandMark";

interface PostLoginLoaderProps {
  exiting?: boolean;
}

const STATUS_MESSAGES = [
  "Preparing your workspace",
  "Syncing employee data",
  "Loading dashboard",
];

function PostLoginLoader({ exiting = false }: PostLoginLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1400;

    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStatusIndex((index) => (index + 1) % STATUS_MESSAGES.length);
    }, 600);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className={`splash-loader${exiting ? " is-exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading EmployEase"
    >
      <div className="splash-orbs" aria-hidden="true">
        <span className="splash-orb splash-orb--one" />
        <span className="splash-orb splash-orb--two" />
        <span className="splash-orb splash-orb--three" />
      </div>

      <div className="splash-card">
        <div className="splash-logo">
          <span className="splash-halo" aria-hidden="true" />
          <span className="splash-orbit splash-orbit--outer" aria-hidden="true">
            <span className="splash-dot" />
          </span>
          <span className="splash-orbit splash-orbit--inner" aria-hidden="true">
            <span className="splash-dot" />
          </span>
          <svg
            className="splash-ring"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle
              className="splash-ring-track"
              cx="50"
              cy="50"
              r={radius}
            />
            <circle
              className="splash-ring-progress"
              cx="50"
              cy="50"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={
                circumference - (progress / 100) * circumference
              }
            />
          </svg>
          <span className="splash-mark-wrap">
            <BrandMark className="splash-mark" />
          </span>
        </div>

        <h1 className="splash-title">EmployEase</h1>

        <p className="splash-status" key={statusIndex}>
          {STATUS_MESSAGES[statusIndex]}
        </p>

        <div className="splash-track" aria-hidden="true">
          <div
            className="splash-progress"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="splash-percent">{progress}%</span>
      </div>
    </div>
  );
}

export default PostLoginLoader;
