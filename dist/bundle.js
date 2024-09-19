'use strict';

var react = require('react');

const CommentWidget = ({
  siteId
}) => {
  react.useEffect(() => {
    // Dynamically load the widget script
    const script = document.createElement('script');
    script.src = "https://confessify.netlify.app/comment-widget.js"; // Update with the correct script URL
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
  return /*#__PURE__*/React.createElement("div", {
    id: "comment-section"
  });
};

exports.CommentWidget = CommentWidget;
