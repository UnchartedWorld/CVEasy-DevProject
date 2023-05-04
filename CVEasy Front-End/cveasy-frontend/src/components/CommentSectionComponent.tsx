import React, { useEffect, useState } from "react";
import axios from "axios";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import Cookies from "js-cookie";
import { Typography } from "@mui/material";

/* Uses https://www.npmjs.com/package/react-comments-section, but bare in mind it uses a NUMBER of depreciated packages.
Suffice to say, we'd need to either contribute to the GitHub and update it, or make my own if we wanted to make this
public. */

export default function CommentSectionComponent({ data }: any) {
  const [comments, setComments] = useState<any>([]);
  const [commentIndex, setCommentIndex] = useState<number>(0);
  const [commentSize, setCommentSize] = useState<number>(30);
  const [currentUserDetails, setCurrentUserDetails] = useState<any>(null); // For some reason, despite not being null, it treats it as if it is. Not sure what's wrong.
  const userID = Cookies.get("userID");

  async function getUser() {
    try {
      const response = await axios.get(`api/User/UserInfo/${userID}`);
      const responseData = response.data.data;
      if (responseData) {
        const userDetails = {
          currentUserId: response.data.data.userId,
          currentUserImg: `https://ui-avatars.com/api/name=${response.data.data.username}&background=random&bold`,
          currentUserProfile: "",
          currentUserFullName: `${response.data.data.username}`,
        }
        setCurrentUserDetails(userDetails)
      } else {
        setCurrentUserDetails(null);
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {

      }
    }
  }

  async function getComments() {
    try {
      const commentSearchParams = new URLSearchParams();
      commentSearchParams.append("themeID", data.createdByID);
      commentSearchParams.append("commentIndex", commentIndex.toString());
      commentSearchParams.append("commentSize", commentSize.toString());

      const response = await axios.get(
        "api/Comments/GetAllComments?" + commentSearchParams
      );
      const commentsWithAvatarURL = response.data.data.comments.map(
        (comment: { username: any }) => ({
          ...comment,
          avatarUrl: `https://ui-avatars.com/api/name=${comment.username}&background=random&bold`,
          replies: [],
        })
      );
      setComments(commentsWithAvatarURL);
    } catch (error) {
      if (axios.isAxiosError(error)) {

      }
    }
  }

  //async function updateComment(commentUserID: string | Blob, themeID: string | Blob, comment: string | Blob, commentID: string | Blob) {
  //  try {
  //    const commentUpdateFormData = new FormData();
  //    commentUpdateFormData.append("UserID", commentUserID);
  //    commentUpdateFormData.append("ThemeID",  themeID);
  //    commentUpdateFormData.append("Comment", comment);
  //    commentUpdateFormData.append("CommentID", commentID);
//
  //    console.log(commentUpdateFormData);
//
  //  } catch (error) {
  //    if (axios.isAxiosError(error)) {
//
  //    }
  //  }
  //}
//
  async function postComment(commentData: any) {
    try {
      const commentPostFormData = new FormData();
      commentPostFormData.append("UserID", commentData.userId);
      commentPostFormData.append("ThemeID",  data.themeID);
      commentPostFormData.append("Comment", commentData.text);

      console.log(commentPostFormData);

    } catch (error) {
      if (axios.isAxiosError(error)) {

      }
    }
  }

  useEffect(() => {
    getUser();
    getComments();
  }, []);

  console.log("currentUserDetails", currentUserDetails)

  return (
    <section>
      <style>{`
      .replyBtn {
        display: none;
      }`}</style>
      <CommentSection
        removeEmoji
        currentUser={currentUserDetails}
        logIn={{
          loginLink: "http://localhost:3000/Login",
          signupLink: "http://localhost:3000/Register",
        }}
        commentData={comments}
        onSubmitAction={(data: {
          userId: number;
          fullNam: string;
          comment: string;
          commentId: string;
        }) => postComment(data)}
        currentData={(comments: any) => {
          console.log("current data", comments);
        }}
      />
    </section>
  );
}
