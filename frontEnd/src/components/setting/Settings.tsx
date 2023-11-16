import { MediaObject } from '@/hooks/useMedia';
import Button from '../common/Button';
import SettingVideo from './SettingVideo';
import Header from '../common/Header';

export default function Setting({
  mediaObject,
  setSetting,
}: {
  mediaObject: MediaObject;
  setSetting: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
      <div className="mb-[5%]  mx-[7vw] mt-4">
        <Header />
      </div>
      <main className="flex px-[7vw]">
        <div className="basis-7/12">
          <SettingVideo mediaObject={mediaObject} />
        </div>
        <div className="flex flex-col items-center justify-center w-screen basis-5/12">
          <div className="w-[80%] flex flex-col items-center justify-center gap-[50px]">
            <div className="text-[2.5vw] font-bold font-Pretendard">참여할 준비가 되셨나요?</div>
            <Button.Full onClick={() => setSetting(true)} fontSize="1.8vw">
              참여
            </Button.Full>
          </div>
        </div>
      </main>
    </div>
  );
}
