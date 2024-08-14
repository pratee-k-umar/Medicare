"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import ImageIcon from "@mui/icons-material/Image";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function DoctorBlog({ session, setActiveButton }) {
  const [submitting, setSubmitting] = useState(false);
  const [blogHidden, setBlogHidden] = useState(true);
  const [imageInfo, setImageInfo] = useState({
    imageUrl: {},
    publicId: {},
  });
  const [blogPost, setBlogPost] = useState({
    title: "",
    imageUrl: imageInfo.imageUrl,
    publicId: imageInfo.publicId,
    tag: "",
    content: "",
  });
  const quillRef = useRef(null);
  const handleBlogPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("api/blogs/new", {
        method: POST,
        body: JSON.stringify({
          userId: session?.user.id,
          title: blogPost.title,
          imageUrl: blogPost.imageUrl,
          publicId: blogPost.publicId,
          tag: blogPost.tag,
          content: blogPost.content,
        }),
      });
      if (res.ok) alert("Post created...");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  const uploadImages = (result) => {
    const info = result.info;
    if ("secure_url" in info && "public_id" in info) {
      setImageInfo((imageInfo) => ({
        ...imageInfo,
        imageUrl: info.secure_url,
        publicId: info.public_id,
      }));
    }
  };
  const removeImage = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/blogs/removeImage", {
        method: "POST",
        body: JSON.stringify({ publicId }),
      });
      if (res.ok) {
        setImageInfo((imageInfo) => ({
          ...imageInfo,
          imageUrl: "",
          publicId: "",
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const eventButton = (event) => {
    if(event.key === 'Enter') handleBlogPost()
  }
  return (
    <div>
      <div className="flex justify-between">
        <button
          className="border border-red-500 text-red-500 px-4 rounded-full transition-all hover:bg-red-500 hover:text-white"
          onClick={() => setActiveButton("button1")}
        >
          Close
        </button>
        <h1 className="text-2xl font-bold">Blogs</h1>
        <button
          className="border border-blue-500 text-blue-500 px-4 rounded-full transition-all hover:bg-blue-500 hover:text-white"
          onClick={() => setBlogHidden(false)}
        >
          New Blog
        </button>
      </div>
      <h1>Your Blogs</h1>
      <div
        className={`${
          blogHidden ? "hidden" : "block"
        } border absolute inset-0 rounded-xl p-4 form-container overflow-auto`}
      >
        <div className="flex justify-between items-center px-4">
          <h1 className="text-center text-2xl font-bold">New Blog</h1>
          <Image
            src={session?.user.image}
            width={40}
            height={40}
            className="rounded-full"
            alt="profile"
          />
        </div>
        <form
          onSubmit={handleBlogPost}
          onKeyDown={eventButton}
          className="flex flex-col gap-2 w-full p-4 mt-5"
        >
          <input
            type="text"
            placeholder="Title"
            className="w-full py-2 px-2 transition-all focus:border-b focus:border-transparent focus:outline-none"
            style={{ outline: "none" }}
            onChange={(e) =>
              setBlogPost({ ...blogPost, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="#tag"
            className="w-full py-2 px-2 transition-all focus:border-b focus:border-transparent focus:outline-none"
            style={{ outline: "none" }}
            onChange={(e) => setBlogPost({ ...blogPost, tag: e.target.value })}
          />
          <ReactQuill
            ref={quillRef}
            placeholder="Content"
            className="w-full py-2 px-2 transition-all focus:border-b focus:border-transparent focus:outline-none h-60 resize-none"
            style={{ height: "200px" }}
            theme="snow"
            onChange={(content) => setBlogPost({ ...blogPost, content })}
          />
          <div className="flex gap-4 justify-between px-5 py-1 items-center mt-10">
            <CldUploadButton
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              onUpload={uploadImages}
            >
              <ImageIcon />
            </CldUploadButton>
            <div className="flex gap-4">
              <button
                className="border border-red-500 rounded-full text-lg text-red-500 px-4 py-1 transition-all hover:bg-red-500 hover:text-white"
                onClick={(e) => setBlogHidden(true)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="border border-green-500 rounded-full text-lg text-green-500 px-4 py-1 transition-all hover:bg-green-500 hover:text-white"
              >
                {submitting ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
