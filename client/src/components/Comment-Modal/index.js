import React from "react";

export const CommentModal = ({ author, body }) => {
 
    return (
      <div>
        <div>
            Comment: {body}
        </div>
        <div>
            By: {author}
        </div>
      </div>
    );
  };

  export default CommentModal;