import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import 'antd/dist/antd.css';
import '../css/login.css'
import { checkUsernameExist, addNewUser } from '../services/userService'


class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
    }

    checkPasswordConsistent = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    checkUsernameUnique = (rule, value, callback) => {
        console.log(value);
        const requestCallback = (data) => {
            if(data.status >= 0 && data.msg === ""){
                callback();
            } else if (data.status < 0 && data.msg === "Username already exists!"){
                callback(data.msg);
            } else {
                callback(data.msg);
            }
        }
        checkUsernameExist(value, requestCallback);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const callback = (data) => {
                if(data.status >= 0){
                    message.success("注册成功！")
                }else{
                    message.error("注册失败！")
                }
            }
            if (!err) {
                console.log('Received values of form: ', values);
                addNewUser(values, callback);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item >
                    {getFieldDecorator('username', {
                        rules: [
                            { required: true, message: 'Please input your username!' },
                            { validator: this.checkUsernameUnique }],
                        validateTrigger: 'onBlur',
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"                            
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your password!' }],
                    })(
                        <Input.Password
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('confirm', {
                        rules: [
                            { required: true, message: 'Please confirm your password!' },
                            {
                                validator: this.checkPasswordConsistent
                            },
                        ],
                        validateTrigger: 'onBlur',
                    })(
                        <Input.Password
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Confirm Password"
                        />,
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [
                            { required: true, message: 'Please input your email!' },
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            }],
                    })(
                        <Input
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="email"
                            placeholder="Email"
                        />,
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                        rules: [
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                            }
                        ]
                    })(
                        <Checkbox>
                            I have read the <a href="">agreement</a>
                        </Checkbox>,
                    )}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Register
                    </Button>
                    <a href="/login">Back to Login</a>
                </Form.Item>

                <Form.Item>

                </Form.Item>
            </Form>
        );
    }
}

const WrappedRegisterForm = Form.create({ name: 'normal_login' })(RegisterForm);

export default WrappedRegisterForm
