import { FC } from "react";
import { AuthLayout } from "../../Layout/authLayout";
import { GlobalOutlined } from "@ant-design/icons";
import { Button, Input, ConfigProvider, theme } from "antd";
import { initApi } from "../../api/auth";
import { observer } from "mobx-react-lite";

import "./index.scss";
import { useRootStore } from "../../store";


export const IndexPage: FC = observer(() => {
	// const {authStore} = useRootStore()

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
									<Input placeholder="user@mail.com" />
								</div>
								<div className="form-password">
									<div className="form-password__label">
										<p>Password</p>
										<a href="">Forgot Password?</a>
									</div>
									<Input placeholder="Enter your password" />
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
});

