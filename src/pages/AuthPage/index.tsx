import { FC, useEffect } from "react";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";

import { GlobalOutlined } from "@ant-design/icons";
import { Button, Input, ConfigProvider, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { ErrorToast, SuccesToast } from "../../components";

import { AuthLayout } from "../../Layout/authLayout";

import { observer } from "mobx-react-lite";
import { useStores } from "../../store";

import "./index.scss";
import { set } from "mobx";
import { HandleAuth } from "../../api/auth";

export const AuthPage: FC = observer(() => {
	const { authStore, userStore } = useStores();
	const redirect = useNavigate();

	if (authStore.authData.registered) {
		SuccesToast("You successfully registered");
		authStore.changeRegistered();
	}

	const handleSubmit = async (values: FormikValues) => {
		console.log(values, "values");
		const res = await HandleAuth(values.username, values.password);
		if (res.token) {
			authStore.setToken(res.token);
			userStore.setUserData(res.username, res.id)
			console.log(authStore.authData, userStore.userData)
			redirect("/feed");
		} else {
			ErrorToast(res.message);
		}
	};

	return (
		<AuthLayout>
			<div className="auth-page">
				<div className="auth-page__background-image">
					<Formik
						initialValues={{ username: "", password: "" }}
						validationSchema={Yup.object().shape({
							username: Yup.string().required("Required"),
						})}
						onSubmit={(values, { setSubmitting }) => {
							handleSubmit(values);
							setSubmitting(false);
						}}
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
												<p>Username</p>
												<Input
													placeholder="Username"
													name="username"
													onChange={handleChange}
													value={values.username}
													status={
														touched.username &&
														errors.username
															? "error"
															: ""
													}
												/>
												{touched.username &&
												errors.username ? (
													<p className="form-email__error">
														Username is required
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
											<Link to="/register">Sign up</Link>
										</div>
									</div>
								</form>
							);
						}}
					</Formik>
				</div>
			</div>
		</AuthLayout>
	);
});

