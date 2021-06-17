import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import '../css/login.css'
import { checkUsernameExist } from '../services/userService'


class RegisterForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {usernameUnique: false};
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
        if(this.state.usernameUnique){
            callback();
        } else {
            callback("Username already exists!");
        }      
    }

    // username <Input/> onBlur
    setUsernameUnique = () => {
        const username = this.props.form.getFieldValue('username')
        const callback = (data) => {
            this.setState({ usernameUnique: data.status >= 0 ? true : false})
        }
        checkUsernameExist(username, callback);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                //userService.login(values);
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
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            onBlur={this.setUsernameUnique}
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
