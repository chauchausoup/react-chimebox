import { useEffect } from 'react';

const CommentWidget = ({ siteId }) => {
  useEffect(() => {
    // Dynamically load the widget script
    const script = document.createElement('script');
    script.src = "https://confessify.netlify.app/comment-widget.js";  // Update with the correct script URL
    script.async = true;
    script.onload = () => {
      if (window.initCommentSection) {
        window.initCommentSection({
          siteId: siteId
        });
      }
    };
    document.body.appendChild(script);

    // Cleanup the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, [siteId]);

  return <div id="comment-section"></div>;
};

export default CommentWidget;
