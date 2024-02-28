import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import ImageList from "@mui/material/ImageList";
import React, { useEffect, useState } from "react";
import { Image, Space, message } from "antd";
import {
  getUserDetails,
  getUserDetailsById,
  getUserPosts,
  uploadUserPost,
} from "../Files/User_profile_avator";
import { useUser } from "../Auth/UserContext";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Delete } from "@mui/icons-material";
import { deleteUserPost } from "../Files/Other_DataBase";
const src =
  "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";
function Posts() {
  const { userDetails } = useUser();
  const [userPosts, setUserPosts] = useState([]);
  const [uploadingProcess, setUploadingProcess] = useState(false);
  const [uploadPost, setUploadPost] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploadf, setUploadf] = useState(false);
  const [preview, setPreview] = useState(null);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const deletePost = async (postUrl) => {
    const form = new FormData();
    form.append("post", postUrl);
    if (window.confirm("do you want to delete this post?")) {
      try {
        await deleteUserPost(userDetails.userId, form);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } else {
      message.error("problem in deleting post");
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSize = file.size;
      if (fileSize > 500 * 1024) {
        message.error("post needs to be below 500kb.");
        return;
      }
    }
    setUploadPost(event.target.files[0]);
    if (file) {
      setUploadf(true);
      const render = new FileReader();
      render.onloadend = () => {
        setPreview(render.result);
      };
      render.readAsDataURL(file);
    }
  };
  const handleClose = () => {
    setUploadf(false);
  };
  const formData = new FormData();
  const handleUpload = async () => {
    setUploadingProcess(true);
    formData.append("description", caption);
    formData.append("post", uploadPost);
    try {
      await uploadUserPost(userDetails.userId, formData);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    setUploadingProcess(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserPosts(userDetails.userId);
        setUserPosts(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {userPosts.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ImageList
            style={{
              overflowY: "auto",
            }}
            sx={{ width: "1700px", height: 300 }}
            cols={4}
          >
            {userPosts?.map((item) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column", 
                  backgroundColor: "white",
                  width: "250px",
                  height: "320px",
                }}
              >
                <Image
                  width={250}
                  height={300}
                  src={item.postUrl}
                  preview={{
                    toolbarRender: (
                      _,
                      {
                        transform: { scale },
                        actions: {
                          onFlipY,
                          onFlipX,
                          onRotateLeft,
                          onRotateRight,
                          onZoomOut,
                          onZoomIn,
                        },
                      }
                    ) => (
                      <Space size={12} className="toolbar-wrapper">
                        <SwapOutlined rotate={90} onClick={onFlipY} />
                        <SwapOutlined onClick={onFlipX} />
                        <RotateLeftOutlined onClick={onRotateLeft} />
                        <RotateRightOutlined onClick={onRotateRight} />
                        <ZoomOutOutlined
                          disabled={scale === 1}
                          onClick={onZoomOut}
                        />
                        <ZoomInOutlined
                          disabled={scale === 50}
                          onClick={onZoomIn}
                        />
                        <Delete
                          sx={{ width: 15, height: 15, cursor: "pointer" }}
                          onClick={() => {
                            deletePost(item.post);
                          }}
                        />
                      </Space>
                    ),
                  }}
                />
                <div
                  style={{
                    overflowY: "auto",
                    maxHeight: "50px",
                    scrollbarWidth: "none",
                    "-ms-overflow-style": "none",
                    "::-webkit-scrollbar": { display: "none" },
                  }}
                >
                  <Typography>{item.description}</Typography>
                </div>
              </div>
            ))}
          </ImageList>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="fileInput"
          />

          <label htmlFor="fileInput">
            <Button variant="contained" component="span">
              Upload Post
            </Button>
          </label>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            height: "400px",
            justifyContent: "center",
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="fileInput"
          />

          <label htmlFor="fileInput">
            <Button variant="contained" component="span">
              Upload Your First Post
            </Button>
          </label>
        </div>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={uploadf}
        onClose={handleClose}
        closeAfterTransition
        sx={{ zIndex: 100 }}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={uploadf}>
          <Box sx={style}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              Preview
              <img
                src={preview}
                style={{ height: "200px", width: "200px", objectFit: "cover" }}
              />
              <TextField
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                label="caption"
              />
              <LoadingButton
                variant="contained"
                loading={uploadingProcess}
                loadingIndicator={<>Uploading....</>}
                onClick={() => handleUpload()}
                disabled={!uploadPost}
              >
                Upload
              </LoadingButton>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
export default Posts;
