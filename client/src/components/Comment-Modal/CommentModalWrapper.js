import React from "react";

export const CommentModalWrapper = ({ displayState, body, author, hideMe }) => {
  let displayStyle = {hidden: displayState};
    return (
      <div style={displayStyle}>
        <div>
            <div>
                Comment: {body}
            </div>
            <div>
                By: {author}
            </div>
        </div>
        <button onClick={() => hideMe()}>Close</button>
      </div>
    );
  };

  export default CommentModalWrapper;