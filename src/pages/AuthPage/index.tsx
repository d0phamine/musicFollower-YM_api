import { FC } from "react";
import { AuthLayout } from "../../Layout/authLayout";
import { GlobalOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, ConfigProvider, theme } from "antd";

import "./index.scss";

export const IndexPage: FC = () => {
	type FieldType = {
		username?: string;
		password?: string;
		remember?: string;
	};

	const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
		console.log("Success:", values);
	};

	const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
		errorInfo,
	) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
				token: {
					// Seed Token
					colorPrimary: "#6f56d0",
				},
			}}
		>
			<AuthLayout>
				<div className="auth-page">
					<div className="auth-page__background-image">
						<div className="auth-card">
							<GlobalOutlined
								style={{ fontSize: "64px", color: "#6f56d0" }}
							/>
							<h2>Sign in to your account</h2>
							<div className="auth-card__form">
								<div className="form-email">
									<p>Email addess</p>
									<Input placeholder="Basic usage" />
								</div>
								<div className="form-password">
									<div className="form-password__label">
										<p>Password</p>
										<a href="">Forgot Password?</a>
									</div>
									<Input placeholder="Basic usage" />
								</div>
							</div>
							<Button type="primary">Sign in</Button>
							<div className="auth-card__signup">
								<p>New here?</p>
								<a href="">Sign up</a>
							</div>
						</div>
					</div>
				</div>
			</AuthLayout>
		</ConfigProvider>
	);
};

