import { FC, useEffect, useState } from "react";

import { GlobalOutlined } from "@ant-design/icons";
import { Button, Input, ConfigProvider, theme } from "antd";

import { Link, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage, Form, FormikValues } from "formik";
import * as Yup from "yup";

import { SuccesToast, ErrorToast } from "../../components";

import { AuthLayout } from "../../Layout/authLayout";

import { observer } from "mobx-react-lite";
import { useStores } from "../../store";
import { HandleRegister } from "../../api/register";

export const RegisterPage: FC = observer(() => {
	const { authStore } = useStores();
	const redirect = useNavigate();

	useEffect(() => {}, [authStore.authData.registered]);

	const handleSubmit = async (values: FormikValues) => {
		console.log(values);
		const res = await HandleRegister(values.username, values.password);
		console.log(res, "ответ запроса");
		if (res.registered) {
			authStore.changeRegistered();
			redirect("/");
		} else {
			console.log(res.message);
			ErrorToast(res.message);
		}
	};

	return (
		<AuthLayout>
			<div className="auth-page">
				<div className="auth-page__background-image">
					<Formik
						initialValues={{
							username: "",
							password: "",
							confirmPassword: "",
						}}
						validationSchema={Yup.object().shape({
							username: Yup.string().required(),
							password: Yup.string()
								.min(8)
								.required("Password is required"),
							confirmPassword: Yup.string()
								.oneOf(
									[Yup.ref("password"), ""],
									"Passwords must match",
								)
								.required("Confirm Password is required"),
						})}
						onSubmit={(values, { setSubmitting }) => {
							handleSubmit(values);
							setSubmitting(false);
						}}
					>
						{(props) => {
							const {
								values,
								handleChange,
								errors,
								touched,
								isSubmitting,
							} = props;
							return (
								<Form>
									<div className="auth-card">
										<GlobalOutlined
											style={{
												fontSize: "64px",
												color: "#6f56d0",
											}}
										/>
										<h2>Register new account</h2>
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
														"Username is required"
													</p>
												) : null}
											</div>
											<div className="form-password">
												<div className="form-password__label">
													<p>Password</p>
												</div>
												<Input
													placeholder="Enter your password"
													name="password"
													onChange={handleChange}
													value={values.password}
													type="password"
													status={
														touched.password &&
														errors.password
															? "error"
															: ""
													}
												/>
												{touched.password &&
												errors.password ? (
													<p className="form-email__error">
														'Password must be at
														least 6 characters'
													</p>
												) : null}
											</div>
											<div className="form-password">
												<div className="form-password__label">
													<p>Confirm your Password</p>
												</div>
												<Input
													placeholder="Enter your password"
													name="confirmPassword"
													onChange={handleChange}
													type="password"
													value={
														values.confirmPassword
													}
													status={
														touched.confirmPassword &&
														errors.confirmPassword
															? "error"
															: ""
													}
												/>
												{touched.confirmPassword &&
												errors.confirmPassword ? (
													<p className="form-email__error">
														Passwords must match
													</p>
												) : null}
											</div>
										</div>
										<Button
											htmlType="submit"
											type="primary"
											disabled={isSubmitting}
										>
											Sign up
										</Button>
										<div className="auth-card__signup">
											<p>Already here?</p>
											<Link to="/">Sign in</Link>
										</div>
									</div>
								</Form>
							);
						}}
					</Formik>
				</div>
			</div>
		</AuthLayout>
	);
});

