import React, { useContext, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({ author, content, emotion, created_date, id }) => {
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);

  // isEdit이 true라면 JSX에 수정 폼 띄우기 , false라면 기본 값 유지
  const [isEdit, setIsEdit] = useState(false);
  // 수정하기 버튼을 누르면 isEdit값 변경
  const toggleIsEdit = () => setIsEdit(!isEdit);
  // 수정 시 입력하는 content value를 저장하는 State
  const [localContent, setLocalContent] = useState(content);

  const localContentInput = useRef();

  // 수정 취소를 눌렸을 때 setIsEdit을 false로 변경해서 기본상태를 렌더해주고 localContent 값을
  // content로 초기화 시켜준다
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    onEdit(id, localContent);
    toggleIsEdit();
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} / 감정점수 : {emotion}
        </span>
        <div className="remove">
          {isEdit ? (
            <>
              <button onClick={handleQuitEdit}>수정 취소</button>
              <button onClick={handleEdit}>수정 완료</button>
            </>
          ) : (
            <>
              <button onClick={() => onRemove(id)}>삭제</button>
              <button onClick={toggleIsEdit}>수정</button>
            </>
          )}
        </div>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      <div className="date">{new Date(created_date).toLocaleString()}</div>
    </div>
  );
};

export default React.memo(DiaryItem);
