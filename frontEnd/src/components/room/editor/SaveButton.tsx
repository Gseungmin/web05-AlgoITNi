import useModal from '@/hooks/useModal';
import { downloadLocalFile } from '@/utils/file';
import SaveModal from '../modal/SaveModal';
import useModifyState from '@/stores/useModifyState';
import SaveChoiceModal from '../modal/SaveChoiceModal';
import { LanguageInfo } from '@/types/editor';

function SaveButtonElement({ children, onClick }: { children: React.ReactNode; onClick: React.MouseEventHandler<HTMLButtonElement> }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center w-32 px-4 py-2 text-sm text-white duration-300 rounded-lg hover:text-black hover:bg-base whitespace-nowrap"
    >
      {children}
    </button>
  );
}

interface SaveButtonProps {
  plainCode: string;
  languageInfo: LanguageInfo;
}

export default function SaveButton({ plainCode, languageInfo }: SaveButtonProps) {
  const { show } = useModal(SaveModal);
  const { show: showChoice } = useModal(SaveChoiceModal);
  const { modifyId } = useModifyState();

  const handleSaveLocal = () => {
    downloadLocalFile(plainCode, 'solution', languageInfo.extension);
  };

  const handleSaveCloud = () => {
    if (modifyId) {
      showChoice({ code: plainCode });
    } else {
      show({ code: plainCode });
    }
  };

  return (
    <div className="relative h-full">
      <div className="peer flex items-center min-w-[8vh] justify-center px-[max(2vh,25px)] h-full text-[max(1.2vh,10px)] bg-secondary font-light text-white rounded whitespace-nowrap">
        저장하기
      </div>
      <div className="absolute z-10 items-center justify-between hidden gap-2 p-2 -translate-x-1/2 rounded-lg bg-secondary left-1/2 -top-12 peer-hover:flex hover:flex">
        <SaveButtonElement onClick={handleSaveLocal}>로컬에 저장</SaveButtonElement>
        <SaveButtonElement onClick={handleSaveCloud}>클라우드에 저장</SaveButtonElement>
      </div>
    </div>
  );
}
