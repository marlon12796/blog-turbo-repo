import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
type Props = React.HTMLAttributes<HTMLDivElement> & {
  content: string;
};
const SanitizedContent = (props: Props) => {
  const dom = new JSDOM('<!DOCTYPE html>');
  const window = dom.window;
  const purify = DOMPurify(window);
  const clean = purify.sanitize(props.content);
  return <div className={props.className} dangerouslySetInnerHTML={{ __html: clean }} {...props} />;
};

export default SanitizedContent;
