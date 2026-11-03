import { Form, useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/Group 2.png"

const initialState = {
    email: "",
    password: ""
};

export function Login() {

     const navigate = useNavigate();
    
    const formik = useFormik({

        initialValues: initialState,

        validationSchema: yup.object({

            email: yup
                .string()
                .email("Invalid email")
                .required("Email is required"),

            password: yup
                .string()
                .required("Password is required")
        }),
    })

    return (
        <div className="flex justify-center p-10 bg-black h-screen">
            <div className="m-10 p-10 border rounded-xl w-100 bg-white ">
                <img src={logo} alt="" className="h-20 ml-25"/>
                <h1 className="text-center font-bold text-2xl">
                    Welcome Back
                </h1>
                <p>Please sign in to your existing account</p>

                <form>
                    <div>

                        <label className="block">
                            Email
                        </label>

                        <input
                            type="email"
                            {...formik.getFieldProps("email")}
                            placeholder="abc@gmaul.com"
                            className="p-1 border rounded-sm my-2 w-full"
                        />

                        {formik.touched.email &&
                            formik.errors.email ? (
                            <p>{formik.errors.email}</p>
                        ) : null}

                    </div>

                    <div>

                        <label className="block">
                            Password
                        </label>

                        <input
                            type="password"
                            {...formik.getFieldProps("password")}
                            placeholder="********"
                            className="p-1 border rounded-sm my-2 w-full"
                        />

                        {formik.touched.password &&
                            formik.errors.password ? (
                            <p>{formik.errors.password}</p>
                        ) : null}

                    </div>

                    <button
                        type="submit"
                        className="border rounded-sm py-2 px-4 font-bold mt-2 w-full bg-[#565656] text-white"
                    >
                        Login
                    </button>

                    <p className="mt-4 text-center">
                        Don't have an account?{" "}
                        <Link to="/signup" className="font-bold underline">
                            Sign up
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    )
}