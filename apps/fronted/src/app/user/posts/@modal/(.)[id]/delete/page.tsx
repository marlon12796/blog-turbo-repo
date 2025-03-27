
import Modal from './modal';

type InterceptProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostModal({ params }: InterceptProps) {
  const postId = (await params).id;
  return <Modal postId={+postId} />;
}
