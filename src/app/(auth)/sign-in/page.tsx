'use client'

import { Form, Button, Flex } from 'antd';
import { useState } from 'react';
import { regexpValidation } from '@/utilis/constants';
import { useRouter } from 'next/navigation';
import { handleLogin } from '@/features/auth/auth.api';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state-management/redux/store';
import { buttonStyles, formStyles, inputStyles, formItemStyle, iStyle, flex } from '@/styles/constants';

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Form
      layout="vertical"
      onFinish={(values) => handleLogin({ setLoading, values, push, dispatch })}
      form={form}
      style={formStyles}
    >
      <h1 className="gradient-text">SIGN IN</h1>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Enter your email",
          },
        ]}
        style={formItemStyle}
      >
        <Flex gap={10} style={flex}>
        <i className='fas fa-user' style={iStyle}></i>
        <input
          type="email"
          placeholder="Enter your email"
          style={inputStyles}
        />
        </Flex>
      </Form.Item>

      <Form.Item
        style={formItemStyle}
        name="password"
        tooltip="Password must be min 6 max 16 characters, including one special character."
        rules={[
          {
            required: true,
            message: "Enter your password",
          },
          {
            pattern: regexpValidation,
            message: "Password is invalid",
          },
        ]}
      >
        <Flex gap={10} style={flex}>
        <i className='fas fa-lock' style={iStyle}></i>
        <input
          type="password"
          placeholder="Enter your password"
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
          Sign In
        </Button>
      </div>
    </Form>
  );
};

export default Login;