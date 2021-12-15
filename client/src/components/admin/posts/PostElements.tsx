import * as React from 'react';
import { useState, useEffect } from 'react';
import { Heart, HeartFill, Bookmark, BookmarkFill } from 'react-bootstrap-icons';


/**
 * Generic togglable Button
 * @param {ReactComponent} IconActive - Icon when Active
 * @param {ReactComponent} IconInactive - Icon when Inactive
 * @param {String, HEX} colorActive - Iconcolor when Active
 * @param {Function} onClick - Toggle Eventhandler
 * @param {Boolean} initialState - initial State 
 * @returns {ReactComponent}
 */
function ToggleElement({ IconActive, IconInactive, colorActive, onClick, initialState }: {
  IconActive: any, 
  IconInactive: any, 
  colorActive: string, 
  onClick: Function, 
  initialState: any
}) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState(initialState)
  }, [initialState])

  const toggleState = () => {
    onClick(!state);
    setState(!state);
  };

  return (
    <>
      {state ? <IconActive color={colorActive} cursor="pointer" onClick={toggleState} /> : <IconInactive cursor="pointer" onClick={toggleState} />}
    </>
  );
}

//* Implementation of ToggleElement as a Like-Button
function LikeElement({ addLike, userLiked }: {addLike: Function, userLiked: boolean}) {
  return (
    <>
      <ToggleElement IconActive={HeartFill} IconInactive={Heart} colorActive={'red'} onClick={addLike} initialState={userLiked} />
    </>
  );
}

//* Implementation of ToggleElement as a Bookmark-Button
function BookmarkElement({ addBookmark, userSaved }: {addBookmark: Function, userSaved: boolean}) {
  return (
    <>
      <ToggleElement IconActive={BookmarkFill} IconInactive={Bookmark} colorActive={'#0065d1'} onClick={addBookmark} initialState={userSaved} />
    </>
  );
}

export { LikeElement, BookmarkElement };
