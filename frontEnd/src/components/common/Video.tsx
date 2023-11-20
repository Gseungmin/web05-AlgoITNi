import { useEffect, useRef } from 'react';
import useSpeaker from '@/stores/useSpeaker';

export default function Video({ stream, muted = false }: { stream: MediaStream; muted?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const speaker = useSpeaker((state) => state.speaker);

  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.srcObject = stream;
    // setSinkId가 experimental method라서 typescript에 type이 없어서 이렇게 사용하였음
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (videoRef.current as any).setSinkId?.(speaker);
  }, [stream]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        className="absolute object-cover w-full h-full rounded-3xl shadow-black drop-shadow-2xl"
        playsInline
        muted={muted}
      >
        <track kind="captions" />
      </video>
    </div>
  );
}
