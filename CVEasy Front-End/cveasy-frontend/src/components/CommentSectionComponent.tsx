import React from "react";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";

/* Uses https://www.npmjs.com/package/react-comments-section, but bare in mind it uses a NUMBER of depreciated packages.
Suffice to say, we'd need to either contribute to the GitHub and update it, or make my own if we wanted to make this
public. */

const data = [
  {
    userId: "02b",
    comId: "017",
    fullName: "Lily",
    text: "I think you have a point🤔",
    avatarUrl: "https://ui-avatars.com/api/name=Lily&background=random",
    replies: [],
  },
];

export default function CommentSectionComponent() {
  return (
    <CommentSection
      currentUser={{
        currentUserId: "01a",
        currentUserImg:
          "https://ui-avatars.com/api/name=Riya&background=random",
        currentUserProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
        currentUserFullName: "Mike Hunt",
      }}
      logIn={{
        loginLink: "http://localhost:3001/",
        signupLink: "http://localhost:3001/",
      }}
      commentData={data}
      onSubmitAction={(data: {
        userId: string;
        comId: string;
        avatarUrl: string;
        fullName: string;
        text: string;
        replies: any;
        commentId: string;
      }) => console.log("check submit, ", data)}
      currentData={(data: any) => {
        console.log("current data", data);
      }}
    />
  );
}
