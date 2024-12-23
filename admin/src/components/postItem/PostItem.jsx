import { ImageList, ImageListItem } from "@mui/material";
import React from "react";
import { formatDate } from "../../utils/fmt";
import UserItem from "../userItem";

export default function PostItem({
  _id,
  content,
  attach_files,
  created_at,
  author,
}) {
  return (
    <div className="postItem">
      <div>ID: {_id}</div>
      <div>
        <span>Creator: </span>
        <UserItem
          _id={author._id}
          username={author.username}
          avatarUrl={author.avatarUrl}
        />
      </div>
      <div>
        <span>Content: {content}</span>
      </div>
      <div className="infoItem">
        <label>created_at:</label>
        <div>{formatDate(created_at)}</div>
      </div>
      <ImageList
        // sx={{}}
        cols={4}
        rowHeight={150}
      >
        {attach_files
          ? attach_files.map((item) => (
              <ImageListItem key={item.url}>
                <img
                  src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  loading="lazy"
                />
              </ImageListItem>
            ))
          : ""}
      </ImageList>
    </div>
  );
}
