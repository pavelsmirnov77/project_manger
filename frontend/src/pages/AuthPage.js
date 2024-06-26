import {Button, Card, Form, Input, message} from 'antd';
import {UserOutlined, LockOutlined, LoginOutlined} from '@ant-design/icons';
import {useNavigate, Link} from "react-router-dom";
import authService from "../services/authService";
import {login} from "../slices/authSlice";
import {useDispatch} from "react-redux";

const AuthPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = (values) => {
        authService.login(values).then((user) => {
            console.log(user);
            dispatch(login(user));
            message.success("Вы успешно вошли в аккунт! Здравствуйте!");
            navigate("/my/projects");
        }).catch((error) => {
            if (error.message === 'account_blocked') {
                message.error("Аккаунт заблокирован!");
            } else {
                const _content = (error.response && error.response.data) || error.message || error.toString();
                console.log(_content);
                message.error("Неверно указан логин или пароль!");
            }
        });
    }
};

return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        color: isBlocked ? "white" : ""
    }}>
        <Card title="Авторизация"
              style={{
                  width: 500,
              }}>
            <Form name="normal_login" form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="username"
                    label="Логин"
                    rules={[{
                        required: true,
                        message: 'Введите логин'
                    }]}
                >
                    <Input prefix={<UserOutlined/>} placeholder="Логин"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Пароль"
                    rules={[{
                        required: true,
                        message: 'Введите пароль'
                    }]}
                >
                    <Input.Password prefix={<LockOutlined/>} placeholder="Пароль"/>
                </Form.Item>
                <Form.Item>
                    <Button style={{backgroundColor: '#333232'}} type="primary" icon={<LoginOutlined/>}
                            htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
            <div style={{textAlign: 'center', marginTop: '20px'}}>
                <Link to="/api/auth/signup">Зарегистрируйтесь</Link>
            </div>
        </Card>
    </div>)

export default AuthPage;
