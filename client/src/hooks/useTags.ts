import React, { useEffect, useRef, useState } from "react"
import type { InputRef } from "antd"
import { theme } from "antd"

export const useTags = (
  tags: string[],
  setTags: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const { token } = theme.useToken()
  // const [tags, setTags] = useState<string[]>([])
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [editInputIndex, setEditInputIndex] = useState(-1)
  const [editInputValue, setEditInputValue] = useState("")
  const inputRef = useRef<InputRef>(null)
  const editInputRef = useRef<InputRef>(null)
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus()
    }
  }, [inputVisible])

  useEffect(() => {
    editInputRef.current?.focus()
  }, [inputValue])
  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag)
    console.log(newTags)
    setTags(newTags)
  }

  const showInput = () => {
    setInputVisible(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue])
    }
    setInputVisible(false)
    setInputValue("")
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value)
  }

  const handleEditInputConfirm = () => {
    const newTags = [...tags]
    newTags[editInputIndex] = editInputValue
    setTags(newTags)
    setEditInputIndex(-1)
    setInputValue("")
  }

  const tagInputStyle: React.CSSProperties = {
    width: 78,
    verticalAlign: "top",
  }

  const tagPlusStyle: React.CSSProperties = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
  }

  return {
    setTags,
    setInputVisible,
    setInputValue,
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
    tags,
    inputVisible,
    inputValue,
    editInputIndex,
    editInputValue,
    token,
  }
}
