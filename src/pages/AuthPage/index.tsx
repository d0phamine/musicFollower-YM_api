import { FC } from "react";
import { useFormik, Form, Formik } from "formik";
import * as Yup from "yup";

import { GlobalOutlined } from "@ant-design/icons";
import { Button, Input, ConfigProvider, theme } from "antd";

import { initApi } from "../../api/auth";
import { AuthLayout } from "../../Layout/authLayout";

import { observer } from "mobx-react-lite";
import { useStores } from "../../store";

import "./index.scss";
import { error } from "console";

export const IndexPage: FC = observer(() => {
	const { authStore } = useStores();

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
						<Formik
							initialValues={{ email: "", password: "" }}
							onSubmit={(values, { setSubmitting }) => {
								authStore.getAuthCreds(
									values.email,
									values.password,
								);
								initApi(authStore.authData.email, authStore.authData.password)
							}}
							validationSchema={Yup.object().shape({
								email: Yup.string()
									.email()
									.required("Required"),
							})}
						>
							{(props) => {
								const {
									values,
									handleSubmit,
									handleChange,
									errors,
									touched,
								} = props;
								return (
									<form onSubmit={handleSubmit}>
										<div className="auth-card">
											<GlobalOutlined
												style={{
													fontSize: "64px",
													color: "#6f56d0",
												}}
											/>
											<h2>Sign in to your account</h2>
											<div className="auth-card__form">
												<div className="form-email">
													<p>Email addess</p>
													<Input
														placeholder="user@mail.com"
														name="email"
														onChange={handleChange}
														value={values.email}
														status={
															touched.email &&
															errors.email
																? "error"
																: ""
														}
													/>
													{touched.email &&
													errors.email ? (
														<p className="form-email__error">
															Email should be a
															valid email address
														</p>
													) : null}
												</div>
												<div className="form-password">
													<div className="form-password__label">
														<p>Password</p>
														<a href="">
															Forgot Password?
														</a>
													</div>
													<Input
														placeholder="Enter your password"
														name="password"
														onChange={handleChange}
														value={values.password}
														type="password"
													/>
												</div>
											</div>
											<Button
												htmlType="submit"
												type="primary"
											>
												Sign in
											</Button>
											<div className="auth-card__signup">
												<p>New here?</p>
												<a href="">Sign up</a>
											</div>
										</div>
									</form>
								);
							}}
						</Formik>
					</div>
				</div>
			</AuthLayout>
		</ConfigProvider>
	);
});

