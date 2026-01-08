import { Platform as PlatformType } from '@/types/game';

interface PlatformProps {
  platform: PlatformType;
  cameraOffset: number;
}

export const Platform = ({ platform, cameraOffset }: PlatformProps) => {
  const getStyle = () => {
    switch (platform.type) {
      case 'grass':
        return {
          background: 'linear-gradient(180deg, hsl(120 55% 45%) 0%, hsl(120 60% 35%) 30%, hsl(30 45% 35%) 30%, hsl(30 45% 25%) 100%)',
          borderTop: '4px solid hsl(120 60% 55%)',
        };
      case 'stone':
        return {
          background: 'linear-gradient(180deg, hsl(220 10% 50%) 0%, hsl(220 10% 35%) 100%)',
          borderTop: '3px solid hsl(220 10% 60%)',
        };
      case 'ice':
        return {
          background: 'linear-gradient(180deg, hsl(195 80% 75%) 0%, hsl(195 70% 55%) 100%)',
          borderTop: '3px solid hsl(195 85% 85%)',
          opacity: 0.9,
        };
      case 'brick':
        return {
          background: 'linear-gradient(180deg, hsl(15 60% 40%) 0%, hsl(15 55% 30%) 100%)',
          borderTop: '3px solid hsl(15 65% 50%)',
        };
      case 'terracotta':
        return {
          background: 'linear-gradient(180deg, hsl(20 55% 55%) 0%, hsl(18 50% 42%) 100%)',
          borderTop: '3px solid hsl(22 60% 65%)',
        };
      default:
        return {
          background: 'hsl(var(--grass))',
        };
    }
  };

  return (
    <div
      className="absolute rounded-t-md"
      style={{
        left: platform.x - cameraOffset,
        top: platform.y,
        width: platform.width,
        height: platform.height,
        ...getStyle(),
        boxShadow: 'inset -3px -3px 0 rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.2)',
      }}
    >
      {/* Grass detail */}
      {platform.type === 'grass' && platform.height > 40 && (
        <div className="absolute top-0 left-0 right-0 h-1 flex justify-around">
          {Array.from({ length: Math.floor(platform.width / 20) }).map((_, i) => (
            <div
              key={i}
              className="w-1 h-2 bg-green-500 rounded-t-full -mt-1"
              style={{ marginLeft: Math.random() * 10 }}
            />
          ))}
        </div>
      )}
      
      {/* Ice shimmer */}
      {platform.type === 'ice' && (
        <div className="absolute inset-0 overflow-hidden rounded-t-md">
          <div className="absolute top-0 left-1/4 w-8 h-full bg-white/30 -skew-x-12" />
          <div className="absolute top-0 right-1/4 w-4 h-full bg-white/20 -skew-x-12" />
        </div>
      )}

      {/* Brick pattern */}
      {platform.type === 'brick' && (
        <div className="absolute inset-0 overflow-hidden rounded-t-md opacity-40">
          {Array.from({ length: Math.ceil(platform.height / 12) }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex" style={{ marginLeft: rowIndex % 2 === 0 ? 0 : -15 }}>
              {Array.from({ length: Math.ceil(platform.width / 30) + 1 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[28px] h-[10px] border border-amber-900/50 m-[1px]"
                  style={{ background: 'hsl(15 50% 35%)' }}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Terracotta tile pattern */}
      {platform.type === 'terracotta' && (
        <div className="absolute inset-0 overflow-hidden rounded-t-md opacity-30">
          {Array.from({ length: Math.ceil(platform.height / 16) }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex">
              {Array.from({ length: Math.ceil(platform.width / 24) + 1 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[22px] h-[14px] border border-orange-800/40 m-[1px] rounded-sm"
                  style={{ background: 'hsl(18 45% 50%)' }}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
