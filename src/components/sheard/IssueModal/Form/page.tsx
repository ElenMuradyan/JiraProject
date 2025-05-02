'use client'

import { Form, Input, Select, Space } from "antd";
import Editor from "../../Editor/page";
import { ISSUE_OPTIONS, ISSUE_PRIORITY_OPTIONS } from "@/utilis/issues";
import { FormInterface } from "@/types/editor";
import { useState } from "react";

const ModalForm = ({ form, onFinish }: FormInterface) => {
    const [editorValue, setEditorValue] = useState("");

    return(
        <Form
        layout="vertical" 
        form={form} 
        onFinish={(values) => onFinish(values)}
        >
            <Form.Item 
            name='issueName'
            label='Issue Name'
            rules={[{
                required: true,
                message: 'Plaese Input Issue Name'
            }]}
            >
                <Input type='text' placeholder="Issue Name"/>
            </Form.Item>
            <Form.Item
            name='type'
            label='Issue Type'
            rules={[{
                required: true,
                message: 'Plaese Select Issue Type'
            }]}
            >
                <Select>
                    {
                        Object.values(ISSUE_OPTIONS).map(({ value, icon, label }) => {
                            return(
                                <Select.Option value={value} key={value}>
                                    <Space>
                                        {icon}
                                        <span>{label}</span>
                                    </Space>
                                </Select.Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item
            name='describtion'
            label='Describtion'
            rules={[{
                required: true,
                message: 'Please input Issue Describtion'
            }]}
            >
                <Editor onChange={(val) => setEditorValue(val)} value={editorValue}/>
            </Form.Item>
            <Form.Item
            name='priority'
            label='Issue Priority'
            rules={[{
                required: true,
                message: 'Plaese Select Issue Priority'
            }]}
            >
                <Select>
                    {
                        Object.values(ISSUE_PRIORITY_OPTIONS).map(({ value, icon, label }) => {
                            return(
                                <Select.Option value={value} key={value}>
                                    <Space>
                                        {icon}
                                        <span>{label}</span>
                                    </Space>
                                </Select.Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
        </Form>
    )
};

export default ModalForm;