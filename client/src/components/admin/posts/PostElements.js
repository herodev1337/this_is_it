import React, { useState } from 'react';
import { Heart, HeartFill } from 'react-bootstrap-icons';

function LikeElement({ addLike }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    addLike(liked ? -1 : 1);
  };

  return (
    <>
      {liked ? <HeartFill color="red" cursor="pointer" onClick={toggleLike} /> : <Heart cursor="pointer" onClick={toggleLike} />}
    </>
  );
}

export { LikeElement };
