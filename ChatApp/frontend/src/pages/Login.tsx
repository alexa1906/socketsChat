import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useLogin } from "../hooks/useLogin";
import { fetchMessages } from "../api/services/auth";
import { useAllChats } from "../App";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status
  const navigate = useNavigate();
  const { setAllChats } = useAllChats();

  const { mutateAsync, isPending } = useLogin();

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages().then((messages) => {
      setMessages(messages.data);
    });
  }, []);

  const handleLogin = async (values) => {
    try {
      await mutateAsync(values);
      setIsAuthenticated(true);
      navigate("/chatpage", { state: { username } });

      // Group messages by chatName
      const groupedMessages = (
        messages as { chatName: string; message: any }[]
      ).reduce((acc, msg) => {
        if (acc[msg.chatName]) {
          acc[msg.chatName].push(msg.message);
        } else {
          acc[msg.chatName] = [msg.message];
        }
        return acc;
      }, {});

      // Convert groupedMessages object to array
      const chatMessagesArray = Object.entries(groupedMessages).map(
        ([chatName, messages]) => ({
          chatName,
          messages,
        })
      );
      setAllChats(chatMessagesArray);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // mu e ok setAllChats

  return (
    <div className="login-container">
      <h1>Log In</h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleLogin}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            value={username}
            onChange={handleUsernameChange}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
            style: { display: "flex", justifyContent: "center" },
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={isPending}
          >
            Log in
          </Button>
          Or
          <Button type="link" onClick={goToSignUp}>
            register now!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LogIn;
