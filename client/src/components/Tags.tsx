import React from "react"
import { Space, Input, Tag, Tooltip, theme } from "antd"
import { useTags } from "../hooks/useTags"
import { PlusOutlined } from "@ant-design/icons"
export const Tags: React.FC<{
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
}> = ({ tags, setTags }) => {
  const {
    setEditInputIndex,
    setEditInputValue,
    showInput,
    handleInputChange,
    handleInputConfirm,
    handleEditInputChange,
    handleEditInputConfirm,
    handleClose,
    tagInputStyle,
    tagPlusStyle,
    inputRef,
    editInputRef,
    inputVisible,
    inputValue,
    editInputIndex,
    editInputValue,
  } = useTags(tags, setTags)
  return (
    <Space size={[0, 8]} wrap>
      <Space size={[0, 8]} wrap>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={editInputRef}
                key={tag}
                size="small"
                style={tagInputStyle}
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            )
          }
          const isLongTag = tag.length > 20
          const tagElem = (
            <Tag
              key={tag}
              closable={index !== 0}
              style={{ userSelect: "none" }}
              onClose={() => handleClose(tag)}
            >
              <span
                onDoubleClick={(e) => {
                  if (index !== 0) {
                    setEditInputIndex(index)
                    setEditInputValue(tag)
                    e.preventDefault()
                  }
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          )
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          )
        })}
      </Space>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={tagInputStyle}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag style={tagPlusStyle} onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </Space>
  )
}
