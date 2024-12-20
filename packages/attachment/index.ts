import FileCard from '../fileList/fileListCard.vue';
import FileList from '../fileList/index.vue';
import DropArea from './DropArea.vue';
import Attachment from './index.vue';
import PlaceholderUploader from './PlaceholderUploader.vue';
import SilentUploader from './silentUploader.vue';

export type { AttachmentProps } from './interface';

type AttachmentType = {
  DropArea: typeof DropArea;
  FileCard: typeof FileCard;
  FileList: typeof FileList;
  PlaceholderUploader: typeof PlaceholderUploader;
  SilentUploader: typeof SilentUploader;
} & typeof Attachment;

(Attachment as AttachmentType).DropArea = DropArea;
(Attachment as AttachmentType).PlaceholderUploader = PlaceholderUploader;
(Attachment as AttachmentType).SilentUploader = SilentUploader;
(Attachment as AttachmentType).FileList = FileList;
(Attachment as AttachmentType).FileCard = FileCard;

// 完整引入示例
// Attachment.install = (app: App) => {
//   app.component(Attachment.name as string, Attachment);
//   app.component(DropArea.name as string, DropArea);
//   app.component(PlaceholderUploader.name as string, PlaceholderUploader);
//   app.component(SilentUploader.name as string, SilentUploader);
//   app.component(FileList.name as string, FileList);
//   app.component(FileCard.name as string, FileCard);
// }

export default Attachment as AttachmentType;
