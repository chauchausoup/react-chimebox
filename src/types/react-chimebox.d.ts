// src/types/react-chimebox.d.ts
declare module 'react-chimebox' {

	import React from 'react'

    // Props type for the CommentWidget component
    interface CommentWidgetProps {
        siteId: string;
        turnstileDataSiteKey: string;
    }

    // Declare the CommentWidget component
    const CommentWidget: React.FC<CommentWidgetProps>;

    export default CommentWidget;
}
