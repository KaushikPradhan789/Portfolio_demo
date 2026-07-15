import React from 'react';
import { ParticlesProvider, useParticlesProvider, Particles } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

function ParticlesContent() {
  const { loaded } = useParticlesProvider();

  if (!loaded) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      className="w-full h-full"
      options={{
        fullScreen: { enable: false },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          detectsOn: "window",
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 0.35,
              },
            },
            push: {
              quantity: 3,
            },
          },
        },
        particles: {
          color: {
            value: ["#fbbf24", "#8b5cf6"], // Amber and Violet nodes
          },
          links: {
            color: "#8b5cf6", // Violet connecting lines
            distance: 150,
            enable: true,
            opacity: 0.14,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: true,
            speed: 1.0,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              width: 1024,
              height: 768,
            },
            value: 60,
          },
          opacity: {
            value: { min: 0.1, max: 0.4 },
            animation: {
              enable: true,
              speed: 0.5,
              sync: false,
            }
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <ParticlesProvider init={async (engine) => { await loadSlim(engine); }}>
        <ParticlesContent />
      </ParticlesProvider>
    </div>
  );
}
