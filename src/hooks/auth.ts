// import { useAtom, useSetAtom } from "jotai";
// import { useCreateUserMutation, useLoginMutation } from "../mutation/authMutation"
// import { loggedInUserAtom, loginDataAtom, signUpDataAtom } from "../atom/authAtom";
// import { FormEvent } from "react";
// import { useRouter } from "next/navigation";

// const useAuthData = () => {
//     const [loginData, setLoginData] = useAtom(loginDataAtom);
//     const [signUpData, setSignUpData] = useAtom(signUpDataAtom);
//     const loggedInUser = useSetAtom(loggedInUserAtom)
//     const { isPending: isLoginPending, mutate: loginUser } = useLoginMutation();
//     const { isPending: isCreateUserPending, mutate: createUser } = useCreateUserMutation();
//     const route = useRouter()


//     const getUserLogin = (e: FormEvent) => {
//         e.preventDefault();
//         loginUser(
//             loginData,
//             {
//                 onSuccess: (data) => {
//                     route.push('/dashboard')
//                     setLoginData({ password: '', email: '' })
//                     loggedInUser(data.user)
//                 },
//                 onError: (err) => {
//                     console.log("error Is :", err);

//                 }
//             }

//         )
//     }


//     const getUserSignUp = (e: FormEvent) => {
//         e.preventDefault();
//         createUser(
//             signUpData,
//             {
//                 onSuccess: (data) => {
//                     route.push('/dashboard');
//                     setSignUpData({ password: '', email: '', name: '', userName: '', image: '' })
//                 },
//                 onError: (err) => {
//                     console.log("error Is :", err);

//                 }
//             }

//         )
//     }

//     return {
//         loginData,
//         setLoginData,
//         signUpData,
//         setSignUpData,
//         isLoginPending,
//         isCreateUserPending,
//         getUserLogin,
//         getUserSignUp
//     }
// }

// export default useAuthData