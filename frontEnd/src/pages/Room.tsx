import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useRTCConnection from '@/hooks/useRTCConnection';
import Setting from '@/components/setting/Settings';
import useMedia from '@/hooks/useMedia';
import VideoSection from '@/components/room/VideoSection';
import QuizViewSection from '@/components/room/QuizViewSection';
import EditorSection from '@/components/room/EditorSection';
import ChattingSection from '@/components/room/ChattingSection';
import ControllSection from '@/components/room/ControllSection';

export default function Room() {
  const defaultCode = localStorage.getItem('code');
  const defaultNickName = localStorage.getItem('nickName');
  const { roomId } = useParams();
  const mediaObject = useMedia();

  const [isSetting, setSetting] = useState((!!defaultCode || defaultCode === '') && !!defaultNickName);
  const [nickName, setNickName] = useState(defaultNickName || '');

  const { streamList, codeDataChannels, languageDataChannels } = useRTCConnection(
    roomId as string,
    mediaObject.stream as MediaStream,
    isSetting,
  );

  if (!isSetting) return <Setting mediaObject={mediaObject} setSetting={setSetting} setNickName={setNickName} />;

  return (
    <div className="flex w-screen h-screen gap-4 p-2 bg-base">
      <div className="flex flex-col w-3/4 h-full gap-4">
        <div className=" flex min-h-[25%] w-full">
          <VideoSection mediaObject={mediaObject} streamList={streamList} />
        </div>
        <div className="flex w-full gap-4 overflow-auto h-3/4">
          <div className="flex flex-col w-2/5 h-full gap-4">
            <QuizViewSection />
            <ControllSection mediaObject={mediaObject} />
          </div>
          <div className="w-3/5 max-h-full">
            <EditorSection defaultCode={defaultCode} codeDataChannels={codeDataChannels} languageDataChannels={languageDataChannels} />
          </div>
        </div>
      </div>
      <div className="flex w-1/4 ">
        <ChattingSection roomId={roomId as string} nickname={nickName} />
      </div>
    </div>
  );
}
