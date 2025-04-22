'use client'

import { useState } from "react";
import { Form, Button, Flex } from 'antd';
import { FIRESTORE_PATH_NAMES, regexpValidation } from "@/utilis/constants";
import { handleRegister } from "@/features/auth/auth.api";
import { useRouter } from "next/navigation";
import { db } from "@/services/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { buttonStyles, flex, formItemStyle, formStyles, inputStyles, iStyle } from "@/styles/constants";

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  return (
    <Form
      onFinish={(values) => handleRegister({ values, setLoading, push })}
      layout="vertical"
      form={form}
      style={formStyles}
    >
      <h1 className="gradient-text">SIGN UP</h1>

      <Form.Item
        style={formItemStyle}
        name="firstName"
        rules={[{ required: true, message: "Please input your first name" }]}
      >
        <Flex gap={10} style={flex}>
        <i className='fas fa-user' style={iStyle}></i>
        <input
          type="text"
          placeholder="First name"
          style={inputStyles}
        />
        </Flex>
      </Form.Item>

      <Form.Item
        style={formItemStyle}
        name="lastName"
        rules={[{ required: true, message: "Please input your last name" }]}
      >
        <Flex gap={10} style={flex}>
        <i className='fas fa-user' style={iStyle}></i>
        <input
          type="text"
          placeholder="Last name"
          style={inputStyles}
        />
        </Flex>
      </Form.Item>

      <Form.Item
        style={formItemStyle}
        name="email"
        rules={[{ required: true, message: "Please input your email" }]}
      >
        <Flex gap={10} style={flex}>
        <i className='fas fa-envelope' style={iStyle}></i>
        <input
          type="email"
          placeholder="Email"
          style={inputStyles}
        />
        </Flex>
      </Form.Item>

      <Form.Item
        style={formItemStyle}
        name="password"
        rules={[
          { required: true, message: "Please input your password" },
          {
            pattern: regexpValidation,
            message:
              "The password must contain 6-16 characters, including at least one digit and one special character (!@#$%^&*).",
          },
        ]}
      >
        <Flex gap={10} style={flex}>
        <i className='fas fa-lock' style={iStyle}></i>
        <input
          type="password"
          placeholder="Password"
          style={inputStyles}
        />
        </Flex>
      </Form.Item>

      <Form.Item
        style={formItemStyle}
        name="confirm"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || value === getFieldValue("password")) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The passwords you entered do not match")
              );
            },
          }),
        ]}
      >
        <Flex gap={10} style={flex}>
        <i className='fas fa-lock' style={iStyle}></i>
        <input
          type="password"
          placeholder="Confirm Password"
          style={inputStyles}
        />
        </Flex>
      </Form.Item>

      <Form.Item
        style={formItemStyle}
        name="collabId"
        rules={[
          {
            validator: async (_, value) => {
              if (!value) return Promise.resolve();
              const collabRef = doc(db, FIRESTORE_PATH_NAMES.COLLABORATIONS, value);
              const collabSnap = await getDoc(collabRef);
              if (!collabSnap.exists()) {
                return Promise.reject(new Error("This Collaboration ID does not exist"));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Flex gap={10} style={flex}>
        <i className='fas fa-id-badge' style={iStyle}></i>
        <input
          type="text"
          placeholder="Collaboration ID"
          style={inputStyles}
        />
        </Flex>
      </Form.Item>

      <div className="flex items-center justify-between space-x-4">
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={buttonStyles}
        >
          Sign Up
        </Button>
      </div>
    </Form>
  );
};

export default Register;