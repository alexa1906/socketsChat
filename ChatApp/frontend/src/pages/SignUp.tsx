import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined} from "@ant-design/icons";
import axios, { AxiosError } from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
    console.log("Username:", e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    console.log("Password:", e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    console.log("Email:", e.target.value);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    // e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/user/create", {
        email: email,
        username: username,
        password: password,
      });

      console.log("User registered:", response.data); // Log response from the server
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Registration failed:", axiosError.response?.data);
      } else {
        console.error("Unexpected error during registration:", error);
      }
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
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
        onFinish={handleSignUp}
        onFinishFailed={onFinishFailed}
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
              type: "email",
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
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
