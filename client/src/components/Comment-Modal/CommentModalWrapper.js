import React from "react";

export const CommentModalWrapper = ({ displayState, children, hideMe }) => {
  let displayStyle = {hidden: displayState};
    return (
      <div style={displayStyle}>
        {children}
        <button onClick={() => hideMe()}>Close</button>
      </div>
    );
  };

  export default CommentModalWrapper;