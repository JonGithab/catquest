import { useCallback, useRef, useEffect } from 'react';

type Theme = 'meadow' | 'forest' | 'sky' | 'building' | 'whitten' | 'donuts' | 'c2' | 'rooftop' | 'metro';

export const useMusicPlayer = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const activeNodesRef = useRef<AudioNode[]>([]);
  const isPlayingRef = useRef(false);
  const currentThemeRef = useRef<Theme | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      masterGainRef.current = audioContextRef.current.createGain();
      masterGainRef.current.gain.value = 0.15;
      masterGainRef.current.connect(audioContextRef.current.destination);
    }
    return audioContextRef.current;
  }, []);

  const stopMusic = useCallback(() => {
    isPlayingRef.current = false;
    currentThemeRef.current = null;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    activeNodesRef.current.forEach(node => {
      try {
        if (node instanceof OscillatorNode || node instanceof AudioBufferSourceNode) {
          node.stop();
        }
        node.disconnect();
      } catch (e) {
        // Node already stopped
      }
    });
    activeNodesRef.current = [];
  }, []);

  const playMeadowMusic = useCallback(() => {
    const ctx = getAudioContext();
    if (!masterGainRef.current) return;

    // Cheerful, bright melody with birds-like chirps
    const playChord = () => {
      if (!isPlayingRef.current || currentThemeRef.current !== 'meadow') return;
      
      const notes = [
        [261.63, 329.63, 392.00], // C major
        [293.66, 369.99, 440.00], // D major
        [329.63, 415.30, 493.88], // E major
        [349.23, 440.00, 523.25], // F major
        [392.00, 493.88, 587.33], // G major
      ];
      
      const chord = notes[Math.floor(Math.random() * notes.length)];
      
      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        filter.type = 'lowpass';
        filter.frequency.value = 2000;
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGainRef.current!);
        
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);
        
        osc.start(ctx.currentTime + i * 0.05);
        osc.stop(ctx.currentTime + 2);
        
        activeNodesRef.current.push(osc, gain, filter);
      });

      // Bird chirp
      if (Math.random() > 0.5) {
        const chirp = ctx.createOscillator();
        const chirpGain = ctx.createGain();
        
        chirp.type = 'sine';
        chirp.frequency.setValueAtTime(2000 + Math.random() * 1000, ctx.currentTime);
        chirp.frequency.exponentialRampToValueAtTime(3000 + Math.random() * 500, ctx.currentTime + 0.05);
        chirp.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.1);
        
        chirpGain.gain.setValueAtTime(0.1, ctx.currentTime);
        chirpGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        
        chirp.connect(chirpGain);
        chirpGain.connect(masterGainRef.current!);
        
        chirp.start(ctx.currentTime + Math.random() * 0.5);
        chirp.stop(ctx.currentTime + 0.5);
        
        activeNodesRef.current.push(chirp, chirpGain);
      }
    };

    playChord();
    intervalRef.current = setInterval(playChord, 2500);
  }, [getAudioContext]);

  const playForestMusic = useCallback(() => {
    const ctx = getAudioContext();
    if (!masterGainRef.current) return;

    // Mysterious, twilight atmosphere with minor chords
    const playAmbience = () => {
      if (!isPlayingRef.current || currentThemeRef.current !== 'forest') return;
      
      const notes = [
        [220.00, 261.63, 329.63], // A minor
        [196.00, 233.08, 293.66], // G minor
        [174.61, 207.65, 261.63], // F minor
        [164.81, 196.00, 246.94], // E minor
      ];
      
      const chord = notes[Math.floor(Math.random() * notes.length)];
      
      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        filter.type = 'lowpass';
        filter.frequency.value = 800;
        
        osc.type = 'triangle';
        osc.frequency.value = freq;
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGainRef.current!);
        
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 3);
        
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + 3);
        
        activeNodesRef.current.push(osc, gain, filter);
      });

      // Owl hoot
      if (Math.random() > 0.7) {
        const hoot = ctx.createOscillator();
        const hootGain = ctx.createGain();
        
        hoot.type = 'sine';
        hoot.frequency.setValueAtTime(400, ctx.currentTime);
        hoot.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.3);
        
        hootGain.gain.setValueAtTime(0.15, ctx.currentTime);
        hootGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        
        hoot.connect(hootGain);
        hootGain.connect(masterGainRef.current!);
        
        hoot.start(ctx.currentTime + 1);
        hoot.stop(ctx.currentTime + 1.5);
        
        activeNodesRef.current.push(hoot, hootGain);
      }
    };

    playAmbience();
    intervalRef.current = setInterval(playAmbience, 3000);
  }, [getAudioContext]);

  const playSkyMusic = useCallback(() => {
    const ctx = getAudioContext();
    if (!masterGainRef.current) return;

    // Ethereal, dreamy space atmosphere
    const playPad = () => {
      if (!isPlayingRef.current || currentThemeRef.current !== 'sky') return;
      
      const notes = [
        [130.81, 164.81, 196.00, 261.63], // C add9
        [146.83, 174.61, 220.00, 293.66], // D add9
        [110.00, 138.59, 164.81, 220.00], // A add9
      ];
      
      const chord = notes[Math.floor(Math.random() * notes.length)];
      
      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        filter.type = 'lowpass';
        filter.frequency.value = 600;
        filter.Q.value = 2;
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        osc2.type = 'sine';
        osc2.frequency.value = freq * 1.005; // Slight detune for shimmer
        
        osc.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(masterGainRef.current!);
        
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + 3);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 4);
        
        osc.start(ctx.currentTime + i * 0.15);
        osc.stop(ctx.currentTime + 4);
        osc2.start(ctx.currentTime + i * 0.15);
        osc2.stop(ctx.currentTime + 4);
        
        activeNodesRef.current.push(osc, osc2, gain, filter);
      });

      // Twinkling stars
      for (let s = 0; s < 3; s++) {
        const twinkle = ctx.createOscillator();
        const twinkleGain = ctx.createGain();
        
        twinkle.type = 'sine';
        twinkle.frequency.value = 1000 + Math.random() * 2000;
        
        twinkleGain.gain.setValueAtTime(0, ctx.currentTime + s * 0.8);
        twinkleGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + s * 0.8 + 0.05);
        twinkleGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + s * 0.8 + 0.2);
        
        twinkle.connect(twinkleGain);
        twinkleGain.connect(masterGainRef.current!);
        
        twinkle.start(ctx.currentTime + s * 0.8);
        twinkle.stop(ctx.currentTime + s * 0.8 + 0.3);
        
        activeNodesRef.current.push(twinkle, twinkleGain);
      }
    };

    playPad();
    intervalRef.current = setInterval(playPad, 4000);
  }, [getAudioContext]);

  const playMetroMusic = useCallback(() => {
    const ctx = getAudioContext();
    if (!masterGainRef.current) return;

    // Underground ambient atmosphere with train sounds
    const playAmbience = () => {
      if (!isPlayingRef.current || currentThemeRef.current !== 'metro') return;
      
      // Deep rumbling bass drone
      const drone = ctx.createOscillator();
      const droneGain = ctx.createGain();
      const droneFilter = ctx.createBiquadFilter();
      
      droneFilter.type = 'lowpass';
      droneFilter.frequency.value = 150;
      
      drone.type = 'sawtooth';
      drone.frequency.value = 55 + Math.random() * 10;
      
      drone.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(masterGainRef.current!);
      
      droneGain.gain.setValueAtTime(0, ctx.currentTime);
      droneGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.5);
      droneGain.gain.setValueAtTime(0.15, ctx.currentTime + 3);
      droneGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 4);
      
      drone.start(ctx.currentTime);
      drone.stop(ctx.currentTime + 4);
      
      activeNodesRef.current.push(drone, droneGain, droneFilter);

      // Distant train rumble
      if (Math.random() > 0.4) {
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.5;
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 100;
        
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime + 1);
        gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 1.5);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 3);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(masterGainRef.current!);
        
        noise.start(ctx.currentTime + 1);
        noise.stop(ctx.currentTime + 3);
        
        activeNodesRef.current.push(noise, filter, gain);
      }

      // Announcement chime (occasional)
      if (Math.random() > 0.85) {
        const chime1 = ctx.createOscillator();
        const chime2 = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        
        chime1.type = 'sine';
        chime1.frequency.value = 880;
        
        chime2.type = 'sine';
        chime2.frequency.value = 1174.66;
        
        chimeGain.gain.setValueAtTime(0, ctx.currentTime + 2);
        chimeGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2.05);
        chimeGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2.5);
        
        chime1.connect(chimeGain);
        chimeGain.connect(masterGainRef.current!);
        
        chime1.start(ctx.currentTime + 2);
        chime1.stop(ctx.currentTime + 2.4);
        
        setTimeout(() => {
          const chimeGain2 = ctx.createGain();
          chimeGain2.gain.setValueAtTime(0, ctx.currentTime);
          chimeGain2.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
          chimeGain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
          
          chime2.connect(chimeGain2);
          chimeGain2.connect(masterGainRef.current!);
          
          chime2.start(ctx.currentTime);
          chime2.stop(ctx.currentTime + 0.4);
          
          activeNodesRef.current.push(chime2, chimeGain2);
        }, 2400);
        
        activeNodesRef.current.push(chime1, chimeGain);
      }

      // Echoing footsteps
      if (Math.random() > 0.6) {
        for (let i = 0; i < 3; i++) {
          const click = ctx.createOscillator();
          const clickGain = ctx.createGain();
          const clickFilter = ctx.createBiquadFilter();
          
          clickFilter.type = 'highpass';
          clickFilter.frequency.value = 800;
          
          click.type = 'square';
          click.frequency.value = 100 + Math.random() * 50;
          
          clickGain.gain.setValueAtTime(0, ctx.currentTime + 0.5 + i * 0.4);
          clickGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.5 + i * 0.4 + 0.01);
          clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5 + i * 0.4 + 0.1);
          
          click.connect(clickFilter);
          clickFilter.connect(clickGain);
          clickGain.connect(masterGainRef.current!);
          
          click.start(ctx.currentTime + 0.5 + i * 0.4);
          click.stop(ctx.currentTime + 0.5 + i * 0.4 + 0.15);
          
          activeNodesRef.current.push(click, clickFilter, clickGain);
        }
      }
    };

    playAmbience();
    intervalRef.current = setInterval(playAmbience, 4500);
  }, [getAudioContext]);

  const playGenericMusic = useCallback(() => {
    const ctx = getAudioContext();
    if (!masterGainRef.current) return;

    // Generic ambient for other themes
    const playPad = () => {
      if (!isPlayingRef.current) return;
      
      const notes = [196.00, 246.94, 293.66]; // G3, B3, D4
      
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        osc.connect(gain);
        gain.connect(masterGainRef.current!);
        
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 3);
        
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + 3);
        
        activeNodesRef.current.push(osc, gain);
      });
    };

    playPad();
    intervalRef.current = setInterval(playPad, 3500);
  }, [getAudioContext]);

  const playMusic = useCallback((theme: Theme) => {
    if (currentThemeRef.current === theme && isPlayingRef.current) return;
    
    stopMusic();
    isPlayingRef.current = true;
    currentThemeRef.current = theme;

    // Resume audio context if suspended (browser autoplay policy)
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    switch (theme) {
      case 'meadow':
        playMeadowMusic();
        break;
      case 'forest':
        playForestMusic();
        break;
      case 'sky':
        playSkyMusic();
        break;
      case 'metro':
        playMetroMusic();
        break;
      default:
        playGenericMusic();
        break;
    }
  }, [getAudioContext, stopMusic, playMeadowMusic, playForestMusic, playSkyMusic, playMetroMusic, playGenericMusic]);

  const setVolume = useCallback((volume: number) => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = Math.max(0, Math.min(1, volume));
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMusic();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopMusic]);

  return {
    playMusic,
    stopMusic,
    setVolume,
  };
};
